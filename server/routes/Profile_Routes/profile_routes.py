from flask import Blueprint, request, jsonify, session
from werkzeug.exceptions import Forbidden, NotFound
from models import db, Profile, Profile_Section, Profile_Subsection, Profile_Field

from utils.authorization import check_resume_access
from utils.responses import generate_error, generate_success, print_pending_request, print_successful_request

profile_bp = Blueprint('profiles', __name__, url_prefix='/profiles')

@profile_bp.errorhandler(NotFound)
@profile_bp.errorhandler(Forbidden)
def handle_profile_access_error(error):
    error_type, code = {
        404: ("NOT_FOUND", "PROFILE_NOT_FOUND"),
        403: ("FORBIDDEN", "ACCESS_DENIED"),
    }[error.code]
    return generate_error(error_type=error_type, code=code, message=error.description)

@profile_bp.before_request
def check_user():
    if request.method == "OPTIONS":
        return None

    user_id = session.get("user_id")
    if not user_id:
        return generate_error(error_type="UNAUTHORIZED", code="USER_NOT_LOGGED_IN",
                              message="User not logged in.")
    # Returning None lets Flask continue to the requested route.
    return None

def get_profile(profile_id):
    user_id = session.get("user_id")
    profile = db.session.get(Profile, profile_id)
    if profile is None:
        raise NotFound(description="Profile not found.")
    if profile.user_id != user_id:
        raise Forbidden(description="User does not have access to this profile.")
        
    return profile

@profile_bp.route("/", methods=['GET'])
def get_user_profiles():
    user_id = session.get("user_id")
    profiles = Profile.query.filter(Profile.user_id == user_id).all()
    profiles_data = [profile.to_dict(include_sections=True) for profile in profiles]
    return jsonify(profiles_data), 200


@profile_bp.route("/", methods=['POST'])
def create_user_profile():
    form_data = request.get_json()
    if not form_data:
        return generate_error(error_type="BAD_REQUEST", code="NO_FORM_DATA",
                              message="No form data provided.")
        
    profile_title = form_data.get("title")
    if not profile_title:
        return generate_error(error_type="BAD_REQUEST", code="NO_PROFILE_TITLE",
                              message="Profile title is required.")
        
    user_id = session.get("user_id")
    new_profile = Profile(title=profile_title, user_id=user_id)
    
    db.session.add(new_profile)
    db.session.commit()
    
    return jsonify(new_profile.to_dict(include_sections=True)), 201

@profile_bp.route("/<int:profile_id>", methods=['DELETE'])
def delete_user_profile(profile_id):
    profile = get_profile(profile_id)

    db.session.delete(profile)
    db.session.commit()
    
    user_id = session.get("user_id")
    remaining_profiles = Profile.query.filter(Profile.user_id == user_id).all()
    remaining_profiles_data = [profile.to_dict(include_sections=True) for profile in remaining_profiles]

    return jsonify(remaining_profiles_data), 200

# @profile_bp.route("/<int:profile_id>", methods=['POST'])
# def add_profile_section(profile_id):
    # profile = get_profile(profile_id)
    # form_data = request.get_json()
    # if not form_data:
    #     return generate_error(error_type="BAD_REQUEST", code="NO_FORM_DATA",
    #                           message="No form data provided.")

    # section_title = form_data.get("title")
    # if not section_title:
    #     return generate_error(error_type="BAD_REQUEST", code="NO_SECTION_TITLE",
    #                           message="Section title is required.")

    # new_section = Profile_Section(title=section_title, profile_id=profile.id)
    # db.session.add(new_section)
    # db.session.commit()

    # return jsonify(new_section.to_dict()), 201
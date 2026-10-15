from flask import Blueprint, request, jsonify, session
from werkzeug.exceptions import Forbidden, NotFound
from models import db, Profile, Profile_Section, Profile_Subsection, Profile_Field
from routes.Profile_Routes.profile_helpers import check_user, get_profile

from utils.authorization import check_resume_access
from utils.responses import (
    generate_error,
    generate_success,
    print_pending_request,
    print_successful_request,
)

from routes.Profile_Routes.profile_section_routes import profile_section_bp
from routes.Profile_Routes.profile_field_routes import profile_field_bp

profile_bp = Blueprint("profiles", __name__, url_prefix="/profiles")
profile_bp.register_blueprint(profile_section_bp)
profile_bp.register_blueprint(profile_field_bp)


@profile_bp.errorhandler(NotFound)
@profile_bp.errorhandler(Forbidden)
def handle_profile_access_error(error):
    error_type, code = {
        404: ("NOT_FOUND", "PROFILE_NOT_FOUND"),
        403: ("FORBIDDEN", "ACCESS_DENIED"),
    }[error.code]
    return generate_error(error_type=error_type, code=code, message=error.description)


@profile_bp.before_request
def before_request():
    return check_user()


@profile_bp.route("/", methods=["GET"])
def get_user_profiles():
    user_id = session.get("user_id")
    profiles = Profile.query.filter(Profile.user_id == user_id).all()
    profiles_data = [profile.to_dict(include_sections=True) for profile in profiles]
    return jsonify(profiles_data), 200

@profile_bp.route("/<int:profile_id>", methods=["GET"])
def get_user_profile(profile_id):
    profile = get_profile(profile_id)
    return jsonify(profile.to_dict(include_sections=True)), 200


@profile_bp.route("/", methods=["POST"])
def create_user_profile():
    form_data = request.get_json()
    if not form_data:
        return generate_error(
            error_type="BAD_REQUEST",
            code="NO_FORM_DATA",
            message="No form data provided.",
        )

    profile_title = form_data.get("title")
    if not profile_title:
        return generate_error(
            error_type="BAD_REQUEST",
            code="NO_PROFILE_TITLE",
            message="Profile title is required.",
        )

    user_id = session.get("user_id")
    new_profile = Profile(title=profile_title, user_id=user_id)

    db.session.add(new_profile)
    db.session.commit()

    return jsonify(new_profile.to_dict(include_sections=True)), 201


@profile_bp.route("/<int:profile_id>", methods=["DELETE"])
def delete_user_profile(profile_id):
    profile = get_profile(profile_id)

    db.session.delete(profile)
    db.session.commit()

    user_id = session.get("user_id")
    remaining_profiles = Profile.query.filter(Profile.user_id == user_id).all()
    remaining_profiles_data = [
        profile.to_dict(include_sections=True) for profile in remaining_profiles
    ]

    return jsonify(remaining_profiles_data), 200


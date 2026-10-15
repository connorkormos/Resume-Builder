from flask import Blueprint, jsonify, session
from sqlalchemy.exc import SQLAlchemyError

from lib.defaults import SECTION_DEFINITIONS
from models import Profile, Profile_Section, db
from routes.Profile_Routes.profile_builders import add_profile_subsection
from utils.responses import generate_error


profile_subsection_bp = Blueprint("profile_subsections", __name__)


@profile_subsection_bp.route("/sections/<int:section_id>/subsections", methods=["POST"])
def create_profile_subsection(section_id):
    try:
        section = (
            Profile_Section.query.join(Profile_Section.profile)
            .filter(Profile_Section.id == section_id, Profile.user_id == session.get("user_id"))
            .with_for_update(of=Profile_Section)
            .first()
        )
        if section is None:
            return generate_error(
                error_type="NOT_FOUND",
                code="PROFILE_SECTION_NOT_FOUND",
                message="Profile section not found.",
            )
        if section.type not in SECTION_DEFINITIONS:
            db.session.rollback()
            return generate_error(
                error_type="BAD_REQUEST",
                code="INVALID_SECTION_TYPE",
                message="No field definition exists for this section type.",
            )

        subsection = add_profile_subsection(section)
        db.session.commit()
        return jsonify(subsection.to_dict(include_fields=True)), 201
    except SQLAlchemyError:
        db.session.rollback()
        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_ADDING_PROFILE_SUBSECTION",
            message="Failed to add subsection to profile section.",
        )

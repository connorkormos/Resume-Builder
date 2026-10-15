from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError

from lib.defaults import SECTION_DEFINITIONS

from routes.Profile_Routes.profile_helpers import get_profile
from routes.Profile_Routes.profile_builders import add_profile_section as build_profile_section
from models import db
from utils.responses import generate_error

profile_section_bp = Blueprint(
    "profile_sections",
    __name__,
    url_prefix="/sections",
)

# @profile_section_bp.route("/")

@profile_section_bp.route("/<int:profile_id>/available", methods=["GET"])
def get_available_sections(profile_id):
    profile = get_profile(profile_id)
    current_profile_sections = {section.type for section in profile.sections}
    available_sections = [
        {"type": section["type"], "label": section["label"]}
        for section in SECTION_DEFINITIONS.values()
        if section["type"] not in current_profile_sections
    ]
    return jsonify(available_sections), 200

@profile_section_bp.route("/<int:profile_id>", methods=["POST"])
def add_profile_section(profile_id):
    profile = get_profile(profile_id)
    form_data = request.get_json(silent=True)
    if not isinstance(form_data, dict):
        return generate_error(
            error_type="BAD_REQUEST",
            code="INVALID_FORM_DATA",
            message="Request body must be a valid JSON object.",
        )

    section_type = form_data.get("type")

    if section_type is None:
        return generate_error(
            error_type="BAD_REQUEST",
            code="SECTION_TYPE_REQUIRED",
            message="Section type is required.",
        )

    if not isinstance(section_type, str) or not section_type.strip():
        return generate_error(
            error_type="BAD_REQUEST",
            code="INVALID_SECTION_TYPE",
            message="Section type must be a non-empty string.",
        )

    current_profile_sections = {section.type for section in profile.sections}
    if section_type in current_profile_sections:
        return generate_error(
            error_type="BAD_REQUEST",
            code="SECTION_ALREADY_EXISTS",
            message="Section already exists in the profile.",
        )
    
    section_definition = SECTION_DEFINITIONS.get(section_type)
    if not section_definition:
        return generate_error(
            error_type="BAD_REQUEST",
            code="INVALID_SECTION_TYPE",
            message="Invalid section type.",
        )

    try:
        profile_section = build_profile_section(profile, section_type)
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_ADDING_PROFILE_SECTION",
            message="Failed to add section to profile.",
        )

    return jsonify(profile_section.to_dict(include_subsections=True)), 201

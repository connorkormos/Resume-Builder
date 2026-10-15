"""Update profile content after checking the current session's ownership."""

from flask import session
from werkzeug.exceptions import BadRequest, Forbidden, NotFound, Unauthorized

from models import Profile_Field, Profile_Section, Profile_Subsection, db


def update_profile_field(field_id, form_data):
    user_id = session.get("user_id")
    if not user_id:
        raise Unauthorized(description="User not logged in.")

    field = db.session.get(Profile_Field, field_id)
    if field is None:
        raise NotFound(description="Profile field not found.")

    profile = field.profile_subsection.profile_section.profile
    if profile.user_id != user_id:
        raise Forbidden(description="Only the owner can modify this profile field.")

    if not isinstance(form_data, dict):
        raise BadRequest(description="Form data must be a JSON object.")

    if "value" not in form_data:
        raise BadRequest(description="Field value is required.")

    if not isinstance(form_data["value"], str):
        raise BadRequest(description="Field value must be a string.")

    field.value = form_data["value"]
    return field


def update_profile_fields(profile, form_data):
    """Validate a complete batch before changing values; the caller commits."""
    user_id = session.get("user_id")
    if not user_id:
        raise Unauthorized(description="User not logged in.")
    if profile.user_id != user_id:
        raise Forbidden(description="Only the owner can modify this profile.")

    if not isinstance(form_data, dict) or not isinstance(form_data.get("fields"), list):
        raise BadRequest(description="Request body must contain a fields array.")

    changes = {}
    for field_data in form_data["fields"]:
        if not isinstance(field_data, dict):
            raise BadRequest(description="Each field must be an object with an id and value.")
        field_id = field_data.get("id")
        if type(field_id) is not int or field_id <= 0:
            raise BadRequest(description="Each field id must be a positive integer.")
        if field_id in changes:
            raise BadRequest(description="Each field id may appear only once.")
        if not isinstance(field_data.get("value"), str):
            raise BadRequest(description="Each field value must be a string.")
        changes[field_id] = field_data["value"]

    if not changes:
        return []

    fields = (
        Profile_Field.query
        .join(Profile_Field.profile_subsection)
        .join(Profile_Subsection.profile_section)
        .filter(Profile_Section.profile_id == profile.id, Profile_Field.id.in_(changes))
        .all()
    )
    if len(fields) != len(changes):
        raise NotFound(description="One or more fields were not found in this profile.")

    fields_by_id = {field.id: field for field in fields}
    for field_id, value in changes.items():
        fields_by_id[field_id].value = value
    return [fields_by_id[field_id] for field_id in changes]

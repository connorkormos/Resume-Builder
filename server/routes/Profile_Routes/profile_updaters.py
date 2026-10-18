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
    if "link" in form_data and form_data["link"] is not None and not isinstance(form_data["link"], str):
        raise BadRequest(description="Field link must be a string or null.")

    field.value = form_data["value"]
    if "link" in form_data:
        field.link = form_data["link"]
    return field


def update_profile_fields(profile, form_data):
    """Validate a complete batch before changing values and links; the caller commits."""
    user_id = session.get("user_id")
    if not user_id:
        raise Unauthorized(description="User not logged in.")
    if profile.user_id != user_id:
        raise Forbidden(description="Only the owner can modify this profile.")

    if not isinstance(form_data, dict):
        raise BadRequest(description="Request body must be a JSON object.")
    field_updates = form_data.get("fields", [] if "title" in form_data else None)
    if not isinstance(field_updates, list):
        raise BadRequest(description="Request body must contain a fields array.")
    if "title" in form_data:
        if not isinstance(form_data["title"], str) or not form_data["title"].strip():
            raise BadRequest(description="Profile title must be a non-empty string.")

    changes = {}
    for field_data in field_updates:
        if not isinstance(field_data, dict):
            raise BadRequest(description="Each field must be an object with an id and value.")
        field_id = field_data.get("id")
        if type(field_id) is not int or field_id <= 0:
            raise BadRequest(description="Each field id must be a positive integer.")
        if field_id in changes:
            raise BadRequest(description="Each field id may appear only once.")
        if not isinstance(field_data.get("value"), str):
            raise BadRequest(description="Each field value must be a string.")
        if "link" in field_data and field_data["link"] is not None and not isinstance(field_data["link"], str):
            raise BadRequest(description="Each field link must be a string or null.")
        changes[field_id] = {"value": field_data["value"]}
        if "link" in field_data:
            changes[field_id]["link"] = field_data["link"]

    fields = (
        Profile_Field.query
        .join(Profile_Field.profile_subsection)
        .join(Profile_Subsection.profile_section)
        .filter(Profile_Section.profile_id == profile.id, Profile_Field.id.in_(changes))
        .all()
    ) if changes else []
    if len(fields) != len(changes):
        raise NotFound(description="One or more fields were not found in this profile.")

    fields_by_id = {field.id: field for field in fields}
    for field_id, field_data in changes.items():
        fields_by_id[field_id].value = field_data["value"]
        if "link" in field_data:
            fields_by_id[field_id].link = field_data["link"]
    if "title" in form_data:
        profile.title = form_data["title"]
    return [fields_by_id[field_id] for field_id in changes]

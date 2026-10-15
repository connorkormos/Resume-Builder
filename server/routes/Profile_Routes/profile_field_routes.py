from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest, Forbidden, NotFound, Unauthorized

from models import db
from routes.Profile_Routes.profile_helpers import get_profile
from routes.Profile_Routes.profile_updaters import update_profile_fields
from utils.responses import generate_error


profile_field_bp = Blueprint("profile_fields", __name__)


@profile_field_bp.route("/<int:profile_id>/fields", methods=["PATCH"])
def update_fields(profile_id):
    profile = get_profile(profile_id)
    try:
        fields = update_profile_fields(profile, request.get_json(silent=True))
        db.session.commit()
    except (BadRequest, Unauthorized, Forbidden, NotFound) as error:
        db.session.rollback()
        error_type, code = {
            400: ("BAD_REQUEST", "INVALID_FIELD_UPDATES"),
            401: ("UNAUTHORIZED", "USER_NOT_LOGGED_IN"),
            403: ("FORBIDDEN", "ACCESS_DENIED"),
            404: ("NOT_FOUND", "PROFILE_FIELD_NOT_FOUND"),
        }[error.code]
        return generate_error(error_type=error_type, code=code, message=error.description)
    except SQLAlchemyError:
        db.session.rollback()
        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_UPDATING_PROFILE_FIELDS",
            message="Failed to update profile fields.",
        )

    return jsonify({"fields": [field.to_dict() for field in fields]}), 200

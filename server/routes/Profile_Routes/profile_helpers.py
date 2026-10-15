from flask import request, session
from utils.responses import generate_error
from werkzeug.exceptions import NotFound
from models import Profile


def check_user():
    if request.method == "OPTIONS":
        return None

    user_id = session.get("user_id")
    if not user_id:
        return generate_error(
            error_type="UNAUTHORIZED",
            code="USER_NOT_LOGGED_IN",
            message="User not logged in.",
        )
    # Returning None lets Flask continue to the requested route.
    return None


def get_profile(profile_id):
    user_id = session.get("user_id")

    profile = Profile.query.filter_by(
        id=profile_id,
        user_id=user_id,
    ).first()

    if profile is None:
        raise NotFound(description="Profile not found.")

    return profile

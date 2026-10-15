from flask import jsonify, request, make_response, session

from config import app, db

from models import User, Resume, Column, Section, Subsection, Field, Profile, Profile_Section, Profile_Subsection, Profile_Field

from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from server.routes.Resume_Routes.resume_routes import resume_bp
from server.routes.Resume_Routes.section_routes import section_bp
from server.routes.Resume_Routes.subsection_routes import subsection_bp
from server.routes.Resume_Routes.field_routes import field_bp
from server.routes.Resume_Routes.column_routes import column_bp
from server.routes.Profile_Routes.profile_routes import profile_bp

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(resume_bp)
app.register_blueprint(section_bp)
app.register_blueprint(subsection_bp)
app.register_blueprint(field_bp)
app.register_blueprint(column_bp)
app.register_blueprint(profile_bp)

@app.route("/")
def home():
    response = jsonify({"message": "Resume Builder Flask backend is running"}), 200
    return response


@app.route("/health")
def health():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run()
    # app.run(debug=True, port=5555)

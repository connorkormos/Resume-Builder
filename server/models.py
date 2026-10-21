from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import JSONB

from config import db

# * Helper function to serialize datetime objects in ISO 8601 format with 'Z' for UTC
def serialize_datetime(dt):
    if not dt:
        return None

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)

    return dt.isoformat(timespec="seconds").replace("+00:00", "Z")

def id_column():
    return db.Column(db.Integer, primary_key=True, autoincrement=True)

def created_at_column():
    return db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

def updated_at_column():
    return db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

class User(db.Model):
    __tablename__ = "users"

    id = id_column()
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = created_at_column()
    updated_at = updated_at_column()

    resumes = db.relationship(
        "Resume",
        backref="user",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="Resume.updated_at.desc()",
    )
    
    profiles = db.relationship(
        "Profile",
        backref="user",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="(Profile.updated_at.desc(), Profile.id)",
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self, exclude=None, only=None, condense_relationship_data=True):
        exclude = exclude or []
        only = only or []
        user_dict = {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
        }
        
        if condense_relationship_data:
            user_dict["resumes"] = [
                {
                    "id": resume.id,
                    "title": resume.title,
                    "createdAt": serialize_datetime(resume.created_at),
                    "updatedAt": serialize_datetime(resume.updated_at),
                }
                for resume in self.resumes
            ]
            user_dict["profiles"] = [profile.to_dict() for profile in self.profiles]
        else:
            user_dict["resumes"] = [resume.to_dict() for resume in self.resumes]
            user_dict["profiles"] = [
                profile.to_dict(include_sections=True) for profile in self.profiles
            ]

        if only:
            user_dict = {key: value for key, value in user_dict.items() if key in only}
        
        if exclude:
            for key in exclude:
                user_dict.pop(key, None)
                # del user_dict[key]
        
        return user_dict
        
    def __repr__(self):
        return f"<User {self.id}>"

class Profile(db.Model):
    __tablename__ = "profiles"

    id = id_column()
    title = db.Column(db.String, nullable=False, default="Untitled Profile")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = created_at_column()
    updated_at = updated_at_column()

    sections = db.relationship(
        "Profile_Section",
        backref="profile",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="(Profile_Section.position, Profile_Section.id)",
    )

    def to_dict(self, include_sections=False):
        profile_dict = {
            "id": self.id,
            "title": self.title,
            "userId": self.user_id,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
        }
        if include_sections:
            profile_dict["sections"] = [
                section.to_dict(include_subsections=True) for section in self.sections
            ]
        return profile_dict

    def __repr__(self):
        return f"<Profile {self.id}: {self.title}>"

class Profile_Section(db.Model):
    __tablename__ = "profile_sections"

    id = id_column()
    profile_id = db.Column(db.Integer, db.ForeignKey("profiles.id"), nullable=False)
    type = db.Column(db.String, nullable=False, default="custom")
    label = db.Column(db.String, nullable=False, default="Untitled Section")
    position = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    created_at = created_at_column()
    updated_at = updated_at_column()

    subsections = db.relationship(
        "Profile_Subsection",
        backref="profile_section",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="(Profile_Subsection.position, Profile_Subsection.id)",
    )

    def to_dict(self, include_subsections=False):
        section_dict = {
            "id": self.id,
            "profileId": self.profile_id,
            "type": self.type,
            "label": self.label,
            "position": self.position,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
        }
        if include_subsections:
            section_dict["subsections"] = [
                subsection.to_dict(include_fields=True) for subsection in self.subsections
            ]
        return section_dict

    def __repr__(self):
        return f"<Profile_Section {self.id}: {self.label}>"

class Profile_Subsection(db.Model):
    __tablename__ = "profile_subsections"

    id = id_column()
    profile_section_id = db.Column(db.Integer, db.ForeignKey("profile_sections.id"), nullable=False)
    # label = db.Column(db.String, nullable=False, default="Untitled Subsection")
    position = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    created_at = created_at_column()
    updated_at = updated_at_column()

    fields = db.relationship(
        "Profile_Field",
        backref="profile_subsection",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="(Profile_Field.position, Profile_Field.id)",
    )

    def to_dict(self, include_fields=False):
        subsection_dict = {
            "id": self.id,
            "profileSectionId": self.profile_section_id,
            # "label": self.label,
            "position": self.position,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
        }
        if include_fields:
            subsection_dict["fields"] = [field.to_dict() for field in self.fields]
        return subsection_dict

    def __repr__(self):
        return f"<Profile_Subsection {self.id}>"

class Profile_Field(db.Model):
    __tablename__ = "profile_fields"

    id = id_column()
    profile_subsection_id = db.Column(db.Integer, db.ForeignKey("profile_subsections.id"), nullable=False)
    label = db.Column(db.String, nullable=False, default="Untitled Field")
    value = db.Column(db.Text, nullable=False, default="", server_default="")
    link = db.Column(db.String, nullable=True)
    position = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    created_at = created_at_column()
    updated_at = updated_at_column()

    def to_dict(self):
        return {
            "id": self.id,
            "profileSubsectionId": self.profile_subsection_id,
            "label": self.label,
            "value": self.value,
            "link": self.link,
            "position": self.position,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
        }

    def __repr__(self):
        return f"<Profile_Field {self.id}: {self.label}>"

class Resume(db.Model):
    __tablename__ = "resumes"

    id = id_column()
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    source_resume_id = db.Column(db.Integer, nullable=True)
    title = db.Column(db.String, nullable=False, default="Untitled Resume")
    styling = db.Column(db.JSON, nullable=False, default=dict)
    layout = db.Column(db.JSON, nullable=False, default=dict)
    plain_text = db.Column(db.Text, nullable=False, default="", server_default="")
    tags = db.Column(db.JSON().with_variant(JSONB(), "postgresql"), nullable=False, default=list, server_default="[]")
    is_official_template = db.Column(db.Boolean, nullable=False, default=False, server_default=db.false())
    view_count = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    copy_count = db.Column(db.Integer, nullable=False, default=0, server_default="0")
    
    created_at = created_at_column()
    updated_at = updated_at_column()

    containers = db.relationship(
        "Container",
        backref="resume",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="Container.position",
    )

    
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "sourceResumeId": self.source_resume_id,
            "title": self.title,
            "styling": self.styling,
            "layout": self.layout,
            "plainText": self.plain_text,
            "tags": self.tags,
            "isOfficialTemplate": self.is_official_template,
            "viewCount": self.view_count,
            "copyCount": self.copy_count,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
            "containers": [container.to_dict() for container in self.containers],
        }

    def __repr__(self):
        return f"<Resume {self.id}: {self.title}>"


class Container(db.Model):
    __tablename__ = "containers"

    id = id_column()
    resume_id = db.Column(db.Integer, db.ForeignKey("resumes.id"), nullable=False)
    type = db.Column(db.String, nullable=False, default="column", server_default="column")
    span_full_page = db.Column(
        db.Boolean, nullable=False, default=False, server_default=db.false()
    )
    position = db.Column(db.Integer, nullable=False, default=0)
    styling = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    layout = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    created_at = created_at_column()
    updated_at = updated_at_column()

    sections = db.relationship(
        "Section",
        backref="container",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="Section.position",
    )
    
    def to_dict(self):
        return {
            "id": self.id,
            "resumeId": self.resume_id,
            "type": self.type,
            "spanFullPage": self.span_full_page,
            "position": self.position,
            "styling": self.styling,
            "layout": self.layout,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
            "sections": [section.to_dict() for section in self.sections],
        }

    def __repr__(self):
        return f"<Container {self.id}>"


class Section(db.Model):
    __tablename__ = "sections"

    id = id_column()
    container_id = db.Column(db.Integer, db.ForeignKey("containers.id"), nullable=False)
    label = db.Column(db.String, nullable=True)
    type = db.Column(db.String, nullable=False)
    value = db.Column(db.JSON, nullable=False, default=list)
    show_heading = db.Column(db.Boolean, nullable=False, default=True, server_default='1')
    position = db.Column(db.Integer, nullable=False, default=0)
    styling = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    layout = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    created_at = created_at_column()
    updated_at = updated_at_column()

    subsections = db.relationship(
        "Subsection",
        backref="section",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="Subsection.position",
    )
    
    def to_dict(self):
        return {
            "id": self.id,
            "containerId": self.container_id,
            "label": self.label,
            "type": self.type,
            "value": self.value,
            "showHeading": self.show_heading,
            "position": self.position,
            "styling": self.styling,
            "layout": self.layout,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
            "subsections": [subsection.to_dict() for subsection in self.subsections],
        }

    def __repr__(self):
        return f"<Section {self.id}: {self.label}>"


class Subsection(db.Model):
    __tablename__ = "subsections"

    id = id_column()
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable=False)
    label = db.Column(db.String, nullable=True)
    styling = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    layout = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    position = db.Column(db.Integer, nullable=False, default=0)
    created_at = created_at_column()
    updated_at = updated_at_column()


    fields = db.relationship(
        "Field",
        backref="subsection",
        cascade="all, delete-orphan",
        lazy=True,
        order_by="Field.position",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "sectionId": self.section_id,
            "label": self.label,
            "styling": self.styling,
            "layout": self.layout,
            "position": self.position,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
            # "createdAt": self.created_at.isoformat() if self.created_at else None,
            # "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
            "fields": [field.to_dict() for field in self.fields],
        }

    def __repr__(self):
        return f"<Subsection {self.id}: {self.label}>"


class Field(db.Model):
    __tablename__ = "fields"

    id = id_column()
    subsection_id = db.Column(db.Integer, db.ForeignKey("subsections.id"), nullable=False)
    label = db.Column(db.String, nullable=True)
    value = db.Column(db.JSON, nullable=False, default=list)
    styling = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    layout = db.Column(db.JSON, nullable=False, default=dict, server_default='{}')
    position = db.Column(db.Integer, nullable=False, default=0)
    created_at = created_at_column()
    updated_at = updated_at_column()

    def to_dict(self):
        return {
            "id": self.id,
            "subsectionId": self.subsection_id,
            "label": self.label,
            "value": self.value,
            "styling": self.styling,
            "layout": self.layout,
            "position": self.position,
            "createdAt": serialize_datetime(self.created_at),
            "updatedAt": serialize_datetime(self.updated_at),
            # "createdAt": self.created_at.isoformat() if self.created_at else None,
            # "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f"<Field {self.id}: {self.label}>"

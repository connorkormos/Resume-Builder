from copy import deepcopy
from models import Column, Field, Section, Subsection, db, Resume

from lib.defaults import (
    RESUME_DEFAULTS,
    COLUMN_DEFAULTS,
    get_section_definition,
)
from services.updaters import update_column_widths
from services.plain_text import build_resume_plain_text
from utils.formatting import format_label


class ResumeNotFoundError(Exception):
    """Raised when the resume requested for copying does not exist."""


def build_empty_slate_value(label):
    return [
        {
            "type": "paragraph",
            "label": label,
            "children": [{"text": "", "fontSizeOffset": 0, "lineHeightOffset": 0}],
        }
    ]


def build_section_heading_slate_value(section_type):
    definition = get_section_definition(section_type)

    return [
        {
            "type": "heading",
            "label": definition["label"],
            "children": [{"text": definition["heading"], "fontSizeOffset": 2, "lineHeightOffset": 0}],
        }
    ]


def create_resume(title, user_id):
    resume = Resume(
        title=title,
        user_id=user_id,
        styling=deepcopy(RESUME_DEFAULTS["styling"]),
        layout=deepcopy(RESUME_DEFAULTS["layout"]),
    )

    db.session.add(resume)
    db.session.flush()

    return resume


def add_column(resume_id, position=0):
    column = Column(
        resume_id=resume_id,
        position=position,
        styling=deepcopy(COLUMN_DEFAULTS["styling"]),
        layout=deepcopy(COLUMN_DEFAULTS["layout"]),
    )
    
    update_column_widths(resume_id)

    db.session.add(column)
    db.session.flush()

    return column


def add_section(column_id, section_type, position=0):
    definition = get_section_definition(section_type)
    section = Section(
        column_id=column_id,
        label=definition["label"],
        type=section_type,
        position=position,
        styling=definition["styling"],
        layout=definition["layout"],
        show_heading=definition["showHeading"],
        value=build_section_heading_slate_value(section_type),
    )

    db.session.add(section)
    db.session.flush()
    
    subsection = add_subsection(
       section_id=section.id,
       section_type=section_type,
       position=0
    )
    
    db.session.add(subsection)
    db.session.flush()

    return section


def add_subsection(section_id, section_type, position=0):
    definition = get_section_definition(section_type)
    subsection = Subsection(
        section_id=section_id,
        label=f"{definition['label']} Subsection",
        type=section_type,
        position=position,
        styling=definition["subsection"]["styling"],
        layout=definition["subsection"]["layout"],
    )

    db.session.add(subsection)
    db.session.flush()
    
    fields = add_default_fields(
       subsection_id=subsection.id,
       section_type=section_type
    )
    
    for field in fields:
       db.session.add(field)

    db.session.flush()
    return subsection


def add_field(subsection_id, label='New Field', position=0, *, defaults=None):
    if defaults is None:
        subsection = db.session.get(Subsection, subsection_id)
        section_type = subsection.section.type if subsection else "default"
        defaults = get_section_definition(section_type)["field"]
    else:
        defaults = deepcopy(defaults)
    field = Field(
        subsection_id=subsection_id,
        label=format_label(label),
        position=position,
        value=build_empty_slate_value(label),
        styling=defaults["styling"],
        layout=defaults["layout"],
    )

    db.session.add(field)

    return field


def add_default_fields(subsection_id, section_type):
    definition = get_section_definition(section_type)

    fields = []

    for idx, label in enumerate(definition["fields"]):
        field = add_field(
            subsection_id=subsection_id,
            label=label,
            position=idx,
            defaults=definition["field"],
        )
        fields.append(field)

    return fields


def build_resume_with_defaults(title, user_id, sections_data):
    resume = create_resume(title, user_id)

    column = add_column(
        resume_id=resume.id,
        position=0,
    )

    section_position = 0

    for section_type, should_create in sections_data.items():
        if not should_create:
            continue

        add_section(
            column_id=column.id,
            section_type=section_type,
            position=section_position,
        )

        section_position += 1

    db.session.flush()
    resume.plain_text = build_resume_plain_text(resume)

    return resume

def build_resume_copy(resume_id, *, user_id):
    original_resume = Resume.query.get(resume_id)
    
    if original_resume is None:
        raise ResumeNotFoundError(f"Resume with ID {resume_id} not found.")

    # Helper function to create deep-copies of a models column-values in a new instance
    def copy_instance(instance, model, excluded_names):
        copied = {}
        for column in model.__table__.columns:
            column_name = column.name
            if column_name in excluded_names:
                continue
            copied[column_name] = deepcopy(getattr(instance, column_name))
        return model(**copied)

    resume_copy = copy_instance(
        original_resume,
        Resume,
        {"id", "title", "user_id", "is_official_template", "copy_count", "view_count", "created_at", "updated_at"},
    )
    resume_copy.user_id = user_id
    resume_copy.is_official_template = False
    # ! Potentially need to change to account for copying a resume that's already a copy of another
    # ! Concerns about who the "credit" goes to
    resume_copy.source_resume_id = original_resume.id
    resume_copy.title = f"{original_resume.title} (Copy)"
    
    db.session.add(resume_copy)
    db.session.flush()

    # Copy columns from the original resume to the new resume.
    # Ordered by position to catch edge cases of conflicting position values
    # This happens for sections, subsections, and fields as well
    original_columns = (
        Column.query.filter_by(resume_id=original_resume.id)
        .order_by(Column.position)
        .all()
    )

    for original_column in original_columns:
        column_copy = copy_instance(
            original_column,
            Column,
            {"id", "resume_id"},
        )
        column_copy.resume_id = resume_copy.id
        
        db.session.add(column_copy)
        db.session.flush()

        original_sections = (
            Section.query.filter_by(column_id=original_column.id)
            .order_by(Section.position)
            .all()
        )

        for original_section in original_sections:
            section_copy = copy_instance(
                original_section,
                Section,
                {"id", "column_id"},
            )
            section_copy.column_id = column_copy.id
            
            db.session.add(section_copy)
            db.session.flush()

            original_subsections = (
                Subsection.query.filter_by(section_id=original_section.id)
                .order_by(Subsection.position)
                .all()
            )

            for original_subsection in original_subsections:
                subsection_copy = copy_instance(
                    original_subsection,
                    Subsection,
                    {"id", "section_id"},
                )
                subsection_copy.section_id = section_copy.id
                
                db.session.add(subsection_copy)
                db.session.flush()

                original_fields = (
                    Field.query.filter_by(subsection_id=original_subsection.id)
                    .order_by(Field.position)
                    .all()
                )

                for original_field in original_fields:
                    field_copy = copy_instance(
                        original_field,
                        Field,
                        {"id", "subsection_id"},
                    )
                    field_copy.subsection_id = subsection_copy.id
                    
                    db.session.add(field_copy)

    db.session.flush()
    resume_copy.plain_text = build_resume_plain_text(resume_copy)

    if original_resume.user_id != user_id:
        original_resume.copy_count = Resume.copy_count + 1

    db.session.commit()
    return resume_copy

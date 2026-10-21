from collections import Counter
import re

from models import db, Resume, Container, Section, Subsection, Field
from lib.defaults import SECTION_DEFINITIONS

from services.updaters import update_container_widths
from services.plain_text import build_resume_plain_text
from services.resume_tags import normalize_resume_tags


def normalize_generic_section_types(resume_id):
    """Explicitly classify custom sections by label; automatic use on save is disabled."""
    def type_key(value):
        # Compare lowercase ASCII letters only; retain canonical spelling when saving.
        return re.sub(r"[^a-z]", "", (value or "").lower())

    generic_types = {"custom"}
    canonical_types = {
        type_key(definition["type"]): definition["type"]
        for definition in SECTION_DEFINITIONS.values()
    }
    sections = (
        Section.query.join(Container)
        .filter(Container.resume_id == resume_id)
        .order_by(Container.position, Container.id, Section.position, Section.id)
        .all()
    )
    used_types = Counter(type_key(section.type) for section in sections)

    for section in sections:
        current_type = type_key(section.type)
        if current_type not in generic_types:
            continue
        target_type = canonical_types.get(type_key(section.label))
        if target_type is None:
            continue
        # Use the same normalization for conflicts elsewhere in the resume.
        target_key = type_key(target_type)
        if used_types[target_key] > (1 if current_type == target_key else 0):
            continue
        if section.type == target_type:
            continue

        section.type = target_type
        # Reserve the type immediately if multiple generic sections share this label.
        used_types[current_type] -= 1
        used_types[target_key] += 1


def update_resume_with_form_data(resume_id, data):
    # ! Condiser potentially mismatched form data, where incoming container/section/subsection IDs may not match those actually belonging to the resume..
    resume = Resume.query.filter(Resume.id == resume_id).one_or_none()

    if not resume:
        raise ValueError(f"Could not find resume of ID {resume_id}.")

    if "tags" in data:
        resume.tags = normalize_resume_tags(data["tags"])

    # * ------------------------
    # * Top Level Resume Updates
    # * ------------------------

    if "title" in data:
        resume.title = data["title"]

    if "styling" in data:
        resume.styling = data["styling"]

    if "layout" in data:
        resume.layout = data["layout"]

    # * --------------
    # * Container updates
    # * --------------

    containers_by_id = data.get("containers", {}).get("byId", {})
    incoming_container_ids = {int(container_id) for container_id in containers_by_id.keys()}
    existing_containers = Container.query.filter(Container.resume_id == resume_id).all()
    last_available_container = (
        Container.query.filter(
            Container.resume_id == resume_id, Container.id.in_(incoming_container_ids)
        )
        .order_by(Container.position.desc())
        .first()
    )
    
    if not last_available_container:
        raise ValueError("Cannot delete all containers from a resume.")
    

    sections_by_id = data.get("sections", {}).get("byId", {})

    for container in existing_containers:
        if container.id not in incoming_container_ids:
            for section in list(container.sections):
                last_available_container.sections.append(section)
                section.container_id = last_available_container.id

                section_data = sections_by_id.get(str(section.id))
                if section_data:
                    section_data["containerId"] = last_available_container.id

            db.session.flush()
            db.session.delete(container)

    for container_id, container_data in containers_by_id.items():
        container = Container.query.get(int(container_id))
        if not container:
            continue

        if "type" in container_data:
            container.type = container_data["type"]

        if "spanFullPage" in container_data:
            container.span_full_page = container_data["spanFullPage"]

        if "styling" in container_data:
            container.styling = container_data["styling"]
            
        if "layout" in container_data:
            container.layout = container_data["layout"]

        # if 'autoWidth' in container_data:
            # container.auto_width = container_data['autoWidth']

        if "position" in container_data:
            container.position = container_data["position"]
            
    db.session.flush()
            
    update_container_widths(resume_id)
    

    # * ---------------
    # * Section updates
    # * ---------------

    # sections_by_id = data.get("sections", {}).get("byId", {})
    incoming_section_ids = {int(section_id) for section_id in sections_by_id.keys()}
    existing_sections = (
        Section.query.join(Container).filter(Container.resume_id == resume_id).all()
    )

    for section in existing_sections:
        if section.id not in incoming_section_ids:
            db.session.delete(section)

    for section_id, section_data in sections_by_id.items():
        section = Section.query.get(int(section_id))
        if not section:
            continue

        if "label" in section_data:
            section.label = section_data["label"]

        if "type" in section_data:
            section.type = section_data["type"]

        if "value" in section_data:
            section.value = section_data["value"]

        if "styling" in section_data:
            section.styling = section_data["styling"]
            
        if "layout" in section_data:
            section.layout = section_data["layout"]

        if "position" in section_data:
            section.position = section_data["position"]

        if "containerId" in section_data:
            section.container_id = section_data["containerId"]

        if "showHeading" in section_data:
            section.show_heading = section_data["showHeading"]

    # * ------------------
    # * Subsection updates
    # * ------------------

    subsections_by_id = data.get("subsections", {}).get("byId", {})

    incoming_subsection_ids = {int(field_id) for field_id in subsections_by_id.keys()}

    existing_subsections = (
        Subsection.query.join(Section)
        .join(Container)
        .filter(Container.resume_id == resume_id)
        .all()
    )

    for subsection in existing_subsections:
        if subsection.id not in incoming_subsection_ids:
            db.session.delete(subsection)

    for subsection_id, subsection_data in subsections_by_id.items():
        subsection = Subsection.query.get(int(subsection_id))
        if not subsection:
            continue

        if "label" in subsection_data:
            subsection.label = subsection_data["label"]

        if "styling" in subsection_data:
            subsection.styling = subsection_data["styling"]

        if "layout" in subsection_data:
            subsection.layout = subsection_data["layout"]

        if "position" in subsection_data:
            subsection.position = subsection_data["position"]

        if "sectionId" in subsection_data:
            subsection.section_id = subsection_data["sectionId"]

    # * -------------
    # * Field updates
    # * -------------

    fields_by_id = data.get("fields", {}).get("byId", {})

    incoming_field_ids = {int(field_id) for field_id in fields_by_id.keys()}

    existing_fields = (
        Field.query.join(Subsection)
        .join(Section)
        .join(Container)
        .filter(Container.resume_id == resume_id)
        .all()
    )

    for field in existing_fields:
        if field.id not in incoming_field_ids:
            db.session.delete(field)
    for field_id, field_data in fields_by_id.items():
        field = Field.query.get(int(field_id))
        if not field:
            continue

        if "label" in field_data:
            field.label = field_data["label"]

        if "value" in field_data:
            field.value = field_data["value"]
            
        if "styling" in field_data:
            field.styling = field_data["styling"]

        if "layout" in field_data:
            field.layout = field_data["layout"]

        if "position" in field_data:
            field.position = field_data["position"]

        if "subsectionId" in field_data:
            field.subsection_id = field_data["subsectionId"]

    db.session.flush()
    # normalize_generic_section_types(resume_id)
    # db.session.flush()
    resume.plain_text = build_resume_plain_text(resume)

    return resume

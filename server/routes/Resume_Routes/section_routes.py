from utils.authorization import check_resume_access
from flask import Blueprint, request, jsonify, session
from models import db, Resume, Container, Section, Subsection, Field

from services.builders import (
    build_resume_with_defaults,
    add_container,
    add_section,
    add_subsection,
    add_field,
    add_default_fields,
)
from services.resume_updater import update_resume_with_form_data

from utils.responses import (
    generate_error,
    generate_success,
    print_pending_request,
    print_successful_request,
)

section_bp = Blueprint("section", __name__, url_prefix="/sections")


@section_bp.route("/<int:resume_id>", methods=["POST"])
def add_section_to_resume(resume_id):

    print_pending_request(
        "POST",
        f"/sections/{resume_id}",
        "to add new section to resume of ID:",
        resume_id,
    )

    form_data = request.get_json() or {}

    try:
        resume = Resume.query.filter_by(id=resume_id).one_or_none()

        if not resume:
            return generate_error(
                error_type="NOT_FOUND",
                code="RESUME_NOT_FOUND",
                message=f"Resume of ID {resume_id} not found.",
            )

        error = check_resume_access(session.get("user_id"), resume_id, request.method)
        if error is not None:
            return error

        section_type = form_data.get("type")

        existing_section = (
            db.session.query(Section)
            .join(Container, Section.container_id == Container.id)
            .filter(
                Container.resume_id == resume_id,
                Section.type == section_type,
            )
            .first()
        )

        if existing_section:
            new_subsection_position = len(existing_section.subsections)

            subsection = add_subsection(
                section_id=existing_section.id,
                section_type=existing_section.type,
                position=new_subsection_position,
            )

        else:
            first_container = (
                Container.query.filter_by(resume_id=resume_id)
                .order_by(Container.position)
                .first()
            )

            if not first_container:
                return generate_error(
                    error_type="SERVER_ERROR",
                    code="NO_CONTAINERS_FOUND",
                    message="Cannot add a section because this resume has no containers.",
                )

            new_section_position = len(first_container.sections)

            section = add_section(
                container_id=first_container.id,
                section_type=section_type,
                position=new_section_position,
            )

        db.session.commit()

        print_successful_request("Added section to resume of ID:", resume_id)
        if existing_section:
            return jsonify({"subsection": subsection.to_dict()}), 201
        return jsonify({"section": section.to_dict()}), 201

    except Exception as e:
        db.session.rollback()

        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_ADDING_SECTION",
            message=f"An unknown error occurred when adding a section to resume of ID {resume_id}.",
        )


@section_bp.route("<int:section_id>", methods=["DELETE"])
def delete_section_from_resume(section_id):
    print_pending_request("DELETE", f"/sections/{section_id}")

    try:
        section_to_delete = Section.query.get(section_id)
        if not section_to_delete:
            return generate_error(
                error_type="NOT_FOUND",
                code="SECTION_NOT_FOUND",
                message=f"Seciton of ID {section_id} not found.",
            )

        resume = section_to_delete.container.resume
        error = check_resume_access(session.get("user_id"), resume.id, request.method)
        if error is not None:
            return error

        container_id = section_to_delete.container_id
        deleted_position = section_to_delete.position

        db.session.delete(section_to_delete)

        Section.query.filter(
            Section.container_id == container_id, Section.position > deleted_position
        ).update(
            {Section.position: Section.position - 1},
            synchronize_session=False,
        )

        db.session.commit()
        
        print_successful_request('Deleted section with ID:', section_id)
        return jsonify(resume.to_dict()), 200

    except Exception as e:
        db.session.rollback()

        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_DELETING_SECTION",
            message=f"Failed to delete section of ID {section_id}.",
        )

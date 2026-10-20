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

from services.updaters import update_container_widths

from services.resume_updater import update_resume_with_form_data

from utils.responses import generate_error, generate_success, print_pending_request, print_successful_request

container_bp = Blueprint("container", __name__, url_prefix="/containers")


# ** ROUTES ** #

@container_bp.route("/<int:resume_id>", methods=["POST"])
def add_container(resume_id):
    print_pending_request('POST', f'/containers/{resume_id}', 'to add container to resume of ID', resume_id)

    try:
        resume = Resume.query.filter(Resume.id == resume_id).one_or_none()
        if not resume:
            return generate_error(
                error_type="NOT_FOUND",
                code="RESUME_NOT_FOUND",
                message=f"Could not find resume of ID {resume_id} to add a container to.",
            )

        error = check_resume_access(session.get("user_id"), resume_id, request.method)
        if error is not None:
            return error

        container_count = len(resume.containers)
        
        if container_count >= 10:
            return generate_error(
                error_type="FORBIDDEN",
                code="MAX_CONTAINER_COUNT_REACHED",
                message="Resumes cannot have more than 10 containers.",
            )
        
        data = request.get_json(silent=True) or {}
        new_container = Container(
            resume_id=resume_id,
            position=container_count,
            type=data.get("type", "column"),
            span_full_page=data.get("spanFullPage", False),
            # width=None
        )
        db.session.add(new_container)
        db.session.flush()
        
        update_container_widths(resume_id)

        db.session.commit()

        print_successful_request('Container added successfully.')
        return jsonify(resume.to_dict()), 201

    except Exception:
        db.session.rollback()
        raise
     
@container_bp.route("/<int:resume_id>", methods=["DELETE"])
def delete_last_container(resume_id):
    print_pending_request('DELETE', 'the last container', 'in resume of ID', resume_id)

    try:
        resume = Resume.query.filter_by(id=resume_id).one_or_none()
        if not resume:
            return generate_error(
                error_type="NOT_FOUND",
                code="RESUME_NOT_FOUND",
                message=f"Could not find resume of ID {resume_id}.",
            )

        error = check_resume_access(session.get("user_id"), resume_id, request.method)
        if error is not None:
            return error

        container_to_delete = (
            Container.query.filter_by(resume_id=resume_id)
            .order_by(Container.position.desc())
            .first()
        )

        second_to_last_container = (
            Container.query.filter_by(resume_id=resume_id)
            .order_by(Container.position.desc())
            .offset(1)
            .first()
        )

        if not second_to_last_container:
            return generate_error(
                error_type="FORBIDDEN",
                code="INVALID_CONTAINER_COUNT",
                message="Resumes require at least one container.",
            )

        if not container_to_delete:
            return generate_error(
                error_type="NOT_FOUND",
                code="CONTAINER_NOT_FOUND",
                message="Container to delete not found.",
            )

        max_position = max(
            [section.position for section in second_to_last_container.sections],
            default=-1,
        )

        for section in list(container_to_delete.sections):
            max_position += 1
            section.container = second_to_last_container
            section.position = max_position

        db.session.delete(container_to_delete)
        db.session.flush()

        remaining_containers = (
            Container.query.filter_by(resume_id=resume_id)
            .order_by(Container.position.asc())
            .all()
        )
        
        update_container_widths(resume_id)

        for index, container in enumerate(remaining_containers):
            container.position = index

        db.session.commit()

        print_successful_request('Added container successfully.')

        return jsonify(resume.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_DELETING_CONTAINER",
            message="An unknown error occurred while deleting the container.",
        )
        
        
@container_bp.route("/<int:container_id>", methods=["PUT"])
def update_container(container_id):
    print_pending_request('PUT', f'/containers/{container_id}', 'to update container of ID:', container_id)

    try:
        container = Container.query.filter_by(id=container_id).one_or_none()
        if not container:
            return generate_error(
                error_type="NOT_FOUND",
                code="CONTAINER_NOT_FOUND",
                message=f"Could not find container of ID {container_id}.",
            )

        error = check_resume_access(session.get("user_id"), container.resume_id, request.method)
        if error is not None:
            return error

        data = request.get_json() or {}
        if not data:
            return generate_error(
                error_type="BAD_REQUEST",
                code="INVALID_DATA",
                message="No data provided for container update.",
            )

        new_styling = data.get("styling")
        new_layout = data.get("layout")
        position = data.get("position")

        if new_styling is not None:
            container.styling = new_styling

        if new_layout is not None:
            container.layout = new_layout

        if position is not None:
            container.position = position

        if "type" in data:
            container.type = data["type"]

        if "spanFullPage" in data:
            container.span_full_page = data["spanFullPage"]

        update_container_widths(container.resume_id)

        db.session.commit()

        print_successful_request('Sucessfully updated container.')

        return jsonify(container.resume.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return generate_error(
            error_type="SERVER_ERROR",
            code="ERROR_UPDATING_CONTAINER",
            message="An unknown error occurred while updating the container.",
        )

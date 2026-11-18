def normalize_resume_containers(resume):
    """Normalize container positions in place without flushing or committing.

    Columns between rows are grouped at the first ordinary column. Sidebars
    between ordinary columns move to the right. Without ordinary columns,
    rows are grouped at the first row. Repeated calls leave the result unchanged.
    """
    containers = list(resume.containers)

    for container in containers:
        if container.type not in ("column", "row"):
            raise ValueError(f"Invalid container type: {container.type!r}.")
        if not isinstance(container.span_full_page, bool):
            raise ValueError("Container span_full_page must be a boolean.")

    def position_sort_key(container):
        position = getattr(container, "position", None)
        valid_position = isinstance(position, int) and not isinstance(position, bool)
        return (not valid_position, position if valid_position else 0, container.id)

    # Keep recoverable ordering, including negatives; malformed positions go last.
    containers.sort(key=position_sort_key)
    for position, container in enumerate(containers):
        container.position = position

    columns = [
        container for container in containers
        if container.type == "column" and not container.span_full_page
    ]
    rows = [container for container in containers if container.type == "row"]

    # With no central content, only the sequential positions need fixing.
    if not columns and not rows:
        return resume

    center_start = (columns[0] if columns else rows[0]).position
    left_sidebars = []
    right_sidebars = []
    top_rows = []
    bottom_rows = []

    for container in containers:
        before_center = container.position < center_start
        if container.type == "column" and container.span_full_page:
            if before_center:
                left_sidebars.append(container)
            else:
                right_sidebars.append(container)
        elif container.type == "row":
            if before_center:
                top_rows.append(container)
            else:
                bottom_rows.append(container)

    ordered_containers = left_sidebars + top_rows + columns + bottom_rows + right_sidebars
    for position, container in enumerate(ordered_containers):
        container.position = position

    return resume

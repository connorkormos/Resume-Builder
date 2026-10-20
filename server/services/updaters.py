from copy import deepcopy
from models import Container, Field, Section, Subsection, db, Resume

from utils.formatting import format_label

# ** Helper function to set container widths based on manual and auto width settings **
def update_container_widths(resume_id):
    containers = Container.query.filter_by(resume_id=resume_id).all()

    def get_width(container):
        layout = container.layout or {}
        return layout.get("width", {})

    manual_width_containers = [
        container for container in containers
        if not get_width(container).get("auto", True)
    ]

    auto_width_containers = [
        container for container in containers
        if get_width(container).get("auto", True)
    ]

    manual_width_total = sum(
        float(str(get_width(container).get("value", "0%")).strip("%"))
        for container in manual_width_containers
    )

    remaining_width = max(0, 100 - manual_width_total)

    remaining_width_required = 10 * len(auto_width_containers) if auto_width_containers else 0
    
    if remaining_width < remaining_width_required:
        new_auto_width = 10
        available_manual_width = 100 - remaining_width_required
        scale = available_manual_width / manual_width_total if manual_width_total else 0

        for container in manual_width_containers:
            layout = deepcopy(container.layout or {})
            layout.setdefault("width", {
                "value": "100%",
                "auto": False,
            })
            current_value = float(str(get_width(container).get("value", "0%")).strip("%"))
            new_value = current_value * scale
            layout["width"]["value"] = f"{new_value:.1f}%"
            layout["width"]["auto"] = False
            container.layout = layout
    else:
        new_auto_width = remaining_width / len(auto_width_containers) if auto_width_containers else 0
    
    
        
    # new_auto_width = (
        # remaining_width / len(auto_width_containers)
        # if auto_width_containers
        # else 0
    # )

    for container in auto_width_containers:
        layout = deepcopy(container.layout or {})

        layout.setdefault("width", {
            "value": "100%",
            "auto": True,
        })

        layout["width"]["value"] = f"{new_auto_width:.1f}%"
        layout["width"]["auto"] = True

        container.layout = layout

    return containers
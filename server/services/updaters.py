from copy import deepcopy
from decimal import Decimal, ROUND_FLOOR, ROUND_HALF_UP
from models import Container, Field, Section, Subsection, db, Resume


# ** Helper function to set container widths based on manual and auto width settings **
def update_container_widths(resume_id):
    containers = Container.query.filter_by(resume_id=resume_id).order_by(Container.position, Container.id).all()
    proposed = {}

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
            proposed[container.id] = new_value
            layout["width"]["auto"] = False
            container.layout = layout
    else:
        new_auto_width = remaining_width / len(auto_width_containers) if auto_width_containers else 0


    for container in auto_width_containers:
        layout = deepcopy(container.layout or {})

        layout.setdefault("width", {
            "value": "100%",
            "auto": True,
        })

        proposed[container.id] = new_auto_width
        layout["width"]["auto"] = True

        container.layout = layout

    # Preserve the existing allocation total while distributing rounding residue.
    # Rows and columns retain the allocation policy above; this only rounds values.
    exact = []
    for container in containers:
        value = proposed.get(container.id, get_width(container).get("value", "0%"))
        exact.append(Decimal(str(value).strip("%")) * 100)
    units = [int(value.to_integral_value(rounding=ROUND_FLOOR)) for value in exact]
    target = int(sum(exact).to_integral_value(rounding=ROUND_HALF_UP)) if exact else 0
    ranked = sorted(range(len(units)), key=lambda i: exact[i] - units[i], reverse=True)
    for i in ranked[:target - sum(units)]:
        units[i] += 1
    for container, value in zip(containers, units):
        layout = deepcopy(container.layout or {})
        layout.setdefault("width", {})["value"] = f"{Decimal(value) / 100:.2f}%"
        container.layout = layout

    return containers

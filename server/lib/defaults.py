"""Defaults for constructing new resume content."""

from copy import deepcopy

from utils.formatting import format_label


RESUME_DEFAULTS = {
    "styling": {
        "display": "flex",
        "fontSize": "12px",
        "lineHeight": 1.2,
        "color": "rgba(0, 0, 0, 1)",
        "backgroundColor": "rgba(255, 255, 255, 1)",
    },
    "layout": {
        "padding": {
            "top": "2.5rem",
            "right": "2.5rem",
            "bottom": "2.5rem",
            "left": "2.5rem",
        },
        "gap": {
            "horizontal": "1.0rem",
            "vertical": "0.5rem",
            "subsection": "0.0rem",
            "field": "0.0rem",
        },
    },
}

COLUMN_DEFAULTS = {
    "styling": {},
    "layout": {
        "padding": {
            "top": "0.5rem",
            "bottom": "0.5rem",
            "left": "1rem",
            "right": "1rem",
        },
        "width": {
            "auto": True,
            "value": "100%",
        },
    },
}

SECTION_DEFAULTS = {
    "styling": {},
    "layout": {
        "display": "grid",
        "grid": {"columns": 1},
    },
    "showHeading": True,
    "subsection": {
        "styling": {"fontSizeOffset": 0, "lineHeightOffset": 0},
        "layout": {},
    },
    "field": {
        "styling": {"fontSizeOffset": 0, "lineHeightOffset": 0},
        "layout": {},
    },
}

SECTION_DEFINITIONS = {
    "header": {
        "type": "header",
        "label": "Header",
        "heading": "Header",
        "fields": ["Name", "Title"],
    },
    "workHistory": {
        "type": "workHistory",
        "label": "Work History",
        "heading": "Work History",
        "fields": ["Job Title", "Company", "Location", "Start/End Dates", "Description"],
    },
    "education": {
        "type": "education",
        "label": "Education",
        "heading": "Education",
        "fields": ["School", "Degree", "Field of Study", "Location", "Start/End Dates", "Description"],
    },
    "skills": {
        "type": "skills",
        "label": "Skills",
        "heading": "Skills",
        "fields": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
    },
    "contact": {
        "type": "contact",
        "label": "Contact",
        "heading": "Contact",
        "fields": ["Email", "Phone", "Location", "Website", "LinkedIn"],
    },
    "summary": {
        "type": "summary",
        "label": "Summary",
        "heading": "Summary",
        "fields": ["Summary"],
    },
    "projects": {
        "type": "projects",
        "label": "Projects",
        "heading": "Projects",
        "fields": ["Project Title", "Company/School", "Link", "Dates", "Description"],
    },
    "custom": {
        "type": "custom",
        "label": "Custom",
        "heading": "Custom Section",
        "fields": ["Custom Field"],
    },
    "default": {
        "type": "default",
        "label": "Default",
        "heading": "New Section",
        "fields": ["Field"],
    },
}


def get_section_definition(section_type):
    """Return independent defaults with nested overrides for the requested type."""
    def merge(base, overrides):
        for key, value in overrides.items():
            if isinstance(value, dict) and isinstance(base.get(key), dict):
                merge(base[key], value)
            else:
                base[key] = deepcopy(value)

    definition = deepcopy(SECTION_DEFAULTS)
    overrides = SECTION_DEFINITIONS.get(section_type)
    if overrides is None:
        overrides = {
            **SECTION_DEFINITIONS["default"],
            "label": format_label(section_type),
        }
    merge(definition, overrides)
    return definition

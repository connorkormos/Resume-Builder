"""Defaults for constructing new resume content."""

from copy import deepcopy


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
            "vertical": "1.0rem",
            "section": "0.5rem",
            "subsection": "0.0rem",
            "field": "0.0rem",
        },
    },
}

CONTAINER_DEFAULTS = {
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

# Database updates in need of review/correcting
    # Work History and Education sections, once I switch "Start/End Dates" to just "Dates"
    # Projects Section, once I update "Project Title" to "Title", and "Company/School" to "Organization"

# Need to ensure Profile Creations and Matching for Resumes still worked after database updates

# Maybe remove "link" from projects section?
# Maybe change Skills Fields to ["Category", "Skills"] to make it a little more organized/streamlined?

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
        # "fields": ["Job Title", "Company", "Location", "Dates", "Description"],
    },
    "education": {
        "type": "education",
        "label": "Education",
        "heading": "Education",
        "fields": ["School", "Degree", "Field of Study", "Location", "Start/End Dates", "Description"],
        # "fields": ["School", "Degree", "Field of Study", "Location", "Dates", "Description"],
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
        # "fields": ["Title", "Organization", "Link", "Dates", "Description"],
    },
    "custom": {
        "type": "custom",
        "label": "Custom",
        "heading": "Custom Section",
        "fields": ["Custom Field"],
    },
    
    # "references": {
    #     "type": "references",
    #     "label": "References",
    #     "heading": "References",
    #     "fields": ["Name", "Relationship", "Email", "Phone", "Title", "Organization", "Description"],
    # },
    # "languages": {
    #     "type": "languages",
    #     "label": "Languages",
    #     "heading": "Languages",
    #     "fields": ["Language", "Proficiency", "Description"],
    # },
    # "certifications": {
    #     "type": "certifications",
    #     "label": "Certifications",
    #     "heading": "Certifications",
    #     "fields": ["Certificate", "Organization", "Location", "Dates", "Description"],
    # },
    # "licenses": {
    #     "type": "licenses",
    #     "label": "Licenses",
    #     "heading": "Licenses",
    #     "fields": ["License", "Organization", "Location", "Dates", "Description"],
    # },
    # "volunteerExperience": {
    #     "type": "volunteerExperience",
    #     "label": "Volunteer Experience",
    #     "heading": "Volunteer Experience",
    #     "fields": ["Role", "Organization", "Location", "Dates", "Description"],
    # },
    # "awards": {
    #     "type": "awards",
    #     "label": "Awards and Honors",
    #     "heading": "Awards and Honors",
    #     "fields": ["Title", "Organization", "Location", "Dates", "Description"],
    # }
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
            **SECTION_DEFINITIONS["custom"],
            "label": section_type,
        }

    merge(definition, overrides)
    return definition

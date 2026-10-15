"""Build profile sections, subsections, and plain-text fields without committing."""

from lib.defaults import SECTION_DEFINITIONS
from models import Profile_Field, Profile_Section, Profile_Subsection, db


def add_profile_section(profile, section_type):
    """Append a section with one subsection containing its default fields."""
    definition = SECTION_DEFINITIONS[section_type]
    position = max((section.position for section in profile.sections), default=-1) + 1
    section = Profile_Section(
        profile=profile,
        type=definition["type"],
        label=definition["label"],
        position=position,
    )
    db.session.add(section)
    add_profile_subsection(section)
    return section


def add_profile_subsection(section):
    """Append a subsection and populate it with the section's default fields."""
    definition = SECTION_DEFINITIONS[section.type]
    position = max((subsection.position for subsection in section.subsections), default=-1) + 1
    subsection = Profile_Subsection(profile_section=section, position=position)
    db.session.add(subsection)
    for position, label in enumerate(definition["fields"]):
        add_profile_field(subsection, label, position=position)
    return subsection


def add_profile_field(subsection, label, value="", position=None):
    """Create a plain-text field, appending it unless a position is provided."""
    if position is None:
        position = max((field.position for field in subsection.fields), default=-1) + 1
    field = Profile_Field(
        profile_subsection=subsection,
        label=label,
        value=value,
        position=position,
    )
    db.session.add(field)
    return field

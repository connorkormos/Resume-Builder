class InvalidResumeTags(ValueError):
    pass


def normalize_resume_tags(tags):
    """Keep tags as an ordered, unique list of normalized search phrases."""
    if not isinstance(tags, list) or any(not isinstance(tag, str) for tag in tags):
        raise InvalidResumeTags("tags must be a list of strings.")
    return list(dict.fromkeys(" ".join(tag.lower().split()) for tag in tags if tag.strip()))

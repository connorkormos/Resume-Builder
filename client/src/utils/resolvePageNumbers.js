export const resolvePageNumbers = (resume, type, id = null, pageNumbers = null) => {
    if (!resume || !type || (!id && type !== 'resume')) return [];

    let resolvedPageNumbers = pageNumbers ?? [];

    let parent = null;
    let childType = null;
    let childIds = null;
    if (type === 'resume') {
        parent = resume;
        childType = 'container';
        childIds = resume.containers.allIds;
    } else if (type === 'container') {
        parent = resume.containers.byId[id];
        childType = 'section';
        childIds = parent.sectionIds;
    } else if (type === 'section') {
        parent = resume.sections.byId[id];
        childType = 'subsection';
        childIds = parent.subsectionIds;
    } else if (type === 'subsection') {
        parent = resume.subsections.byId[id];
        childType = 'field';
        childIds = parent.fieldIds;
    } else if (type === 'field') {
        parent = resume.fields.byId[id];
    }

    if (parent) {
        if (parent.pageNumber) {
            if (!resolvedPageNumbers.includes(parent.pageNumber)) {
                resolvedPageNumbers.push(parent.pageNumber);
            }
        }
    }

    if (childIds) {
        for (const childId of childIds) {
            resolvedPageNumbers = resolvePageNumbers(resume, childType, childId, resolvedPageNumbers)
        }
    }

    return resolvedPageNumbers.sort((a, b) => a - b);
}
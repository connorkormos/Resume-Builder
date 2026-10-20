WITH section_defaults (section_type, allowed_labels) AS (
    VALUES
        ('header', ARRAY['Name', 'Title']::text[]),
        ('workHistory', ARRAY['Job Title', 'Company', 'Location', 'Start/End Dates', 'Description']::text[]),
        ('education', ARRAY['School', 'Degree', 'Field of Study', 'Location', 'Start/End Dates', 'Description']::text[]),
        ('skills', ARRAY['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']::text[]),
        ('contact', ARRAY['Email', 'Phone', 'Location', 'Website', 'LinkedIn']::text[]),
        ('summary', ARRAY['Summary']::text[]),
        ('projects', ARRAY['Project Title', 'Company/School', 'Link', 'Dates', 'Description']::text[]),
        ('custom', ARRAY['Custom Field']::text[]),
        ('default', ARRAY['Field']::text[])
)
SELECT
    r.id AS resume_id,
    r.title AS resume_title,
    r.user_id,
    r.is_official_template,
    s.id AS section_id,
    s.type AS section_type,
    s.label AS section_label,
    ss.id AS subsection_id,
    ss.position AS subsection_position,
    f.id AS field_id,
    f.position AS field_position,
    f.label AS current_label,
    approved.label AS approved_label
FROM fields AS f
JOIN subsections AS ss ON ss.id = f.subsection_id
JOIN sections AS s ON s.id = ss.section_id
JOIN section_defaults AS d ON d.section_type = s.type
JOIN LATERAL unnest(d.allowed_labels) AS approved(label)
    ON regexp_replace(lower(f.label), '[[:space:]]+', '', 'g')
     = regexp_replace(lower(approved.label), '[[:space:]]+', '', 'g')
JOIN containers AS c ON c.id = s.container_id
JOIN resumes AS r ON r.id = c.resume_id
WHERE f.label <> approved.label
ORDER BY
    r.id, c.position, c.id,
    s.position, s.id,
    ss.position, ss.id,
    f.position, f.id;

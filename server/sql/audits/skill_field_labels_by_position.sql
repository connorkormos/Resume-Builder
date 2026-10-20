SELECT
    r.id AS resume_id,
    r.title AS resume_title,
    r.user_id,
    s.id AS section_id,
    ss.id AS subsection_id,
    f.id AS field_id,
    f.position AS field_position,
    f.label AS current_label,
    'Skill ' || (f.position + 1)::text AS new_label
FROM fields AS f
JOIN subsections AS ss ON ss.id = f.subsection_id
JOIN sections AS s ON s.id = ss.section_id
JOIN containers AS c ON c.id = s.container_id
JOIN resumes AS r ON r.id = c.resume_id
WHERE s.type = 'skills'
  AND (f.label IS NULL OR NOT (f.label = ANY(
      ARRAY['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']::text[]
  )))
ORDER BY r.id, s.position, s.id, ss.position, ss.id, f.position, f.id;

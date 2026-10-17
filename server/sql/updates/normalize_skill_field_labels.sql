BEGIN;

WITH candidates AS (
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
    JOIN columns AS c ON c.id = s.column_id
    JOIN resumes AS r ON r.id = c.resume_id
    WHERE s.type = 'skills'
      AND (f.label IS NULL OR NOT (f.label = ANY(
          ARRAY['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']::text[]
      )))
)
UPDATE fields AS f
SET label = candidate.new_label
FROM candidates AS candidate
WHERE f.id = candidate.field_id
  AND f.subsection_id = candidate.subsection_id
  AND f.position = candidate.field_position
  AND f.label IS NOT DISTINCT FROM candidate.current_label
RETURNING
    candidate.resume_id,
    candidate.user_id,
    candidate.section_id,
    candidate.subsection_id,
    f.id AS field_id,
    f.position AS field_position,
    candidate.current_label AS old_label,
    f.label AS new_label;

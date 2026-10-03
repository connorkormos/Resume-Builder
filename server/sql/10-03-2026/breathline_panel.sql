WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"color": "#F1F5F8", "fontFamily": "Arial, Helvetica, sans-serif", "backgroundColor": "#202833"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Header", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#E6D0A5"}]}], "subsections": [{"label": "John Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "John Doe", "fontSizeOffset": 15, "lineHeightOffset": 0, "bold": true, "color": "#E6D0A5"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Respiratory Therapist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#E6D0A5"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Contact", "type": "contact", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#202833"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Contact", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#E6D0A5"}]}], "subsections": [{"label": "Contact details", "fields": [{"label": "Location", "value": [{"type": "paragraph", "label": "Location", "textAlign": "left", "children": [{"text": "Cleveland, OH", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Email", "value": [{"type": "paragraph", "label": "Email", "textAlign": "left", "children": [{"text": "john.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Phone", "value": [{"type": "paragraph", "label": "Phone", "textAlign": "left", "children": [{"text": "(202) 555-0125", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "johndoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#202833"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Expertise", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#E6D0A5"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "Patient assessment", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Respiratory equipment", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "Care coordination", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Patient education", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#202833"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Education", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#E6D0A5"}]}], "subsections": [{"label": "Alderwick University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "B.S. Respiratory Care", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Alderwick University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Profile", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#374151"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Respiratory therapist supporting coordinated care through attentive assessment and clear communication. Brings dependable equipment checks, patient education, and consistent documentation to multidisciplinary teams.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Experience", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#374151"}]}], "subsections": [{"label": "Fairbrook Medical Center", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Respiratory Therapist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Fairbrook Medical Center", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Supported respiratory care across inpatient units and coordinated timely treatment handoffs.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Helped standardize equipment readiness checks across three shifts.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}, {"label": "Westfield Community Hospital", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Respiratory Therapist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Westfield Community Hospital", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Provided ordered therapies and documented patient response for care-team review.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Educated patients and caregivers on prescribed equipment use.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D", "backgroundColor": "#F0F2F5"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Selected Project", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#374151"}]}], "subsections": [{"label": "Equipment Readiness Cards", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Equipment Readiness Cards", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Created concise setup and handoff references with the department educator to improve consistency during shift transitions.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Breathline Panel',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#29343D", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "1.55rem", "right": "1.4rem", "bottom": "1.55rem", "left": "1.4rem"}, "gap": {"horizontal": "0.22rem", "vertical": "0.36rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "modern", "bold", "dark", "sidebar", "two-column", "left-sidebar", "sans-serif", "gray", "charcoal", "healthcare"]'::jsonb,
        $search_text$Breathline Panel Header Header John Doe Name John Doe Title Respiratory Therapist Contact Contact Contact details Location Cleveland, OH Email john.doe@example.com Phone (202) 555-0125 Website johndoe.example.com Expertise Expertise Core skills Skill 1 Patient assessment Skill 2 Respiratory equipment Skill 3 Care coordination Skill 4 Patient education Education Education Alderwick University Degree B.S. Respiratory Care School Alderwick University Dates Class of 2018 Profile Profile Professional profile Summary Respiratory therapist supporting coordinated care through attentive assessment and clear communication. Brings dependable equipment checks, patient education, and consistent documentation to multidisciplinary teams. Experience Experience Fairbrook Medical Center Job Title Respiratory Therapist Company Fairbrook Medical Center Dates 2022 - Present Description Supported respiratory care across inpatient units and coordinated timely treatment handoffs.Helped standardize equipment readiness checks across three shifts. Westfield Community Hospital Job Title Respiratory Therapist Company Westfield Community Hospital Dates 2018 - 2022 Description Provided ordered therapies and documented patient response for care-team review.Educated patients and caregivers on prescribed equipment use. Selected Project Selected Project Equipment Readiness Cards Project Title Equipment Readiness Cards Description Created concise setup and handoff references with the department educator to improve consistency during shift transitions.$search_text$,
        TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    RETURNING id, title, user_id, is_official_template
),
new_columns AS (
    INSERT INTO columns (resume_id, position, styling, layout, created_at, updated_at)
    SELECT r.id, c.position, '{}'::json, c.layout,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM new_resume r
    CROSS JOIN (VALUES
        (0, '{"width": {"auto": false, "value": "33%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.75rem", "right": "0.75rem"}}'::json),
        (1, '{"width": {"auto": false, "value": "67%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.75rem", "right": "0.75rem"}}'::json)
    ) AS c(position, layout)
    RETURNING id, position
),
section_data AS (
    SELECT (s.ordinality - 1)::integer AS position, s.item
    FROM content
    CROSS JOIN LATERAL jsonb_array_elements(content.sections)
        WITH ORDINALITY AS s(item, ordinality)
),
new_sections AS (
    INSERT INTO sections (
        column_id, label, type, value, show_heading, position,
        styling, layout, created_at, updated_at
    )
    SELECT c.id, s.item->>'label', s.item->>'type',
        (s.item->'value')::json,
        (s.item->>'showHeading')::boolean, s.position,
        (s.item->'styling')::json, (s.item->'layout')::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM section_data s
    JOIN new_columns c ON c.position = (s.item->>'columnPosition')::integer
    RETURNING id, position
),
subsection_data AS (
    SELECT s.id AS section_id, (sub.ordinality - 1)::integer AS position, sub.item
    FROM new_sections s
    JOIN section_data d ON d.position = s.position
    CROSS JOIN LATERAL jsonb_array_elements(d.item->'subsections')
        WITH ORDINALITY AS sub(item, ordinality)
),
new_subsections AS (
    INSERT INTO subsections (
        section_id, label, type, position, styling, layout, created_at, updated_at
    )
    SELECT d.section_id, d.item->>'label', s.item->>'type', d.position,
        '{"fontSizeOffset":0,"lineHeightOffset":0}'::json, '{}'::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM subsection_data d
    JOIN new_sections n ON n.id = d.section_id
    JOIN section_data s ON s.position = n.position
    RETURNING id, section_id, position
),
new_fields AS (
    INSERT INTO fields (
        subsection_id, label, value, position, styling, layout, created_at, updated_at
    )
    SELECT sub.id, f.item->>'label', (f.item->'value')::json,
        (f.ordinality - 1)::integer,
        '{"fontSizeOffset":0,"lineHeightOffset":0}'::json, COALESCE((f.item->'layout')::json, '{}'::json),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM new_subsections sub
    JOIN subsection_data d ON d.section_id = sub.section_id AND d.position = sub.position
    CROSS JOIN LATERAL jsonb_array_elements(d.item->'fields')
        WITH ORDINALITY AS f(item, ordinality)
    RETURNING id
)
SELECT id AS resume_id, title, user_id, is_official_template,
       (SELECT count(*) FROM new_fields) AS fields_created
FROM new_resume

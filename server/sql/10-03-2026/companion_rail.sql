WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"color": "#F1F5F8", "fontFamily": "Arial, Helvetica, sans-serif", "backgroundColor": "#412B24"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "HEADER", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "John Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "John Doe", "fontSizeOffset": 15, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Veterinary Technician", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#DCCBEF"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Contact", "type": "contact", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#412B24"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "CONTACT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Contact details", "fields": [{"label": "Location", "value": [{"type": "paragraph", "label": "Location", "textAlign": "left", "children": [{"text": "Phoenix, AZ", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Email", "value": [{"type": "paragraph", "label": "Email", "textAlign": "left", "children": [{"text": "john.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Phone", "value": [{"type": "paragraph", "label": "Phone", "textAlign": "left", "children": [{"text": "(202) 555-0135", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "johndoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#412B24"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERTISE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "Patient handling", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Clinical support", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "Client education", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Medical records", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F1F5F8", "backgroundColor": "#412B24"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EDUCATION", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Alderwick University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "A.A.S. Veterinary Technology", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Alderwick University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F1F5F8"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "PROFILE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#74402F"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Veterinary technician supporting attentive animal care and clear client communication. Keeps treatment areas organized and works closely with veterinarians to maintain dependable clinical routines.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERIENCE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#74402F"}]}], "subsections": [{"label": "Desertwillow Animal Care", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Veterinary Technician", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Desertwillow Animal Care", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Coordinated patient preparation and follow-up instructions in a six-veterinarian practice.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Improved completeness of discharge records through a shared review checklist.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}, {"label": "Mesa Companion Clinic", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Veterinary Assistant", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Mesa Companion Clinic", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Assisted with examinations, sample handling, and routine patient monitoring.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Maintained treatment supplies and documented equipment checks.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D", "backgroundColor": "#F8EFE7"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "SELECTED PROJECT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#74402F"}]}], "subsections": [{"label": "Home Care Handouts", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Home Care Handouts", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Worked with the clinical team to create clear, procedure-specific discharge sheets and consistent follow-up call prompts.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Companion Rail',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#29343D", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "1.55rem", "right": "1.4rem", "bottom": "1.55rem", "left": "1.4rem"}, "gap": {"horizontal": "0.22rem", "vertical": "0.36rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "modern", "bold", "dark", "sidebar", "two-column", "left-sidebar", "sans-serif", "brown", "copper", "healthcare"]'::jsonb,
        $search_text$Companion Rail Header HEADER John Doe Name John Doe Title Veterinary Technician Contact CONTACT Contact details Location Phoenix, AZ Email john.doe@example.com Phone (202) 555-0135 Website johndoe.example.com Expertise EXPERTISE Core skills Skill 1 Patient handling Skill 2 Clinical support Skill 3 Client education Skill 4 Medical records Education EDUCATION Alderwick University Degree A.A.S. Veterinary Technology School Alderwick University Dates Class of 2018 Profile PROFILE Professional profile Summary Veterinary technician supporting attentive animal care and clear client communication. Keeps treatment areas organized and works closely with veterinarians to maintain dependable clinical routines. Experience EXPERIENCE Desertwillow Animal Care Job Title Veterinary Technician Company Desertwillow Animal Care Dates 2022 - Present Description Coordinated patient preparation and follow-up instructions in a six-veterinarian practice.Improved completeness of discharge records through a shared review checklist. Mesa Companion Clinic Job Title Veterinary Assistant Company Mesa Companion Clinic Dates 2018 - 2022 Description Assisted with examinations, sample handling, and routine patient monitoring.Maintained treatment supplies and documented equipment checks. Selected Project SELECTED PROJECT Home Care Handouts Project Title Home Care Handouts Description Worked with the clinical team to create clear, procedure-specific discharge sheets and consistent follow-up call prompts.$search_text$,
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

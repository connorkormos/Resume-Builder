WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"color": "#29343D", "fontFamily": "Georgia, Times New Roman, serif", "backgroundColor": "#EAF6F5"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Header", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Jane Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "Jane Doe", "fontSizeOffset": 15, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Quality Systems Specialist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#17646A"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Contact", "type": "contact", "columnPosition": 0, "showHeading": true, "styling": {"color": "#29343D", "backgroundColor": "#EAF6F5"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Contact", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Contact details", "fields": [{"label": "Location", "value": [{"type": "paragraph", "label": "Location", "textAlign": "left", "children": [{"text": "Milwaukee, WI", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Email", "value": [{"type": "paragraph", "label": "Email", "textAlign": "left", "children": [{"text": "jane.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Phone", "value": [{"type": "paragraph", "label": "Phone", "textAlign": "left", "children": [{"text": "(202) 555-0128", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "janedoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"color": "#29343D", "backgroundColor": "#EAF6F5"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Expertise", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "Document control", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Internal audits", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "Corrective actions", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Process mapping", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"color": "#29343D", "backgroundColor": "#EAF6F5"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Education", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Westhaven University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "B.S. Industrial Technology", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Westhaven University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Profile", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Quality systems specialist making procedures clear and evidence easy to trace. Supports teams with organized records, practical audits, and consistent follow-up on improvement actions.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D", "border": {"bottom": {"display": true, "width": "88%", "height": "1px", "style": "solid", "color": "#17646A"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Experience", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Precisionpath Manufacturing", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Quality Systems Specialist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Precisionpath Manufacturing", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Coordinated internal reviews across 11 production and support processes.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Reduced overdue corrective actions by 31% through visible ownership and weekly follow-up.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}, {"label": "Stonewell Components", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Quality Coordinator", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Stonewell Components", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Maintained controlled documents and organized training acknowledgment records.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}, {"type": "list-item", "children": [{"text": "Mapped recurring nonconformances to help teams identify shared causes.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#29343D"}]}]}], "styling": {}, "layout": {}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 1, "showHeading": true, "styling": {"color": "#29343D"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "Selected Project", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#17646A"}]}], "subsections": [{"label": "Process Evidence Map", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Process Evidence Map", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Linked each core procedure to required records, review intervals, and responsible roles in a searchable reference.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Assurance Fold',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#29343D", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "1.55rem", "right": "1.4rem", "bottom": "1.55rem", "left": "1.4rem"}, "gap": {"horizontal": "0.22rem", "vertical": "0.36rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "modern", "soft", "sidebar", "two-column", "left-sidebar", "sans-serif", "teal", "operations"]'::jsonb,
        $search_text$Assurance Fold Header Header Jane Doe Name Jane Doe Title Quality Systems Specialist Contact Contact Contact details Location Milwaukee, WI Email jane.doe@example.com Phone (202) 555-0128 Website janedoe.example.com Expertise Expertise Core skills Skill 1 Document control Skill 2 Internal audits Skill 3 Corrective actions Skill 4 Process mapping Education Education Westhaven University Degree B.S. Industrial Technology School Westhaven University Dates Class of 2018 Profile Profile Professional profile Summary Quality systems specialist making procedures clear and evidence easy to trace. Supports teams with organized records, practical audits, and consistent follow-up on improvement actions. Experience Experience Precisionpath Manufacturing Job Title Quality Systems Specialist Company Precisionpath Manufacturing Dates 2022 - Present Description Coordinated internal reviews across 11 production and support processes.Reduced overdue corrective actions by 31% through visible ownership and weekly follow-up. Stonewell Components Job Title Quality Coordinator Company Stonewell Components Dates 2018 - 2022 Description Maintained controlled documents and organized training acknowledgment records.Mapped recurring nonconformances to help teams identify shared causes. Selected Project Selected Project Process Evidence Map Project Title Process Evidence Map Description Linked each core procedure to required records, review intervals, and responsible roles in a searchable reference.$search_text$,
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
        (0, '{"width": {"auto": false, "value": "40%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.75rem", "right": "0.75rem"}}'::json),
        (1, '{"width": {"auto": false, "value": "60%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.75rem", "right": "0.75rem"}}'::json)
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

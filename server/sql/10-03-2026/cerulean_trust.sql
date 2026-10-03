WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"fontFamily": "Arial, Helvetica, sans-serif", "border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#1D405B"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "HEADER", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Jane Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "JANE DOE", "fontSizeOffset": 16, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Compliance Analyst", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Contact", "type": "contact", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#1D405B"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "CONTACT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Contact details", "fields": [{"label": "Location", "value": [{"type": "paragraph", "label": "Location", "textAlign": "left", "children": [{"text": "Omaha, NE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Email", "value": [{"type": "paragraph", "label": "Email", "textAlign": "left", "children": [{"text": "jane.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Phone", "value": [{"type": "paragraph", "label": "Phone", "textAlign": "left", "children": [{"text": "(202) 555-0148", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "janedoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#1D405B"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERTISE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "Control testing", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Evidence review", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "Policy documentation", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Issue tracking", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#1D405B"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EDUCATION", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Westhaven University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "B.S. Business Administration", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Westhaven University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "PROFILE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Compliance analyst making review processes clear and evidence easy to trace. Partners with operational teams to document controls, investigate exceptions, and keep remediation work moving.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERIENCE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Cedarline Financial", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Compliance Analyst", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Cedarline Financial", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#52606A"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#1D405B"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Coordinated quarterly control testing across seven business functions.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}, {"type": "list-item", "children": [{"text": "Reduced overdue evidence requests by 33% through clearer ownership and due dates.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}]}], "styling": {}, "layout": {}}]}, {"label": "Stonebridge Services", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Risk Operations Associate", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Stonebridge Services", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#52606A"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#1D405B"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Reviewed operational records and escalated discrepancies for further investigation.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}, {"type": "list-item", "children": [{"text": "Maintained issue logs and prepared summaries for management review.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}]}], "styling": {}, "layout": {}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "SELECTED PROJECT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#1D405B"}]}], "subsections": [{"label": "Evidence Request Library", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Evidence Request Library", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Created standardized request templates linking each control to expected records, review criteria, and responsible teams.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Cerulean Trust',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#29343D", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "1.6rem", "right": "1.5rem", "bottom": "1.6rem", "left": "1.5rem"}, "gap": {"horizontal": "0.25rem", "vertical": "0.38rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "minimal", "structured", "sidebar", "two-column", "left-sidebar", "sans-serif", "blue", "navy", "finance"]'::jsonb,
        $search_text$Cerulean Trust Header HEADER Jane Doe Name JANE DOE Title Compliance Analyst Contact CONTACT Contact details Location Omaha, NE Email jane.doe@example.com Phone (202) 555-0148 Website janedoe.example.com Expertise EXPERTISE Core skills Skill 1 Control testing Skill 2 Evidence review Skill 3 Policy documentation Skill 4 Issue tracking Education EDUCATION Westhaven University Degree B.S. Business Administration School Westhaven University Dates Class of 2018 Profile PROFILE Professional profile Summary Compliance analyst making review processes clear and evidence easy to trace. Partners with operational teams to document controls, investigate exceptions, and keep remediation work moving. Experience EXPERIENCE Cedarline Financial Job Title Compliance Analyst Company Cedarline Financial Dates 2022 - Present Description Coordinated quarterly control testing across seven business functions.Reduced overdue evidence requests by 33% through clearer ownership and due dates. Stonebridge Services Job Title Risk Operations Associate Company Stonebridge Services Dates 2018 - 2022 Description Reviewed operational records and escalated discrepancies for further investigation.Maintained issue logs and prepared summaries for management review. Selected Project SELECTED PROJECT Evidence Request Library Project Title Evidence Request Library Description Created standardized request templates linking each control to expected records, review criteria, and responsible teams.$search_text$,
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
        (0, '{"width": {"auto": false, "value": "32%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.8rem", "right": "0.8rem"}}'::json),
        (1, '{"width": {"auto": false, "value": "68%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.8rem", "right": "0.8rem"}}'::json)
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

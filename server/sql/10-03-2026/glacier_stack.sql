WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"fontFamily": "Arial, Helvetica, sans-serif", "border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#2E4F72"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "HEADER", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Jane Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "JANE DOE", "fontSizeOffset": 16, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Data Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Contact", "type": "contact", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#2E4F72"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "CONTACT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Contact details", "fields": [{"label": "Location", "value": [{"type": "paragraph", "label": "Location", "textAlign": "left", "children": [{"text": "Boise, ID", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Email", "value": [{"type": "paragraph", "label": "Email", "textAlign": "left", "children": [{"text": "jane.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Phone", "value": [{"type": "paragraph", "label": "Phone", "textAlign": "left", "children": [{"text": "(202) 555-0138", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "janedoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#2E4F72"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERTISE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "SQL", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Python", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "dbt", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Data pipelines", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"border": {"right": {"display": true, "width": "2px", "height": "100%", "style": "solid", "color": "#2E4F72"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EDUCATION", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Westhaven University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "B.S. Computer Science", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Westhaven University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#29343D"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "PROFILE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Data engineer building trustworthy foundations for reporting and analysis. Focuses on clear models, observable pipelines, and dependable interfaces between source systems and business teams.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERIENCE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Snowcap Analytics", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Data Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Snowcap Analytics", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#52606A"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#2E4F72"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Built ingestion pipelines processing 12 million daily events.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}, {"type": "list-item", "children": [{"text": "Reduced warehouse query costs by 24% through partitioning and model cleanup.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}]}], "styling": {}, "layout": {}}]}, {"label": "Streamwell Commerce", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Analytics Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Streamwell Commerce", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#52606A"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#2E4F72"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Developed reusable transformation models for sales and product reporting.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}, {"type": "list-item", "children": [{"text": "Added freshness checks and ownership notes for 60 critical datasets.", "fontSizeOffset": 0, "lineHeightOffset": 0}]}]}], "styling": {}, "layout": {}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 1, "showHeading": true, "styling": {}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "SELECTED PROJECT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#2E4F72"}]}], "subsections": [{"label": "Dataset Contracts", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Dataset Contracts", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Introduced schema expectations, source ownership, and change notifications to reduce downstream reporting surprises.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Glacier Stack',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#29343D", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "1.6rem", "right": "1.5rem", "bottom": "1.6rem", "left": "1.5rem"}, "gap": {"horizontal": "0.25rem", "vertical": "0.38rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "minimal", "structured", "sidebar", "two-column", "left-sidebar", "sans-serif", "blue", "data"]'::jsonb,
        $search_text$Glacier Stack Header HEADER Jane Doe Name JANE DOE Title Data Engineer Contact CONTACT Contact details Location Boise, ID Email jane.doe@example.com Phone (202) 555-0138 Website janedoe.example.com Expertise EXPERTISE Core skills Skill 1 SQL Skill 2 Python Skill 3 dbt Skill 4 Data pipelines Education EDUCATION Westhaven University Degree B.S. Computer Science School Westhaven University Dates Class of 2018 Profile PROFILE Professional profile Summary Data engineer building trustworthy foundations for reporting and analysis. Focuses on clear models, observable pipelines, and dependable interfaces between source systems and business teams. Experience EXPERIENCE Snowcap Analytics Job Title Data Engineer Company Snowcap Analytics Dates 2022 - Present Description Built ingestion pipelines processing 12 million daily events.Reduced warehouse query costs by 24% through partitioning and model cleanup. Streamwell Commerce Job Title Analytics Engineer Company Streamwell Commerce Dates 2018 - 2022 Description Developed reusable transformation models for sales and product reporting.Added freshness checks and ownership notes for 60 critical datasets. Selected Project SELECTED PROJECT Dataset Contracts Project Title Dataset Contracts Description Introduced schema expectations, source ownership, and change notifications to reduce downstream reporting surprises.$search_text$,
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

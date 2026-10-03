WITH
content AS (
    SELECT $resume_data$
[
{"label": "Header", "type": "header", "columnPosition": 0, "showHeading": false, "styling": {"color": "#F3F3ED", "fontFamily": "Georgia, Times New Roman, serif", "border": {"bottom": {"display": true, "width": "88%", "height": "1px", "style": "solid", "color": "#DCCBEF"}}}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "HEADER", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Jane Doe", "fields": [{"label": "Name", "value": [{"type": "paragraph", "label": "Name", "textAlign": "left", "children": [{"text": "Jane Doe", "fontSizeOffset": 20, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "styling": {}, "layout": {}}, {"label": "Title", "value": [{"type": "paragraph", "label": "Title", "textAlign": "left", "children": [{"text": "Machine Learning Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": false, "color": "#DCCBEF"}]}], "styling": {}, "layout": {}}, {"label": "Contact", "value": [{"type": "paragraph", "label": "Contact", "textAlign": "left", "children": [{"text": "San Francisco, CA | (202) 555-0130 | jane.doe@example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Website", "value": [{"type": "paragraph", "label": "Website", "textAlign": "left", "children": [{"text": "janedoe.example.com", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Profile", "type": "summary", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F3F3ED", "backgroundColor": "#272727"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "PROFILE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Professional profile", "fields": [{"label": "Summary", "value": [{"type": "paragraph", "label": "Summary", "textAlign": "left", "children": [{"text": "Machine learning engineer turning promising models into dependable product features. Focuses on reproducible evaluation, observable services, and clear collaboration with data and application teams.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Experience", "type": "workHistory", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F3F3ED"}, "layout": {"display": "grid", "grid": {"columns": 2}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERIENCE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Patternbridge AI", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Machine Learning Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "right", "children": [{"text": "2022 - Present", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Patternbridge AI", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {"startNewRow": true, "grid": {"fillRow": true}}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Deployed a classification service handling 1.8 million requests each day.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#F3F3ED"}]}, {"type": "list-item", "children": [{"text": "Reduced inference latency by 28% while maintaining agreed evaluation targets.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#F3F3ED"}]}]}], "styling": {}, "layout": {"startNewRow": true, "grid": {"fillRow": true}}}]}, {"label": "Baypath Analytics", "fields": [{"label": "Job Title", "value": [{"type": "paragraph", "label": "Job Title", "textAlign": "left", "children": [{"text": "Software Engineer", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "right", "children": [{"text": "2018 - 2022", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Company", "value": [{"type": "paragraph", "label": "Company", "textAlign": "left", "children": [{"text": "Baypath Analytics", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {"startNewRow": true, "grid": {"fillRow": true}}}, {"label": "Description", "value": [{"type": "unordered-list", "children": [{"type": "list-item", "children": [{"text": "Built data preparation jobs and automated checks for training inputs.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#F3F3ED"}]}, {"type": "list-item", "children": [{"text": "Created shared experiment records that improved reproducibility across model iterations.", "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "#F3F3ED"}]}]}], "styling": {}, "layout": {"startNewRow": true, "grid": {"fillRow": true}}}]}]},
{"label": "Selected Project", "type": "projects", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F3F3ED"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "SELECTED PROJECT", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Model Release Checklist", "fields": [{"label": "Project Title", "value": [{"type": "paragraph", "label": "Project Title", "textAlign": "left", "children": [{"text": "Model Release Checklist", "fontSizeOffset": 0.5, "lineHeightOffset": 0, "bold": true, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Description", "value": [{"type": "paragraph", "label": "Description", "textAlign": "left", "children": [{"text": "Connected dataset versions, evaluation results, deployment settings, and rollback steps in a repeatable release workflow.", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Expertise", "type": "skills", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F3F3ED"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EXPERTISE", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Core skills", "fields": [{"label": "Skill 1", "value": [{"type": "paragraph", "label": "Skill 1", "textAlign": "left", "children": [{"text": "Python", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Skill 2", "value": [{"type": "paragraph", "label": "Skill 2", "textAlign": "left", "children": [{"text": "Model serving", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Skill 3", "value": [{"type": "paragraph", "label": "Skill 3", "textAlign": "left", "children": [{"text": "Evaluation", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Skill 4", "value": [{"type": "paragraph", "label": "Skill 4", "textAlign": "left", "children": [{"text": "Data pipelines", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}]}]},
{"label": "Education", "type": "education", "columnPosition": 0, "showHeading": true, "styling": {"color": "#F3F3ED"}, "layout": {"display": "grid", "grid": {"columns": 1}, "padding": {"top": "0rem", "bottom": "0rem"}}, "value": [{"type": "heading", "textAlign": "left", "children": [{"text": "EDUCATION", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#DCCBEF"}]}], "subsections": [{"label": "Alderwick University", "fields": [{"label": "Degree", "value": [{"type": "paragraph", "label": "Degree", "textAlign": "left", "children": [{"text": "M.S. Computer Science", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": true, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "School", "value": [{"type": "paragraph", "label": "School", "textAlign": "left", "children": [{"text": "Alderwick University", "fontSizeOffset": 0, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}, {"label": "Dates", "value": [{"type": "paragraph", "label": "Dates", "textAlign": "left", "children": [{"text": "Class of 2018", "fontSizeOffset": -0.5, "lineHeightOffset": 0, "bold": false, "color": "#F3F3ED"}]}], "styling": {}, "layout": {}}]}]}
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Eclipse Model',
        '{"display": "flex", "fontFamily": "Georgia, Times New Roman, serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#F3F3ED", "backgroundColor": "#181818"}'::json,
        '{"padding": {"top": "1.55rem", "right": "1.4rem", "bottom": "1.55rem", "left": "1.4rem"}, "gap": {"horizontal": "0.22rem", "vertical": "0.36rem", "subsection": "0.6rem", "field": "0.13rem"}}'::json,
        '["professional", "black", "dark", "elegant", "serif", "single-column", "technology", "minimal"]'::jsonb,
        $search_text$Eclipse Model Header HEADER Jane Doe Name Jane Doe Title Machine Learning Engineer Contact San Francisco, CA | (202) 555-0130 | jane.doe@example.com Website janedoe.example.com Profile PROFILE Professional profile Summary Machine learning engineer turning promising models into dependable product features. Focuses on reproducible evaluation, observable services, and clear collaboration with data and application teams. Experience EXPERIENCE Patternbridge AI Job Title Machine Learning Engineer Dates 2022 - Present Company Patternbridge AI Description Deployed a classification service handling 1.8 million requests each day.Reduced inference latency by 28% while maintaining agreed evaluation targets. Baypath Analytics Job Title Software Engineer Dates 2018 - 2022 Company Baypath Analytics Description Built data preparation jobs and automated checks for training inputs.Created shared experiment records that improved reproducibility across model iterations. Selected Project SELECTED PROJECT Model Release Checklist Project Title Model Release Checklist Description Connected dataset versions, evaluation results, deployment settings, and rollback steps in a repeatable release workflow. Expertise EXPERTISE Core skills Skill 1 Python Skill 2 Model serving Skill 3 Evaluation Skill 4 Data pipelines Education EDUCATION Alderwick University Degree M.S. Computer Science School Alderwick University Dates Class of 2018$search_text$,
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
        (0, '{"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "0.75rem", "right": "0.75rem"}}'::json)
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

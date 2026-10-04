WITH
content AS (
    SELECT $resume_data$
[
  {
    "label": "Identity",
    "type": "header",
    "columnPosition": 0,
    "showHeading": false,
    "styling": {
      "fontFamily": "Georgia, Times New Roman, serif",
      "letterSpacing": "5px"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0rem",
        "bottom": "0.25rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "",
            "fontSizeOffset": 0,
            "lineHeightOffset": 0
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Identity",
        "fields": [
          {
            "label": "Name",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "JANE DOE",
                    "fontSizeOffset": 24,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          }
        ]
      }
    ]
  },
  {
    "label": "Professional title",
    "type": "header",
    "columnPosition": 0,
    "showHeading": false,
    "styling": {
      "letterSpacing": "1.4px"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0rem",
        "bottom": "1.5rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "",
            "fontSizeOffset": 0,
            "lineHeightOffset": 0
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Professional title",
        "fields": [
          {
            "label": "Title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "CERTIFIED PUBLIC ACCOUNTANT",
                    "fontSizeOffset": 1,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          }
        ]
      }
    ]
  },
  {
    "label": "Contact",
    "type": "contact",
    "columnPosition": 0,
    "showHeading": false,
    "styling": {
      "color": "#5B5753",
      "backgroundImage": "linear-gradient(to right, transparent 5.4%, #DED5CE 5.4%, #DED5CE 94.6%, transparent 94.6%)",
      "marginBottom": "2.5rem"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0.55rem",
        "bottom": "0.55rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "",
            "fontSizeOffset": 0,
            "lineHeightOffset": 0
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Contact",
        "fields": [
          {
            "label": "Contact",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "(312) 555-0148     |     jane.doe@example.com     |     Madison, WI",
                    "fontSizeOffset": -1,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          }
        ]
      }
    ]
  },
  {
    "label": "Professional summary",
    "type": "summary",
    "columnPosition": 0,
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "82.8%",
          "height": "1px",
          "style": "solid",
          "color": "#85817C"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "1rem",
        "bottom": "1.65rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "PROFESSIONAL SUMMARY",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Professional summary",
        "fields": [
          {
            "label": "Summary",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "justify",
                "children": [
                  {
                    "text": "Certified public accountant with eight years of experience supporting growing service businesses. Combines accurate financial reporting with practical advice on cash flow, internal controls, and tax readiness. Known for turning complex reconciliations into clear explanations and helping teams close their books with confidence.",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          }
        ]
      }
    ]
  },
  {
    "label": "Experience",
    "type": "workHistory",
    "columnPosition": 0,
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "82.8%",
          "height": "1px",
          "style": "solid",
          "color": "#85817C"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {
        "top": "1rem",
        "bottom": "0rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "EXPERIENCE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Northmere Advisory Group",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Northmere Advisory Group",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2022–Present",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Senior Accountant",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "italic": true
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            }
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Lead monthly close and financial reporting for 18 service-business clients, delivering clear statements and actionable variance notes to owners.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Reduced average close time from nine days to six by standardizing account reconciliations and assigning review responsibilities.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Built cash-flow forecasts and audit schedules that helped clients plan quarterly payments and resolve review requests promptly.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            }
          }
        ]
      },
      {
        "label": "Alderbrook Business Services",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Alderbrook Business Services",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2018–2022",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Staff Accountant",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "italic": true
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            }
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Prepared journal entries, bank reconciliations, and management reports for a portfolio of regional consulting and professional-service firms.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Resolved recurring invoice discrepancies by introducing a documented review process across purchasing and accounts payable.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Supported annual tax preparation and external audits with organized workpapers, verified balances, and timely client follow-up.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            }
          }
        ]
      }
    ]
  }
]
$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout,
        tags, plain_text, is_official_template, created_at, updated_at
    )
    VALUES (
        1, NULL, 'Linen Ledger',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11.5px", "lineHeight": 1.3, "color": "#333331", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "3.4rem", "right": "3.1rem", "bottom": "2.5rem", "left": "3.1rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": "1.15rem", "field": "0.08rem", "header": "0rem"}}'::json,
        '["professional", "classic", "minimal", "elegant", "neutral", "single-column", "serif", "accounting", "finance"]'::jsonb,
        $search_text$Linen Ledger Identity Identity Name JANE DOE Professional title Professional title Title CERTIFIED PUBLIC ACCOUNTANT Contact Contact Contact (312) 555-0148 | jane.doe@example.com | Madison, WI Professional summary PROFESSIONAL SUMMARY Professional summary Summary Certified public accountant with eight years of experience supporting growing service businesses. Combines accurate financial reporting with practical advice on cash flow, internal controls, and tax readiness. Known for turning complex reconciliations into clear explanations and helping teams close their books with confidence. Experience EXPERIENCE Northmere Advisory Group Company Northmere Advisory Group Dates 2022–Present Job title Senior Accountant Description Lead monthly close and financial reporting for 18 service-business clients, delivering clear statements and actionable variance notes to owners.Reduced average close time from nine days to six by standardizing account reconciliations and assigning review responsibilities.Built cash-flow forecasts and audit schedules that helped clients plan quarterly payments and resolve review requests promptly. Alderbrook Business Services Company Alderbrook Business Services Dates 2018–2022 Job title Staff Accountant Description Prepared journal entries, bank reconciliations, and management reports for a portfolio of regional consulting and professional-service firms.Resolved recurring invoice discrepancies by introducing a documented review process across purchasing and accounts payable.Supported annual tax preparation and external audits with organized workpapers, verified balances, and timely client follow-up.$search_text$,
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

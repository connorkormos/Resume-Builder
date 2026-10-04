WITH
content AS (
    SELECT $resume_data$
[
  {
    "label": "Identity",
    "type": "header",
    "columnPosition": 0,
    "showHeading": false,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0rem",
        "bottom": ".65rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Jane Doe",
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
                    "fontSizeOffset": 18,
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
            "label": "Title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Professional Accountant",
                    "fontSizeOffset": 3,
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
    "type": "defaultSection",
    "columnPosition": 0,
    "showHeading": false,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "82%",
          "height": "1px",
          "style": "solid",
          "color": "#999999"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
      },
      "padding": {
        "top": "0rem",
        "bottom": ".6rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Contact details",
        "fields": [
          {
            "label": "Phone",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": ""
                  },
                  {
                    "type": "icon",
                    "iconId": "phone",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  },
                  {
                    "text": " (414) 555-0181",
                    "fontSizeOffset": -1,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Email",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": ""
                  },
                  {
                    "type": "icon",
                    "iconId": "email",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  },
                  {
                    "text": " jane.doe@example.com",
                    "fontSizeOffset": -1,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Location",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": ""
                  },
                  {
                    "type": "icon",
                    "iconId": "location",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  },
                  {
                    "text": " Milwaukee, WI",
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
    "label": "Profile",
    "type": "defaultSection",
    "columnPosition": 0,
    "showHeading": true,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "82%",
          "height": "1px",
          "style": "solid",
          "color": "#999999"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": ".9rem",
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "ABOUT ME",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "About Jane",
        "fields": [
          {
            "label": "Summary",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Detail-oriented accountant who brings clarity to financial reporting and day-to-day controls. Experienced in reconciliations, audit preparation, and practical process improvements. Values accurate records, dependable deadlines, and clear explanations that help colleagues make informed decisions.",
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
    "label": "Education",
    "type": "education",
    "columnPosition": 0,
    "showHeading": true,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "82%",
          "height": "1px",
          "style": "solid",
          "color": "#999999"
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
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "EDUCATION",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Lakehaven University",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Lakehaven University",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "color": "#666666"
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "M.S. Accounting",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "2017–2019",
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
            "label": "Details",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Focused on assurance, financial reporting, and applied research. Completed a capstone examining internal controls in growing service organizations.",
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
      },
      {
        "label": "Elmbridge College",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Elmbridge College",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "color": "#666666"
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "B.S. Accounting",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "2013–2017",
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
            "label": "Details",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Built a foundation in financial analysis, taxation, and business law. Supported a student-led program helping community groups organize their records.",
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
        "bottom": {
          "display": true,
          "width": "82%",
          "height": "1px",
          "style": "solid",
          "color": "#999999"
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
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "WORK EXPERIENCE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Oakmere Advisory",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Oakmere Advisory | 2022–Present",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "color": "#777777"
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
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Manage monthly reporting for a portfolio of service businesses. Review reconciliations, prepare supporting schedules, and work with client teams to resolve discrepancies. Introduced a close checklist that reduced late adjustments by 28%.",
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
      },
      {
        "label": "Fieldstone Commerce",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Fieldstone Commerce | 2019–2022",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "color": "#777777"
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
                    "text": "Financial Accountant",
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
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Prepared journal entries, maintained fixed-asset records, and supported quarterly financial reviews. Improved the organization of audit evidence and documented recurring processes to make handoffs clearer and more consistent.",
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
    "label": "Skills",
    "type": "defaultSection",
    "columnPosition": 0,
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
      },
      "padding": {
        "top": ".9rem",
        "bottom": "0rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "SKILLS",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Accounting skills",
        "fields": [
          {
            "label": "Auditing",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Auditing",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Account reconciliation",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Account reconciliation",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Financial reporting",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Financial reporting",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Financial accounting",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Financial accounting",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Internal controls",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Internal controls",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Budget analysis",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Budget analysis",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
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
        1, NULL, 'Silver Account',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11px", "lineHeight": 1.3, "color": "#3B3B3B", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "2.6rem", "right": "3.1rem", "bottom": "2.5rem", "left": "3.1rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": ".85rem", "field": ".12rem", "header": ".65rem"}}'::json,
        '["professional", "classic", "minimal", "gray", "single-column", "accounting", "finance", "centered-header"]'::jsonb,
        $search_text$Silver Account Identity Jane Doe Name JANE DOE Title Professional Accountant Contact Contact details Phone (414) 555-0181 Email jane.doe@example.com Location Milwaukee, WI Profile ABOUT ME About Jane Summary Detail-oriented accountant who brings clarity to financial reporting and day-to-day controls. Experienced in reconciliations, audit preparation, and practical process improvements. Values accurate records, dependable deadlines, and clear explanations that help colleagues make informed decisions. Education EDUCATION Lakehaven University School Lakehaven University Degree M.S. Accounting Dates 2017–2019 Details Focused on assurance, financial reporting, and applied research. Completed a capstone examining internal controls in growing service organizations. Elmbridge College School Elmbridge College Degree B.S. Accounting Dates 2013–2017 Details Built a foundation in financial analysis, taxation, and business law. Supported a student-led program helping community groups organize their records. Experience WORK EXPERIENCE Oakmere Advisory Company Oakmere Advisory | 2022–Present Job title Senior Accountant Description Manage monthly reporting for a portfolio of service businesses. Review reconciliations, prepare supporting schedules, and work with client teams to resolve discrepancies. Introduced a close checklist that reduced late adjustments by 28%. Fieldstone Commerce Company Fieldstone Commerce | 2019–2022 Job title Financial Accountant Description Prepared journal entries, maintained fixed-asset records, and supported quarterly financial reviews. Improved the organization of audit evidence and documented recurring processes to make handoffs clearer and more consistent. Skills SKILLS Accounting skills Auditing Auditing Account reconciliation Account reconciliation Financial reporting Financial reporting Financial accounting Financial accounting Internal controls Internal controls Budget analysis Budget analysis$search_text$,
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

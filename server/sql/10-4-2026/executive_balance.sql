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
      "letterSpacing": "1px",
      "border": {
        "bottom": {
          "display": true,
          "width": "82%",
          "height": "2px",
          "style": "solid",
          "color": "#333333"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0rem",
        "bottom": ".95rem"
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
                    "fontSizeOffset": 17,
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
            "label": "Contact",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "(617) 555-0139 · jane.doe@example.com · janedoe.example.com",
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
            "label": "Address",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "42 Maple Avenue, Boston, MA 02118",
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
        "textAlign": "center",
        "children": [
          {
            "text": "BUSINESS OPERATIONS MANAGER",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Leadership profile",
        "fields": [
          {
            "label": "Summary",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Business operations leader with a record of improving service delivery, financial discipline, and team performance across distributed organizations. Brings hands-on experience in planning, process design, and manager development. Builds clear operating rhythms that connect customer needs with measurable business results.",
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
    "label": "Expertise",
    "type": "skills",
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
        "columns": 3
      },
      "padding": {
        "top": ".9rem",
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "center",
        "children": [
          {
            "text": "STRENGTHS AND EXPERTISE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Core expertise",
        "fields": [
          {
            "label": "P&L Management",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "P&L Management",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Financial Reporting",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Financial Reporting",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Team Leadership",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Team Leadership",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Business Development",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Business Development",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Negotiation",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Negotiation",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Communication",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Communication",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Strategic Planning",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Strategic Planning",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Client Partnerships",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Client Partnerships",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {},
            "layout": {}
          },
          {
            "label": "Operations Management",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Operations Management",
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
    "styling": {},
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
        "textAlign": "center",
        "children": [
          {
            "text": "PROFESSIONAL EXPERIENCE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Brackenridge Service Group",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Brackenridge Service Group",
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
                    "text": "October 2021 – Present",
                    "fontSizeOffset": -0.5,
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
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Operations Manager",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
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
            "label": "Overview",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Oversee daily operations for a regional service network of 85 employees. Partner with finance and delivery leaders to improve capacity planning, customer retention, and operating consistency.",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Accomplishments:",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              },
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Raised on-time service delivery from 87% to 96% through clearer scheduling and escalation practices.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced monthly performance reviews linking budgets, staffing, and service-level commitments.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Reduced supplier spend by 12% while maintaining quality and response-time targets.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Coached eight team leads and introduced practical onboarding guides for new managers.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Standardized customer handoffs, reducing repeat service requests by 18%.",
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
        "label": "Willowgate Business Solutions",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Willowgate Business Solutions",
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
                    "text": "August 2017 – September 2021",
                    "fontSizeOffset": -0.5,
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
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Business Development Manager",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
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
            "label": "Overview",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Expanded a regional client portfolio through consultative sales and coordinated implementation. Worked closely with delivery teams to ensure new agreements translated into reliable service.",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Accomplishments:",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              },
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Grew annual recurring revenue by 31% through targeted partnerships and account development.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Created proposal templates that shortened preparation time and clarified implementation scope.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Built a shared pipeline review process with documented next steps and accountable owners.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Improved renewal conversations with quarterly business reviews and clear outcome reporting.",
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
        1, NULL, 'Executive Balance',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "10.8px", "lineHeight": 1.25, "color": "#3B3B3B", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "2.3rem", "right": "3.1rem", "bottom": "2.5rem", "left": "3.1rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": "1.1rem", "field": ".12rem", "header": ".65rem"}}'::json,
        '["professional", "classic", "executive", "minimal", "single-column", "operations", "management", "centered-header"]'::jsonb,
        $search_text$Executive Balance Identity Jane Doe Name JANE DOE Contact (617) 555-0139 · jane.doe@example.com · janedoe.example.com Address 42 Maple Avenue, Boston, MA 02118 Profile BUSINESS OPERATIONS MANAGER Leadership profile Summary Business operations leader with a record of improving service delivery, financial discipline, and team performance across distributed organizations. Brings hands-on experience in planning, process design, and manager development. Builds clear operating rhythms that connect customer needs with measurable business results. Expertise STRENGTHS AND EXPERTISE Core expertise P&L Management P&L Management Financial Reporting Financial Reporting Team Leadership Team Leadership Business Development Business Development Negotiation Negotiation Communication Communication Strategic Planning Strategic Planning Client Partnerships Client Partnerships Operations Management Operations Management Experience PROFESSIONAL EXPERIENCE Brackenridge Service Group Company Brackenridge Service Group Dates October 2021 – Present Job title Operations Manager Overview Oversee daily operations for a regional service network of 85 employees. Partner with finance and delivery leaders to improve capacity planning, customer retention, and operating consistency. Description Accomplishments: Raised on-time service delivery from 87% to 96% through clearer scheduling and escalation practices.Introduced monthly performance reviews linking budgets, staffing, and service-level commitments.Reduced supplier spend by 12% while maintaining quality and response-time targets.Coached eight team leads and introduced practical onboarding guides for new managers.Standardized customer handoffs, reducing repeat service requests by 18%. Willowgate Business Solutions Company Willowgate Business Solutions Dates August 2017 – September 2021 Job title Business Development Manager Overview Expanded a regional client portfolio through consultative sales and coordinated implementation. Worked closely with delivery teams to ensure new agreements translated into reliable service. Description Accomplishments: Grew annual recurring revenue by 31% through targeted partnerships and account development.Created proposal templates that shortened preparation time and clarified implementation scope.Built a shared pipeline review process with documented next steps and accountable owners.Improved renewal conversations with quarterly business reviews and clear outcome reporting.$search_text$,
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

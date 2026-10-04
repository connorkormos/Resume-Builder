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
        "top": "0rem",
        "bottom": "1rem"
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
                    "text": "Jane Doe",
                    "fontSizeOffset": 16,
                    "lineHeightOffset": 0
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
                    "text": "(404) 555-0184 · jane.doe@example.com",
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
                "textAlign": "center",
                "children": [
                  {
                    "text": "Atlanta, GA · janedoe.example.com",
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
      },
      "fontFamily": "Georgia, Times New Roman, serif"
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
        "textAlign": "center",
        "children": [
          {
            "text": "OPERATIONS MANAGER",
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
                    "text": "Operations manager improving service quality, team coordination, and financial discipline across growing organizations. Experienced in regional delivery networks and recurring service models. Creates clear operating routines, develops capable managers, and turns customer feedback into practical improvements that teams can sustain.",
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
      },
      "fontFamily": "Georgia, Times New Roman, serif"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
      },
      "padding": {
        "top": "1rem",
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "center",
        "children": [
          {
            "text": "KEY COMPETENCIES",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Key competencies",
        "fields": [
          {
            "label": "P&L management",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "P&L management",
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
            "label": "Financial reporting",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Financial reporting",
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
            "label": "Team leadership",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Team leadership",
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
            "label": "Strategic planning",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Strategic planning",
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
            "label": "Client partnerships",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Client partnerships",
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
            "label": "Business development",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Business development",
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
            "label": "Operations management",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Operations management",
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
      "fontFamily": "Georgia, Times New Roman, serif"
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
        "label": "Crestwell Service Partners",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Crestwell Service Partners",
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
                    "text": "Lead a regional service operation spanning six locations and 70 employees. Coordinate capacity, budgets, and customer commitments while supporting managers through periods of growth.",
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
                        "text": "Improved on-time delivery from 89% to 97% by aligning staffing forecasts with weekly demand.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Established a shared dashboard that connected service measures with financial results.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Reduced rework by 16% through clearer handoffs and documented quality checks.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced manager coaching sessions and role-specific onboarding guides.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Renegotiated recurring supplier agreements, lowering annual costs by $185,000.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Built a customer escalation process with clear ownership and response targets.",
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
        "label": "Ashford Business Group",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Ashford Business Group",
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
                    "text": "November 2018 – September 2021",
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
                    "text": "Managed regional account growth and coordinated new-client onboarding. Worked with service leads to set realistic commitments and build durable commercial relationships.",
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
                        "text": "Increased recurring revenue by 27% through targeted partnerships and account expansion.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Created a proposal review process that clarified scope, pricing, and delivery responsibilities.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced quarterly account reviews to identify risks and opportunities earlier.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Improved renewal preparation with documented outcomes and coordinated follow-up.",
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
        1, NULL, 'Stonebridge Brief',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11px", "lineHeight": 1.3, "color": "#3B3B3B", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "2.5rem", "right": "3.1rem", "bottom": "2.5rem", "left": "3.1rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": "1rem", "field": ".12rem", "header": ".65rem"}}'::json,
        '["professional", "classic", "elegant", "serif", "single-column", "operations", "management", "centered-header"]'::jsonb,
        $search_text$Stonebridge Brief Identity Jane Doe Name Jane Doe Contact (404) 555-0184 · jane.doe@example.com Location Atlanta, GA · janedoe.example.com Profile OPERATIONS MANAGER Leadership profile Summary Operations manager improving service quality, team coordination, and financial discipline across growing organizations. Experienced in regional delivery networks and recurring service models. Creates clear operating routines, develops capable managers, and turns customer feedback into practical improvements that teams can sustain. Expertise KEY COMPETENCIES Key competencies P&L management P&L management Financial reporting Financial reporting Team leadership Team leadership Strategic planning Strategic planning Negotiation Negotiation Communication Communication Client partnerships Client partnerships Business development Business development Operations management Operations management Experience PROFESSIONAL EXPERIENCE Crestwell Service Partners Company Crestwell Service Partners Dates October 2021 – Present Job title Operations Manager Overview Lead a regional service operation spanning six locations and 70 employees. Coordinate capacity, budgets, and customer commitments while supporting managers through periods of growth. Description Accomplishments: Improved on-time delivery from 89% to 97% by aligning staffing forecasts with weekly demand.Established a shared dashboard that connected service measures with financial results.Reduced rework by 16% through clearer handoffs and documented quality checks.Introduced manager coaching sessions and role-specific onboarding guides.Renegotiated recurring supplier agreements, lowering annual costs by $185,000.Built a customer escalation process with clear ownership and response targets. Ashford Business Group Company Ashford Business Group Dates November 2018 – September 2021 Job title Business Development Manager Overview Managed regional account growth and coordinated new-client onboarding. Worked with service leads to set realistic commitments and build durable commercial relationships. Description Accomplishments: Increased recurring revenue by 27% through targeted partnerships and account expansion.Created a proposal review process that clarified scope, pricing, and delivery responsibilities.Introduced quarterly account reviews to identify risks and opportunities earlier.Improved renewal preparation with documented outcomes and coordinated follow-up.$search_text$,
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

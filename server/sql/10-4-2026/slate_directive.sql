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
      "color": "#4F5C60"
    },
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
        "label": "John Doe",
        "fields": [
          {
            "label": "Name",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "JOHN DOE",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "Senior Marketing Director",
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
      "backgroundColor": "#DDE1E1",
      "color": "#4F5C60"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
      },
      "padding": {
        "top": ".4rem",
        "bottom": ".4rem"
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
                    "text": " (206) 555-0142",
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
                    "text": " john.doe@example.com",
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
                    "text": " Seattle, WA",
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
    "label": "Summary",
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
        "top": "1rem",
        "bottom": ".9rem"
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "Marketing leader with 12 years of experience connecting brand strategy, demand generation, and customer insight. Builds collaborative teams and practical measurement systems that turn ambitious growth plans into consistent results. Experienced in launching software products and strengthening established B2B brands.",
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
        "top": ".9rem",
        "bottom": ".9rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
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
        "label": "Northhaven Software | Seattle, WA",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Northhaven Software | Seattle, WA",
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
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Director of Marketing",
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
                    "text": "January 2021 – Present",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "italic": true
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
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Led three product launches that generated $4.2M in first-year contracted revenue.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Managed a team of 12 across content, design, demand generation, and marketing operations.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Improved qualified pipeline conversion by 21% through shared sales and marketing reporting.",
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
      },
      {
        "label": "Juniper Lane Agency | Portland, OR",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Juniper Lane Agency | Portland, OR",
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
            "label": "Job title",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Senior Marketing Manager",
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
                    "text": "March 2016 – December 2020",
                    "fontSizeOffset": -0.5,
                    "lineHeightOffset": 0,
                    "italic": true
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
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Developed integrated campaigns for technology and professional-service clients.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Increased organic inquiries by 64% through focused content and search improvements.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Coordinated an annual customer forum attended by more than 900 industry professionals.",
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
        "top": ".9rem",
        "bottom": ".9rem"
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
        "label": "Cascade State University",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cascade State University",
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
                    "text": "MBA, Marketing Strategy",
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
                    "text": "2014–2016",
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
                    "text": "Graduate project: customer segmentation for emerging software businesses.",
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
        "label": "Westbrook College",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Westbrook College",
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
                    "text": "B.S. Business Administration",
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
                    "text": "2010–2014",
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
                    "text": "Concentration in marketing and organizational communication.",
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
        "label": "Core capabilities",
        "fields": [
          {
            "label": "Strategic planning",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
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
            "label": "B2B marketing",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "B2B marketing",
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
            "label": "Budget management",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Budget management",
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
            "label": "SEO and content",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "SEO and content",
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
                "textAlign": "left",
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
            "label": "Marketing analytics",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Marketing analytics",
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
        1, NULL, 'Slate Directive',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11px", "lineHeight": 1.3, "color": "#3B3B3B", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "2.5rem", "right": "3.1rem", "bottom": "2.5rem", "left": "3.1rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": ".7rem", "field": ".12rem", "header": ".65rem"}}'::json,
        '["professional", "modern", "gray", "single-column", "marketing", "executive"]'::jsonb,
        $search_text$Slate Directive Identity John Doe Name JOHN DOE Title Senior Marketing Director Contact Contact details Phone (206) 555-0142 Email john.doe@example.com Location Seattle, WA Summary PROFESSIONAL SUMMARY Professional summary Summary Marketing leader with 12 years of experience connecting brand strategy, demand generation, and customer insight. Builds collaborative teams and practical measurement systems that turn ambitious growth plans into consistent results. Experienced in launching software products and strengthening established B2B brands. Experience PROFESSIONAL EXPERIENCE Northhaven Software | Seattle, WA Company Northhaven Software | Seattle, WA Job title Director of Marketing Dates January 2021 – Present Description Led three product launches that generated $4.2M in first-year contracted revenue.Managed a team of 12 across content, design, demand generation, and marketing operations.Improved qualified pipeline conversion by 21% through shared sales and marketing reporting. Juniper Lane Agency | Portland, OR Company Juniper Lane Agency | Portland, OR Job title Senior Marketing Manager Dates March 2016 – December 2020 Description Developed integrated campaigns for technology and professional-service clients.Increased organic inquiries by 64% through focused content and search improvements.Coordinated an annual customer forum attended by more than 900 industry professionals. Education EDUCATION Cascade State University School Cascade State University Degree MBA, Marketing Strategy Dates 2014–2016 Details Graduate project: customer segmentation for emerging software businesses. Westbrook College School Westbrook College Degree B.S. Business Administration Dates 2010–2014 Details Concentration in marketing and organizational communication. Skills SKILLS Core capabilities Strategic planning Strategic planning B2B marketing B2B marketing Budget management Budget management SEO and content SEO and content Team leadership Team leadership Marketing analytics Marketing analytics$search_text$,
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

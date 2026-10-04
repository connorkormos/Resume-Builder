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
      "letterSpacing": "2px",
      "color": "#686D70",
      "border": {
        "right": {
          "display": true,
          "width": "1px",
          "height": "100%",
          "style": "solid",
          "color": "#D0D2D3"
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "JANE",
                    "fontSizeOffset": 17,
                    "lineHeightOffset": 0
                  }
                ]
              },
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "DOE",
                    "fontSizeOffset": 17,
                    "lineHeightOffset": 0
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
                    "text": "MARKETING MANAGER",
                    "fontSizeOffset": -0.5,
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
        },
        "right": {
          "display": true,
          "width": "1px",
          "height": "100%",
          "style": "solid",
          "color": "#D0D2D3"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": ".8rem",
        "bottom": "1rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "PROFILE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Professional profile",
        "fields": [
          {
            "label": "Summary",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Marketing manager combining audience research, brand storytelling, and disciplined campaign delivery. Develops practical plans that help growing organizations reach the right customers. Known for collaborative working relationships, thoughtful creative briefs, and clear performance reporting.",
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
        "right": {
          "display": true,
          "width": "1px",
          "height": "100%",
          "style": "solid",
          "color": "#D0D2D3"
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
        "bottom": "0rem"
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
        "label": "Meadowline Consumer Brands",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Meadowline Consumer Brands",
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
                    "text": "Marketing Manager",
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
                    "text": "2022–Present",
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
                        "text": "Own the annual marketing plan and budget for a growing home-goods portfolio.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Translate audience research into product stories and coordinated launch campaigns.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Partner with sales and creative teams to improve retail and digital consistency.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced campaign reviews that reduced ineffective media spend by 17%.",
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
        "label": "Harborwell Creative",
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Harborwell Creative",
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
                    "text": "Marketing Specialist",
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
                    "text": "2018–2022",
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
                        "text": "Coordinated campaigns for regional lifestyle and hospitality clients.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Maintained editorial calendars, production schedules, and partner relationships.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Built monthly reports connecting campaign activity to inquiries and conversions.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Helped launch a referral program that brought in 140 new customer accounts.",
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
    "label": "Contact",
    "type": "defaultSection",
    "columnPosition": 1,
    "showHeading": false,
    "styling": {},
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
                    "text": " (503) 555-0173",
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
                    "text": " Portland, OR",
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
            "label": "Website",
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
                    "iconId": "globe",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  },
                  {
                    "text": " janedoe.example.com",
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
    "label": "Education",
    "type": "education",
    "columnPosition": 1,
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
        "top": ".8rem",
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
        "label": "Willow Coast University",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Willow Coast University",
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
                    "text": "M.S. Marketing",
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
                    "text": "2016–2018",
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
                    "text": "Focus: consumer research.",
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
        "label": "Briarfield College",
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Briarfield College",
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
                    "text": "B.A. Communication",
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
                    "text": "2012–2016",
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
                    "text": "Graduated with honors.",
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
    "columnPosition": 1,
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
        "label": "Marketing skills",
        "fields": [
          {
            "label": "Project management",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Project management",
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
            "label": "Public relations",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Public relations",
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
            "label": "Team collaboration",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Team collaboration",
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
            "label": "Time management",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Time management",
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
            "label": "Campaign planning",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Campaign planning",
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
            "label": "Clear communication",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Clear communication",
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
            "label": "Critical thinking",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Critical thinking",
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
    "label": "References",
    "type": "defaultSection",
    "columnPosition": 1,
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
            "text": "REFERENCES",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Availability",
        "fields": [
          {
            "label": "Reference information",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Professional references available upon request.",
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
    "label": "Languages",
    "type": "defaultSection",
    "columnPosition": 1,
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
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
            "text": "LANGUAGES",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Languages",
        "fields": [
          {
            "label": "English",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "English — fluent",
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
            "label": "French",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "French — conversational",
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
            "label": "German",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "German — basic",
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
        1, NULL, 'Pearl Partition',
        '{"display": "flex", "fontFamily": "Arial, Helvetica, sans-serif", "fontSize": "11px", "lineHeight": 1.3, "color": "#3B3B3B", "backgroundColor": "#FFFFFF"}'::json,
        '{"padding": {"top": "2.6rem", "right": "1.6rem", "bottom": "2.5rem", "left": "2.4rem"}, "gap": {"horizontal": "0rem", "vertical": "0rem", "subsection": ".75rem", "field": ".12rem", "header": ".65rem"}}'::json,
        '["professional", "modern", "minimal", "gray", "two-column", "sidebar", "marketing"]'::jsonb,
        $search_text$Pearl Partition Identity Jane Doe Name JANE DOE Title MARKETING MANAGER Profile PROFILE Professional profile Summary Marketing manager combining audience research, brand storytelling, and disciplined campaign delivery. Develops practical plans that help growing organizations reach the right customers. Known for collaborative working relationships, thoughtful creative briefs, and clear performance reporting. Experience WORK EXPERIENCE Meadowline Consumer Brands Company Meadowline Consumer Brands Job title Marketing Manager Dates 2022–Present Description Own the annual marketing plan and budget for a growing home-goods portfolio.Translate audience research into product stories and coordinated launch campaigns.Partner with sales and creative teams to improve retail and digital consistency.Introduced campaign reviews that reduced ineffective media spend by 17%. Harborwell Creative Company Harborwell Creative Job title Marketing Specialist Dates 2018–2022 Description Coordinated campaigns for regional lifestyle and hospitality clients.Maintained editorial calendars, production schedules, and partner relationships.Built monthly reports connecting campaign activity to inquiries and conversions.Helped launch a referral program that brought in 140 new customer accounts. Contact Contact details Phone (503) 555-0173 Email jane.doe@example.com Location Portland, OR Website janedoe.example.com Education EDUCATION Willow Coast University School Willow Coast University Degree M.S. Marketing Dates 2016–2018 Details Focus: consumer research. Briarfield College School Briarfield College Degree B.A. Communication Dates 2012–2016 Details Graduated with honors. Skills SKILLS Marketing skills Project management Project management Public relations Public relations Team collaboration Team collaboration Time management Time management Campaign planning Campaign planning Clear communication Clear communication Critical thinking Critical thinking References REFERENCES Availability Reference information Professional references available upon request. Languages LANGUAGES Languages English English — fluent French French — conversational German German — basic$search_text$,
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
        (0, '{"width": {"auto": false, "value": "62%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "1rem", "right": "1rem"}}'::json),
        (1, '{"width": {"auto": false, "value": "38%"}, "padding": {"top": "0rem", "bottom": "0rem", "left": "1rem", "right": "1rem"}}'::json)
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

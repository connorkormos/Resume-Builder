-- Editorial Line | Owner: 13 | Run this entire file in pgAdmin.
-- One atomic statement creates one template. All sample details are fictional.
-- ATS tags describe design intent, not guaranteed compatibility.
-- Reference: Black and White Minimalist Simple Monogrammed Resume.
-- Approved: omit monogram, move headings above content, use contact row beneath identity.
-- All seven sections and fields use canonical definitions; no custom fields.
-- Validated: PostgreSQL syntax, canonical labels, required columns, local save/reload/copy.
-- One-page local editor render checked; installed fonts can affect wrapping.
-- Not executed against your database.
WITH
content AS (
    SELECT $resume_data$[
  {
    "type": "header",
    "label": "Header",
    "showHeading": false,
    "styling": {
      "backgroundColor": "#EEEEF0"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "bottom": "-0.3rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "Header",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Identity",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Name",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Jane Doe",
                    "fontSizeOffset": 17,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 103,
            "subsectionId": 102,
            "position": 0
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "WEBSITE EDITOR",
                    "fontSizeOffset": 3,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 104,
            "subsectionId": 102,
            "position": 1
          }
        ],
        "id": 102,
        "sectionId": 101,
        "position": 0
      }
    ],
    "id": 101,
    "containerId": 100,
    "position": 0,
    "containerPosition": 0
  },
  {
    "type": "contact",
    "label": "Contact",
    "showHeading": false,
    "styling": {
      "fontSizeOffset": -1,
      "backgroundColor": "#EEEEF0"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 4
      },
      "padding": {
        "top": "-0.3rem",
        "bottom": "0rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "Contact",
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
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Phone",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "(312) 555-0164",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "tel:+13125550164"
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 107,
            "subsectionId": 106,
            "position": 0
          },
          {
            "label": "Email",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "janedoe@example.com",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "mailto:janedoe@example.com"
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 108,
            "subsectionId": 106,
            "position": 1
          },
          {
            "label": "Location",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Alder Bay, IL",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 109,
            "subsectionId": 106,
            "position": 2
          },
          {
            "label": "Website",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "janedoe.example.com",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "https://janedoe.example.com"
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 110,
            "subsectionId": 106,
            "position": 3
          }
        ],
        "id": 106,
        "sectionId": 105,
        "position": 0
      }
    ],
    "id": 105,
    "containerId": 100,
    "position": 1,
    "containerPosition": 0
  },
  {
    "type": "summary",
    "label": "Summary",
    "showHeading": false,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {}
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "Summary",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Editorial profile",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Summary",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Website editor with ten years of experience shaping clear, useful digital content. Partners with writers, designers, and developers to plan accessible pages, maintain editorial standards, and improve search visibility. Uses audience research and analytics to refine content journeys while keeping complex publishing schedules organized.",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 113,
            "subsectionId": 112,
            "position": 0
          }
        ],
        "id": 112,
        "sectionId": 111,
        "position": 0
      }
    ],
    "id": 111,
    "containerId": 100,
    "position": 2,
    "containerPosition": 0
  },
  {
    "type": "skills",
    "label": "Skills",
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {}
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "SKILLS",
            "fontSizeOffset": 4,
            "lineHeightOffset": 0,
            "bold": false
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Skills 1",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Skill 1",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Content editing and proofreading",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 116,
            "subsectionId": 115,
            "position": 0
          },
          {
            "label": "Skill 2",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Search optimization",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 117,
            "subsectionId": 115,
            "position": 1
          },
          {
            "label": "Skill 3",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Content management systems",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 118,
            "subsectionId": 115,
            "position": 2
          },
          {
            "label": "Skill 4",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Editorial planning",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 119,
            "subsectionId": 115,
            "position": 3
          },
          {
            "label": "Skill 5",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Information architecture",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 120,
            "subsectionId": 115,
            "position": 4
          }
        ],
        "id": 115,
        "sectionId": 114,
        "position": 0
      },
      {
        "label": "Skills 2",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Skill 1",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Accessibility review",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 122,
            "subsectionId": 121,
            "position": 0
          },
          {
            "label": "Skill 2",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Cross-team coordination",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 123,
            "subsectionId": 121,
            "position": 1
          }
        ],
        "id": 121,
        "sectionId": 114,
        "position": 1
      }
    ],
    "id": 114,
    "containerId": 100,
    "position": 3,
    "containerPosition": 0
  },
  {
    "type": "education",
    "label": "Education",
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "86%",
          "height": "1px",
          "style": "solid",
          "color": "#888888"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {}
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "EDUCATION",
            "fontSizeOffset": 4,
            "lineHeightOffset": 0,
            "bold": false
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Alderwick University",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "M.A. Digital Media",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 126,
            "subsectionId": 125,
            "position": 0
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2014 – 2016",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 127,
            "subsectionId": 125,
            "position": 1
          },
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Alderwick University",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 128,
            "subsectionId": 125,
            "position": 2
          }
        ],
        "id": 125,
        "sectionId": 124,
        "position": 0
      },
      {
        "label": "Havenbrook College",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "B.A. English and Communication",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 130,
            "subsectionId": 129,
            "position": 0
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2010 – 2014",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 131,
            "subsectionId": 129,
            "position": 1
          },
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Havenbrook College",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 132,
            "subsectionId": 129,
            "position": 2
          }
        ],
        "id": 129,
        "sectionId": 124,
        "position": 1
      }
    ],
    "id": 124,
    "containerId": 100,
    "position": 4,
    "containerPosition": 0
  },
  {
    "type": "employment",
    "label": "Employment History",
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "86%",
          "height": "1px",
          "style": "solid",
          "color": "#888888"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {}
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "WORK",
            "fontSizeOffset": 4,
            "lineHeightOffset": 0,
            "bold": false
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Cedarline Publishing",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Website Editor",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 135,
            "subsectionId": 134,
            "position": 0
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2021 – Present",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 136,
            "subsectionId": 134,
            "position": 1
          },
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cedarline Publishing",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 137,
            "subsectionId": 134,
            "position": 2
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
                        "text": "Lead editorial planning for a portfolio of business websites, coordinating writers, designers, and subject specialists.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Maintain publishing calendars and review copy for clarity, accessibility, and consistent house style.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Use search and audience data to refresh priority pages, increasing organic visits by 22%.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 138,
            "subsectionId": 134,
            "position": 3
          }
        ],
        "id": 134,
        "sectionId": 133,
        "position": 0
      },
      {
        "label": "Harborleaf Media",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Web Producer",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 140,
            "subsectionId": 139,
            "position": 0
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2016 – 2021",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 141,
            "subsectionId": 139,
            "position": 1
          },
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Harborleaf Media",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 142,
            "subsectionId": 139,
            "position": 2
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
                        "text": "Published articles and landing pages through the content management system while coordinating production deadlines.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Checked page structure, links, and image descriptions before release and resolved issues with developers.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced a reusable editorial checklist that reduced repeat corrections and improved content consistency.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": true
              }
            },
            "id": 143,
            "subsectionId": 139,
            "position": 3
          }
        ],
        "id": 139,
        "sectionId": 133,
        "position": 1
      }
    ],
    "id": 133,
    "containerId": 100,
    "position": 5,
    "containerPosition": 0
  },
  {
    "type": "references",
    "label": "References",
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "86%",
          "height": "1px",
          "style": "solid",
          "color": "#888888"
        }
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {}
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "REFERENCES",
            "fontSizeOffset": 4,
            "lineHeightOffset": 0,
            "bold": false
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Morgan Ellis",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Name",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Morgan Ellis",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 146,
            "subsectionId": 145,
            "position": 0
          },
          {
            "label": "Phone",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "(415) 555-0132",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 147,
            "subsectionId": 145,
            "position": 1
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Marketing Director",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": false
              }
            },
            "id": 148,
            "subsectionId": 145,
            "position": 2
          },
          {
            "label": "Organization",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cedarline Publishing",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 149,
            "subsectionId": 145,
            "position": 3
          }
        ],
        "id": 145,
        "sectionId": 144,
        "position": 0
      },
      {
        "label": "Taylor Reed",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Name",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Taylor Reed",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "bold": true
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 151,
            "subsectionId": 150,
            "position": 0
          },
          {
            "label": "Phone",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "(415) 555-0176",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 152,
            "subsectionId": 150,
            "position": 1
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Lead Developer",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": true,
              "grid": {
                "fillRow": false
              }
            },
            "id": 153,
            "subsectionId": 150,
            "position": 2
          },
          {
            "label": "Organization",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Harborleaf Media",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  }
                ]
              }
            ],
            "styling": {
              "fontSizeOffset": 0,
              "lineHeightOffset": 0
            },
            "layout": {
              "startNewRow": false,
              "grid": {
                "fillRow": false
              }
            },
            "id": 154,
            "subsectionId": 150,
            "position": 3
          }
        ],
        "id": 150,
        "sectionId": 144,
        "position": 1
      }
    ],
    "id": 144,
    "containerId": 100,
    "position": 6,
    "containerPosition": 0
  }
]$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout, tags, plain_text,
        is_official_template, view_count, copy_count, created_at, updated_at
    )
    VALUES (
        13, NULL, 'Editorial Line',
        $styling${
  "display": "flex",
  "fontFamily": "Georgia, serif",
  "fontSize": "10px",
  "lineHeight": 1.3,
  "color": "#383838",
  "backgroundColor": "#FFFFFF"
}$styling$::json,
        $layout${
  "padding": {
    "top": "2rem",
    "right": "2.5rem",
    "bottom": "2rem",
    "left": "2.5rem"
  },
  "gap": {
    "horizontal": "0rem",
    "vertical": "0rem",
    "section": "0.35rem",
    "subsection": "0.35rem",
    "field": "0.05rem",
    "header": "0.35rem"
  }
}$layout$::json,
        $tags$[
  "simple",
  "clean",
  "minimal",
  "minimalist",
  "professional",
  "classic",
  "elegant",
  "pretty",
  "modern",
  "black and white",
  "monochrome",
  "neutral",
  "white background",
  "sans serif",
  "readable",
  "print friendly",
  "text based",
  "ats",
  "ats friendly",
  "ats-friendly",
  "single column",
  "single-column",
  "one column",
  "one-column",
  "single column resume",
  "one page",
  "one-page",
  "single page",
  "full width",
  "full width header",
  "horizontal rules",
  "thin dividers",
  "cv",
  "curriculum vitae",
  "resume",
  "professional summary",
  "employment history",
  "education",
  "skills",
  "chronological",
  "reverse chronological",
  "black and white minimalist simple monogrammed resume",
  "website editor",
  "web editor",
  "editor",
  "editorial",
  "publishing",
  "digital publishing",
  "content editor",
  "content manager",
  "web producer",
  "content production",
  "copy editing",
  "proofreading",
  "seo",
  "search optimization",
  "content strategy",
  "content management systems",
  "cms",
  "editorial calendar",
  "information architecture",
  "accessibility",
  "analytics",
  "audience research",
  "digital media",
  "communications",
  "media",
  "writing",
  "writer",
  "serif",
  "georgia",
  "shaded header",
  "references",
  "stacked references",
  "experienced professional",
  "senior professional",
  "content marketing",
  "digital content"
]$tags$::jsonb,
        $search_text$Editorial Line Header Header Identity Name Jane Doe Role WEBSITE EDITOR Contact Contact Contact details Phone (312) 555-0164 Email janedoe@example.com Location Alder Bay, IL Website janedoe.example.com Summary Summary Editorial profile Summary Website editor with ten years of experience shaping clear, useful digital content. Partners with writers, designers, and developers to plan accessible pages, maintain editorial standards, and improve search visibility. Uses audience research and analytics to refine content journeys while keeping complex publishing schedules organized. Skills SKILLS Skills 1 Skill 1 Content editing and proofreading Skill 2 Search optimization Skill 3 Content management systems Skill 4 Editorial planning Skill 5 Information architecture Skills 2 Skill 1 Accessibility review Skill 2 Cross-team coordination Education EDUCATION Alderwick University Degree M.A. Digital Media Dates 2014 – 2016 School Alderwick University Havenbrook College Degree B.A. English and Communication Dates 2010 – 2014 School Havenbrook College Employment History WORK Cedarline Publishing Role Website Editor Dates 2021 – Present Company Cedarline Publishing Description Lead editorial planning for a portfolio of business websites, coordinating writers, designers, and subject specialists.Maintain publishing calendars and review copy for clarity, accessibility, and consistent house style.Use search and audience data to refresh priority pages, increasing organic visits by 22%. Harborleaf Media Role Web Producer Dates 2016 – 2021 Company Harborleaf Media Description Published articles and landing pages through the content management system while coordinating production deadlines.Checked page structure, links, and image descriptions before release and resolved issues with developers.Introduced a reusable editorial checklist that reduced repeat corrections and improved content consistency. References REFERENCES Morgan Ellis Name Morgan Ellis Phone (415) 555-0132 Role Marketing Director Organization Cedarline Publishing Taylor Reed Name Taylor Reed Phone (415) 555-0176 Role Lead Developer Organization Harborleaf Media$search_text$,
        TRUE, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    RETURNING id, title, user_id, is_official_template
),
new_container AS (
    INSERT INTO containers (
        resume_id, type, span_full_page, position, styling, layout, created_at, updated_at
    )
    SELECT r.id, c.type, c.span_full_page, c.position, '{}'::json, c.layout,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM new_resume r
    CROSS JOIN (VALUES
        (0, 'column', FALSE, $container_0${"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_0$::json)
    ) AS c(position, type, span_full_page, layout)
    RETURNING id, position
),
section_data AS (
    SELECT (s.item->>'containerPosition')::integer AS container_position,
        (row_number() OVER (PARTITION BY s.item->>'containerPosition' ORDER BY s.ordinality) - 1)::integer AS position,
        s.item
    FROM content
    CROSS JOIN LATERAL jsonb_array_elements(content.sections)
        WITH ORDINALITY AS s(item, ordinality)
),
new_sections AS (
    INSERT INTO sections (
        container_id, label, type, value, show_heading, position,
        styling, layout, created_at, updated_at
    )
    SELECT c.id, s.item->>'label', s.item->>'type', (s.item->'value')::json,
        (s.item->>'showHeading')::boolean, s.position,
        (s.item->'styling')::json, (s.item->'layout')::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM section_data s
    JOIN new_container c ON c.position = s.container_position
    RETURNING id, container_id, position
),
subsection_data AS (
    SELECT s.id AS section_id, (sub.ordinality - 1)::integer AS position, sub.item
    FROM new_sections s
    JOIN new_container c ON c.id = s.container_id
    JOIN section_data d ON d.container_position = c.position AND d.position = s.position
    CROSS JOIN LATERAL jsonb_array_elements(d.item->'subsections')
        WITH ORDINALITY AS sub(item, ordinality)
),
new_subsections AS (
    INSERT INTO subsections (
        section_id, label, position, styling, layout, created_at, updated_at
    )
    SELECT section_id, item->>'label', position,
        (item->'styling')::json, (item->'layout')::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM subsection_data
    RETURNING id, section_id, position
),
new_fields AS (
    INSERT INTO fields (
        subsection_id, label, value, position, styling, layout, created_at, updated_at
    )
    SELECT sub.id, f.item->>'label', (f.item->'value')::json,
        (f.ordinality - 1)::integer, (f.item->'styling')::json, (f.item->'layout')::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM new_subsections sub
    JOIN subsection_data d ON d.section_id = sub.section_id AND d.position = sub.position
    CROSS JOIN LATERAL jsonb_array_elements(d.item->'fields')
        WITH ORDINALITY AS f(item, ordinality)
    RETURNING id
)
SELECT id AS resume_id, title, user_id, is_official_template,
       (SELECT count(*) FROM new_container) AS containers_created,
       (SELECT count(*) FROM new_sections) AS sections_created,
       (SELECT count(*) FROM new_subsections) AS subsections_created,
       (SELECT count(*) FROM new_fields) AS fields_created
FROM new_resume;

-- Market Triptych | Owner: 13 | Run this entire file in pgAdmin.
-- One atomic statement creates one template. All sample details are fictional.
-- ATS tags describe design intent, not guaranteed compatibility.
-- Reference: White and Black Simple Resume.
-- Approved: conventional job/education entries replace narrow company/date rails.
-- Three-column footer retained. Seven canonical section types; no custom fields.
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
      "width": "100%"
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
                    "text": "Marketing Manager",
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
      "width": "100%"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
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
    "containerPosition": 1
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
      },
      "width": "100%"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {
        "top": "0.6rem",
        "bottom": "0.6rem"
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
        "label": "Maplecrest Digital",
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
                    "text": "Product Marketing Manager",
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
            "id": 112,
            "subsectionId": 111,
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
                    "text": "2023 – Present",
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
            "subsectionId": 111,
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
                    "text": "Maplecrest Digital",
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
            "id": 114,
            "subsectionId": 111,
            "position": 2
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Lead positioning and launch plans for a workflow software portfolio. Coordinate customer research, sales materials, and campaign delivery across product and creative teams. Improved trial-to-demo conversion by 18% through clearer audience targeting and landing-page messaging.",
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
            "id": 115,
            "subsectionId": 111,
            "position": 3
          }
        ],
        "id": 111,
        "sectionId": 110,
        "position": 0
      },
      {
        "label": "Westhaven Commerce",
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
                    "text": "Marketing Manager",
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
            "id": 117,
            "subsectionId": 116,
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
                    "text": "2020 – 2023",
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
            "id": 118,
            "subsectionId": 116,
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
                    "text": "Westhaven Commerce",
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
            "id": 119,
            "subsectionId": 116,
            "position": 2
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Managed integrated email, social, and partner campaigns for a growing business-services brand. Tracked channel performance, refined campaign briefs, and coordinated external designers. Increased qualified enquiries by 24% while keeping delivery within budget.",
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
            "id": 120,
            "subsectionId": 116,
            "position": 3
          }
        ],
        "id": 116,
        "sectionId": 110,
        "position": 1
      },
      {
        "label": "Brookmere Studio",
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
                    "text": "Marketing Coordinator",
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
            "id": 122,
            "subsectionId": 121,
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
                    "text": "2018 – 2020",
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
            "id": 123,
            "subsectionId": 121,
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
                    "text": "Brookmere Studio",
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
            "id": 124,
            "subsectionId": 121,
            "position": 2
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Supported campaign scheduling, content production, and monthly reporting. Maintained contact segments and coordinated promotional assets with sales colleagues. Introduced a shared planning calendar that made deadlines and approvals easier to track.",
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
            "id": 125,
            "subsectionId": 121,
            "position": 3
          }
        ],
        "id": 121,
        "sectionId": 110,
        "position": 2
      }
    ],
    "id": 110,
    "containerId": 100,
    "position": 2,
    "containerPosition": 2
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
      },
      "width": "100%"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 2
      },
      "padding": {
        "top": "0.6rem",
        "bottom": "0.6rem"
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
        "label": "Maplecrest University",
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
                    "text": "Master of Business Administration",
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
            "id": 128,
            "subsectionId": 127,
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
                    "text": "2016 – 2018",
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
            "id": 129,
            "subsectionId": 127,
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
                    "text": "Maplecrest University",
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
            "id": 130,
            "subsectionId": 127,
            "position": 2
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Concentration in marketing strategy and business analytics. Capstone examined customer retention for a subscription service.",
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
            "id": 131,
            "subsectionId": 127,
            "position": 3
          }
        ],
        "id": 127,
        "sectionId": 126,
        "position": 0
      },
      {
        "label": "Westhaven College",
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
                    "text": "B.A. Marketing and Commerce",
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
            "id": 133,
            "subsectionId": 132,
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
                    "text": "2012 – 2016",
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
            "id": 134,
            "subsectionId": 132,
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
                    "text": "Westhaven College",
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
            "id": 135,
            "subsectionId": 132,
            "position": 2
          },
          {
            "label": "Description",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Studied consumer behavior, market research, and campaign planning. Completed a team project developing a launch strategy for a local enterprise.",
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
            "id": 136,
            "subsectionId": 132,
            "position": 3
          }
        ],
        "id": 132,
        "sectionId": 126,
        "position": 1
      }
    ],
    "id": 126,
    "containerId": 100,
    "position": 3,
    "containerPosition": 3
  },
  {
    "type": "skills",
    "label": "Skills",
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
      },
      "fontSizeOffset": -1
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0.6rem",
        "left": "0.6rem",
        "right": "0.6rem"
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
                        "text": "Campaign management",
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
            "id": 139,
            "subsectionId": 138,
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
                        "text": "Creative direction",
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
            "id": 140,
            "subsectionId": 138,
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
                        "text": "Digital marketing",
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
            "id": 141,
            "subsectionId": 138,
            "position": 2
          }
        ],
        "id": 138,
        "sectionId": 137,
        "position": 0
      }
    ],
    "id": 137,
    "containerId": 100,
    "position": 4,
    "containerPosition": 4
  },
  {
    "type": "languages",
    "label": "Languages",
    "showHeading": true,
    "styling": {
      "border": {
        "top": {
          "display": true,
          "width": "86%",
          "height": "1px",
          "style": "solid",
          "color": "#888888"
        },
        "left": {
          "display": true,
          "width": "1px",
          "height": "100px",
          "style": "solid",
          "color": "#BBBBBB"
        }
      },
      "fontSizeOffset": -1
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0.6rem",
        "left": "0.6rem",
        "right": "0.6rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "LANGUAGE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "English",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Language",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "English",
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
            "id": 144,
            "subsectionId": 143,
            "position": 0
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Native",
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
            "id": 145,
            "subsectionId": 143,
            "position": 1
          }
        ],
        "id": 143,
        "sectionId": 142,
        "position": 0
      },
      {
        "label": "French",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Language",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "French",
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
            "subsectionId": 146,
            "position": 0
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Professional",
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
            "id": 148,
            "subsectionId": 146,
            "position": 1
          }
        ],
        "id": 146,
        "sectionId": 142,
        "position": 1
      },
      {
        "label": "Spanish",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Language",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Spanish",
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
            "id": 150,
            "subsectionId": 149,
            "position": 0
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Conversational",
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
            "id": 151,
            "subsectionId": 149,
            "position": 1
          }
        ],
        "id": 149,
        "sectionId": 142,
        "position": 2
      }
    ],
    "id": 142,
    "containerId": 100,
    "position": 5,
    "containerPosition": 5
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
        },
        "left": {
          "display": true,
          "width": "1px",
          "height": "100px",
          "style": "solid",
          "color": "#BBBBBB"
        }
      },
      "fontSizeOffset": -1
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0.6rem",
        "left": "0.6rem",
        "right": "0.6rem"
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
        "label": "Avery Collins",
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
                    "text": "Avery Collins",
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
            "id": 154,
            "subsectionId": 153,
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
                    "text": "Managing Director",
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
            "id": 155,
            "subsectionId": 153,
            "position": 1
          },
          {
            "label": "Organization",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Maplecrest Digital",
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
            "id": 156,
            "subsectionId": 153,
            "position": 2
          },
          {
            "label": "Phone",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "(212) 555-0183",
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
            "id": 157,
            "subsectionId": 153,
            "position": 3
          },
          {
            "label": "Email",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "avery.collins@example.com",
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
            "id": 158,
            "subsectionId": 153,
            "position": 4
          }
        ],
        "id": 153,
        "sectionId": 152,
        "position": 0
      }
    ],
    "id": 152,
    "containerId": 100,
    "position": 6,
    "containerPosition": 6
  }
]$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout, tags, plain_text,
        is_official_template, view_count, copy_count, created_at, updated_at
    )
    VALUES (
        13, NULL, 'Market Triptych',
        $styling${
  "display": "flex",
  "fontFamily": "Arial, sans-serif",
  "fontSize": "11px",
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
    "subsection": "0.45rem",
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
  "white and black simple resume",
  "marketing manager",
  "product marketing",
  "product marketing manager",
  "marketing coordinator",
  "digital marketing",
  "brand marketing",
  "brand management",
  "campaign management",
  "campaign planning",
  "customer research",
  "market research",
  "positioning",
  "messaging",
  "go to market",
  "launch planning",
  "sales enablement",
  "lead generation",
  "conversion",
  "email marketing",
  "social media",
  "content marketing",
  "analytics",
  "business administration",
  "commerce",
  "creative direction",
  "multilingual",
  "languages",
  "references",
  "three column footer",
  "three-column footer",
  "multi column",
  "multi-column",
  "hybrid layout",
  "full width body",
  "arial",
  "mid career",
  "experienced professional"
]$tags$::jsonb,
        $search_text$Market Triptych Header Header Identity Name Jane Doe Role Marketing Manager Contact Contact Contact details Phone (312) 555-0164 Email janedoe@example.com Location Alder Bay, IL Employment History WORK EXPERIENCE Maplecrest Digital Role Product Marketing Manager Dates 2023 – Present Company Maplecrest Digital Description Lead positioning and launch plans for a workflow software portfolio. Coordinate customer research, sales materials, and campaign delivery across product and creative teams. Improved trial-to-demo conversion by 18% through clearer audience targeting and landing-page messaging. Westhaven Commerce Role Marketing Manager Dates 2020 – 2023 Company Westhaven Commerce Description Managed integrated email, social, and partner campaigns for a growing business-services brand. Tracked channel performance, refined campaign briefs, and coordinated external designers. Increased qualified enquiries by 24% while keeping delivery within budget. Brookmere Studio Role Marketing Coordinator Dates 2018 – 2020 Company Brookmere Studio Description Supported campaign scheduling, content production, and monthly reporting. Maintained contact segments and coordinated promotional assets with sales colleagues. Introduced a shared planning calendar that made deadlines and approvals easier to track. Education EDUCATION Maplecrest University Degree Master of Business Administration Dates 2016 – 2018 School Maplecrest University Description Concentration in marketing strategy and business analytics. Capstone examined customer retention for a subscription service. Westhaven College Degree B.A. Marketing and Commerce Dates 2012 – 2016 School Westhaven College Description Studied consumer behavior, market research, and campaign planning. Completed a team project developing a launch strategy for a local enterprise. Skills SKILLS Skills 1 Skill 1 Campaign management Skill 2 Creative direction Skill 3 Digital marketing Languages LANGUAGE English Language English Proficiency Native French Language French Proficiency Professional Spanish Language Spanish Proficiency Conversational References REFERENCES Avery Collins Name Avery Collins Role Managing Director Organization Maplecrest Digital Phone (212) 555-0183 Email avery.collins@example.com$search_text$,
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
        (0, 'row', TRUE, $container_0${"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_0$::json),
        (1, 'row', TRUE, $container_1${"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_1$::json),
        (2, 'row', TRUE, $container_2${"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_2$::json),
        (3, 'row', TRUE, $container_3${"width": {"auto": false, "value": "100%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_3$::json),
        (4, 'column', FALSE, $container_4${"width": {"auto": false, "value": "33%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_4$::json),
        (5, 'column', FALSE, $container_5${"width": {"auto": false, "value": "33%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_5$::json),
        (6, 'column', FALSE, $container_6${"width": {"auto": false, "value": "34%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_6$::json)
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

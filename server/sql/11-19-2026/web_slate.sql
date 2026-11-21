-- Web Slate | Owner: 13 | Run this entire file in pgAdmin.
-- One atomic statement creates one template. All sample details are fictional.
-- ATS tags describe design intent, not guaranteed compatibility.
-- Reference: Black and White Simple CV Resume.
-- Approved: omit monogram, use full-width identity header, stack reference subsections.
-- Eight canonical section types; no custom fields. Shaded sidebar retained.
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
      "backgroundColor": "#EEEEF0",
      "width": "100%"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "bottom": "0.5rem"
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
                    "text": "Web Developer",
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
    "showHeading": true,
    "styling": {
      "fontSizeOffset": -0.5,
      "backgroundColor": "#EEEEF0"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "top": "0.5rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "CONTACT",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  },
                  {
                    "type": "icon",
                    "iconId": "phone",
                    "children": [
                      {
                        "text": "",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "text": " (312) 555-0164",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  },
                  {
                    "type": "icon",
                    "iconId": "email",
                    "children": [
                      {
                        "text": "",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "text": " janedoe@example.com",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0
                  },
                  {
                    "type": "icon",
                    "iconId": "location",
                    "children": [
                      {
                        "text": "",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "text": " Alder Bay, IL",
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
    "type": "skills",
    "label": "Skills",
    "showHeading": true,
    "styling": {
      "backgroundColor": "#EEEEF0",
      "fontSizeOffset": -0.5
    },
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
                        "text": "Responsive web design",
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
            "id": 112,
            "subsectionId": 111,
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
                        "text": "Interface prototyping",
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
            "id": 113,
            "subsectionId": 111,
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
                        "text": "HTML and CSS",
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
            "id": 114,
            "subsectionId": 111,
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
                        "text": "JavaScript",
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
            "id": 115,
            "subsectionId": 111,
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
                        "text": "Backend integration",
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
            "subsectionId": 111,
            "position": 4
          }
        ],
        "id": 111,
        "sectionId": 110,
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
                        "text": "Problem solving",
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
            "subsectionId": 117,
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
                        "text": "Version control",
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
            "subsectionId": 117,
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
                        "text": "Project coordination",
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
            "subsectionId": 117,
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
                        "text": "Team communication",
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
            "id": 121,
            "subsectionId": 117,
            "position": 3
          }
        ],
        "id": 117,
        "sectionId": 110,
        "position": 1
      }
    ],
    "id": 110,
    "containerId": 100,
    "position": 2,
    "containerPosition": 1
  },
  {
    "type": "education",
    "label": "Education",
    "showHeading": true,
    "styling": {
      "backgroundColor": "#EEEEF0",
      "fontSizeOffset": -0.5
    },
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
        "label": "University degree",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cedarbrook University",
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
            "id": 124,
            "subsectionId": 123,
            "position": 0
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "2015 – 2018",
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
            "id": 125,
            "subsectionId": 123,
            "position": 1
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "B.Sc. Information Technology",
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
            "id": 126,
            "subsectionId": 123,
            "position": 2
          }
        ],
        "id": 123,
        "sectionId": 122,
        "position": 0
      },
      {
        "label": "College diploma",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Westmere College",
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
                "textAlign": "left",
                "children": [
                  {
                    "text": "2013 – 2015",
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
            "id": 129,
            "subsectionId": 127,
            "position": 1
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Diploma in Web Technologies",
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
            "id": 130,
            "subsectionId": 127,
            "position": 2
          }
        ],
        "id": 127,
        "sectionId": 122,
        "position": 1
      }
    ],
    "id": 122,
    "containerId": 100,
    "position": 3,
    "containerPosition": 1
  },
  {
    "type": "languages",
    "label": "Languages",
    "showHeading": true,
    "styling": {
      "backgroundColor": "#EEEEF0",
      "fontSizeOffset": -0.5
    },
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
            "id": 133,
            "subsectionId": 132,
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
            "id": 134,
            "subsectionId": 132,
            "position": 1
          }
        ],
        "id": 132,
        "sectionId": 131,
        "position": 0
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
            "id": 136,
            "subsectionId": 135,
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
            "id": 137,
            "subsectionId": 135,
            "position": 1
          }
        ],
        "id": 135,
        "sectionId": 131,
        "position": 1
      }
    ],
    "id": 131,
    "containerId": 100,
    "position": 4,
    "containerPosition": 1
  },
  {
    "type": "summary",
    "label": "Summary",
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "left": "0.9rem",
        "top": "0.5rem"
      }
    },
    "value": [
      {
        "type": "paragraph",
        "textAlign": "left",
        "children": [
          {
            "text": "SUMMARY",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Profile",
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
                    "text": "Web developer with eight years of experience building accessible websites and maintaining reliable content platforms. Combines practical frontend skills with careful testing and clear communication. Enjoys turning complex requirements into straightforward experiences for users and editors.",
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
            "id": 140,
            "subsectionId": 139,
            "position": 0
          }
        ],
        "id": 139,
        "sectionId": 138,
        "position": 0
      }
    ],
    "id": 138,
    "containerId": 100,
    "position": 5,
    "containerPosition": 2
  },
  {
    "type": "employment",
    "label": "Employment History",
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "left": "0.9rem"
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
        "label": "Silverfern Systems",
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
                    "text": "Applications Developer",
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
            "id": 143,
            "subsectionId": 142,
            "position": 0
          },
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Silverfern Systems",
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
            "id": 144,
            "subsectionId": 142,
            "position": 1
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "2021 – Present",
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
            "id": 145,
            "subsectionId": 142,
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
                        "text": "Build responsive interfaces and connect them to application services for internal business tools.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Improved page loading by 28% through asset optimization and removal of unused scripts.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Work with designers and testers to resolve accessibility issues and document reusable components.",
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
            "id": 146,
            "subsectionId": 142,
            "position": 3
          }
        ],
        "id": 142,
        "sectionId": 141,
        "position": 0
      },
      {
        "label": "Oakbridge Learning",
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
                    "text": "Web Content Developer",
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
            "id": 148,
            "subsectionId": 147,
            "position": 0
          },
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Oakbridge Learning",
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
            "id": 149,
            "subsectionId": 147,
            "position": 1
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "2018 – 2021",
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
            "id": 150,
            "subsectionId": 147,
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
                        "text": "Maintained learning-site templates and published accessible course pages through the content platform.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Created reusable page components and supported integrations with enrollment and reporting tools.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Tested releases across browsers and helped editors resolve formatting and publishing problems.",
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
            "id": 151,
            "subsectionId": 147,
            "position": 3
          }
        ],
        "id": 147,
        "sectionId": 141,
        "position": 1
      }
    ],
    "id": 141,
    "containerId": 100,
    "position": 6,
    "containerPosition": 2
  },
  {
    "type": "references",
    "label": "References",
    "showHeading": true,
    "styling": {},
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "left": "0.9rem"
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
        "label": "Riley Bennett",
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
                    "text": "Riley Bennett",
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
                    "text": "Engineering Manager",
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
                    "text": "Silverfern Systems",
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
                    "text": "(617) 555-0137",
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
                    "text": "riley.bennett@example.com",
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
      },
      {
        "label": "Casey Morgan",
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
                    "text": "Casey Morgan",
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
            "id": 160,
            "subsectionId": 159,
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
                    "text": "Digital Learning Lead",
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
            "id": 161,
            "subsectionId": 159,
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
                    "text": "Oakbridge Learning",
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
            "id": 162,
            "subsectionId": 159,
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
                    "text": "(617) 555-0192",
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
            "id": 163,
            "subsectionId": 159,
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
                    "text": "casey.morgan@example.com",
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
            "id": 164,
            "subsectionId": 159,
            "position": 4
          }
        ],
        "id": 159,
        "sectionId": 152,
        "position": 1
      }
    ],
    "id": 152,
    "containerId": 100,
    "position": 7,
    "containerPosition": 2
  }
]$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout, tags, plain_text,
        is_official_template, view_count, copy_count, created_at, updated_at
    )
    VALUES (
        13, NULL, 'Web Slate',
        $styling${
  "display": "flex",
  "fontFamily": "Arial, sans-serif",
  "fontSize": "10.5px",
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
    "section": "0.45rem",
    "subsection": "0.5rem",
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
  "black and white simple cv resume",
  "web developer",
  "web development",
  "frontend developer",
  "front end developer",
  "applications developer",
  "software developer",
  "web content developer",
  "website development",
  "technology",
  "tech",
  "software",
  "it",
  "information technology",
  "html",
  "css",
  "javascript",
  "responsive design",
  "accessibility",
  "frontend",
  "backend integration",
  "content management",
  "cms",
  "version control",
  "git",
  "testing",
  "browser testing",
  "performance optimization",
  "user interface",
  "digital learning",
  "education technology",
  "two column",
  "two-column",
  "two columns",
  "multi column",
  "multi-column",
  "left sidebar",
  "shaded sidebar",
  "gray sidebar",
  "grey sidebar",
  "asymmetric columns",
  "wide right column",
  "narrow left column",
  "stacked references",
  "languages",
  "arial",
  "experienced professional"
]$tags$::jsonb,
        $search_text$Web Slate Header Header Identity Name Jane Doe Role Web Developer Contact CONTACT Contact details Phone (312) 555-0164 Email janedoe@example.com Location Alder Bay, IL Skills SKILLS Skills 1 Skill 1 Responsive web design Skill 2 Interface prototyping Skill 3 HTML and CSS Skill 4 JavaScript Skill 5 Backend integration Skills 2 Skill 1 Problem solving Skill 2 Version control Skill 3 Project coordination Skill 4 Team communication Education EDUCATION University degree School Cedarbrook University Dates 2015 – 2018 Degree B.Sc. Information Technology College diploma School Westmere College Dates 2013 – 2015 Degree Diploma in Web Technologies Languages LANGUAGE English Language English Proficiency Native Spanish Language Spanish Proficiency Conversational Summary SUMMARY Profile Summary Web developer with eight years of experience building accessible websites and maintaining reliable content platforms. Combines practical frontend skills with careful testing and clear communication. Enjoys turning complex requirements into straightforward experiences for users and editors. Employment History EXPERIENCE Silverfern Systems Role Applications Developer Company Silverfern Systems Dates 2021 – Present Description Build responsive interfaces and connect them to application services for internal business tools.Improved page loading by 28% through asset optimization and removal of unused scripts.Work with designers and testers to resolve accessibility issues and document reusable components. Oakbridge Learning Role Web Content Developer Company Oakbridge Learning Dates 2018 – 2021 Description Maintained learning-site templates and published accessible course pages through the content platform.Created reusable page components and supported integrations with enrollment and reporting tools.Tested releases across browsers and helped editors resolve formatting and publishing problems. References REFERENCES Riley Bennett Name Riley Bennett Role Engineering Manager Organization Silverfern Systems Phone (617) 555-0137 Email riley.bennett@example.com Casey Morgan Name Casey Morgan Role Digital Learning Lead Organization Oakbridge Learning Phone (617) 555-0192 Email casey.morgan@example.com$search_text$,
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
        (1, 'column', FALSE, $container_1${"width": {"auto": false, "value": "36%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_1$::json),
        (2, 'column', FALSE, $container_2${"width": {"auto": false, "value": "64%"}, "padding": {"top": "0rem", "right": "0rem", "bottom": "0rem", "left": "0rem"}}$container_2$::json)
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

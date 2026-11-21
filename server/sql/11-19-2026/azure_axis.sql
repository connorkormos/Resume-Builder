-- Azure Axis | Owner: 13 | Reference: Blue Simple Professional CV Resume
-- Run this entire file in pgAdmin. One atomic statement creates one template.
-- Full-width pale-blue header; 36/64 body columns; all widths explicitly manual.
-- Canonical sections and fields only. All sample identity and career details are fictional.
-- Minor simplifications: circular ornaments and flanking name lines omitted.
-- Section rules remain attached to their content; cross-column row alignment is not locked.
-- Skills use canonical numbered fields across two subsections; languages keep separate proficiency fields.
-- Exact toolbar font value: Montserrat. Requires the application's existing webfont loading.
-- Checked with Montserrat loaded in current editor components: one page, no field overflow.
-- PostgreSQL syntax, canonical labels, search text, and local model save/reload/copy validated.
-- No inserts have been executed against an external database.
WITH
content AS (
    SELECT $resume_data$[
  {
    "type": "header",
    "label": "Header",
    "showHeading": false,
    "styling": {
      "backgroundColor": "#D8E7F3",
      "color": "#405F73",
      "letterSpacing": "0.5px"
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "bottom": "1.5rem"
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
                "textAlign": "center",
                "children": [
                  {
                    "text": "JOHN DOE",
                    "fontSizeOffset": 12.5,
                    "lineHeightOffset": -0.15,
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
            }
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
                "children": [
                  {
                    "text": "Marketing Manager",
                    "fontSizeOffset": 2,
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
            }
          }
        ]
      }
    ],
    "containerPosition": 0
  },
  {
    "type": "contact",
    "label": "Contact",
    "showHeading": true,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "100%",
          "height": "1px",
          "style": "solid",
          "color": "#96ADB9"
        }
      },
      "fontSizeOffset": -0.5
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 1
      },
      "padding": {
        "bottom": "1.4rem"
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
            "bold": true,
            "color": "#405F73"
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
                    "text": " (415) 555-0183",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "tel:+14155550183"
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
            }
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
                    "text": " johndoe@example.com",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "mailto:johndoe@example.com"
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
            }
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
                    "text": " Fairhaven, CA",
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
            }
          },
          {
            "label": "Website",
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
                    "iconId": "globe",
                    "children": [
                      {
                        "text": "",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "text": " johndoe.example.com",
                    "fontSizeOffset": 0,
                    "lineHeightOffset": 0,
                    "link": "https://johndoe.example.com"
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
            }
          }
        ]
      }
    ],
    "containerPosition": 1
  },
  {
    "type": "education",
    "label": "Education",
    "showHeading": true,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "100%",
          "height": "1px",
          "style": "solid",
          "color": "#96ADB9"
        }
      }
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
            "bold": true,
            "color": "#405F73"
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Graduate education",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "2017 – 2019",
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
            }
          },
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "NORTHMERE UNIVERSITY",
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
            }
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "M.S. Marketing Strategy",
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
            }
          }
        ]
      },
      {
        "label": "Undergraduate education",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "2013 – 2017",
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
            }
          },
          {
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "BAYCREST COLLEGE",
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
            }
          },
          {
            "label": "Degree",
            "value": [
              {
                "type": "unordered-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "B.B.A. Marketing",
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
                        "text": "Graduated with honors",
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
            }
          }
        ]
      }
    ],
    "containerPosition": 1
  },
  {
    "type": "skills",
    "label": "Skills",
    "showHeading": true,
    "styling": {
      "border": {
        "bottom": {
          "display": true,
          "width": "100%",
          "height": "1px",
          "style": "solid",
          "color": "#96ADB9"
        }
      }
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
            "bold": true,
            "color": "#405F73"
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Campaign skills",
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
                        "text": "Campaign Planning",
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
            }
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
                        "text": "Brand Positioning",
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
            }
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
                        "text": "Market Research",
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
            }
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
                        "text": "Content Strategy",
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
            }
          }
        ]
      },
      {
        "label": "Team skills",
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
                        "text": "Team Leadership",
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
            }
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
                        "text": "Marketing Analytics",
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
            }
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
                        "text": "Budget Management",
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
            }
          }
        ]
      }
    ],
    "containerPosition": 1
  },
  {
    "type": "languages",
    "label": "Languages",
    "showHeading": true,
    "styling": {
      "border": {}
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
            "text": "LANGUAGES",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true,
            "color": "#405F73"
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
            }
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
            }
          }
        ]
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
            }
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Fluent",
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
            }
          }
        ]
      },
      {
        "label": "Italian",
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
                    "text": "Italian",
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
            }
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Intermediate",
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
            }
          }
        ]
      },
      {
        "label": "Dutch",
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
                    "text": "Dutch",
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
            }
          },
          {
            "label": "Proficiency",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Basic",
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
            }
          }
        ]
      }
    ],
    "containerPosition": 1
  },
  {
    "type": "summary",
    "label": "Summary",
    "showHeading": true,
    "styling": {
      "border": {
        "left": {
          "display": true,
          "width": "1px",
          "height": "100%",
          "style": "solid",
          "color": "#96ADB9"
        },
        "bottom": {
          "display": true,
          "width": "100%",
          "height": "1px",
          "style": "solid",
          "color": "#96ADB9"
        }
      }
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
            "text": "PROFILE SUMMARY",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true,
            "color": "#405F73"
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Professional summary",
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
                "textAlign": "justify",
                "children": [
                  {
                    "text": "Marketing manager who connects audience insight with clear brand positioning and measurable campaigns. Leads collaborative teams across content, email, and paid media, using research and performance data to strengthen customer relationships and turn business priorities into focused marketing plans.",
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
            }
          }
        ]
      }
    ],
    "containerPosition": 2
  },
  {
    "type": "employment",
    "label": "Employment History",
    "showHeading": true,
    "styling": {
      "border": {
        "left": {
          "display": true,
          "width": "1px",
          "height": "100%",
          "style": "solid",
          "color": "#96ADB9"
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
            "text": "WORK EXPERIENCE",
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true,
            "color": "#405F73"
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Covebridge Brands",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Covebridge Brands",
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
            }
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2022 – Present",
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
            }
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
                        "text": "Led a product launch across email, paid media, and partner channels, increasing qualified inquiries by 27% while keeping spending within budget.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Built a shared campaign calendar with sales and creative teams, improving launch coordination and lifting repeat-customer revenue by 18%.",
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
            }
          }
        ]
      },
      {
        "label": "Willowmark Creative",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Willowmark Creative",
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
            }
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2020 – 2022",
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
            }
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Senior Marketing Specialist",
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
                        "text": "Combined customer interviews and campaign data to refine audience segments and guide positioning for three growing consumer brands.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Managed writers and agency partners across web and social content, creating a consistent voice and improving email engagement by 21%.",
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
            }
          }
        ]
      },
      {
        "label": "Asterfield Media",
        "styling": {
          "fontSizeOffset": 0,
          "lineHeightOffset": 0
        },
        "layout": {},
        "fields": [
          {
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Asterfield Media",
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
            }
          },
          {
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2019 – 2020",
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
            }
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Marketing Specialist",
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
                        "text": "Tested landing-page messages and calls to action, improving newsletter sign-ups by 16% over two campaign cycles.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Updated search-focused articles and product pages, increasing organic visits by 23% over six months.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Partnered with sales to create customer stories, launch briefs, and presentation materials grounded in audience needs.",
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
            }
          }
        ]
      }
    ],
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
        13, NULL, 'Azure Axis',
        $styling${"display": "flex", "fontFamily": "'Montserrat', Arial, sans-serif", "fontSize": "10px", "lineHeight": 1.3, "color": "#41484D", "backgroundColor": "#FFFFFF"}$styling$::json,
        $layout${"padding": {"top": "3.5rem", "right": "2rem", "bottom": "1.75rem", "left": "2rem"}, "gap": {"horizontal": "0.8rem", "vertical": "1.25rem", "section": "0.45rem", "subsection": "0.65rem", "field": "0.1rem", "header": "0.5rem"}}$layout$::json,
        $tags$["blue simple professional cv resume", "blue", "light blue", "pale blue", "powder blue", "blue and white", "white and blue", "professional", "simple", "minimal", "minimalist", "modern", "clean", "elegant", "pretty", "polished", "corporate", "business", "structured", "geometric", "sans serif", "sans-serif", "montserrat", "two column", "two-column", "two columns", "two column resume", "double column", "double-column", "dual column", "multi column", "multi-column", "multicolumn", "multi column resume", "split layout", "split resume", "asymmetric columns", "left sidebar", "sidebar", "narrow left column", "wide right column", "full width header", "full-width header", "full width masthead", "centered header", "centered name", "blue header", "colored header", "pastel header", "contact icons", "vertical divider", "horizontal dividers", "section dividers", "ruled sections", "uppercase headings", "skills list", "bulleted skills", "bullet points", "right aligned dates", "one page", "one-page", "single page", "single-page", "cv", "curriculum vitae", "resume", "marketing", "marketing manager", "marketing management", "marketing specialist", "senior marketing specialist", "brand manager", "brand management", "brand marketing", "brand strategy", "brand positioning", "digital marketing", "digital marketer", "campaign manager", "campaign management", "campaign planning", "integrated marketing", "content marketing", "content strategy", "content manager", "email marketing", "paid media", "social media", "social media marketing", "marketing communications", "communications", "public relations", "growth marketing", "customer acquisition", "customer retention", "lead generation", "market research", "audience research", "customer insights", "marketing analytics", "performance marketing", "seo", "search engine optimization", "consumer brands", "agency", "creative agency", "media", "creative", "team leadership", "budget management", "mid career", "mid-level", "management", "bilingual", "multilingual", "languages", "education sidebar"]$tags$::jsonb,
        $search_text$Azure Axis Header Header Identity Name JOHN DOE Role Marketing Manager Contact CONTACT Contact details Phone (415) 555-0183 Email johndoe@example.com Location Fairhaven, CA Website johndoe.example.com Education EDUCATION Graduate education Dates 2017 – 2019 School NORTHMERE UNIVERSITY Degree M.S. Marketing Strategy Undergraduate education Dates 2013 – 2017 School BAYCREST COLLEGE Degree B.B.A. Marketing Description Graduated with honors Skills SKILLS Campaign skills Skill 1 Campaign Planning Skill 2 Brand Positioning Skill 3 Market Research Skill 4 Content Strategy Team skills Skill 1 Team Leadership Skill 2 Marketing Analytics Skill 3 Budget Management Languages LANGUAGES English Language English Proficiency Native Spanish Language Spanish Proficiency Fluent Italian Language Italian Proficiency Intermediate Dutch Language Dutch Proficiency Basic Summary PROFILE SUMMARY Professional summary Summary Marketing manager who connects audience insight with clear brand positioning and measurable campaigns. Leads collaborative teams across content, email, and paid media, using research and performance data to strengthen customer relationships and turn business priorities into focused marketing plans. Employment History WORK EXPERIENCE Covebridge Brands Company Covebridge Brands Dates 2022 – Present Role Marketing Manager Description Led a product launch across email, paid media, and partner channels, increasing qualified inquiries by 27% while keeping spending within budget.Built a shared campaign calendar with sales and creative teams, improving launch coordination and lifting repeat-customer revenue by 18%. Willowmark Creative Company Willowmark Creative Dates 2020 – 2022 Role Senior Marketing Specialist Description Combined customer interviews and campaign data to refine audience segments and guide positioning for three growing consumer brands.Managed writers and agency partners across web and social content, creating a consistent voice and improving email engagement by 21%. Asterfield Media Company Asterfield Media Dates 2019 – 2020 Role Marketing Specialist Description Tested landing-page messages and calls to action, improving newsletter sign-ups by 16% over two campaign cycles.Updated search-focused articles and product pages, increasing organic visits by 23% over six months.Partnered with sales to create customer stories, launch briefs, and presentation materials grounded in audience needs.$search_text$,
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

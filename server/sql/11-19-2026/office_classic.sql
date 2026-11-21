-- Office Classic | Owner: 13 | Run the entire file in pgAdmin.
-- One atomic statement creates one new template. All personal details are fictional.
-- ATS tags express design intent, not a guarantee of compatibility.
-- Reference: Simple Elegant Clean Classic Minimalist Professional CV Resume.
-- Approved adaptation: education entries stack as separate canonical subsections.
-- Six canonical sections; no custom sections or fields. All widths are manual.
-- Name and role remain in one header subsection; contact details remain separate fields.
-- Validated: PostgreSQL syntax, required columns, canonical labels, local save/reload/copy.
-- Fits one page in the local editor renderer. Not executed against your database.
WITH
content AS (
    SELECT $resume_data$[
  {
    "type": "header",
    "label": "Header",
    "showHeading": false,
    "styling": {},
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
                    "text": "JANE DOE",
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
            }
          },
          {
            "label": "Role",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "Administrative Manager",
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
          }
        ]
      }
    ]
  },
  {
    "type": "contact",
    "label": "Contact",
    "showHeading": false,
    "styling": {
      "fontSizeOffset": -1,
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
            }
          },
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
            }
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
            }
          }
        ]
      }
    ]
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
      "padding": {}
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
                    "text": "Administrative professional with eight years of experience coordinating office operations, supporting employees, and improving everyday business processes. Combines clear communication with careful planning to keep teams organized and services running reliably. Experienced in vendor coordination, budget tracking, onboarding, and confidential records management.",
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
    ]
  },
  {
    "type": "employment",
    "label": "Employment History",
    "showHeading": true,
    "styling": {},
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
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Cedarhaven Services",
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
                    "text": "Administrative Manager",
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
                    "text": "Mar 2023 – Present",
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
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cedarhaven Services",
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
                        "text": "Coordinate office operations for 95 employees, balancing service requests and departmental priorities.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Introduced a document register that cut retrieval time by 30% and clarified record ownership.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Supervise six administrative colleagues, organize training, and balance workloads.",
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
        "label": "Briarwell Group",
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
                    "text": "HR and Employee Support Coordinator",
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
                    "text": "Jan 2021 – Feb 2023",
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
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Briarwell Group",
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
                        "text": "Maintained employee records and coordinated attendance reporting, benefits enquiries, and onboarding paperwork.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Created onboarding checklists and welcome schedules to keep induction tasks on time.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Prepared internal communications and supported review cycles while handling sensitive information with discretion.",
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
        "label": "Hawthorne Business Services",
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
                    "text": "Office Coordinator",
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
                    "text": "Jul 2018 – Dec 2020",
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
            "label": "Company",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Hawthorne Business Services",
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
                        "text": "Organized calendars, meeting rooms, supply orders, and vendor visits for a professional-services office.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Consolidated supply orders and compared vendor pricing, reducing annual spending by 14%.",
                        "fontSizeOffset": 0,
                        "lineHeightOffset": 0
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Assisted with invoice checks, monthly expense summaries, and updates to office procedures.",
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
    ]
  },
  {
    "type": "education",
    "label": "Education",
    "showHeading": true,
    "styling": {},
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
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Business administration degree",
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
                    "text": "Bachelor of Business Administration",
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
                    "text": "Sep 2015 – Jun 2018",
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
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Cedarhaven University",
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
                        "text": "Concentration in operations management; graduated with distinction.",
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
        "label": "Business foundation",
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
                    "text": "Foundation Diploma in Business",
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
                    "text": "Sep 2014 – Jun 2015",
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
            "label": "School",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Briarwell College",
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
                        "text": "Studied business communication, accounting, and organizational practice.",
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
    ]
  },
  {
    "type": "skills",
    "label": "Skills",
    "showHeading": true,
    "styling": {},
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
        "label": "Operations skills",
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
                        "text": "Office administration and operations",
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
                        "text": "Procurement and vendor coordination",
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
        "label": "People and process skills",
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
                        "text": "Process documentation and improvement",
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
                        "text": "Team leadership and training",
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
        "label": "Business support skills",
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
                        "text": "Budget tracking and expense control",
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
                        "text": "Employee onboarding and HR support",
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
    ]
  }
]$resume_data$::jsonb AS sections
),
new_resume AS (
    INSERT INTO resumes (
        user_id, source_resume_id, title, styling, layout, tags, plain_text,
        is_official_template, view_count, copy_count, created_at, updated_at
    )
    VALUES (
        13, NULL, 'Office Classic',
        $styling${
  "display": "flex",
  "fontFamily": "Arial, sans-serif",
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
    "subsection": "0.3rem",
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
  "simple elegant clean classic minimalist professional cv resume",
  "administrative manager",
  "administration manager",
  "office manager",
  "office administration",
  "administrative professional",
  "administrative assistant",
  "office coordinator",
  "office management",
  "administrative support",
  "business administration",
  "business operations",
  "operations coordinator",
  "operations management",
  "corporate",
  "business",
  "professional services",
  "hr",
  "human resources",
  "employee support",
  "onboarding",
  "employee records",
  "people operations",
  "team leadership",
  "staff supervision",
  "staff training",
  "procurement",
  "vendor management",
  "vendor coordination",
  "budget tracking",
  "cost control",
  "expense reporting",
  "process improvement",
  "process documentation",
  "standard operating procedures",
  "document management",
  "records management",
  "scheduling",
  "organizational skills",
  "communication",
  "mid career",
  "experienced professional",
  "left aligned name",
  "right aligned role",
  "contact row",
  "two column skills",
  "skills grid",
  "bullet points",
  "arial",
  "unshaded headings",
  "stacked education"
]$tags$::jsonb,
        $search_text$Office Classic Header Header Identity Name JANE DOE Role Administrative Manager Contact Contact Contact details Email janedoe@example.com Phone (312) 555-0164 Location Alder Bay, IL Summary PROFESSIONAL SUMMARY Profile Summary Administrative professional with eight years of experience coordinating office operations, supporting employees, and improving everyday business processes. Combines clear communication with careful planning to keep teams organized and services running reliably. Experienced in vendor coordination, budget tracking, onboarding, and confidential records management. Employment History WORK EXPERIENCE Cedarhaven Services Role Administrative Manager Dates Mar 2023 – Present Company Cedarhaven Services Description Coordinate office operations for 95 employees, balancing service requests and departmental priorities.Introduced a document register that cut retrieval time by 30% and clarified record ownership.Supervise six administrative colleagues, organize training, and balance workloads. Briarwell Group Role HR and Employee Support Coordinator Dates Jan 2021 – Feb 2023 Company Briarwell Group Description Maintained employee records and coordinated attendance reporting, benefits enquiries, and onboarding paperwork.Created onboarding checklists and welcome schedules to keep induction tasks on time.Prepared internal communications and supported review cycles while handling sensitive information with discretion. Hawthorne Business Services Role Office Coordinator Dates Jul 2018 – Dec 2020 Company Hawthorne Business Services Description Organized calendars, meeting rooms, supply orders, and vendor visits for a professional-services office.Consolidated supply orders and compared vendor pricing, reducing annual spending by 14%.Assisted with invoice checks, monthly expense summaries, and updates to office procedures. Education EDUCATION Business administration degree Degree Bachelor of Business Administration Dates Sep 2015 – Jun 2018 School Cedarhaven University Description Concentration in operations management; graduated with distinction. Business foundation Degree Foundation Diploma in Business Dates Sep 2014 – Jun 2015 School Briarwell College Description Studied business communication, accounting, and organizational practice. Skills SKILLS Operations skills Skill 1 Office administration and operations Skill 2 Procurement and vendor coordination People and process skills Skill 1 Process documentation and improvement Skill 2 Team leadership and training Business support skills Skill 1 Budget tracking and expense control Skill 2 Employee onboarding and HR support$search_text$,
        TRUE, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    RETURNING id, title, user_id, is_official_template
),
new_container AS (
    INSERT INTO containers (
        resume_id, type, span_full_page, position, styling, layout, created_at, updated_at
    )
    SELECT id, 'column', FALSE, 0, '{}'::json,
        $container_layout${
  "width": {
    "auto": false,
    "value": "100%"
  },
  "padding": {
    "top": "0rem",
    "right": "0rem",
    "bottom": "0rem",
    "left": "0rem"
  }
}$container_layout$::json,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM new_resume
    RETURNING id
),
section_data AS (
    SELECT (s.ordinality - 1)::integer AS position, s.item
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
    FROM section_data s CROSS JOIN new_container c
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

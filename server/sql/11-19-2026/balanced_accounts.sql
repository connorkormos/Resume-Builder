-- Balanced Accounts | Owner: 13 | Run the entire file in pgAdmin.
-- One atomic statement creates one new template. All personal details are fictional.
-- ATS tags express design intent, not a guarantee of compatibility.
-- Reference: Black and White Minimalist Professional Resume A4.
-- Uses the current editor page dimensions, not a separate A4 configuration.
-- No custom sections or fields. Education uses degrees rather than the reference placeholder job titles.
-- Minor adaptations: no decorative footer strip; rules follow supported section boundaries.
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
                "textAlign": "center",
                "children": [
                  {
                    "text": "JOHN DOE",
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
      "fontSizeOffset": -1
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
            }
          },
          {
            "label": "Email",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "center",
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
                "textAlign": "center",
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
                    "text": "Accountant with six years of experience maintaining accurate financial records, preparing month-end reports, and supporting audit reviews. Brings a practical approach to reconciliations, cost analysis, and internal controls. Works closely with operational teams to explain financial results, resolve discrepancies, and deliver dependable information for business decisions.",
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
            "fontSizeOffset": 1,
            "lineHeightOffset": 0,
            "bold": true
          }
        ]
      }
    ],
    "subsections": [
      {
        "label": "Graduate accounting studies",
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
                    "text": "Alder Bay University",
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
            }
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Focused on financial reporting, audit procedures, and management accounting. Completed a capstone examining reconciliation controls and practical methods for improving the accuracy of monthly financial statements.",
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
          }
        ]
      },
      {
        "label": "Undergraduate accounting studies",
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
                    "text": "Crestmere College",
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
            "label": "Dates",
            "value": [
              {
                "type": "paragraph",
                "textAlign": "right",
                "children": [
                  {
                    "text": "2014 – 2018",
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Studied corporate accounting, business taxation, and financial analysis. Worked on a team project that evaluated operating costs and developed a budgeting model for a fictional distribution business.",
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
          }
        ]
      }
    ]
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
        "label": "Willowbridge Supply",
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
                    "text": "Senior Accountant",
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
                    "text": "Willowbridge Supply",
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Lead monthly reconciliations and prepare financial statements for a regional distribution business. Shortened the close cycle by two days through clearer review checklists. Partner with department leads to investigate budget variances and maintain supporting schedules for annual audits.",
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
          }
        ]
      },
      {
        "label": "Ashford Services",
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
                    "text": "Financial Accountant",
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
                    "text": "Ashford Services",
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
                "type": "paragraph",
                "textAlign": "left",
                "children": [
                  {
                    "text": "Prepared journal entries, maintained fixed-asset records, and reconciled balance-sheet accounts. Improved invoice coding guidance and reduced recurring posting corrections. Produced monthly expense reports and supported cash-flow forecasts for the finance manager.",
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
          }
        ]
      }
    ]
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
      }
    },
    "layout": {
      "display": "grid",
      "grid": {
        "columns": 3
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
        "label": "Core accounting skills",
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
                        "text": "Audit preparation",
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
                        "text": "Financial reporting",
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
                        "text": "Account reconciliation",
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
                        "text": "Budget analysis",
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
            "label": "Skill 5",
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
        13, NULL, 'Balanced Accounts',
        $styling${
  "display": "flex",
  "fontFamily": "'Montserrat', Arial, sans-serif",
  "fontSize": "10.5px",
  "lineHeight": 1.3,
  "color": "#383838",
  "backgroundColor": "#FFFFFF"
}$styling$::json,
        $layout${
  "padding": {
    "top": "2.5rem",
    "right": "2.5rem",
    "bottom": "2rem",
    "left": "2.5rem"
  },
  "gap": {
    "horizontal": "0rem",
    "vertical": "0rem",
    "section": "0.5rem",
    "subsection": "0.55rem",
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
  "black and white minimalist professional resume a4",
  "accountant",
  "accounting",
  "professional accountant",
  "senior accountant",
  "financial accountant",
  "finance",
  "financial reporting",
  "financial statements",
  "month end close",
  "reconciliation",
  "audit",
  "auditing",
  "budgeting",
  "cost analysis",
  "internal controls",
  "tax accounting",
  "bookkeeping",
  "corporate finance",
  "business",
  "financial services",
  "centered header",
  "centered name",
  "uppercase headings",
  "contact icons",
  "three column skills",
  "skills grid",
  "montserrat",
  "mid career",
  "experienced professional"
]$tags$::jsonb,
        $search_text$Balanced Accounts Header Header Identity Name JOHN DOE Role Professional Accountant Contact Contact Contact details Phone (312) 555-0164 Email johndoe@example.com Location Alder Bay, IL Summary ABOUT ME Profile Summary Accountant with six years of experience maintaining accurate financial records, preparing month-end reports, and supporting audit reviews. Brings a practical approach to reconciliations, cost analysis, and internal controls. Works closely with operational teams to explain financial results, resolve discrepancies, and deliver dependable information for business decisions. Education EDUCATION Graduate accounting studies School Alder Bay University Dates 2018 – 2020 Degree M.S. Accounting Description Focused on financial reporting, audit procedures, and management accounting. Completed a capstone examining reconciliation controls and practical methods for improving the accuracy of monthly financial statements. Undergraduate accounting studies School Crestmere College Dates 2014 – 2018 Degree B.S. Accounting Description Studied corporate accounting, business taxation, and financial analysis. Worked on a team project that evaluated operating costs and developed a budgeting model for a fictional distribution business. Employment History WORK EXPERIENCE Willowbridge Supply Role Senior Accountant Dates 2023 – Present Company Willowbridge Supply Description Lead monthly reconciliations and prepare financial statements for a regional distribution business. Shortened the close cycle by two days through clearer review checklists. Partner with department leads to investigate budget variances and maintain supporting schedules for annual audits. Ashford Services Role Financial Accountant Dates 2020 – 2023 Company Ashford Services Description Prepared journal entries, maintained fixed-asset records, and reconciled balance-sheet accounts. Improved invoice coding guidance and reduced recurring posting corrections. Produced monthly expense reports and supported cash-flow forecasts for the finance manager. Skills SKILLS Core accounting skills Skill 1 Audit preparation Skill 2 Financial reporting Skill 3 Account reconciliation Skill 4 Budget analysis Skill 5 Internal controls$search_text$,
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

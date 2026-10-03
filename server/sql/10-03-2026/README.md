# Official resume templates — October 3, 2026

100 complete fictional profiles for user **1**, each in its own independent SQL file.
The requested date `10/03/2026` is represented by nested directories.

## Running a template

Copy one entire SQL file into the Railway PostgreSQL query editor and run it.
Each file is one atomic statement, with no comments, DO blocks, or trailing semicolon.
It creates a new official template and returns its ID, title, owner, official-template
flag, and field count. Running a file again creates another copy.

User 1 must already exist. These files target the current schema, including the
official-template, source-resume, plain-text, and tags migrations. IDs are database-generated,
`source_resume_id` is NULL, and `is_official_template` is TRUE. Existing resumes
are not changed. Names, employers, schools, and achievements are fictional.

## Tags and search setup

Apply migration `c31d82ab690f` before running these inserts or deploying the updated
search endpoint. With the intended database configured, run from `server/`:

```sh
flask --app app db upgrade
```

The migration adds a non-null `tags` JSONB column on PostgreSQL, defaulting to `[]`
for existing resumes. SQLite development uses JSON. Each insertion file now sets
curated tags and a complete `plain_text` value using the application's existing
text extraction rules. Tags stay separate from printable resume content.

Search matches the current case-insensitive phrase against either plain text or
tags, preserving access checks, counts, pagination, and sorting. No tag ranking or
word-by-word matching has been added. Saves preserve omitted tags; provided tags
are normalized to unique lowercase strings. Copies retain independent tag lists.

See [all tag counts and per-template assignments](TAGS.md). The 100 templates use
75 distinct tags. Updating these files does not change copies already inserted in
your database; rerunning a file creates another resume. Existing templates would
need a separate targeted update if they have already been inserted.

## Collection

Two batches vary column placement, typography, mastheads, rules, and section
order. The [second batch index](BATCH_2.md) identifies the 50 newly added files. Each resume includes contact information,
a profile, two work entries with achievements, a selected project, skills, and education.

| Template | Profession | Design | Accent |
| --- | --- | --- | --- |
| [Cobalt Archive](cobalt_archive.sql) | Senior Software Engineer | Centered serif / fine rules | `#234E70` |
| [Forest Circuit](forest_circuit.sql) | Site Reliability Engineer | Dark left reference column | `#245C4A` |
| [Clay Canvas](clay_canvas.sql) | Product Designer | Pale right reference column | `#813D32` |
| [Iris Signal](iris_signal.sql) | Data Scientist | Solid color masthead | `#493E73` |
| [Carbon Console](carbon_console.sql) | Cybersecurity Analyst | Monospace masthead / skills band | `#374151` |
| [Lagoon Care](lagoon_care.sql) | Registered Nurse | Pale left identity column | `#17646A` |
| [Ember Table](ember_table.sql) | Executive Chef | Dark right reference column | `#74402F` |
| [Ochre Folio](ochre_folio.sql) | Architectural Designer | Warm editorial / serif masthead | `#654D29` |
| [Azure Span](azure_span.sql) | Civil Engineer | White identity rail / vertical rule | `#365C85` |
| [Rose Current](rose_current.sql) | Brand Strategist | Portfolio first / open typography | `#7A3653` |
| [Garnet Ledger](garnet_ledger.sql) | Financial Analyst | Centered serif / fine rules | `#74334F` |
| [Indigo Counsel](indigo_counsel.sql) | Paralegal | Dark left reference column | `#453B6D` |
| [Silver Measure](silver_measure.sql) | Mechanical Engineer | Pale right reference column | `#343E4D` |
| [Tidal Lesson](tidal_lesson.sql) | Elementary Teacher | Solid color masthead | `#165F65` |
| [Copper Relay](copper_relay.sql) | Electrician | Monospace masthead / skills band | `#6E3D2D` |
| [Honeycomb Welcome](honeycomb_welcome.sql) | Hotel Operations Manager | Pale left identity column | `#604927` |
| [Bluefin Route](bluefin_route.sql) | Supply Chain Planner | Dark right reference column | `#214A6A` |
| [Mulberry Edition](mulberry_edition.sql) | Copy Editor | Warm editorial / serif masthead | `#74334F` |
| [Olive Field](olive_field.sql) | Environmental Scientist | White identity rail / vertical rule | `#225746` |
| [Coral Frame](coral_frame.sql) | Motion Designer | Portfolio first / open typography | `#7B3A30` |
| [Bronze Summit](bronze_summit.sql) | Human Resources Manager | Centered serif / fine rules | `#5B4525` |
| [Beacon Flight](beacon_flight.sql) | Aerospace Engineer | Dark left reference column | `#204665` |
| [Berry Practice](berry_practice.sql) | Physical Therapist | Pale right reference column | `#6E314B` |
| [Moss Civic](moss_civic.sql) | Urban Planner | Solid color masthead | `#205343` |
| [Sienna Studio](sienna_studio.sql) | Interior Designer | Monospace masthead / skills band | `#693A2A` |
| [Steel Atlas](steel_atlas.sql) | Construction Project Manager | Pale left identity column | `#323B49` |
| [Viridian Giving](viridian_giving.sql) | Nonprofit Development Manager | Dark right reference column | `#205343` |
| [Marigold Market](marigold_market.sql) | Digital Marketing Manager | Warm editorial / serif masthead | `#5B4525` |
| [Marine Compass](marine_compass.sql) | Logistics Coordinator | White identity rail / vertical rule | `#204665` |
| [Lilac Inquiry](lilac_inquiry.sql) | UX Researcher | Portfolio first / open typography | `#423868` |
| [Winecrest Brief](winecrest_brief.sql) | Accountant | Centered serif / fine rules | `#692E47` |
| [Fern Habitat](fern_habitat.sql) | Landscape Designer | Dark left reference column | `#1F4F3F` |
| [Terrace Bloom](terrace_bloom.sql) | School Counselor | Pale right reference column | `#6F342B` |
| [Amethyst Lens](amethyst_lens.sql) | Photographer | Solid color masthead | `#3F3563` |
| [Graphite Forge](graphite_forge.sql) | QA Automation Engineer | Monospace masthead / skills band | `#2F3845` |
| [Jade Partner](jade_partner.sql) | Customer Success Manager | Pale left identity column | `#14565B` |
| [Cinnamon Craft](cinnamon_craft.sql) | Technical Writer | Dark right reference column | `#633728` |
| [Sandbar Balance](sandbar_balance.sql) | Occupational Therapist | Warm editorial / serif masthead | `#574223` |
| [Glacier Stack](glacier_stack.sql) | Data Engineer | White identity rail / vertical rule | `#2E4F72` |
| [Petal Narrative](petal_narrative.sql) | Content Strategist | Portfolio first / open typography | `#692E47` |
| [Slate Catalog](slate_catalog.sql) | Librarian | Centered serif / fine rules | `#2D3542` |
| [Juniper Bridge](juniper_bridge.sql) | Social Worker | Dark left reference column | `#1D4B3C` |
| [Russet Grain](russet_grain.sql) | Agricultural Operations Manager | Pale right reference column | `#5E3426` |
| [Violet Pulse](violet_pulse.sql) | Biomedical Engineer | Solid color masthead | `#3B325E` |
| [Flint Service](flint_service.sql) | Automotive Service Technician | Monospace masthead / skills band | `#2D3542` |
| [Aquifer Study](aquifer_study.sql) | Research Laboratory Technician | Pale left identity column | `#135156` |
| [Saffron Occasion](saffron_occasion.sql) | Event Producer | Dark right reference column | `#523F21` |
| [Dune Motion](dune_motion.sql) | Fitness Program Manager | Warm editorial / serif masthead | `#523F21` |
| [Cerulean Trust](cerulean_trust.sql) | Compliance Analyst | White identity rail / vertical rule | `#1D405B` |
| [Blush Atelier](blush_atelier.sql) | Pastry Chef | Portfolio first / open typography | `#632C44` |

## Second batch

| Template | Profession | Design | Accent |
| --- | --- | --- | --- |
| [Onyx Dispatch](onyx_dispatch.sql) | Technical Program Manager | Full black page / restrained serif identity | `#C9DCCB` |
| [Linen Coordinates](linen_coordinates.sql) | Information Architect | White reference rail / warm narrative column | `#74402F` |
| [Celadon Window](celadon_window.sql) | Product Manager | Right identity panel / left career narrative | `#245C4A` |
| [Signal Register](signal_register.sql) | Accessibility Specialist | Numbered headings / skills-first index | `#234E70` |
| [Archive Silk](archive_silk.sql) | Museum Curator | Serif reading column / dark skills footer | `#7A3653` |
| [Nightfall Care](nightfall_care.sql) | Speech-Language Pathologist | Dark identity rail / open white narrative | `#234E70` |
| [Transit Pinstripe](transit_pinstripe.sql) | Renewable Energy Analyst | Narrow right reference strip / fine vertical rule | `#17646A` |
| [Apricot Assembly](apricot_assembly.sql) | Industrial Designer | Tinted profile and project / open masthead | `#813D32` |
| [Sage Workshop](sage_workshop.sql) | Archivist | Wide pale reference column / compact work column | `#245C4A` |
| [Playfield Split](playfield_split.sql) | Game Designer | Project showcase sidebar / left career column | `#654D29` |
| [Obsidian Map](obsidian_map.sql) | Solutions Architect | Full black page / restrained serif identity | `#BCD9EB` |
| [Folded Circuit](folded_circuit.sql) | Hardware Engineer | White reference rail / warm narrative column | `#365C85` |
| [Contour Room](contour_room.sql) | Geospatial Analyst | Right identity panel / left career narrative | `#493E73` |
| [People Register](people_register.sql) | Talent Acquisition Partner | Numbered headings / skills-first index | `#813D32` |
| [Atelier Note](atelier_note.sql) | Art Director | Serif reading column / dark skills footer | `#245C4A` |
| [Quiet Protocol](quiet_protocol.sql) | Clinical Research Coordinator | Dark identity rail / open white narrative | `#813D32` |
| [Riverline Trace](riverline_trace.sql) | Water Resources Engineer | Narrow right reference strip / fine vertical rule | `#654D29` |
| [Cadence Blocks](cadence_blocks.sql) | Music Teacher | Tinted profile and project / open masthead | `#374151` |
| [Provision Grid](provision_grid.sql) | Procurement Manager | Wide pale reference column / compact work column | `#493E73` |
| [Woven Gallery](woven_gallery.sql) | Textile Designer | Project showcase sidebar / left career column | `#7A3653` |
| [Jet Schema](jet_schema.sql) | Database Administrator | Full black page / restrained serif identity | `#E6D0A5` |
| [Keystone Margin](keystone_margin.sql) | Structural Engineer | White reference rail / warm narrative column | `#234E70` |
| [Capital Window](capital_window.sql) | Investment Operations Analyst | Right identity panel / left career narrative | `#17646A` |
| [Learning Index](learning_index.sql) | Instructional Designer | Numbered headings / skills-first index | `#374151` |
| [Object Chapter](object_chapter.sql) | Exhibition Designer | Serif reading column / dark skills footer | `#493E73` |
| [Breathline Panel](breathline_panel.sql) | Respiratory Therapist | Dark identity rail / open white narrative | `#374151` |
| [Crossing Line](crossing_line.sql) | Transportation Planner | Narrow right reference strip / fine vertical rule | `#7A3653` |
| [Commonroom Notes](commonroom_notes.sql) | Community Engagement Manager | Tinted profile and project / open masthead | `#74402F` |
| [Assurance Fold](assurance_fold.sql) | Quality Systems Specialist | Wide pale reference column / compact work column | `#17646A` |
| [Echo Portfolio](echo_portfolio.sql) | Sound Designer | Project showcase sidebar / left career column | `#245C4A` |
| [Eclipse Model](eclipse_model.sql) | Machine Learning Engineer | Full black page / restrained serif identity | `#DCCBEF` |
| [Mechanism Ledger](mechanism_ledger.sql) | Robotics Engineer | White reference rail / warm narrative column | `#813D32` |
| [Impact Window](impact_window.sql) | Fundraising Analyst | Right identity panel / left career narrative | `#654D29` |
| [Fieldnote Signal](fieldnote_signal.sql) | Science Communicator | Numbered headings / skills-first index | `#74402F` |
| [Colophon Paper](colophon_paper.sql) | Book Designer | Serif reading column / dark skills footer | `#17646A` |
| [Companion Rail](companion_rail.sql) | Veterinary Technician | Dark identity rail / open white narrative | `#74402F` |
| [Harvest Outline](harvest_outline.sql) | Food Scientist | Narrow right reference strip / fine vertical rule | `#245C4A` |
| [Renewal Mosaic](renewal_mosaic.sql) | Sustainability Consultant | Tinted profile and project / open masthead | `#365C85` |
| [Steward Grid](steward_grid.sql) | Facilities Manager | Wide pale reference column / compact work column | `#654D29` |
| [Storyboard Annex](storyboard_annex.sql) | Animation Director | Project showcase sidebar / left career column | `#493E73` |
| [Carbon Relay](carbon_relay.sql) | Network Engineer | Full black page / restrained serif identity | `#D8DCDE` |
| [Loadpath Journal](loadpath_journal.sql) | Reliability Engineer | White reference rail / warm narrative column | `#374151` |
| [Grantline Window](grantline_window.sql) | Grant Program Manager | Right identity panel / left career narrative | `#7A3653` |
| [Language Register](language_register.sql) | Localization Specialist | Numbered headings / skills-first index | `#365C85` |
| [Patina Record](patina_record.sql) | Art Conservator | Serif reading column / dark skills footer | `#654D29` |
| [Nourish Panel](nourish_panel.sql) | Dietitian | Dark identity rail / open white narrative | `#365C85` |
| [Matterline Trace](matterline_trace.sql) | Materials Scientist | Narrow right reference strip / fine vertical rule | `#493E73` |
| [Trailside Mosaic](trailside_mosaic.sql) | Outdoor Education Instructor | Tinted profile and project / open masthead | `#234E70` |
| [Tempo Works](tempo_works.sql) | Production Planner | Wide pale reference column / compact work column | `#7A3653` |
| [Service Pavilion](service_pavilion.sql) | Service Designer | Project showcase sidebar / left career column | `#17646A` |

## Validation

Static checks passed for all 100 files: unique titles and professions, JSON and Slate
node structure, column assignments, field grid placement, current model column
names, official-template flags, generated-ID relationships, and the established
insertion CTEs. Visible text/background color pairs have a minimum contrast ratio
of 6.18:1. Each file contains one complete result-returning insert statement.

All 100 statements also pass PostgreSQL syntax parsing, and automated checks compare
their initial search text with the application's text builder and their tag counts
with the inventory. Backend tests cover tag/text search, authorization boundaries,
pagination, validation, save/copy behavior, defaults, and migration upgrade/downgrade.
Database integration tests use isolated SQLite; PostgreSQL DDL is checked separately.

The migration and inserts have not been applied to the Railway database. The
templates have not been visually rendered in the application; page fit and final
appearance remain subject to in-app review.

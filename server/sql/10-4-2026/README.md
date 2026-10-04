# Screenshot-based resume templates — October 4, 2026

Create one PostgreSQL insert file per supplied reference screenshot, using the
application's existing layout capabilities. Use Jane Doe or John Doe with original
fictional contact details, employers, education, and achievements; do not transcribe
the reference's personal information or resume content.

Use short design-only titles and filenames, with appropriate lowercase search tags
and populated `plain_text`. Follow the parent directory's SQL conventions: new
official templates for user 1, database-generated IDs, `source_resume_id = NULL`,
and one atomic result-returning statement per file, without comments, DO blocks,
or a trailing semicolon. Provide files for the user to run; do not execute inserts.

Match typography, colors, hierarchy, spacing, and column proportions as closely as
the current renderer supports. Document meaningful approximations and identify
any references that cannot reasonably be reproduced. This task does not add mixed
layout rows or otherwise change the application structure.

User clarification: prioritize user-friendly editing. Skip references requiring
awkward workarounds; do not imitate independent sections by packing them into a
single rich-text field or by separating headings from their content.

## Reference queue

| Reference | Output | Status | Fidelity notes |
| --- | --- | --- | --- |
| 1 — Olivia Wilson accountant; centered serif name, beige contact strip, ruled headings | [Linen Ledger](linen_ledger.sql) | SQL complete; simplified for editability | Original Jane Doe accountant profile; preserves summary and two jobs. Standard section headings stay attached to content; rules appear above sections instead of beneath headings. Uses Georgia/Arial, a white page, and text separators in the beige contact strip. |
| 2 — Olivia Schumacher marketing; timeline and three-part footer | — | Skipped | Faithful timeline proportions and independent footer blocks would require layout workarounds. Draft removed following the editability clarification. |
| 3 — Connor Hamilton real estate; full-width upper sections and split footer | — | Skipped | Education/certifications and skills need independent sections in a mixed-column footer. Draft combined these in rich-text fields; removed following the editability clarification. |
| 4 — Harper Russo operations; centered identity, expertise grid, career narrative | [Executive Balance](executive_balance.sql) | SQL complete | Original Jane Doe operations profile. Standard full-width sections, nine individually editable skills in a three-column field grid, and separate company, date, title, overview, and achievement fields. System sans-serif typography and white page approximate the reference. |
| 5 — Alexander Pierce marketing director; slate type and gray contact strip | [Slate Directive](slate_directive.sql) | SQL complete | Original John Doe marketing director. Standard section headings and section-bottom rules replace rules beside heading text. Three editable contact fields use supported icons. Skills are individual grid fields. Decorative page-bottom band omitted. |
| 6 — Samira Alcaraz mechanical engineer; narrow section-label rail | — | Skipped | Independent label and content columns would drift as entries change. Faithful aligned rows need unsupported section-heading placement or mixed layout, so no SQL created. |
| 7 — Centered Sebastian Bennett accountant; education-first layout | [Silver Account](silver_account.sql) | SQL complete | Original Jane Doe accountant with normal full-width sections, supported contact icons, and individual skills in a three-column grid. Replaces the reference's inconsistent education labels with plausible degrees. Decorative page-bottom band omitted. |
| 8 — Sebastian Bennett real estate; wide masthead above sidebar layout | — | Skipped | Keeping the masthead above independently editable left/right sections requires mixed layout. No spacer sections or overlapping header created. |
| 9 — Lorna Alvarado marketing; split name, right sidebar, pale rules | [Pearl Partition](pearl_partition.sql) | SQL complete | Original Jane Doe marketing manager in ordinary 62/38 columns. Preserves stacked name, contact sidebar, education, skills, references, and languages. Corrects the reference's duplicated Languages label. Whole-section borders replace heading bands, and timeline ornaments are omitted. Columns flow independently; section boundaries need not align across them. |
| 10 — Avery Davis designer; masthead above two-column body | — | Skipped | Matching the header and body alignment would need mixed layout or blank spacer content. No SQL created. |
| 11 — Daniel Gallego designer; centered masthead, diamond divider, language ratings | — | Skipped | Full-width masthead above two columns requires mixed layout; decorative divider and rating treatment add unsupported structure. |
| 12 — Paula Wilson analyst; gold rules and two skill categories side by side | — | Skipped | Independently editable parallel skill sections interrupt a full-width document. Avoided combining category headings and skill lists into artificial fields. |
| 13 — Katie Lawson developer; pale sidebar and monogram | [Mist Sidebar](mist_sidebar.sql) | SQL complete | Original John Doe developer in ordinary 37/63 columns. Editable serif initials replace the circular monogram; decorative horizontal bands omitted. Each reference is a normal subsection, stacked instead of side by side so it can be moved and edited independently. The two columns flow independently. |
| 14 — Richard Sanchez marketing; blue masthead and connected divider grid | — | Skipped | Full-width masthead above independently flowing columns requires mixed layout; connected row dividers would also drift during editing. |
| 15 — Olivia Wilson designer; circular portrait and two-column body | — | Skipped | Current resume fields do not support the portrait treatment. No external image, overlay, or replacement content workaround added. |
| 16 — Adeline Palmerston; full-width serif name above two-column body | — | Skipped | Full-width identity above independently editable sidebar/body sections requires mixed layout. No overlapping name or spacer content added. |
| 17 — Blue Olivia Wilson administrative resume; narrow section-label rail | — | Skipped | Section labels must remain aligned beside variable-height content. Independent columns would drift; packing labels and content into artificial fields would impair editing. |
| 18 — Serif Olivia Wilson business manager; centered masthead above split body | — | Skipped | Full-width identity followed by independent contact/profile and education/career columns requires mixed layout. |
| 19 — Eleanor Fitzgerald developer; full-width identity and summary above split body | — | Skipped | Both identity and summary span the page before the two-column body. Cannot preserve this structure with ordinary current columns. |
| 20 — Laya Abderahman accounting; full-width summary above sidebar and timeline | — | Skipped | Full-width identity/summary followed by split content requires mixed layout. Timeline ornaments and parallel reference blocks would introduce further compromises. |
| 21 — Connor Hamilton developer; split profile/education, full-width experience, skill bars | — | Skipped | Alternating independent split/full-width sections requires mixed layout, and graphical skill ratings lack ordinary editable fields. |
| 22 — Daniel Gallego UX designer; centered header, education and experience, skills grid | [Clarity Studio](clarity_studio.sql) | SQL complete | Original John Doe UX profile with relevant design education and achievements replacing the reference's engineering content. Uses normal section headings, separate dates/roles, supported contact icons, and nine individually editable technical skills. |
| 23 — Henrietta Mitchell operations; serif identity and ruled competency sections | [Stonebridge Brief](stonebridge_brief.sql) | SQL complete | Original Jane Doe operations profile with nine editable competencies and two job subsections. Uses Georgia throughout instead of mixed serif headings/sans-serif body, keeping headings attached to their content without typography workarounds. |

Linen Ledger uses tags `professional`, `classic`, `minimal`, `elegant`, `neutral`,
`single-column`, `serif`, `accounting`, and `finance`.
Executive Balance uses `professional`, `classic`, `executive`, `minimal`,
`single-column`, `operations`, `management`, and `centered-header`.
Slate Directive uses `professional`, `modern`, `gray`, `single-column`,
`marketing`, and `executive`. Silver Account uses `professional`, `classic`,
`minimal`, `gray`, `single-column`, `accounting`, `finance`, and `centered-header`.
Pearl Partition uses `professional`, `modern`, `minimal`, `gray`, `two-column`,
`sidebar`, and `marketing`.
Mist Sidebar uses `professional`, `modern`, `minimal`, `gray`, `two-column`,
`sidebar`, `technology`, and `web-development`.
Clarity Studio uses `professional`, `minimal`, `modern`, `single-column`, `design`,
`ux`, and `centered-header`. Stonebridge Brief uses `professional`, `classic`,
`elegant`, `serif`, `single-column`, `operations`, `management`, and `centered-header`.

Run the entire SQL file in the PostgreSQL query editor. User 1 and the current
schema (including tags and plain_text) must exist. Each run creates a new official
template and returns its ID, title, owner, official-template flag, and field count.

## Validation

All eight retained templates passed static checks for JSON/Slate structure, column
assignments, normalized tags, exact search-text parity with the application's text
builder, supported icon identifiers, column widths totaling 100%, and reuse of the
existing section/subsection/field insertion relationship chain. Linen Ledger has
5 sections / 6 subsections / 12 fields; Executive Balance has 4 sections /
5 subsections / 23 fields; Slate Directive has 6 sections / 8 subsections /
28 fields; Silver Account has 6 sections / 8 subsections / 26 fields; Pearl
Partition has 8 sections / 10 subsections / 34 fields; Mist Sidebar has 9 sections /
12 subsections / 40 fields; Clarity Studio has 7 sections / 9 subsections /
34 fields; Stonebridge Brief has 4 sections / 5 subsections / 23 fields. PostgreSQL syntax parsing
was unavailable locally. None of the queries have been executed against a database
or visually rendered in the application; final page fit remains unverified.

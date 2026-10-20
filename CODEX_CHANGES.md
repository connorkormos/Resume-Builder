# Resume layout and section spacing changes

## Review

`codex.diff` is a unified patch from the working-tree contents at the start of this task to the final contents. It includes new source files, tests, and this document. It excludes itself and the pre-existing edits in ResumePaper.jsx, Section.jsx, and resumeContext.js. Those pre-existing edits were used as the baseline, not reset. `git diff` against HEAD will also include those earlier edits.

Read the patch in your editor, or run `git apply --stat codex.diff` for a file summary. Do not apply it to this working tree: the changes are already present.

## Layout rules

- One page-wide CSS Grid, with one shared track per column container.
- Column widths resolve to a cumulative 100%; rows do not contribute widths. Explicit widths are normalized proportionally when necessary. Auto columns share remaining width, with positive fallback shares when fixed widths exhaust the page.
- One contiguous group of ordinary columns, with rows above/below and optional full-height columns at the outside edges.
- A row spans the available width between sidebars. With no sidebars, it spans the whole page.
- All sections remain vertically stacked. Each section owns its background and effective padding. The last section fills unused container height.
- The main column row fills remaining page height; header/footer rows size to content. In rows-only layouts the final row fills remaining height.
- Placement controls are in Container Settings: content column, row above/below content, full-height left/right column, and move earlier/later. Unsupported changes are disabled/rejected. Container drag-and-drop was not introduced.
- Invalid legacy arrangements report a message and get deterministic, non-overlapping fallback placement. This does not rewrite saved order automatically.
- Pagination, arbitrary grid arrangements, and independent column-width groups are outside this change.

## Single source of truth

- `client/src/utils/resumeLayout.js`: track widths, placement, container/section boundaries, resize neighbors, and placement planning.
- `client/src/utils/sectionSpacing.js`: per-side spacing resolution and legacy gap normalization.
- `client/src/utils/resumeContext.js`: ancestry lookup only; the former padding branch was removed.
- `EditorLayoutContext.js`: exposes rendered section placement, including section drag previews, to margin rulers.
- ResumePaper/Container consume resolved placement. Section, rulers, and padding handles use the same spacing rules. Redux container role changes are atomic, keep position/allIds synchronized, and are undoable through the existing history mechanism.

Each section side selects exactly one base: page padding, horizontal container gap, vertical container gap, or section gap. The full gap applies to each facing side. Container and section offsets are then added, and only the final effective padding is clamped to zero. Parent DOM elements do not apply these padding values.

## Saved data and defaults

No database schema change is needed: container type, spanFullPage, position, and layout already persist.

A column's spanFullPage flag means full height; rows occupy the available content width. Non-spanning row layouts are not a supported separate mode in this implementation.

For legacy resume layouts without `gap.section`, normalization copies the old `gap.vertical` into `gap.section` and initializes row gap (`gap.vertical`) to zero. Explicit modern section/row values are preserved. This normalization happens at API load and Redux document replacement, and becomes persisted on the next ordinary save. New client/server defaults include both keys. The toolbar now exposes Row Gap and Section Gap separately.

Existing container/section padding values are retained and interpreted as additive offsets. Their visual results can change now that previously ignored sides participate consistently.

## Files by responsibility

- Grid/editor: ResumePaper.jsx, Container.jsx, ResumePaper.module.css, Section.jsx.
- Spacing interaction: EditorLayoutContext.js, useSectionPaddingResize.js, MarginIndicator.jsx, MarginRuler.jsx, MarginRulerTop.jsx, MarginRulerSide.jsx.
- Overflow: EndPageMarker.jsx also detects grid tracks extending past the fixed page.
- Configuration/state: ContainerSettings.jsx, resumeSlice.js, normalizeResumeFromApi.js, Gap.jsx, ResetStyling.jsx, server/lib/defaults.py.
- Resolvers: resumeLayout.js, sectionSpacing.js, resumeContext.js.
- Tests: resume-layout.test.js and section-padding-resize.test.js (including repair of its stale hook import path).

## Verification

Passed:

- Production Vite build (existing bundle-size warning remains).
- Targeted ESLint checks for changed layout/resolver/editor files.
- 27 assertions expressed as tests across resume-layout (8), section-padding-resize (6), container-state (2), entity-updates (3), and resume-context (8).
- Python compilation of server/lib/defaults.py.
- Git whitespace check.
- Installed headless Chromium geometry check using the actual grid/section CSS and resolver output: full-height sidebar, header, two columns, footer, section width fill, and last-section height fill.

Limits:

- The Chromium check used a local fixture, not an authenticated end-to-end editor session. Pointer interactions were covered by the hook harness rather than a browser interaction test.
- An attempted broader resume-history test cannot load its pre-existing missing `client/src/store/resumeSliceWithHistory.js` import. It was not repaired as part of this task.
- A broader lint scan also found pre-existing errors in untouched Field.jsx and SectionBorder.jsx; targeted changed-file lint passes.
- Preview components and their rendering logic are intentionally unchanged, per request. They will not yet match the new editor layout/spacing semantics, including the split section/row gap keys.

## Review follow-up

Implemented after review:

- Null and omitted layouts normalize identically, including API ingestion.
- Pointer and keyboard column resizing use one shared clamp: 10 percentage points per column for ordinary pairs, or one quarter of the pair's total for pairs under 40 percentage points.
- Layout arrangement, placement, and boundary calculation now have separate internal helpers. The body row uses an explicit index rather than array identity.
- Removed unreachable section checks, unused props, redundant style spreads, dead keyboard bookkeeping, and stale comments. Resize labels use numeric rounding instead of string truncation.

Verification: 16 focused layout/resize tests pass; targeted lint and production build pass. An additional comparison against the pre-cleanup resolver produced identical output for 1,093 arrangements (up to six containers, including invalid legacy layouts). The existing production bundle-size warning remains.

`codex-review.diff` contains only this review follow-up. `codex.diff` remains the cumulative task patch. Neither patch includes generated patch files themselves.

### Deferred work to revisit

- [ ] Performance: narrow full-resume Redux subscriptions and stabilize shared derived context data; profile before adding memoization.
- [x] Manual width edits: preserve the entered percentage and transfer the difference to the next column (previous column for the rightmost one). Reject values outside the pair's allowed range.
- [ ] Percentage display: decide whether rounded labels must sum to exactly 100.0%; equal thirds currently display as 33.3% each despite filling the page.
- [ ] Resize lifecycle: extract a hook, distinguish cancellation from completion, and clean up all pointer listeners; no Escape-to-cancel feature exists yet.
- [ ] Rendering reuse: one pure presentation resolver for editor and thumbnails, with optional editor-only transient overrides. Preview components remain untouched.
- [x] Settings role labels: derived centrally; rows without an ordinary column group now display as Row. Sidebar labels use their position relative to the shared row track.


## Manual width follow-up

`codex-width.diff` contains the changes from the manual-width follow-up only, excluding the user's intervening settings styling edits. Earlier patches remain snapshots of their respective stages.

- Manual edits preserve the entered percentage, adjust the next column (previous for the rightmost), and leave other resolved widths unchanged.
- The edited pair becomes fixed-width; unrelated automatic columns retain their automatic setting.
- The UI shows the available range based on the neighboring pair's total and existing resize minimum. Invalid values are rejected rather than silently normalized. A lone column remains 100%.
- Both changes occur in one Redux action and undo together.
- Rounding/display changes, cancellation/hook work, presentation sharing, and role-label changes remain deferred.
- Verification: 14 layout tests and 2 container-state tests pass, including exact requested widths, legacy/automatic layouts, invalid requests, and undo. Targeted lint and production build pass (existing bundle-size warning remains).


## Rows beside full-height sidebars

`codex-rows.diff` contains this follow-up only. Earlier diff files remain snapshots of earlier stages.

- Rows-only resumes can convert a row into a full-height left or right sidebar. Stacked rows occupy one shared grid track, with no dummy container or section created.
- The shared track participates in the total 100% width. Its width configuration is stored once in `resume.layout.rowContentWidth` and uses existing layout JSON persistence; no database schema change is required.
- `columnIds` contains real column containers; `trackIds` additionally includes the reserved `__row_content__` track when needed. It is never inserted into container entities.
- Both sidebar boundaries support pointer and keyboard resizing. For a right sidebar, the row containers expose the resize boundary on their right edge. Manual sidebar width edits can transfer width to/from the shared track and undo together.
- Sidebar sides are preserved when the final ordinary content column becomes a row. Rows display as “Row” when no ordinary column group remains, with ordering controlled by Move earlier/later.
- Preview components remain untouched.

Validation: 26 focused tests pass (18 layout, 2 container-state, 6 section-padding-resize), targeted lint passes, and the production build passes with the existing bundle-size warning. Headless Chromium fixtures for left, right, and two-sided sidebars confirm no overlap, full page coverage, full-height sidebars, and final-section background fill. These fixtures are geometry checks, not authenticated end-to-end editor tests.

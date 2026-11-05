---
name: update-changelog
description: Update the root CHANGELOG.md from meaningful project changes. Invoke this explicitly before merging a branch.
---

# Update the changelog

When explicitly invoked (for example, with `/update-changelog`), update the
repository-root `CHANGELOG.md` to summarize the user-visible and project-level
changes that are about to be merged.

## Workflow

1. Read the existing `CHANGELOG.md`, inspect `git status`, and review the
   differences and commits that belong to the branch being prepared for merge.
   Use the target branch's merge base when it is clear; if the target or change
   scope is unclear, ask before writing.
2. Group entries under ISO date headings in `YYYY-MM-DD` format, newest first.
   Use the current date for the pending merge unless the user specifies
   otherwise.
3. Add concise bullets describing meaningful changes, not implementation
   minutiae. Combine related changes and omit generated files, formatting-only
   edits, and internal maintenance that does not affect users or contributors.
4. If the date heading already exists, add or revise bullets under it rather
   than creating a duplicate heading. Avoid repeating entries already covered
   by the changelog.
5. If no changelog exists, inspect the repository's commit history and create
   dated sections with summary bullets for each date represented in the
   history, then include any current pending changes under today's date.
6. Preserve all unrelated and historical changelog content. Do not commit,
   merge, push, or delete branches; those actions require a separate request.
7. Review the final changelog diff for duplicate entries, correct dates, and
   clear summaries.

This skill only updates `CHANGELOG.md`; invoke it manually before merging when
the branch's changes are ready to summarize.

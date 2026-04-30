# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`
**Created**: [DATE]
**Status**: Draft
**Input**: User description: "$ARGUMENTS"
**Constitution version applied**: [e.g., 1.0.0]

> ⚠ **Authoring boundary.** This specification is produced by the **Planning
> Agent**. It is consumed by a separate **Implementation Agent** that has
> **no access to the conversation that produced this spec**. Every requirement,
> file path, and acceptance check below MUST therefore stand alone — no
> "we discussed earlier" references, no implicit assumptions.

---

## 1. Evidence Base *(mandatory — Constitution Principle II)*

<!--
Every SEO-related feature MUST cite at least one piece of objective evidence.
"Best practice" or "this looks better" is NOT acceptable as the sole justification.
Pull numbers from SEO-KNOWLEDGE-BASE.md (with section reference) or live GSC.
-->

### Google Search Console signal(s)
- **Query / page**: [exact query or URL path]
- **Impressions / CTR / Position** (last 90 days): [e.g., 1,256 / 1.27% / 7.92]
- **Source**: [`SEO-KNOWLEDGE-BASE.md §X.Y` or live GSC report URL]

### Competitor or external signal (optional but recommended)
- **Competitor**: [domain]
- **Finding**: [what they have / how they treat this]
- **Source**: [`SEO-KNOWLEDGE-BASE.md §7.x`]

### Why this feature, and why now
[1–3 sentences linking the evidence above to the change being proposed.]

---

## 2. User Scenarios & Testing *(mandatory)*

<!--
User stories are PRIORITIZED user journeys. Each MUST be INDEPENDENTLY TESTABLE
— if you implement only one, you still ship a viable increment.
For SEO work the "user" is often a search engine crawler or a SERP user — that
is fine; phrase the story from that point of view.
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Plain-language description of this journey. Examples:
"A Riyadh user searching for موكيت الرياض sees a unique, page-specific
SERP snippet for /carpets and clicks through" or
"Googlebot crawls /products and finds enough unique content to index it."]

**Why this priority**: [Tie to evidence — e.g., "captures 1,256 imp currently
losing 98.7% of clicks"]

**Independent Test**: [How to verify on its own — e.g., "curl /carpets and
confirm the new title in the HTML; paste GSC URL Inspection screenshot"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [observable, automatable outcome]
2. **Given** [initial state], **When** [action], **Then** [observable, automatable outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[…]

**Acceptance Scenarios**:
1. **Given** […], **When** […], **Then** […]

---

[Add more user stories as needed.]

### Edge Cases

<!--
Examples relevant to this site:
- What happens if NEXT_PUBLIC_SITE_URL is unset?
- What if a product title in the data layer already contains the brand suffix?
- What if Google still serves the cached old title for 7+ days post-deploy?
-->

- [Edge 1]
- [Edge 2]

---

## 3. Functional Requirements *(mandatory)*

<!--
Each requirement MUST be testable AND name an exact file path or URL when
relevant. The Implementation Agent has no context — be explicit.
-->

- **FR-001**: System MUST [capability]. Affected file(s): `[exact path]`.
- **FR-002**: System MUST [capability]. Affected file(s): `[exact path]`.
- **FR-003**: User-facing strings MUST be in Arabic and serve `locale: ar_SA`. *(Constitution I)*
- **FR-004**: All NAP values MUST flow from `src/constants/business.ts`. No new hardcoded NAP allowed. *(Constitution IV)*
- **FR-005**: Any structured data emitted by this feature MUST validate in Google's Rich Results Test. *(Constitution VII)*

*Use `[NEEDS CLARIFICATION: ...]` only when the choice materially changes scope. Max 3.*

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes]
- **[Entity 2]**: [What it represents, relationships]

---

## 4. Success Criteria *(mandatory — measurable, verifiable, technology-agnostic where possible)*

<!--
For SEO work, "technology-agnostic" sometimes conflicts with reality (we DO
care that JSON-LD validates, that the route returns 308, etc). When the
criterion is technical, that's allowed — just keep it OBJECTIVE and VERIFIABLE.
-->

### Measurable Outcomes

- **SC-001**: [User/business metric — e.g., "Within 30 days of merge, GSC reports CTR for /carpets ≥ 6%"]
- **SC-002**: [Behavioral metric — e.g., "Within 14 days /products status changes from Discovered → Indexed"]
- **SC-003**: [Technical metric — e.g., "Lighthouse SEO score on changed page ≥ 95"]
- **SC-004**: [Schema metric — e.g., "Rich Results Test reports 0 errors and 0 warnings on changed page schemas"]

---

## 5. Acceptance Criteria *(mandatory — Constitution Principle V)*

<!--
For each FR / user story above, give a concrete, executable check the
Implementation Agent (and a reviewer) can run to confirm completion.
Each row MUST name the verification method.
-->

| ID | Linked FR/SC | Verification command or method | Expected output |
|----|--------------|--------------------------------|-----------------|
| AC-001 | FR-001, SC-001 | `curl -s {URL} \| grep -oE '<title>[^<]+</title>'` | Exact new title, exactly once |
| AC-002 | FR-005 | Rich Results Test on {URL} | "Page is eligible for rich results", 0 warnings |
| AC-003 | FR-004 | `grep -rn "966558352924\|966567746257\|طريق الملك فهد" src/ --include="*.tsx" --include="*.ts" \| grep -v "src/constants/business.ts"` | No output (zero hits) |
| AC-00X | […] | […] | […] |

---

## 6. Constitution Compliance *(mandatory — gate before /speckit.plan)*

<!--
Self-check against every principle of the project constitution before handing
this spec to the Planning step. If any answer is "No" or "N/A — justified",
add a row in §8 Complexity Tracking explaining why.
-->

| # | Principle | Compliant? | Notes |
|---|-----------|-----------|-------|
| I | Arabic-First, Saudi-Targeted | [Yes / No] | [Where Arabic is enforced] |
| II | Data-Driven Decisions | [Yes / No] | [Pointer to §1] |
| III | No Black-Hat / No Fake Signals | [Yes / No] | [Confirm no fabricated schema] |
| IV | NAP Single Source of Truth | [Yes / No / N/A] | [If touches NAP, point to constants] |
| V | Verification Before Completion | [Yes] | [§5 fills this] |
| VI | Mobile-First, Performance-Aware | [Yes / No / N/A] | [Lighthouse target] |
| VII | Structured Data Integrity | [Yes / No / N/A] | [List schemas changed] |

---

## 7. Assumptions

- [Assumption 1, e.g., "Google will recrawl /carpets within 14 days"]
- [Assumption 2, e.g., "OG image asset will be ready before merge"]
- [Dependency, e.g., "Depends on TASK 5 (NAP unification) shipping first"]

---

## 8. Out of Scope

<!--
Be explicit. The Implementation Agent is literal — anything not listed
here as IN scope MUST NOT be touched.
-->

- [Item out of scope 1]
- [Item out of scope 2]

---

## 9. Implementation Handoff Notes *(mandatory — Implementation Agent reads this first)*

<!--
This section exists because the downstream agent has no conversation context.
Be explicit about: which files exist already, which need to be created, where
"before/after" code blocks live, and what NOT to do.
-->

- **Reference specs**: [list of `specs/SEO-SPEC-*.md` sections that contain detailed before/after code]
- **Source-of-truth files** (read-only context): [list]
- **Files to create**: [list with exact paths]
- **Files to modify**: [list with exact paths]
- **Forbidden actions**: [e.g., "Do not modify `src/data/products.ts` data values — only rename keys"]

---

*Quality checklist (auto-generated by `/speckit.specify` at `checklists/requirements.md`).*

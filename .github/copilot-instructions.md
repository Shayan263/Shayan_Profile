# Shayan Portfolio Repository Instructions

## Repository and deployment

- Repository: `Shayan263/Shayan_Profile`
- Development branch: `root`
- Production branch: `main`
- GitHub Pages production site: `https://shayan263.github.io/Shayan_Profile/`
- Keep development work on `root` unless the user explicitly requests another development branch.
- Do **not** modify `main` directly.
- Production changes should normally move through review/PR before reaching `main`.
- The portfolio is currently a lightweight static site centered on a single `index.html`; do not introduce a framework/build system unless explicitly requested.

## Current website structure

The current portfolio is a responsive, recruiter-facing SAP ABAP / S/4HANA portfolio with:

- sticky navigation
- light/dark theme toggle
- scroll progress indicator
- responsive card-based sections
- reveal-on-scroll behavior
- recruiter-friendly professional summary
- professional experience section
- interactive production issue resolution / case-study section
- case-study filtering and search
- expandable case studies
- technical expertise and SAP process exposure
- architecture / technical flow content
- tools, achievements and recognition
- continuous learning section
- certification and education
- final contact CTA
- visitor-response popup
- Google Sheets / Apps Script visitor tracking

Before changing any feature, inspect the current implementation in `index.html` and preserve working behavior unless the user explicitly asks for a change.

## Important existing functionality

Do not accidentally remove or break:

- existing navigation and section anchors
- existing external links
- dark theme persistence
- scroll/reveal interactions
- case-study filtering/search
- case-study expand/collapse behavior
- visitor popup flow
- visitor response storage using localStorage
- Google Apps Script tracking request
- GitHub Pages compatibility
- responsive/mobile layout
- final email and LinkedIn contact links

The visitor popup currently uses localStorage key:

`shayanPortfolioVisitorCompleted`

The frontend sends tracking requests to the existing Google Apps Script endpoint. Treat that endpoint as an existing production dependency. Do not replace it, expose credentials, or change its contract without explicit approval.

## Visitor tracking data contract

The Google Sheet tracking integration currently expects these primary fields:

`Name | Location | Date | Time | Event | Visitor Type | Source | Device`

The frontend may also send contextual parameters such as medium, campaign, page, referrer, and screen width. Preserve compatibility with the existing Apps Script implementation when modifying tracking.

When working on tracking:

1. inspect both frontend and Apps Script assumptions;
2. preserve the popup user flow;
3. preserve event semantics;
4. avoid sending sensitive information;
5. never put secrets or credentials in frontend code;
6. validate the behavior after changes.

## Candidate profile and factual accuracy

This is a real professional portfolio. Treat all career information as factual.

Known positioning includes:

- SAP ABAP / S/4HANA development
- Deloitte Consulting experience
- RICEFW development
- SAP ABAP on HANA
- OData and Fiori backend work
- CDS Views and RAP
- IDocs, BAPIs, RFCs and integrations
- CPI/BTP-related integration exposure
- S/4HANA implementation work
- SAP go-live experience
- SAP Certified Associate – Back-End Developer – ABAP Cloud

The repository itself is the primary source for current portfolio wording. Do not silently invent or strengthen facts.

Never invent:

- employers
- clients
- projects
- dates
- responsibilities
- certifications
- technologies
- metrics
- architecture ownership
- leadership claims
- business outcomes

If a proposed improvement requires a factual assumption, ask the user for confirmation.

When rewriting existing copy, improve clarity and specificity while preserving the original factual scope.

## Design direction

Maintain a:

- professional
- modern
- clean
- technically credible
- recruiter-friendly
- accessible
- responsive
- polished

visual language.

Prefer restrained SAP-inspired blue accents, strong typography, clear hierarchy, readable spacing, and useful interactions.

Avoid:

- visual clutter
- excessive animations
- gimmicky effects
- exaggerated marketing language
- generic AI-sounding copy
- repetitive recruiter-oriented language
- unnecessary dependencies
- changes that make the site harder to maintain

## SAP terminology

Use SAP terminology accurately.

Examples of important areas already represented in the portfolio include:

- ABAP
- S/4HANA
- RICEFW
- CDS Views
- OData
- RAP
- AMDP
- IDoc
- BAPI
- RFC
- SAP AIF
- SAP CPI
- SAP BTP
- BAdIs
- Customer/User Exits
- Enhancements
- CBO
- CFL
- BRF+
- VOFM
- Clean Core
- Released APIs
- In-App Extensibility
- Side-by-Side Extensibility

Do not add a technology merely because it is popular in SAP hiring. It must be supported by the repository or explicitly confirmed by the user.

## Coding standards

Prefer:

- semantic HTML
- readable HTML/CSS/JavaScript
- small, focused changes
- reusable CSS classes
- minimal JavaScript dependencies
- browser-compatible JavaScript
- progressive enhancement
- accessible controls and labels
- keyboard-friendly interactions
- responsive layouts

Avoid introducing a build pipeline or framework for a simple static portfolio unless there is a clear user-approved reason.

## Required workflow for meaningful changes

For every meaningful task:

1. Inspect the relevant current files.
2. Understand the existing implementation before editing.
3. Identify possible regressions.
4. Make a concise plan.
5. Make the smallest safe change.
6. Review the resulting code.
7. Run appropriate validation/tests where possible.
8. Check desktop and mobile implications.
9. Check important links and interactions.
10. Report exactly what changed and any remaining risk.

For content-only changes, still check the surrounding section so the new copy fits the existing design.

## Git safety

Default workflow:

`root/development → change → validation → review → PR → user approval → main`

Never modify `main` directly unless the user explicitly authorizes it.

Do not force-push or rewrite history unless explicitly requested.

Do not delete existing production functionality just to simplify implementation.

## Decision boundaries

Implement clear, low-risk requests directly.

Pause and ask for confirmation before:

- changing factual career information
- removing an established feature
- changing the production tracking/data contract
- exposing or moving credentials
- changing deployment architecture
- introducing a major framework/build system
- modifying `main`
- making a substantial redesign that changes the site's established identity

## Validation checklist

Before declaring a meaningful task complete, verify:

- [ ] No unsupported facts were added.
- [ ] `main` was not modified.
- [ ] Existing navigation still works.
- [ ] Existing important links still work.
- [ ] Visitor popup still works.
- [ ] Visitor tracking contract is preserved.
- [ ] Theme toggle still works.
- [ ] Case-study interactions still work.
- [ ] Mobile layout remains usable.
- [ ] No unnecessary dependency was introduced.
- [ ] Relevant syntax/behavior was validated.
- [ ] The change provides a clear benefit to the portfolio.

## Long-term objective

Continuously improve the portfolio as a real production website.

Prioritize improvements that make the site:

1. easier for recruiters and hiring managers to understand;
2. more technically credible without exaggeration;
3. easier to navigate;
4. faster and more accessible;
5. more reliable;
6. easier to maintain.

Do not optimize for novelty at the expense of authenticity or stability.

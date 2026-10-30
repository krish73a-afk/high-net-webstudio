# High Net Webstudio

Professional upgrade — 30 October 2026. This is the existing editable HTML/CSS/JavaScript project, prepared for GitHub Pages. No framework or build step is required.

## Preview and editing

Open the whole folder in VS Code and choose Open with Live Server on `index.html`. Keep `assets/` and `demos/` in place. Use localhost or HTTPS for clipboard and browser preference support.

## Pages

- `index.html`: website/digital-services hero, interactive service finder, eight practical reasons to choose the studio, switchable concept preview, completed-work teaser, five-step process, compact pricing, FAQs and enquiry.
- `services.html`: all eight existing services, original website tiers, scope/revision/source requirements, comparison table and estimator with itemised breakdown.
- `projects.html`: the two real personal projects and their purpose, technology, features and responsive considerations.
- `demos.html`: all nine fictional business concepts, actual desktop/mobile previews, industry/tier filters, searchable features and contextual quotation links.
- `restaurant-websites.html`, `fitness-websites.html`, `education-websites.html`, `business-websites.html`: original industry content, practical features, scope boundaries and related work.
- `privacy.html`: enquiry processing, local preferences, external providers and optional analytics.
- `404.html`: useful recovery links. Main pages are included in `sitemap.xml`; individual fictional demos use `noindex,follow`.

## Shared files

- `fonts.css` / `assets/fonts/`: locally hosted studio typefaces, preload hints and official licenses.
- `style.css`: brand tokens, shared components, forms, themes and responsive rules. Unused legacy illustration/work-intro styles were removed safely.
- `pages.css`: studio layouts, preview frames and the region selector.
- `professional.css`: new content sections, comparison, enquiry fields, case-study facts, industry pages and refined intro details.
- `site.js`: shared navigation, theme, progress and reveal behavior.
- `script.js`: homepage service recommendations and switchable showcase.
- `intro.js`: one H/N identity reveal per session, Skip, Escape, optional footer replay and reduced-motion support. It never locks the page; hidden-by-default HTML and CSS exit remain fail-safes.
- `pricing.js` / `region.js`: INR business prices, seven pricing regions, reference-rate cache/fallback and the shared estimate calculation. Only configuration/preferences are stored, never enquiries.
- `services.js`: category filters, package controls, breakdown and quotation handoff.
- `site-config.js`: public form/analytics settings. No private credentials belong here.
- `contact.js`: validation, Formspree integration, honest email/copy alternatives and request states.
- `analytics.js`: optional clean pageviews and allowlisted actions; disabled until configured.
- `demos.js` / `demos-page.css`: the nine-card library and filters/search.
- `demo-nav.css` / `demo-utils.js`: shared fictional-business notice, explicit studio quote link, keyboard and image safeguards.

## Assets and demos

All nine demo folders and their page structures are retained. The gallery uses 18 local versioned WebP previews (`*-desktop-v2.webp`, `*-mobile-v2.webp`) in `assets/previews/`. Old unreferenced previews remain available as source history. Two local project screenshots are in `assets/projects/`; the favicon and sharing image are under `assets/`. The 1200×630 sharing PNG has an editable SVG companion. `assets/testimonial-template.html` is inactive; use only real approved feedback.

Education: Apex Academy / Elevate Learning / The Learning Collective. Restaurants: Urban Bites / Saffron & Stone / Ember House. Fitness: FitZone / Momentum Fitness / FORGE Performance.

Demo forms are simulations. Urban Bites now previews locally rather than sending a fictional restaurant message to the studio. Explicit Request a similar website links lead to the real studio enquiry form. Native and custom dialogs preserve the existing interaction model. `?preview=1` remains an optional no-intro capture view.

## Prices and integrations

Basic remains ₹1,500 (one page/up to five sections), Advanced ₹3,000 (up to three brochure pages), Premium ₹5,000 (up to four brochure pages), with supplied content and one consolidated revision round. Eight digital-service prices are unchanged. Update visible HTML and `pricing.js` together when intentionally changing rates; see `PRICING-NOTES.md` for the original rationale.

The region selector converts the same Indian prices to USD, GBP, EUR, AED, AUD and CAD. It does not impose international market rates or locate visitors. Rate notes identify the source and date. Converted line items are rounded before summing; the estimator and enquiry use the same calculation.

**Online form delivery requires your verified Formspree endpoint.** WhatsApp enquiry drafts already work with the owner-confirmed number; email drafts and copying are also available. Analytics is disabled. No social handles, phone numbers, verification tokens, testimonials or private keys have been invented. Email is `highnet00@gmail.com`.

Read [SETUP.md](SETUP.md) for provider activation, analytics, Search Console, contacts, GitHub publication and later custom-domain changes. Local edits have not automatically published a new GitHub Pages version.

WhatsApp: `+919557865567`. The contact card opens a general chat; Continue on WhatsApp carries the completed enquiry into a reviewable draft. Instagram is left unconfigured.

# High Net Webstudio — activation and publishing

Updated 30 October 2026. The website is static HTML/CSS/JavaScript and works with Live Server and GitHub Pages. No build step, framework or backend is required. Website prices and eight digital-service offers have been retained.

## Contact form: Formspree

The integration is prepared, but **online delivery is not activated** because the owner's verified endpoint is not available. The shipped form offers a clearly labelled email draft and complete-enquiry copying. It never reports that an unsent message succeeded.

1. Create an account at https://formspree.io/ and a form for High Net Webstudio. Set the receiving address to `highnet00@gmail.com` and complete Formspree's address verification.
2. Copy your public endpoint, shaped like `https://formspree.io/f/…`, into `formEndpoint` in `site-config.js`. This public form ID is intended for client-side use; do not paste account passwords or private API tokens.
3. Keep the standard `_gotcha` honeypot. Review Formspree's spam settings and CAPTCHA requirements in the dashboard. Test an actual submission after setup; an HTML challenge response is deliberately not treated as success by this site.
4. If enabling Restrict to Domain, add `krish73a-afk.github.io`, then your custom domain when it is active. The request sends only the site origin as its referrer so domain checks work without exposing page query strings. Localhost tests may need a separate development configuration; do not weaken your production restriction simply for a preview.
5. Publish the configuration, send one clearly identified test enquiry yourself and verify receipt in your actual mailbox and Formspree dashboard. Check an invalid address, an offline attempt and the email/copy alternatives.

The current Free plan advertises 50 submissions/month, AJAX and basic spam protection. Plan limits can change; check https://formspree.io/plans before activating. An HTTP/JSON error, quota limit or unconfirmed response shows an error with retry/fallback. A timeout cannot prove delivery failed, so the form warns to check before resending. No personal form fields are written to browser storage or site navigation URLs.

Official documentation: [HTML forms](https://formspree.io/html/), [AJAX](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax), [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering), [domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain), [privacy](https://formspree.io/legal/privacy-policy/).

## Optional analytics: Plausible

Analytics is **disabled by default**. No analytics account, subscription, tracking ID or third-party analytics script has been activated.

1. Create your own site in Plausible and obtain the exact account-provided script URL from its dashboard. Current scripts use `https://plausible.io/js/pa-….js`.
2. Put that URL in `analytics.scriptUrl` and set `analytics.enabled` to `true` in `site-config.js` only when ready. Keep the narrow URL validation in `analytics.js` or deliberately adapt it if Plausible changes its documented format.
3. The code disables automatic pageviews, outbound URL capture and form capture. It sends a manual clean pageview and allowlisted action names. Query strings/fragments are stripped from page URLs and referrers; form values and full clicked destinations are never supplied.
4. Add these custom event goals in the dashboard: `Demo Preview`, `Service Enquiry`, `Contact Email`, `Quote Prepared`, `Enquiry Submitted`. For individual demo/service breakdowns, also create `Demo Preview: NAME` and `Service Enquiry: NAME` goals using the exact curated names in the `demos` and `services` arrays in `analytics.js` (for example, `Demo Preview: FORGE Performance` and `Service Enquiry: Data management`). Demo pages also receive clean path-only pageviews when enabled. Events count towards provider usage. There are no visitor names or message contents in event properties.
5. Verify the setup on the public site with Do Not Track off, then verify that no analytics is sent with it on. Localhost previews are intentionally excluded. Review `privacy.html` when changing providers or collection behavior.

Plausible offers a 30-day trial and a paid subscription afterwards; it is not a permanent free tier. Current listed Starter pricing begins at $9/month for 10k monthly views. Check the current dashboard and pricing before purchase. No purchase is required for the website itself.

Official references: [script](https://plausible.io/docs/plausible-script), [configuration](https://plausible.io/docs/script-extensions), [custom locations](https://plausible.io/docs/custom-locations), [custom events](https://plausible.io/docs/custom-event-goals), [data policy](https://plausible.io/data-policy), [pricing](https://plausible.io/#pricing).

## Google Search Console

1. Add a **URL-prefix property** for `https://krish73a-afk.github.io/high-net-webstudio/`, including the trailing slash. A Domain property for the shared `github.io` domain is not appropriate for this repository.
2. Choose HTML-tag verification and paste your own exact `google-site-verification` meta tag into the homepage `<head>`. No verification token has been invented or added. Publish it, then click Verify in Search Console. Keep the tag after verification.
3. Submit `https://krish73a-afk.github.io/high-net-webstudio/sitemap.xml` in Sitemaps. It lists the nine main business pages, including the four industry pages and privacy notice. It excludes fictional demos, the 404 page and the inactive testimonial snippet.
4. Use URL Inspection for Home, Services, Projects, Demos and the industry pages, then request indexing where appropriate. Review Page indexing and sitemap reports for errors. Indexing and ranking are not guaranteed.
5. Use Performance → Search results to inspect queries, landing pages, impressions and clicks. Compare periods after enough real data accumulates.

**robots.txt limitation:** Google reads robots files only at the origin root. On the current project URL, `/high-net-webstudio/robots.txt` is not the host-root robots file. The provided file is valid and useful once this project is served at a custom-domain root. Submit the sitemap directly in Search Console now. Fictional demo pages use their own `noindex,follow` meta tag, which does not depend on robots.txt.

Official references: [properties](https://support.google.com/webmasters/answer/34592), [ownership verification](https://support.google.com/webmasters/answer/9008080), [robots location rules](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).

## Social contacts, testimonials and previews

- Email is `highnet00@gmail.com`. The owner-confirmed WhatsApp number is `+919557865567` (`whatsappNumber` in `site-config.js`). The direct chat card and Continue on WhatsApp enquiry action are active; the enquiry action includes the completed form and requires the visitor to review and tap Send. Original owner-supplied QR link: https://wa.me/qr/H623OHZBQDPZA1 . Instagram remains unavailable for now. Do not reuse fictional demo contacts.
- `assets/social/highnet-social.png` is a 1200×630 local social sharing image; an editable SVG is alongside it. Open Graph and Twitter metadata on main pages use its absolute published URL. Share caches may retain an earlier preview until a platform fetches it again.
- `assets/testimonial-template.html` is an inactive component. Publish genuine feedback only with permission, replace every bracketed field and remove `hidden` when appropriate. No invented endorsement is displayed.

## Editing and currency

The main page styling is in `style.css`, `pages.css` and `professional.css`. Each demo retains its separate HTML/CSS/JS and assets. `site-config.js` holds public integration settings, `contact.js` handles enquiry states, and `analytics.js` owns the optional analytics boundary.

Update INR business prices in `pricing.js` and the visible HTML together. Basic remains ₹1,500 / one page up to five sections, Advanced ₹3,000 / up to three brochure pages, Premium ₹5,000 / up to four. All use supplied content and one consolidated revision round. The eight digital-service prices are separate. No new rate has been introduced in this upgrade.

`region.js` converts the INR offers to USD, GBP, EUR, AED, AUD and CAD; it does not apply market multipliers or detect location. The dated rate note now distinguishes bundled fallback, cached reference rates and newly fetched reference rates. The estimate rounds units first; its visible breakdown and final total use the same calculation as the enquiry. Browser storage contains only theme, region and rate preferences.

## Publish to the existing GitHub Pages repository

There is no `.git` checkout in the Desktop folder, so no local commit or push has been made. Do not initialize a conflicting repository or overwrite remote work blindly.

1. Back up the current repository and confirm that no newer unrelated changes need merging. Keep the original Desktop backup ZIP supplied with this upgrade.
2. Upload the contents of `high_net_webstudio` to the existing repository root, preserving all nested `assets/` and `demos/` folders. Alternatively, clone the existing repository into a new empty folder, copy the reviewed updated files into it, inspect the diff and commit through your normal workflow.
3. Include all new main pages, `professional.css`, `site-config.js`, `contact.js`, `analytics.js`, social assets, `sitemap.xml`, `robots.txt`, `404.html`, `SETUP.md`, and modified existing files. The delivered change manifest lists exact paths. Do not upload backups, local QA fixtures or test reports as public site assets.
4. Suggested commit title: `Improve studio enquiry flow, industry content, SEO and demo usability`.
5. Keep the existing Pages publishing branch/folder, check the deployment result in GitHub, then open the public Home, Services, Projects, Demos and each industry page. Verify thumbnail loading, mobile navigation, pricing and sitemap. The current public site is not automatically updated by local file edits.

## Later custom domain

Add the custom domain through repository Settings → Pages and configure the correct DNS records with the registrar. Keep the generated `CNAME` file during future uploads. Enable Enforce HTTPS when GitHub's certificate is ready.

Replace the exact site prefix `https://krish73a-afk.github.io/high-net-webstudio/` with your final canonical domain root in main-page metadata/JSON-LD, sitemap, robots and 404 links. The relative internal links and asset paths already support a domain root. Add the new domain to Formspree and Plausible, update Search Console verification/property, submit the new sitemap and retest delivery and navigation.

Official GitHub guides: [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

## Local studio fonts

The nine main pages self-host DM Sans, Space Grotesk and Playfair Display Latin WOFF2 subsets (82,296 bytes total), with preload hints and font-display:swap. Their official SIL Open Font Licenses are in assets/fonts/. System fallback stacks remain for currency and non-Latin glyphs. Demo-specific Google Fonts remain independent to preserve their existing typography. Main-page font loading no longer needs Google Fonts. Source files come from the official fonts.googleapis.com / fonts.gstatic.com services and licenses from https://github.com/google/fonts.

## WhatsApp enquiry drafts

WhatsApp works without a Formspree account. The form action validates required fields, then builds an official `https://wa.me/919557865567?text=...` draft containing name, reply email, optional phone/business, service, budget, timing, region and project description (including any estimate). It never sends automatically or clears the brief. Email drafts and copying remain available if WhatsApp is unavailable. The number was supplied by the owner; a QR token alone is insufficient for custom prefilled text. See https://faq.whatsapp.com/5913398998672934/ . Changing `contactEmail` does not change a provider account’s delivery settings: verify `highnet00@gmail.com` with Formspree before activating its endpoint.

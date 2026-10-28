# High Net Webstudio

Updated 28 October 2026. Editable static HTML, CSS and JavaScript. No build step or backend is required.

## Open

Open this entire folder in VS Code. Choose **Open with Live Server** on `index.html`. Keep the folder structure intact. Relative links also work from HTML files opened directly; clipboard and storage work best on localhost or HTTPS.

The studio now has four pages:

- `index.html`: interactive introduction, goal-based service finder, switchable demo showcase, studio facts, process, FAQs and contact.
- `services.html`: all eight digital services, three website packages, detailed scopes and the website estimator.
- `projects.html`: the two completed personal projects, live external links and exploration notes.
- `demos.html`: nine fictional business demos with freshly captured desktop and mobile previews.

The full service and completed-project collections have moved off Home. Navigation and footer links are consistent across all four pages.

## Edit

- `index.html`: homepage content, goal choices, demo showcase, FAQs and contact channels.
- `services.html`: services, website packages, scopes, add-ons and estimator.
- `projects.html`: completed projects, external destinations and project notes.
- `style.css`: existing shared brand styles.
- `pages.css`: four-page layouts, interactive homepage and desktop/mobile gallery frames.
- `site.js`: shared theme, navigation, progress and reveal behaviour.
- `script.js`: homepage recommendations, showcase and email enquiry.
- `services.js`: service categories and website estimate controls.
- `pricing.js`: shared INR base prices; also update visible HTML prices when editing.
- `region.js`: seven pricing regions, currency conversion, dated fallback rates, daily refresh/cache and remembered selection.
- `intro.js`: H/N opening, skip/Escape handling, session preference and reduced motion.
- `demos.html`, `demos-page.css`, `demos.js`: gallery layout, filters, search, names, thumbnail paths and demo destinations.
- `assets/previews/`: 18 fresh screenshots named `*-desktop-v2.webp` and `*-mobile-v2.webp`. Gallery cards show a desktop view with a phone inset. Original unversioned files are retained but unused. A text fallback keeps links usable if an image is unavailable.
- `assets/favicon.svg`: the studio icon, also used by demos without their own icon.
- `assets/projects/`: local screenshots of Krish Digital Portfolio and Soul Encore.
- `demo-nav.css`, `demo-utils.js`: shared return navigation, keyboard, responsive and image safeguards.
- `demos/`: each concept keeps its own HTML, CSS, JavaScript and assets.

## Prices

Basic starts at ₹1,500 (1 page / up to 5 sections), Advanced at ₹3,000 (up to 3 brochure pages), and Premium at ₹5,000 (up to 4 brochure pages). Scopes assume supplied copy and images, one direction and one consolidated revision round. Additional pages in the estimator are beyond the selected package's included page count.

Update the visible HTML and `pricing.js` when changing web prices. The estimator and enquiry use the same settings. Digital service prices are separate from the web tiers. Service cards contain the scope and optional add-ons. See `PRICING-NOTES.md` for research and reasoning.

## Contact

The working address is **krish73a@gmail.com**. Update `CONTACT_EMAIL` in `script.js` and the HTML email links together if it changes. The form opens an editable draft in the visitor's email app; it never sends automatically. The copy button provides an alternative, with a manual text-selection fallback if clipboard access is unavailable.

No verified business WhatsApp number or Instagram handle was present in this project. Their icons are non-link cards with a visible explanation. To activate either, replace its `div.channel.channel-unavailable` with an `a.channel` using the confirmed `https://wa.me/` number (international digits only) or confirmed Instagram URL. Remove the unavailable wording. Do not reuse fictional contacts from the demo websites.

## Intro and accessibility

The homepage intro is hidden without JavaScript. H enters from above and N from below, followed by the studio name. It skips with reduced motion, direct section links and repeat visits in the same tab. Skip, Escape, keyboard navigation, a 2.7-second timer and an independent 3.2-second CSS exit release it. It never locks scrolling or makes the main page inert.

Demo intros retain their styles and have shared no-script and timeout safeguards. Custom pop-ups keep keyboard focus inside and restore the trigger. Reduced-motion CSS suppresses decorative movement. Navigation remains available without JavaScript; the gallery supplies direct demo links as a fallback.

## Demo boundaries

All nine businesses are fictional. Their course, booking and membership previews do not process real enrolments, reservations or payments. Urban Bites can prepare a portfolio enquiry email to the Webstudio address; the visitor reviews and sends it themselves.

Google Fonts and Ember House photos use external services. System fonts and local artwork keep the content usable if they are unavailable. All portfolio previews are local files.

## Cross-page links and preview refresh

Service links pass a recognised service name to `index.html#contact`. Website estimates carry only package/add-on choices in the URL; Home recalculates the total from `pricing.js`. Personal form fields are not put into these URLs. Old homepage bookmarks for services, packages, estimates and selected work redirect to their new pages when JavaScript is available.

To refresh screenshots, open each demo with `?preview=1` through Live Server. This optional capture view hides intro overlays and decorative motion while retaining the page content. Capture desktop and phone sizes, save new local WebP assets, and update both `image` and `mobile` in `DEMO_PROJECTS` in `demos.js`. Use new filenames to avoid stale browser images. Normal demo URLs preserve their animations.

## Region selector

The top-right selector is present on Home, Services, Projects and Demos. India (INR) is the default. The other choices display USD, GBP, EUR, AED, AUD or CAD. These are currency equivalents of the same Indian starter prices; no international market-price multiplier is applied.

The choice is remembered locally. Studio navigation and enquiry links also carry the region in their URL, so it works when browser storage is unavailable. No IP lookup or automatic location detection is used. Service prices, optional extras, website tiers, homepage recommendations, dropdown labels and estimate totals update together. Enquiry drafts include the region and currency, and changing region preserves typed project notes.

`region.js` uses the public [Frankfurter reference-rate API](https://frankfurter.dev/). Rates refresh with a short timeout and a 24-hour browser cache. If the network is unavailable, the last valid cached rates or the bundled **28 October 2026** snapshot remain usable; the selected currency's reference date is shown. Non-INR prices are labelled approximate. Converted line items are rounded to the currency's precision before being added to the estimate, so the displayed items add to the displayed total.

To change base business prices, edit `pricing.js` and visible HTML prices. To change supported regions or refresh the bundled reference snapshot, edit the clearly named `REGIONS` and `FALLBACK` settings in `region.js`. The fictional demo businesses retain their own example prices; the selector controls Webstudio service pricing.

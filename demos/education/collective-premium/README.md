# The Learning Collective — Premium Education Website Demo

A five-page, editable website concept created for **High Net Webstudio**.

## Quick start

1. Extract the complete ZIP without changing its internal folder structure.
2. Open `index.html` in a browser, or open the folder using VS Code Live Server.
3. On first arrival per tab, the flat bottom-edge book intro plays; use **Skip intro** to proceed immediately.
4. Explore `programs.html`, `experience.html`, `journal.html`, and `admissions.html`.

The site uses no JavaScript framework, no build tools, and no external animation library. All important visual art is original and stored locally in `assets/`. Typography optionally loads DM Serif Display and DM Sans from Google Fonts; system fallback fonts work offline.

## Files

- `index.html` — premium homepage and book intro markup
- `programs.html` — course discovery, searchable filters, program detail dialog, pathway explorer
- `experience.html` — learning environment, principles, accessible details accordions
- `journal.html` — editorial cards and story dialogs
- `admissions.html` — three-step client-side-only enquiry demonstration
- `style.css` — all design tokens, 2D book intro with visible lower page edges, transitions, responsive CSS, reduced-motion rules
- `script.js` — navigation, intro, scroll animations, course data, filters, pathway tabs, stories, form preview
- `assets/*.svg` — original vector artwork

## Customize

**Brand and text:** edit the content in the appropriate HTML file. The site name appears in the header/footer of each page. Search for `The Learning Collective` to replace it.

**Colours:** change the CSS variables at the top of `style.css` (`--ink`, `--cream`, `--gold`, `--wine`, etc.).

**Opening book sequence:** look for `.intro-stage-bottom`, `.flat-book`, `.flat-book-page`, `.flat-book-edge`, `.flat-book-spine` and `@keyframes flat-unfold` in `style.css`. The two halves unfold outward horizontally from the central binding as seen from the front and lower edge. The bottom paper stack and the spine stay visible. There is no 3D camera or rotateY transform.

**Opening timing:** adjust the `4200` timeout in `script.js`, and the `flat-unfold` and `flat-wordmark-in` animation durations in `style.css` together. The intro is skippable and disabled when the visitor prefers reduced motion.

**Programs:** edit the `PROGRAMS` array near the beginning of `script.js`. If you rename a program key, update matching `<option>` values in `admissions.html`.

**Journal content:** edit the `STORIES` object in `script.js` and each story card in `journal.html`.

**Gallery link:** when this folder is placed inside `High_Net_Webstudio_V3/demos/education/learning-collective-premium/`, the footer's `../../../demos.html` link returns to the portfolio gallery.

## Link from High Net Webstudio's demos.js

Copy `assets/gallery-preview.webp` into your main portfolio's `assets/previews/collective-premium.webp` if you want the gallery to display this site screenshot. Then set the premium education entry's URL:

```js
url: "demos/education/learning-collective-premium/index.html"
```

## Important

**This is a fictional concept institution.** Courses and programs, campus illustrations, journal entries, and admissions are demonstrations. The multi-step admissions preview runs locally and **never sends or saves** information. To turn this into a real client site, connect a verified backend/form provider, supply accurate business content, set up privacy disclosures and obtain approval for all claims.

If you choose to distribute or host the website commercially, review your hosting provider's terms and the Google Fonts license.

# Elevate Learning — Advanced Education Website

A fictional, responsive **Advanced-tier concept** created for High Net Webstudio.
The site demonstrates meaningful differences from a basic one-page site: four pages,
a book-opening introduction, course search and filtering, two-course comparison,
a weekly timetable, an approachable teaching-story section, and a front-end admissions preview.

## Start here

1. Unzip this folder.
2. Open `index.html` using VS Code **Live Server** (recommended); local opening usually works too.
3. Explore the top navigation: Home, Programs, Our approach, Admissions.
4. The book-opening animation plays once per browser tab on the home page. Use the **Skip intro** button, or open a fresh tab to see it again. Visitors who prefer reduced motion see the site immediately.

## File guide

- `index.html`: homepage + intro book animation markup.
- `courses.html`: searchable/filtered course catalog + compare dialog.
- `approach.html`: learning philosophy + switchable example timetable + FAQs.
- `admissions.html`: sample admission enquiry interface; does **not** send or save data.
- `style.css`: complete design, responsive layouts, and transition styling.
- `script.js`: all interactions and editable `COURSES` and timetable data.
- `assets/elevate-mark.svg`: original academy logo.
- `assets/hero-study.svg`: original hero illustration.
- `assets/learning-room.svg`: original learning studio illustration.

## Quick customization

- **Colours**: edit CSS variables at the start of `style.css` (`--teal`, `--yellow`, `--coral`, etc.).
- **Academy text and headings**: edit the relevant `.html` file.
- **Courses, grade levels, topics, weekly sessions**: update `const COURSES` near the top of `script.js`.
- **Timetable**: update `const timetable` in `script.js`.
- **Intro duration**: in `script.js`, change `hideTimer = setTimeout(finishIntro, 2350);`; update CSS animations only if you change the sequence timing.
- **Navigation**: every page has its own `<nav>` section: update links in all four HTML files to remain consistent.
- **Admissions**: this is *deliberately* frontend-only; to accept submissions for a real client, integrate an appropriate secure form service with consent and privacy notices.
- **Fonts**: two Google Fonts are loaded when online; the website has local fallback fonts if they don't load.

## Add to the High Net Webstudio portfolio

Move the entire `elevate-learning-advanced` folder to:

`High_Net_Webstudio_V3/demos/education/elevate-learning-advanced/`

Then edit the **Elevate Learning** entry in your studio's `demos.js`:

```js
{
  name: "Elevate Learning",
  category: "education",
  tier: "advanced",
  description: "A colourful, interactive education experience with course discovery and a book-opening welcome.",
  image: "assets/previews/elevate-advanced.webp",
  url: "demos/education/elevate-learning-advanced/index.html"
},
```

The gallery handles links automatically. Change the preview image only after you capture a new screenshot you want to display. The website has a subtle **Back to High Net Webstudio** link in the footer when opened at the portfolio's expected nested path.

## Functionality / disclosure

- Course information, schedules, academy branding and admissions are fictional.
- No awards, outcomes, reviews, or staff credentials are invented or implied.
- Course filters/compare and schedule switching run completely in your browser.
- The admissions form validates and displays an on-page preview; entered personal information is not sent or stored, and form fields are reset afterward.
- All core imagery is custom-created SVG, so no image hosting is required.
- Motion is reduced automatically if the visitor has `prefers-reduced-motion` enabled.

## Suggested checks before showing clients

Test at common phone, tablet and desktop widths; tab through links and buttons; test filters with no results, the two-course comparison, dialogue dismissal using Escape, an invalid form, and reduced-motion browser preferences. If adapting this to a real institution, replace concept content with verified information and set up actual privacy, forms and publishing infrastructure.

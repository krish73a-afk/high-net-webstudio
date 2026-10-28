# Urban Bites — Basic Restaurant Demo

A **fictional** one-page restaurant website for the High Net Webstudio demo gallery.

## Run it

Open `index.html` in your browser, or use **VS Code → Live Server**. All illustrations are locally included SVGs. Google Fonts are optional; fallbacks work offline.

## Edit it

- `index.html`: Homepage text, navigation, story and contact section.
- `style.css`: Colours at `:root`, spacing, responsive layouts and minimal hover transitions.
- `script.js`: Change `MENU_ITEMS` to edit dish names, categories, prices, vegetarian classification, ingredients and illustration names.
- `assets/food/`: Locally stored editable vector food images.
- `assets/hero-feast.svg`: Homepage illustration.
- `assets/story-table.svg`: Story illustration.

## Demo behaviour

- Search is live and matches dish names, descriptions and ingredient text.
- Category chips and the vegetarian-only checkbox work together.
- View details opens an accessible native dialog; Esc closes it.
- The email form opens a prefilled email to `krish73a@gmail.com`. It does **not** send automatically, and stores no messages.
- Menu names, prices, ingredients and hours are mock content. Verify all details before using the page for a real restaurant.

## Add to High Net Webstudio gallery

Copy the `urban-bites-basic` directory to:

`High_Net_Webstudio_V3/demos/restaurant/urban-bites-basic/`

In the parent website's `demos.js`, change the Urban Bites record to:

`url: "demos/restaurant/urban-bites-basic/index.html"`

The existing gallery image can be replaced with an actual screenshot of this demo.

This is a showcase only: it is not a live ordering, reservation, or payment system.

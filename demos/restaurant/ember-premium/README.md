# Ember House — Premium Restaurant Demo (V5)

This is the updated premium restaurant website for High Net Webstudio. It uses a vintage espresso, ivory, and brass visual identity. The old steak-cutting/full-screen intro has been **completely removed**.

## What's new in V5
- Homepage loads **immediately**. A restrained editorial opening animates the EH seal, gold line, headline, action buttons, and hero photograph; it never covers or blocks the page.
- More breathing room between action buttons, navigation links, menu filters, restaurant contact actions and reservation time selections across desktop and mobile.
- Removed the obsolete Replay opening link and JavaScript intro/session logic.
- The remainder of the existing website and functionality is preserved.
- Reduced-motion users do not receive entrance movement.

## Editable files
- `index.html` — homepage and subtle opening animation markup
- `menu.html` — 24 dishes, live search, categories, vegetarian and chef-favourites filters, details dialog
- `experience.html` — chef's table, private dining and atmosphere
- `reservations.html` — seat-booking preview and restaurant enquiries
- `style.css` — all layouts, colours, spacing and entrance animation
- `script.js` — menu dataset, dialogs, navigation, booking previews and image fallbacks
- `assets/hero-fallback.svg` — hero image fallback when online images aren't accessible
- `assets/food-fallback.svg` — dish image fallback

## How to open
Extract the ZIP. Open the `ember-house-premium` folder in VS Code and start Live Server at `index.html`. If replacing a previous version, replace the whole folder and refresh with `Ctrl + Shift + R` to clear cached CSS/JS.

## Add to High Net Webstudio
In the Ember House project in `demos.js`, use:

```javascript
url: "demos/restaurant/ember-house-premium/index.html"
```

## Notes
This is a fictional restaurant concept, not a real operational five-star hotel or restaurant. Booking and contact forms **preview** information but do not submit or confirm reservations. Food photos load from third-party internet sources with SVG fallbacks when offline. Substitute appropriately licensed client imagery and accurate venue information for production use.

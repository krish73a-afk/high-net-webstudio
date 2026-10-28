# Saffron & Stone — Advanced Restaurant Concept

An original three-page concept restaurant website for High Net Webstudio.

## Start

Open the folder in VS Code and run `index.html` with Live Server. Or serve this directory with `python -m http.server 8080` and visit `http://localhost:8080`.

## Pages

- `index.html` — colourful café homepage + cup-filling intro, house favourites, restaurant story, booking CTA.
- `menu.html` — separate digital menu with search, category filters, vegetarian-only option, dish-details dialog and sample prices.
- `visit.html` — cafe-style location/hours/contact page with **Book a Seat demo**, reservation request preview, and message preview.
- `style.css` — all visual design, responsive layouts and opening animation.
- `script.js` — all interactive behavior and editable `DISHES` data.
- `assets/` — 11 original, locally stored SVG illustrations. No external images required.

## Edit for a real client

1. Update restaurant name and copy across the HTML files (search `Saffron & Stone`).
2. Change the design colours in `style.css` under `:root`.
3. Update or remove menu dishes in the `DISHES` array near the top of `script.js`; provide genuine allergen and price data.
4. Replace the **concept-only** visit panel, opening hours and location with verified address and actual phone contact; add a working map/directions link.
5. Integrate a **real** reservation system and a secure backend to check availability, prevent duplicate bookings, and obtain confirmation. Do NOT relabel the booking preview as real before doing that.
6. Integrate a real enquiry provider with validation and privacy disclosures if collecting guest details. Forms currently do **not** send, store, or reserve anything.
7. Remove the concept ribbon only when all demo content is replaced with verified client details.

## Coffee animation

On the first homepage visit in a tab, an illustrated cup fills from the bottom while the brand fades in. Replay via the footer. Skip via the opening's skip control. Reduced-motion preferences skip it altogether. To change timing, edit the `3000` millisecond timer in `script.js` and `.intro` rules in `style.css`.

## Add to High Net Webstudio

Put the folder at:

`demos/restaurant/saffron-stone-advanced/`

Then edit the `Saffron & Stone` entry inside your main portfolio's `demos.js`:

`url: "demos/restaurant/saffron-stone-advanced/index.html"`

All pricing, hours, menus, identities and booking data are fictional for display only. Photos are replaced by original SVG illustrations to avoid network or licensing dependencies.

## Research patterns behind the layout (October 2026)

We studied actual dining sites for patterns, not for copying designs:
- **Ekaa** (ekaamumbai.com/reservations): diners choose a dining experience and request a reservation; status isn't implied to be confirmed.
- **Opus at Four Seasons Mumbai** (fourseasons.com/mumbai/dining/restaurants/opus): menu, events, hours and reservation action have clear entry points.
- **OTP, Bengaluru** (otpblr.com): searchable menu, category selection and a reservation form with guest details.
- **Indian Accent** (indianaccent.com/newdelhi/iad-reservations): clear time windows and explicit human confirmation.
- **Anjeer** (anjeer.restaurant): reservations, dietary notes, and FAQs live together.
- **PUKKHT** (pukkht.com): expressive story-led hero but direct menu and booking access.
- **Forest Table** (foresttable.in): 'Visit / Talk / Write / Reservations / Hours' as practical blocks.
- **Jamo** (jamoindia.com): direct menu, reservations and separate location details.
- **Millet Plaza** (milletplaza.com): dine-in, family/occasions and signature dishes.
- **Third Wave Coffee** (stores.thirdwavecoffeeroasters.com/location/noida): clear store hours, physical addresses and browsing location options.

These inspired the **separate menu, quick booking access, honest reservation state, café-style visit/contact details and editable prices**. All branded layouts, copy, illustrations, and interaction implementation in this package are original.

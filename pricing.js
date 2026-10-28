/* Base prices are INR. Region display conversion is in region.js. Also update visible HTML prices when changing these. */
window.HIGHNET_PRICING = Object.freeze({
  tiers: Object.freeze({ basic:1500, advanced:3000, premium:5000 }),
  includedPages: Object.freeze({ basic:1, advanced:3, premium:4 }),
  extraPage:750,
  copy:1000,
  gallery:1000
});

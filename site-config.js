/* Public website configuration. Never place passwords or private API tokens here. */
window.HIGHNET_CONFIG = Object.freeze({
  // Create and verify a Formspree form, then paste its public /f/ endpoint here.
  // Example SHAPE only: https://formspree.io/f/your-public-form-id
  formEndpoint: '',
  contactEmail: 'highnet00@gmail.com',
  // Owner-confirmed number, international digits without a plus sign.
  whatsappNumber: '919557865567',
  analytics: Object.freeze({
    enabled: false,
    // Paste the exact HTTPS plausible.io/js/pa-....js URL from your own dashboard.
    scriptUrl: ''
  })
});

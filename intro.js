/* Independent intro: hidden by default, never locks the page. */
(() => {
  'use strict';
  const intro = document.getElementById('studioIntro');
  if (!intro) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let seen = false;
  try { seen = sessionStorage.getItem('highnet-intro-seen') === 'yes'; } catch (_) {}
  if (motion.matches || seen || location.hash) return;
  const skip = document.getElementById('skipStudioIntro');
  function finish() {
    const hadFocus = intro.contains(document.activeElement);
    intro.hidden = true;
    if (hadFocus) document.querySelector('.brand')?.focus({preventScroll:true});
    try { sessionStorage.setItem('highnet-intro-seen', 'yes'); } catch (_) {}
  }
  // Set the exit before showing anything. CSS provides an independent 3.2s exit.
  const exit = setTimeout(finish, 2700);
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') finish(); });
  document.addEventListener('focusin', e => { if (!intro.contains(e.target)) finish(); });
  motion.addEventListener('change', e => { if (e.matches) finish(); });
  window.addEventListener('pagehide', () => { clearTimeout(exit); finish(); });
  intro.hidden = false;
})();

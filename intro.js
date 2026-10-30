/* One brief identity reveal, with independent exits and an optional replay. */
(() => {
  'use strict';
  const intro = document.getElementById('studioIntro');
  if (!intro) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let seen = false;
  try { seen = sessionStorage.getItem('highnet-intro-seen') === 'yes'; } catch (_) {}
  const skip = document.getElementById('skipStudioIntro');
  function finish() {
    clearTimeout(exit);
    const hadFocus = intro.contains(document.activeElement);
    intro.hidden = true;
    if (hadFocus) document.querySelector('.brand')?.focus({preventScroll:true});
    try { sessionStorage.setItem('highnet-intro-seen', 'yes'); } catch (_) {}
  }
  // Set the exit before showing anything. CSS independently releases the overlay.
  let exit;
  function play(){
    if(motion.matches)return;
    intro.querySelectorAll('.intro-letters,.intro-name,.intro-caption').forEach(el=>el.replaceWith(el.cloneNode(true)));
    clearTimeout(exit);exit=setTimeout(finish,2300);intro.hidden=false;
  }
  const replay=document.createElement('button');replay.type='button';replay.className='intro-replay';replay.textContent='Replay studio intro';replay.addEventListener('click',play);
  document.querySelector('.footer-links')?.append(replay);
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') finish(); });
  document.addEventListener('focusin', e => { if (!intro.contains(e.target)) finish(); });
  motion.addEventListener('change', e => { if (e.matches) finish(); });
  window.addEventListener('pagehide', () => { clearTimeout(exit); finish(); });
  if(!motion.matches&&!seen&&!location.hash)play();
})();

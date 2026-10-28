# Momentum Fitness — Advanced Gym Demo

Files included:
- index.html (homepage with rolling dumbbell intro)
- programs.html (interactive program explorer)
- join.html (membership enquiry page)
- style.css
- script.js

## Notes
- The rolling dumbbell intro runs on the homepage on the first visit per browser tab. You can replay it with index.html?intro=1; it can be skipped and honours reduced-motion settings.
- All forms are frontend previews only and do not submit to a real backend.
- To connect inside High Net Webstudio, use:
  url: "demos/fitness/momentum-fitness-advanced/index.html"

## Updates in V2
- Fixed dynamically generated program cards remaining invisible.
- Rebuilt the intro to move the dumbbell left-to-right without spinning the entire weight.
- Added fail-safe intro visibility, guarded session storage, clearer empty search state, and better keyboard handling.
- Corrected the sample weekly class count.

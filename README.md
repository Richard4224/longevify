# Longevify
#### Video Demo: <URL HERE>
#### Description:

**Longevify** is a fast, anonymous web quiz that answers one question: *How many years are
your habits really costing you?* You click through 13 questions about everyday habits —
smoking, sleep, diet, exercise, alcohol, stress, social life — and get a weighted Health
Score, a playful category rating (from 🧬 "Bio-Hacker" down to 💀 "Lebenskünstler"), and a
"What if?" simulator that shows which lifestyle change would statistically gain you the
most. The goal is an aha moment: most people have no realistic idea how expensive (in life
years) daily smoking is compared to, say, eating too much sugar.

The app is intentionally **not** another life-expectancy calculator. Predicting a personal
life expectancy would require age, sex, family history and more — and would still be a
guess. Instead, Longevify only evaluates *changeable* habits, scores them relative to each
other based on real cohort studies, and gives a rough, honestly-labelled estimate of the
years between your current profile and an optimal one.

## Privacy by design

There is no backend, no login, no cookies, no tracking. All logic runs locally in the
browser; answers never leave the device. This keeps the app GDPR-trivial and makes it
deployable on any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Scientific basis

Questions and weights are derived from large epidemiological studies, documented in detail
in `QUELLEN.md` (German):

- **Million Veteran Program** (Nguyen et al. 2024, AJCN; 719,147 participants): 8 lifestyle
  factors associated with up to +24 years of life expectancy. These 8 factors form the
  skeleton of the 13 questions.
- **Li et al. 2018** (Circulation, Harvard): 5 low-risk factors, +12–14 years at age 50;
  motivates the body-weight question.
- **Qian et al. 2023**: 5 sleep factors; motivates separate questions for sleep duration
  and sleep quality.
- **Cappuccio et al. 2010**: U-shaped sleep/mortality association; why sleeping far more
  than 9 hours does not get full points.
- **Holt-Lunstad et al. 2010**: social relationships and mortality (meta-analysis).
- **Ekelund et al. 2016** (Lancet): sitting time as a risk factor independent of exercise.

Each answer maps to a level (0–3) multiplied by an evidence-based weight (smoking and hard
drugs ×4, exercise ×3, sleep duration / weight / alcohol / stress / social ×2, the rest ×1,
max 78 points). The full point span is conservatively translated to ~20 years (rounded down
from the study estimates), which powers the "What if?" simulator. All limitations
(observational data, no individual prognosis, simplified weighting) are documented and the
UI consistently labels estimates as rough and statistical.

## Files

- `index.html` — the app shell with three full-screen sections (start, quiz, result).
  Screens are switched via CSS classes with fade transitions; no page reloads.
- `static/style.css` — the green/white theme with automatic dark mode via
  `prefers-color-scheme`, the full-screen question layout, animated progress bar, score
  bar, breakdown list and simulator styles. Mobile-first, works equally on desktop.
- `static/app.js` — all logic: the question catalog (with per-question weights and
  improvement labels), quiz flow (answer, skip, go back, restart) with slide animations,
  weighted scoring, category mapping, the result rendering and the interactive "What if?"
  simulator with live score preview.
- `QUELLEN.md` — sources, the weighting table, the years conversion model and its
  limitations (German).

## Design choices

I originally started with Flask/Jinja, but since every calculation must run client-side
anyway (privacy requirement), a server added nothing — so the project became a pure static
site: HTML + CSS + vanilla JS, no framework, no build step. Skipped questions are excluded
from the maximum score instead of counting as zero, so partial participation is never
punished. The result deliberately avoids absolute life-expectancy claims; the comparison
point is the user's own optimum, not the population average, because mapping the population
average onto the quiz scale cannot be done honestly.

## Running

Open `index.html` in a browser. That's it — no dependencies, no build.

## Disclaimer

Longevify is a simplified statistical model, not a medical instrument, and no substitute
for professional medical advice.

'use strict';

/*
 * Fragen basieren auf den 8 Lebensstil-Faktoren des Million Veteran Program
 * (Nguyen et al. 2024, AJCN) sowie Li et al. 2018 (Circulation), Qian et al. 2023
 * (Schlaf), Holt-Lunstad et al. 2010 (Soziales), Ekelund et al. 2016 (Sitzzeit).
 * Details und Limitationen: QUELLEN.md
 *
 * Jede Frage: 0–3 Punkte. `fix` = Kurzlabel für den Was-wäre-wenn-Simulator.
 */
const QUESTIONS = [
  {
    id: 'smoking', icon: '🚬',
    text: 'Rauchst du?',
    fix: 'Rauchen komplett aufgeben',
    options: [
      { label: 'Nie geraucht',             points: 3 },
      { label: 'Früher – hab aufgehört',   points: 2 },
      { label: 'Gelegentlich',             points: 1 },
      { label: 'Täglich',                  points: 0 },
    ]
  },
  {
    id: 'drugs', icon: '💊',
    text: 'Und härtere Sachen – Opioide, Koks & Co.?',
    fix: 'Finger weg von harten Substanzen',
    options: [
      { label: 'Nie',                      points: 3 },
      { label: 'Früher mal, lange her',    points: 2 },
      { label: 'Ab und zu',                points: 1 },
      { label: 'Regelmäßig',               points: 0 },
    ]
  },
  {
    id: 'exercise', icon: '🏃',
    text: 'Wie oft bewegst du dich richtig – Sport, Radeln, zügiges Gehen?',
    fix: 'Mindestens 3× pro Woche bewegen',
    options: [
      { label: 'So gut wie nie',           points: 0 },
      { label: '1–2× im Monat',            points: 1 },
      { label: '1–2× pro Woche',           points: 2 },
      { label: '3× oder öfter pro Woche',  points: 3 },
    ]
  },
  {
    id: 'sitting', icon: '🪑',
    text: 'Wie viele Stunden sitzt du an einem normalen Tag?',
    fix: 'Sitzzeit runter, öfter aufstehen',
    options: [
      { label: '10 Stunden oder mehr',     points: 0 },
      { label: 'So 8–10 Stunden',          points: 1 },
      { label: '5–8 Stunden',              points: 2 },
      { label: 'Weniger als 5 Stunden',    points: 3 },
    ]
  },
  {
    id: 'sleep_duration', icon: '😴',
    text: 'Wie viel Schlaf kriegst du normalerweise?',
    fix: 'Auf 7–9 Stunden Schlaf kommen',
    options: [
      { label: 'Unter 6 Stunden',          points: 0 },
      { label: '6–7 Stunden',              points: 1 },
      { label: '7–9 Stunden',              points: 3 },
      { label: 'Deutlich über 9 Stunden',  points: 1 },
    ]
  },
  {
    id: 'sleep_quality', icon: '🌙',
    text: 'Wachst du morgens ausgeruht auf?',
    fix: 'Schlafqualität verbessern',
    options: [
      { label: 'Fast nie',                 points: 0 },
      { label: 'Eher selten',              points: 1 },
      { label: 'Meistens',                 points: 2 },
      { label: 'Fast immer',               points: 3 },
    ]
  },
  {
    id: 'diet_style', icon: '🥗',
    text: 'Wie sieht es auf deinem Teller normalerweise aus?',
    fix: 'Frischer & bewusster essen',
    options: [
      { label: 'Viel Fast Food & Fertigzeug',       points: 0 },
      { label: 'Gemischt – mal so, mal so',         points: 1 },
      { label: 'Überwiegend frisch gekocht',        points: 2 },
      { label: 'Sehr bewusst, viel Pflanzliches',   points: 3 },
    ]
  },
  {
    id: 'veggies', icon: '🥦',
    text: 'Wie viel Obst & Gemüse isst du am Tag?',
    fix: 'Täglich 5 Portionen Obst & Gemüse',
    options: [
      { label: 'Kaum – kommt selten vor',          points: 0 },
      { label: '1–2 Portionen',                    points: 1 },
      { label: '3–4 Portionen',                    points: 2 },
      { label: '5 Portionen oder mehr',            points: 3 },
    ]
  },
  {
    id: 'sugar', icon: '🍬',
    text: 'Wie viel Zucker & Softdrinks gönnst du dir?',
    fix: 'Zucker & Softdrinks stark reduzieren',
    options: [
      { label: 'Täglich und reichlich',            points: 0 },
      { label: 'Regelmäßig, aber im Rahmen',       points: 1 },
      { label: 'Eher selten',                      points: 2 },
      { label: 'Kaum – ich meide das Zeug',        points: 3 },
    ]
  },
  {
    id: 'weight', icon: '⚖️',
    text: 'Wie sieht es auf der Waage aus?',
    hint: 'Zur Orientierung: Bei 1,75 m gelten grob 57–77 kg als Normalbereich.',
    fix: 'Gewicht Richtung Normalbereich bringen',
    options: [
      { label: 'Deutlich drüber',                  points: 0 },
      { label: 'Etwas drüber',                     points: 1 },
      { label: 'Im Normalbereich',                 points: 3 },
      { label: 'Eher drunter',                     points: 1 },
    ]
  },
  {
    id: 'alcohol', icon: '🍺',
    text: 'Wie viel Alkohol trinkst du?',
    fix: 'Alkohol (fast) ganz weglassen',
    options: [
      { label: 'Gar keinen',                       points: 3 },
      { label: 'Ab und zu mal ein Glas',           points: 2 },
      { label: 'Mehrmals pro Woche',               points: 1 },
      { label: 'Täglich',                          points: 0 },
    ]
  },
  {
    id: 'stress', icon: '😰',
    text: 'Wie gestresst bist du im Alltag?',
    fix: 'Stress aktiv runterfahren',
    options: [
      { label: 'Kaum – läuft entspannt',           points: 3 },
      { label: 'Normaler Alltagsstress',           points: 2 },
      { label: 'Oft am Limit',                     points: 1 },
      { label: 'Chronisch gestresst',              points: 0 },
    ]
  },
  {
    id: 'social', icon: '👥',
    text: 'Wie sieht dein Sozialleben aus?',
    fix: 'Mehr Zeit mit guten Leuten verbringen',
    options: [
      { label: 'Sehr isoliert, kaum Kontakte',     points: 0 },
      { label: 'Wenige, dafür enge Kontakte',      points: 1 },
      { label: 'Ganz normales Sozialleben',        points: 2 },
      { label: 'Aktiv & viele gute Beziehungen',   points: 3 },
    ]
  },
];

/*
 * Gewichtung nach Studienlage (siehe QUELLEN.md):
 * Das Million Veteran Program fand die größten Effekte bei wenig Bewegung,
 * Opioiden und Rauchen (~30–45 % höheres Sterberisiko), mittlere bei Stress,
 * Alkohol, Schlaf und Ernährung (~20 %), kleinere bei Sozialem (~5 % – wegen
 * Holt-Lunstad 2010 hier bewusst etwas höher angesetzt).
 * Score pro Frage = Level (0–3) × Gewicht.
 */
const WEIGHTS = {
  smoking: 4, drugs: 4,                       // Tier A einzeln
  exercise: 3, sitting: 1,                    // Tier A: Aktivität gesamt 12
  sleep_duration: 2, sleep_quality: 1,        // Tier B: Schlaf gesamt 9
  diet_style: 1, veggies: 1, sugar: 1,        // Tier B: Ernährung gesamt 9
  weight: 2, alcohol: 2, stress: 2, social: 2 // Tier B einzeln
};

const qWeight = q => WEIGHTS[q.id] || 1;

/*
 * Umrechnung Punkte → Lebensjahre (grob!):
 * MVP-Studie: alle 8 Faktoren ≈ +21 bis +24 Jahre. Wir setzen die volle
 * Punktspanne konservativ mit 20 Jahren an. Einzelfaktor-Anteile sind dadurch
 * bewusst vorsichtiger als Einzelstudien (z.B. Doll 2004: Rauchen allein ~10 J.).
 */
const FULL_SPAN_YEARS = 20;
const TOTAL_MAX = QUESTIONS.reduce((s, q) => s + 3 * qWeight(q), 0);
const YEARS_PER_POINT = FULL_SPAN_YEARS / TOTAL_MAX;

function fmtYears(y) {
  const rounded = Math.round(y * 10) / 10;
  return (rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1).replace('.', ','));
}

const CATEGORIES = [
  { min: 80, label: 'Bio-Hacker',       emoji: '🧬', tone: 'cat-green', desc: 'Du optimierst schon konsequent – dein zukünftiges Ich dankt es dir.' },
  { min: 65, label: 'Top Performer',    emoji: '💪', tone: 'cat-green', desc: 'Starke Grundlage. Ein paar Hebel mehr und du bist ganz oben.' },
  { min: 50, label: 'Work in Progress', emoji: '📈', tone: 'cat-amber', desc: 'Du weißt was gut wäre – lebst es aber noch nicht immer. Kennen wir alle.' },
  { min: 35, label: 'Komfortzone',      emoji: '🛋️', tone: 'cat-amber', desc: 'Gemütlich ist schön – aber ein paar Änderungen würden sich wirklich lohnen.' },
  { min: 20, label: 'Couch Potato',     emoji: '😅', tone: 'cat-red',   desc: 'Houston, wir haben ein Problem. Aber es ist wirklich nie zu spät.' },
  { min:  0, label: 'Lebenskünstler',   emoji: '💀', tone: 'cat-red',   desc: 'Respekt für die Ehrlichkeit. Kleiner Tipp: Gemüse existiert.' },
];

// ── State ──
let currentQ = 0;
let answers  = []; // [{ question, optIndex, points, skipped }]
let simSelected = new Set(); // question ids toggled in the what-if simulator

// ── DOM refs ──
const screenStart  = document.getElementById('screen-start');
const screenQuiz   = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const progressFill  = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const btnBack       = document.getElementById('btn-back');
const btnSkip       = document.getElementById('btn-skip');
const qContent      = document.getElementById('q-content');
const resultInner   = document.getElementById('result-inner');

// ── Utilities ──
const delay = ms => new Promise(r => setTimeout(r, ms));

function getCategory(score, maxScore) {
  const pct = (score / maxScore) * 100;
  return CATEGORIES.find(c => pct >= c.min) || CATEGORIES[CATEGORIES.length - 1];
}

function renderDots(points) {
  let html = '<span class="dots">';
  for (let i = 0; i < 3; i++) {
    html += '<span class="dot ' + (i < points ? 'dot-on' : 'dot-off') + '"></span>';
  }
  html += '</span>';
  return html;
}

function switchScreen(from, to) {
  from.classList.remove('active');
  from.style.zIndex = '0';
  to.style.zIndex   = '1';
  to.classList.add('active');
  to.scrollTop = 0;
}

function updateProgress() {
  const pct = (currentQ / QUESTIONS.length) * 100;
  progressFill.style.width  = pct + '%';
  progressLabel.textContent = currentQ + ' / ' + QUESTIONS.length;
  btnBack.classList.toggle('visible', currentQ > 0);
}

// ── Skip ──
async function skipQuestion() {
  if (btnSkip.disabled) return;
  btnSkip.disabled = true;
  btnBack.disabled = true;

  answers.push({ question: QUESTIONS[currentQ], skipped: true, points: null });

  qContent.classList.add('q-exit');
  await delay(200);
  qContent.classList.remove('q-exit', 'q-enter', 'q-exit-back', 'q-enter-back');

  currentQ++;
  updateProgress();

  if (currentQ >= QUESTIONS.length) {
    showResults();
    return;
  }

  renderQuestion();
  qContent.classList.add('q-enter');
  qContent.offsetHeight;
  qContent.classList.remove('q-enter');

  btnSkip.disabled = false;
  btnBack.disabled = false;
}

// ── Back ──
async function goBack() {
  if (currentQ === 0 || btnBack.disabled) return;
  btnBack.disabled = true;

  qContent.classList.add('q-exit-back');
  await delay(200);
  qContent.classList.remove('q-exit-back', 'q-exit', 'q-enter', 'q-enter-back');

  answers.pop();
  currentQ--;
  updateProgress();

  renderQuestion();
  qContent.classList.add('q-enter-back');
  qContent.offsetHeight;
  qContent.classList.remove('q-enter-back');

  btnBack.disabled = false;
}

// ── Quiz ──
function renderQuestion() {
  const q = QUESTIONS[currentQ];
  qContent.innerHTML =
    '<span class="q-icon">' + q.icon + '</span>' +
    '<p class="q-text">' + q.text + '</p>' +
    (q.hint ? '<p class="q-hint">' + q.hint + '</p>' : '') +
    '<div class="options">' +
      q.options.map((opt, i) =>
        '<button class="option-card" data-i="' + i + '">' + opt.label + '</button>'
      ).join('') +
    '</div>';

  qContent.querySelectorAll('.option-card').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.i)));
  });
}

async function handleAnswer(index) {
  qContent.querySelectorAll('.option-card').forEach(b => { b.disabled = true; });
  qContent.querySelectorAll('.option-card')[index].classList.add('selected');

  answers.push({
    question: QUESTIONS[currentQ],
    optIndex: index,
    points:   QUESTIONS[currentQ].options[index].points,
    skipped:  false,
  });

  await delay(160);
  qContent.classList.add('q-exit');
  await delay(200);
  qContent.classList.remove('q-exit', 'q-enter');

  currentQ++;
  updateProgress();

  if (currentQ >= QUESTIONS.length) {
    showResults();
    return;
  }

  renderQuestion();
  qContent.classList.add('q-enter');
  qContent.offsetHeight; // force reflow
  qContent.classList.remove('q-enter');
}

// ── Was-wäre-wenn-Simulator ──
function renderWhatIf(answered, totalPoints, maxScore) {
  // Improvement candidates: biggest weighted gain first
  const candidates = answered
    .filter(a => a.points < 3)
    .sort((a, b) => (3 - b.points) * qWeight(b.question) - (3 - a.points) * qWeight(a.question))
    .slice(0, 6);

  if (candidates.length === 0) {
    return (
      '<div class="whatif-section">' +
        '<p class="breakdown-heading">Was wäre wenn?</p>' +
        '<p class="whatif-perfect">🏆 Nichts zu simulieren – du holst schon überall die volle Punktzahl.</p>' +
      '</div>'
    );
  }

  return (
    '<div class="whatif-section">' +
      '<p class="breakdown-heading">Was wäre wenn?</p>' +
      '<p class="whatif-sub">Tippe an, was du realistisch ändern könntest – und schau, was es bringt:</p>' +
      '<div class="whatif-list" id="whatif-list">' +
        candidates.map(a => {
          const gain = (3 - a.points) * qWeight(a.question);
          return (
            '<button class="whatif-item" data-qid="' + a.question.id + '">' +
              '<span class="w-check"></span>' +
              '<span class="b-icon">' + a.question.icon + '</span>' +
              '<span class="w-label">' + a.question.fix + '</span>' +
              '<span class="w-gain">+' + gain + '</span>' +
            '</button>'
          );
        }).join('') +
      '</div>' +
      '<div class="whatif-result" id="whatif-result"></div>' +
    '</div>'
  );
}

function updateWhatIfResult(answered, totalPoints, maxScore) {
  const box = document.getElementById('whatif-result');
  if (!box) return;

  let gain = 0;
  answered.forEach(a => {
    if (simSelected.has(a.question.id)) gain += (3 - a.points) * qWeight(a.question);
  });

  if (gain === 0) {
    box.classList.remove('visible');
    box.innerHTML = '';
    return;
  }

  const newScore   = totalPoints + gain;
  const newCat     = getCategory(newScore, maxScore);
  const newPct     = Math.round((newScore / maxScore) * 100);
  const catNow     = getCategory(totalPoints, maxScore);
  const catChanged = newCat.label !== catNow.label;
  const gainYears  = gain * YEARS_PER_POINT;

  box.innerHTML =
    '<div class="score-header">' +
      '<span class="score-label">Dein simulierter Score</span>' +
      '<span class="score-value">' + totalPoints + ' → ' + newScore + ' / ' + maxScore + '</span>' +
    '</div>' +
    '<div class="score-track">' +
      '<div class="score-fill ' + newCat.tone + '" style="width:' + newPct + '%"></div>' +
    '</div>' +
    '<p class="whatif-years">≈ <strong>+' + fmtYears(gainYears) + ' Jahre</strong> Lebenserwartung – statistisch, grob geschätzt</p>' +
    (catChanged
      ? '<p class="whatif-newcat">' + newCat.emoji + ' Damit wärst du: <strong class="' + newCat.tone + '">' + newCat.label + '</strong></p>'
      : '<p class="whatif-newcat">Kategorie bleibt ' + newCat.emoji + ' <strong class="' + newCat.tone + '">' + newCat.label + '</strong> – aber jeder Punkt zählt.</p>'
    );
  box.classList.add('visible');
}

// ── Results ──
function showResults() {
  simSelected = new Set();

  const answered    = answers.filter(a => !a.skipped);
  const totalPoints = answered.reduce((sum, a) => sum + a.points * qWeight(a.question), 0);
  const maxScore    = answered.reduce((sum, a) => sum + 3 * qWeight(a.question), 0);
  const noData      = answered.length === 0;
  const cat         = noData ? null : getCategory(totalPoints, maxScore);
  const pct         = noData ? 0 : Math.round((totalPoints / maxScore) * 100);

  // Sort breakdown: worst first, skipped excluded
  const sorted = [...answered].sort((a, b) => a.points - b.points);

  const topHtml = noData
    ? '<div class="result-top">' +
        '<div class="cat-emoji">🤷</div>' +
        '<div class="cat-name cat-no-data">Keine Auswertung</div>' +
        '<div class="cat-desc">Beantworte mindestens eine Frage, um deinen Score zu sehen.</div>' +
      '</div>'
    : '<div class="result-top">' +
        '<div class="cat-emoji">' + cat.emoji + '</div>' +
        '<div class="cat-name ' + cat.tone + '">' + cat.label + '</div>' +
        '<div class="cat-desc">' + cat.desc + '</div>' +
      '</div>';

  const yearsLost = (maxScore - totalPoints) * YEARS_PER_POINT;
  const yearsHtml = noData ? '' :
    (yearsLost < 0.5
      ? '<p class="score-context">Du holst statistisch schon so ziemlich das Maximum raus. 🎉</p>'
      : '<p class="score-context">Würdest du bei allen Fragen im grünen Bereich liegen, ' +
        'wäre deine statistische Lebenserwartung grob <strong>~' + fmtYears(yearsLost) +
        ' Jahre höher</strong>.</p>');

  const scoreHtml = noData ? '' :
    '<div class="score-section">' +
      '<div class="score-header">' +
        '<span class="score-label">Health Score</span>' +
        '<span class="score-value">' + totalPoints + ' / ' + maxScore + '</span>' +
      '</div>' +
      '<div class="score-track">' +
        '<div class="score-fill ' + cat.tone + '" id="score-fill-bar" style="width:0%"></div>' +
      '</div>' +
      yearsHtml +
    '</div>';

  resultInner.innerHTML =
    topHtml +
    scoreHtml +

    '<div>' +
      '<p class="breakdown-heading">Deine Gewohnheiten im Detail</p>' +
      '<div class="breakdown-list">' +
        (sorted.length > 0
          ? sorted.map(a =>
              '<div class="breakdown-item">' +
                '<span class="b-icon">' + a.question.icon + '</span>' +
                '<span class="b-label">' + a.question.options[a.optIndex].label + '</span>' +
                renderDots(a.points) +
              '</div>'
            ).join('')
          : '<p class="breakdown-empty">Alle Fragen übersprungen – nichts zu bewerten.</p>'
        ) +
      '</div>' +
    '</div>' +

    (noData ? '' : renderWhatIf(answered, totalPoints, maxScore)) +

    '<div class="result-actions">' +
      '<button class="btn-secondary" id="btn-restart">↩ Nochmal</button>' +
      '<button class="btn-secondary" id="btn-share">↗ Teilen</button>' +
    '</div>' +

    '<p class="result-disclaimer">' +
      'Vereinfachtes Modell auf Basis großer Studien, u.a. ' +
      '<a href="https://pubmed.ncbi.nlm.nih.gov/38065710/" target="_blank" rel="noopener">Million Veteran Program (2024)</a> und ' +
      '<a href="https://pubmed.ncbi.nlm.nih.gov/29712712/" target="_blank" rel="noopener">Harvard (Li et al. 2018)</a>.<br>' +
      'Kein medizinisches Instrument, kein Ersatz für ärztlichen Rat.' +
    '</p>';

  switchScreen(screenQuiz, screenResult);

  if (!noData) {
    setTimeout(() => {
      const bar = document.getElementById('score-fill-bar');
      if (bar) bar.style.width = pct + '%';
    }, 80);

    const list = document.getElementById('whatif-list');
    if (list) {
      list.addEventListener('click', e => {
        const item = e.target.closest('.whatif-item');
        if (!item) return;
        const qid = item.dataset.qid;
        if (simSelected.has(qid)) {
          simSelected.delete(qid);
          item.classList.remove('selected');
        } else {
          simSelected.add(qid);
          item.classList.add('selected');
        }
        updateWhatIfResult(answered, totalPoints, maxScore);
      });
    }
  }

  document.getElementById('btn-restart').addEventListener('click', restart);
  document.getElementById('btn-share').addEventListener('click', shareLink);
}

// ── Restart ──
function restart() {
  currentQ = 0;
  answers  = [];
  simSelected = new Set();

  qContent.classList.remove('q-exit', 'q-enter', 'q-exit-back', 'q-enter-back');

  updateProgress();
  renderQuestion();
  switchScreen(screenResult, screenQuiz);
}

// ── Share ──
function shareLink() {
  const url = window.location.href.split('?')[0].split('#')[0];
  const btn = document.getElementById('btn-share');

  if (navigator.share) {
    navigator.share({ title: 'Longevify', text: 'Teste deinen Health Score!', url });
    return;
  }

  navigator.clipboard.writeText(url)
    .then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Link kopiert!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    })
    .catch(() => { alert('Link: ' + url); });
}

// ── Init ──
document.getElementById('btn-start').addEventListener('click', () => {
  updateProgress();
  renderQuestion();
  switchScreen(screenStart, screenQuiz);
});

document.getElementById('btn-logo').addEventListener('click', () => {
  currentQ = 0;
  answers  = [];
  simSelected = new Set();
  qContent.classList.remove('q-exit', 'q-enter', 'q-exit-back', 'q-enter-back');
  switchScreen(screenResult, screenStart);
});

btnBack.addEventListener('click', goBack);
btnSkip.addEventListener('click', skipQuestion);

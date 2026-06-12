# Longevify 🌱

**Wie viele Jahre kosten deine Gewohnheiten?**

Ein schnelles, anonymes Quiz: 13 Fragen zu Gewohnheiten (Rauchen, Schlaf, Ernährung, Stress …),
am Ende gibt es einen gewichteten Health Score, eine Kategorie (von 🧬 Bio-Hacker bis 💀
Lebenskünstler) und einen "Was wäre wenn?"-Simulator, der zeigt, welche Änderung statistisch
am meisten bringt.

## Prinzipien

- **Kein Backend, keine Daten:** Alles läuft lokal im Browser. Nichts wird gespeichert oder übertragen.
- **Kein Login, kein Formular-Feeling:** Link öffnen, loslegen, fertig in 2 Minuten.
- **Wissenschaftlich fundiert:** Fragen und Gewichtung basieren auf großen Kohortenstudien
  (Million Veteran Program, Harvard u.a.) — Details und Limitationen in [QUELLEN.md](QUELLEN.md).
- **Keine Monetarisierung, kein Tracking.**

## Tech

Pure static: HTML + CSS + Vanilla JS. Kein Framework, kein Build-Step.

```
index.html          App-Shell (Start / Quiz / Ergebnis)
static/style.css    Theme Grün/Weiß, Dark Mode via prefers-color-scheme
static/app.js       Fragen, Scoring, Simulator
```

Lokal ausprobieren: `index.html` im Browser öffnen. Das war's.

## Disclaimer

Longevify ist ein vereinfachtes statistisches Modell und kein medizinisches Instrument.
Es ersetzt keinen ärztlichen Rat.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * NotFound — pagina 404 a tema liminale/void, con easter egg horror.
 *
 * Easter egg: "più resti nel void, più il void si accorge di te".
 *   - escalation a tappe (stage 0→3) sul tempo di permanenza
 *   - Konami code (↑↑↓↓←→←→ B A) → deep void istantaneo
 *   - messaggio nascosto in console per i dev
 * Tutto disattivato con prefers-reduced-motion (resta la 404 calma).
 *
 * Dipende dalle primitive globali in index.css (.glitch, .caret, .mono-label)
 * e dalle chiavi i18n notFound.* in translations.js.
 */
const SCRAMBLE = "!<>-_\\/[]{}=+*^?#·:;¬░▒▓";

export default function NotFound({ homeHref = "/", onNavigate }) {
  const { t } = useLanguage();

  // reduced motion calcolato subito (niente escalation se attivo)
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const [path, setPath] = useState("/lost");
  const [coords, setCoords] = useState({ x: "-1.00", y: "0.00", z: "404.00" });
  const [stage, setStage] = useState(0); // 0 calmo → 3 deep void
  const [lede, setLede] = useState(t.notFound.lede);

  // tiene il testo corrente per far partire il morph da lì
  const ledeRef = useRef(lede);
  useEffect(() => {
    ledeRef.current = lede;
  }, [lede]);

  // path reale di chi è finito qui
  useEffect(() => {
    setPath(window.location.pathname + window.location.search);
  }, []);

  // messaggio nascosto in console (per i dev)
  useEffect(() => {
    console.log(
      "%c404",
      "color:#ccff00;font:700 42px monospace;text-shadow:2px 2px #ff0033;"
    );
    console.log(
      "%cnon dovevi essere qui. ma visto che hai aperto i devtools…",
      "color:#8c8c8c;font:14px monospace;"
    );
  }, []);

  // coordinate drifting
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCoords({
        x: (Math.random() * 200 - 100).toFixed(2),
        y: (Math.random() * 200 - 100).toFixed(2),
        z: (Math.random() * 999).toFixed(2),
      });
    }, 700);
    return () => clearInterval(id);
  }, [reduce]);

  // escalation sul tempo di permanenza
  useEffect(() => {
    if (reduce) return;
    const timers = [
      setTimeout(() => setStage(1), 7000),
      setTimeout(() => setStage(2), 16000),
      setTimeout(() => setStage(3), 28000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  // Konami code → deep void istantaneo
  useEffect(() => {
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let i = 0;
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) {
        i++;
        if (i === seq.length) {
          setStage(3);
          i = 0;
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // morph del testo: calmo → sussurro, con scramble
  useEffect(() => {
    let target = t.notFound.lede;
    if (stage === 2) target = t.notFound.whisper1;
    if (stage >= 3) target = t.notFound.whisper2;

    if (reduce) {
      setLede(target);
      return;
    }
    const from = ledeRef.current;
    if (from === target) return;

    const len = Math.max(from.length, target.length);
    const q = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * 18);
      q.push({
        a: from[i] || "",
        b: target[i] || "",
        start,
        end: start + Math.floor(Math.random() * 18) + 8,
        c: "",
      });
    }
    let frame = 0;
    let raf;
    const tick = () => {
      let out = "";
      let done = 0;
      for (const it of q) {
        if (frame >= it.end) {
          out += it.b;
          done++;
        } else if (frame >= it.start) {
          if (!it.c || Math.random() < 0.28)
            it.c = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          out += it.c;
        } else {
          out += it.a;
        }
      }
      setLede(out);
      if (done < q.length) {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, reduce, t]);

  // horror della tab title (stage 2+)
  useEffect(() => {
    if (reduce || stage < 2) return;
    const titles = t.notFound.titles;
    const original = document.title;
    let i = 0;
    const id = setInterval(() => {
      document.title = titles[i % titles.length];
      i++;
    }, 1500);
    return () => {
      clearInterval(id);
      document.title = original;
    };
  }, [stage, reduce, t]);

  const handleHome = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(homeHref);
    }
  };

  return (
    <main className={`notfound notfound--s${stage}`}>
      {/* Pavimento prospettico che scorre nel buio */}
      <div className="notfound__grid" aria-hidden="true" />
      {/* Figura all'orizzonte (visibile solo nel deep void) */}
      <div className="notfound__figure" aria-hidden="true" />
      {/* Scanline CRT */}
      <div className="notfound__scan" aria-hidden="true" />
      {/* Neon guasto */}
      <div className="notfound__flicker" aria-hidden="true" />
      {/* Vignettatura che chiude la stanza */}
      <div className="notfound__vignette" aria-hidden="true" />

      {/* Eyebrow */}
      <div className="notfound__eyebrow mono-label">
        <span className="notfound__pulse" aria-hidden="true" />
        signal lost
      </div>

      {/* Coordinate drifting */}
      <div className="notfound__coords" aria-hidden="true">
        <span>x {coords.x}</span>
        <span>y {coords.y}</span>
        <span>z {coords.z}</span>
      </div>

      <div className="notfound__inner">
        <h1 className="notfound__code glitch" data-text="404">
          404
        </h1>

        <p className="notfound__lede">{lede}</p>

        {/* Log da terminale */}
        <div className="notfound__log">
          <p>
            <span className="notfound__prompt">&gt;</span> GET{" "}
            <span className="notfound__path">{path}</span>
          </p>
          <p>
            <span className="notfound__prompt">&gt;</span> resolving route…{" "}
            <span className="notfound__null">no match</span>
          </p>
          <p>
            <span className="notfound__prompt">&gt;</span> status:{" "}
            <span className="notfound__void">void</span>
            <span className="caret" />
          </p>
          {stage >= 1 && (
            <p className="notfound__log-extra">
              <span className="notfound__prompt">&gt;</span>{" "}
              {stage >= 3 ? "it knows you're here" : "connection still open…"}
            </p>
          )}
        </div>

        {/* Ritorno */}
        <a href={homeHref} onClick={handleHome} className="notfound__home">
          <span className="notfound__arrow" aria-hidden="true">
            ←
          </span>
          {t.notFound.home}
        </a>
      </div>
    </main>
  );
}
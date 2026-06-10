import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function NotFound({ homeHref = "/", onNavigate }) {
  const { t } = useLanguage();
  const [path, setPath] = useState("/lost");
  const [coords, setCoords] = useState({ x: "-1.00", y: "0.00", z: "404.00" });

  // Path reale di chi è finito qui
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname + window.location.search);
    }
  }, []);

  // Coordinate che derivano — "sei da qualche parte, ma in nessun posto"
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(() => {
      setCoords({
        x: (Math.random() * 200 - 100).toFixed(2),
        y: (Math.random() * 200 - 100).toFixed(2),
        z: (Math.random() * 999).toFixed(2),
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const handleHome = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(homeHref);
    }
  };

  return (
    <main className="notfound">
      {/* Pavimento prospettico che scorre nel buio */}
      <div className="notfound__grid" aria-hidden="true" />
      {/* Scanline CRT */}
      <div className="notfound__scan" aria-hidden="true" />
      {/* Vignettatura che chiude la stanza */}
      <div className="notfound__vignette" aria-hidden="true" />

      {/* Eyebrow — riusa .mono-label */}
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
        {/* Riusa .glitch del nome Hero per coerenza */}
        <h1 className="notfound__code glitch" data-text="404">
          404
        </h1>

        <p className="notfound__lede">{t.notFound.lede}</p>

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

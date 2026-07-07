import { heroStats } from "@/lib/data";

export default function Hero() {
  return (
    <header className="hero wrap" id="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow mono"><span className="dot"></span>Roblox UI/UX &amp; Motion Designer</div>
          <h1>
            <span className="clip"><span className="ln">Interfaces</span></span>
            <span className="clip r2"><span className="ln">players <span className="serif">feel.</span></span></span>
          </h1>
          <div className="hero-meta">
            {heroStats.map((s, i) => (
              <div key={i}><div className="v volt">{s.v}</div><div className="l">{s.l}</div></div>
            ))}
          </div>
          <p className="hero-sub">
            I&apos;m <b>Hammody</b> — a Roblox UI/UX &amp; motion designer. I design <b>and animate</b> the
            shops, quests, menus and systems that make games feel premium — readable, satisfying, and alive
            from first tap to the last reward.
          </p>
          <div className="hero-cta">
            <a href="#work" className="btn btn-volt magnetic" data-cursor><span>View selected work</span><span className="a">→</span></a>
            <a href="#contact" className="btn btn-ghost magnetic" data-cursor>Get in touch</a>
          </div>
        </div>
        <div className="hero-ui" data-float="1.2">
          <div className="hero-chip">Shipped in-game UI</div>
          <div className="shot">
            <img src="/work/quests.jpg" alt="Quest system interface designed by Hammody, with daily and weekly categories, locked states and a reward picker" />
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true"><span className="mono">Scroll</span><span className="bar"></span></div>
    </header>
  );
}

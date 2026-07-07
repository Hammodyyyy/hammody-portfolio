import { motionPoints } from "@/lib/data";

export default function Motion() {
  return (
    <section className="sec wrap" id="motion">
      <div className="head">
        <div>
          <div className="eyebrow mono"><span className="dot"></span>Motion &amp; feel</div>
          <h2 className="sec-title">Motion is the<br /><span className="serif">difference.</span></h2>
        </div>
        <p className="sec-intro reveal">Most Roblox UI just sits there. Mine reacts — and that&apos;s what makes a game feel expensive.</p>
      </div>
      <div className="motion-grid">
        <div className="motion-copy">
          <div className="big reveal">A static menu is a screen. <span className="serif">A tweened one is an experience.</span></div>
          <p className="reveal">
            Animation is where I spend the most care — the spring on a reward, the count-up on your coins, the ease on a
            panel sliding in. It&apos;s the layer that turns a decent UI into one players actually enjoy touching.
          </p>
        </div>
        <div className="motion-panel reveal" data-float="1">
          <div className="mp-title mono">What motion covers</div>
          <ul className="motion-list">
            {motionPoints.map((m, i) => (
              <li key={i}><span><b>{m.b}</b> — <i>{m.i}</i></span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="sec wrap" id="about">
      <div className="about-grid">
        <div className="portrait reveal" data-float="1">
          <div className="mark">H</div>
          <img className="ava" src="/avatars/hammody.png" alt="Hammody's Roblox avatar" />
          <div className="tag">
            <div className="mono">Remote · Worldwide</div>
            <div style={{ fontWeight: 600 }}>Available for UI/UX commissions</div>
          </div>
        </div>
        <div className="about-copy">
          <div className="eyebrow mono reveal"><span className="dot"></span>About</div>
          <div className="big reveal">
            Good game UI is invisible. <span className="serif">Great game UI is unforgettable</span> — I design for the second one.
          </div>
          <p className="reveal">
            I&apos;ve spent years inside Roblox Studio obsessing over the exact moment a player opens a shop, reads a
            quest, or hits &ldquo;cook.&rdquo; <b>I design the feel, not just the screens</b> — clear hierarchy,
            satisfying states, and layouts players understand instantly.
          </p>
          <p className="reveal">
            My focus is pure UI/UX: <b>flows, wireframes, pixel-perfect interfaces, interaction states, and the
            motion that ties them together.</b> Every screen is built to be readable at a glance and to hold up in a
            live game full of real players.
          </p>
          <div className="chips reveal">
            <span>UX → UI → Motion</span><span>Design systems</span><span>Retention-focused</span>
          </div>
        </div>
      </div>
    </section>
  );
}

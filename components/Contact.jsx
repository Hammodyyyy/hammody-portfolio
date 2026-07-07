import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <section className="sec wrap" id="contact">
      <div className="contact-in reveal">
        <div className="eyebrow mono" style={{ justifyContent: "center" }}><span className="dot"></span>Let&apos;s build</div>
        <h2>Got a game to<br /><span className="serif">level up?</span></h2>
        <p>
          Tell me what you&apos;re building — a single killer screen or a full UI overhaul. Discord is the fastest way
          to reach me; send your game and what you need, and we&apos;ll take it from there.
        </p>
        <div className="handle">Discord — .hammody</div>
        <div className="contact-cta">
          <a href={profile.discordUrl} target="_blank" rel="noopener" className="btn btn-volt magnetic" data-cursor>
            <span>Message me on Discord</span><span className="a">→</span>
          </a>
          <a href="#work" className="btn btn-ghost magnetic" data-cursor>See the work</a>
        </div>
        <div className="socials">
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener" data-cursor>{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

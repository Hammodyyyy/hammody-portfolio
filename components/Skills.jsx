import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section className="sec wrap" id="skills">
      <div className="head">
        <div>
          <div className="eyebrow mono reveal"><span className="dot"></span>Capabilities</div>
          <h2 className="sec-title" data-lines>
            <span className="clip"><span className="ln">The toolkit.</span></span>
          </h2>
        </div>
        <p className="sec-intro reveal">A focused UI/UX skill set built for shipping polished, high-retention Roblox interfaces.</p>
      </div>
      <div className="bento">
        {skills.map((s, i) => (
          <div key={i} className={`cell ${s.feature ? "feature " : ""}${s.span} reveal`} data-cursor>
            <div className="ic">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="tg">{s.tags.map((t) => (<i key={t}>{t}</i>))}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

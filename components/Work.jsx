import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section className="sec tight showcase" id="work">
      <div className="sc-head">
        <div className="head">
          <div>
            <div className="eyebrow mono"><span className="dot"></span>Featured work</div>
            <h2 className="sec-title">Selected work.</h2>
          </div>
          <p className="sec-intro reveal">
            Real interfaces shipped in Roblox games — clear systems, sharp visuals, and states that make sense to
            players. <span className="mono" style={{ color: "var(--faint)" }}>Scroll →</span>
          </p>
        </div>
      </div>
      <div className="track" id="track">
        {projects.map((p, i) => (
          <article className="work" key={i}>
            <div className={`work-ui${p.alt2 ? " alt" : ""}`}>
              <div className="shot"><img src={p.img} alt={p.alt} loading="lazy" /></div>
            </div>
            <div className="work-body">
              <div className="kind">{p.kind}</div>
              <h3>{p.title}</h3>
              <p className="d">{p.desc}</p>
              <div className="w-tags">{p.tags.map((t) => (<i key={t}>{t}</i>))}</div>
              <a href="#contact" className="w-link" data-cursor>Work with me ↗</a>
            </div>
          </article>
        ))}
      </div>
      <div className="sc-progress"><div className="bar"><i id="scBar"></i></div></div>
    </section>
  );
}

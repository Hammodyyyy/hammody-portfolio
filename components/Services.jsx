import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="sec wrap" id="services">
      <div className="head">
        <div>
          <div className="eyebrow mono"><span className="dot"></span>What I offer</div>
          <h2 className="sec-title">Services.</h2>
        </div>
        <p className="sec-intro reveal">Hire me for a single screen or your game&apos;s whole interface. Every engagement ships design that&apos;s ready to build.</p>
      </div>
      <div className="svc-list">
        {services.map((s) => (
          <div key={s.n} className="svc-row reveal" data-cursor>
            <span className="n">{s.n}</span>
            <span className="nm">{s.name}</span>
            <span className="ds">{s.desc}</span>
            <span className="ar">→</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { whyCards } from "@/lib/data";

export default function Why() {
  return (
    <section className="sec wrap" id="why">
      <div className="head">
        <div>
          <div className="eyebrow mono"><span className="dot"></span>Why work with me</div>
          <h2 className="sec-title">Easy to hire.<br />Easy to work with.</h2>
        </div>
        <p className="sec-intro reveal">The things clients actually care about — and the reasons they keep coming back.</p>
      </div>
      <div className="why-grid">
        {whyCards.map((w, i) => (
          <div className="why reveal" data-cursor key={i}>
            <div className="wi">{w.icon}</div>
            <h3>{w.title}</h3>
            <p>{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

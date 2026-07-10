import { whyCards } from "@/lib/data";

export default function Why() {
  return (
    <section className="sec wrap" id="why">
      <div className="head">
        <div>
          <div className="eyebrow mono reveal"><span className="dot"></span>Why work with me</div>
          <h2 className="sec-title" data-lines>
            <span className="clip"><span className="ln">Easy to hire.</span></span>
            <span className="clip"><span className="ln">Easy to work with.</span></span>
          </h2>
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

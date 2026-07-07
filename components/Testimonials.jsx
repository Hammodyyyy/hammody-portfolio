import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="sec wrap" id="testimonials">
      <div className="head">
        <div>
          <div className="eyebrow mono"><span className="dot"></span>Kind words</div>
          <h2 className="sec-title">Testimonials.</h2>
        </div>
      </div>
      <div className="quotes">
        {testimonials.map((q, i) => (
          <div className={`q${q.big ? " big" : ""} reveal`} key={i}>
            <div className="stars">★★★★★</div>
            <div className="qt">{q.quote}</div>
            <div className="who">
              <div className="av">{q.initial}<img src={q.avatar} alt={`${q.name} avatar`} loading="lazy" /></div>
              <div><div className="nm">{q.name}</div><div className="rl">{q.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

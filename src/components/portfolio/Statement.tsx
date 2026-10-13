export function Statement() {
  return (
    <section className="statement" aria-label="Approach">
      <div className="statement-kicker reveal">The question that matters</div>
      <p className="statement-q">
        <span className="reveal-mask"><span>When it breaks in production,</span></span>{" "}
        <span className="reveal-mask" data-delay="100"><span><em>who actually understands</em></span></span>{" "}
        <span className="reveal-mask" data-delay="200"><span><em>what was built?</em></span></span>
      </p>
      <div className="statement-foot reveal" data-delay="300">
        <span>Anyone can vibe their way to a demo.</span>
        <span className="hl">I build systems I can explain, debug and own.</span>
      </div>
    </section>
  );
}

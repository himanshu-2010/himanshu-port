export default function Timeline({ timeline }) {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="container">
        <span className="section-label">// TIMELINE</span>
        <h2 className="section-title">Chronological Journey</h2>
        <div className="timeline">
          {timeline.map((event, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <span className="timeline-year">{event.year}</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">{event.title}</h3>
                <p className="timeline-card-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

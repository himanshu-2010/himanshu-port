export default function Achievements({ achievements }) {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="container">
        <span className="section-label">// ACHIEVEMENTS</span>
        <h2 className="section-title">Milestones</h2>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div key={i} className={`achievement-card ${a.locked ? 'achievement-locked' : ''}`}>
              {a.locked
                ? <div className="achievement-lock-icon">&#x1F512;</div>
                : <div className="achievement-icon">{a.icon}</div>
              }
              <h3 className="achievement-title">{a.title}</h3>
              <p className="achievement-desc">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About({ personal }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <span className="section-label">// ABOUT</span>

        <div className="about-header">
          <div className="about-header-left">
            <p className="about-header-tag">{personal.aboutHeading}</p>
            <h2 className="about-header-title">{personal.aboutSubheading}</h2>
          </div>
          {personal.photo && <img src={personal.photo} alt="" className="about-portrait" />}
        </div>

        <div className="about-body">
          <div className="about-bio">
            {personal.bio.map((p, i) => <p key={i}>{p}</p>)}
            <div className="about-tags">
              {personal.aboutTags.map((t, i) => (
                <span key={i} className="about-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="about-skills">
            <p className="about-skills-title">Skills</p>
            {personal.skillBars.map((s, i) => (
              <div key={i} className="skill-bar-row">
                <span className="skill-bar-label">{s.label}</span>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: s.level + '%' }} />
                </div>
                <span className="skill-bar-pct">{s.level}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cards">
          {personal.infoCards.map((c, i) => (
            <div key={i} className="about-card">
              <span className="about-card-icon">{c.icon}</span>
              <span className="about-card-label">{c.label}</span>
              <span className="about-card-value">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

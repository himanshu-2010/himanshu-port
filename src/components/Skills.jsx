import { useState, memo } from 'react'

const SkillCard = memo(function SkillCard({ category, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`skill-card ${open ? 'open' : ''}`}>
      <div className="skill-header" onClick={() => setOpen(!open)}>
        <span className="skill-icon">{category.icon}</span>
        <span className="skill-name">{category.name}</span>
        <span className="skill-toggle">&#x25B6;</span>
      </div>
      <div className="skill-body">
        <ul className="skill-items">
          {category.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    </div>
  )
})

const Skills = memo(function Skills({ skillCategories }) {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <span className="section-label">// SKILLS</span>
        <h2 className="section-title">Skill Matrix</h2>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCard key={i} category={cat} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default Skills

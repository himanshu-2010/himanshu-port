import { useState, memo } from 'react'

const statusClass = { active: 'status-active', complete: 'status-complete', prototype: 'status-prototype', 'open-source': 'status-open-source' }

const Projects = memo(function Projects({ projects, categories, links, onProjectClick }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <span className="section-label">// PROJECTS</span>
        <h2 className="section-title">Project Workbench</h2>

        <div className="projects-filter">
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${filter === cat.toLowerCase().replace(/ \/ .+$/, '').replace(' ', '-') ? 'active' : ''}`}
              onClick={() => setFilter(cat === 'All' ? 'all' : cat.toLowerCase().replace(' / software', '').replace(' ', '-'))}>
              [ {cat} ]
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map(p => (
            <div className={`project-card ${p.featured ? 'featured' : ''}`} key={p.id}>
              {p.featured && <span className="featured-badge">&#x2B50; Featured</span>}
              <span className={`project-card-status ${statusClass[p.status] || ''}`}>[ {p.status.toUpperCase()} ]</span>
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-summary">{p.summary}</p>
              <div className="project-card-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
              <div className="project-card-actions">
                <a href={`?project=${p.id}`} className="project-card-link" onClick={(e) => { e.preventDefault(); onProjectClick(p.id) }}>[ View Datasheet &rarr; ]</a>
                {p.links?.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="project-card-link">[ GitHub &rarr; ]</a>}
                {p.links?.app && <a href={p.links.app} target="_blank" rel="noopener noreferrer" className="project-card-link">[ Open App &rarr; ]</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Projects

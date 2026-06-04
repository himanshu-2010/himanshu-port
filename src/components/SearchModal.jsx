import { useState, useRef, useEffect, useMemo } from 'react'

export default function SearchModal({ portfolio, onClose, onOpenProject, onOpenGallery, onOpenSecret }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()

    const hits = []

    const addHit = (label, section, preview, action) => {
      hits.push({ label, section, preview, action })
    }

    portfolio.personal?.bio?.forEach(p => {
      if (p.toLowerCase().includes(q)) {
        addHit(p.slice(0, 120) + (p.length > 120 ? '...' : ''), 'About', 'Bio paragraph', () => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
    })

    portfolio.projects?.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))) {
        addHit(p.title, 'Projects', p.summary.slice(0, 100), () => onOpenProject(p.id))
      }
    })

    portfolio.blog?.forEach(b => {
      if (b.title.toLowerCase().includes(q) || b.preview.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)) {
        addHit(b.title, 'Blog', `[${b.category}] ${b.preview.slice(0, 100)}`, () => {
          document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
    })

    portfolio.skillCategories?.forEach(cat => {
      if (cat.name.toLowerCase().includes(q)) {
        addHit(cat.name, 'Skills', 'Skill category', () => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
      cat.items?.forEach(item => {
        const stripped = item.replace(/<[^>]+>/g, '')
        if (stripped.toLowerCase().includes(q)) {
          addHit(cat.name, 'Skills', stripped.slice(0, 100), () => {
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
          })
        }
      })
    })

    portfolio.timeline?.forEach(t => {
      if (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
        addHit(t.title, 'Timeline', t.description.slice(0, 100), () => {
          document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
    })

    portfolio.achievements?.forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) {
        addHit(a.title, 'Achievements', a.description.slice(0, 100), () => {
          document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
    })

    portfolio.metrics?.forEach(m => {
      if (m.label.toLowerCase().includes(q)) {
        addHit(m.label, 'Metrics', `${m.value}${m.suffix}`, () => {
          document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })
        })
      }
    })

    if ('gallery'.toLowerCase().includes(q) || 'photos'.includes(q) || 'images'.includes(q)) {
      addHit('Engineering Gallery', 'Gallery', 'Browse all project photos and videos', () => onOpenGallery())
    }

    if ('contact'.includes(q) || 'email'.includes(q) || 'github'.includes(q)) {
      addHit('Contact', 'Contact', 'Send a message or find social links', () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      })
    }

    if ((q === 'mors' || q === 'babita') && onOpenSecret) {
      addHit('🔐 Secret Page', 'Hidden', 'A special page for someone special', () => onOpenSecret())
    }

    return hits
  }, [query, portfolio, onOpenProject, onOpenGallery, onOpenSecret])

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      results[selectedIdx].action()
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const sections = [...new Set(results.map(r => r.section))]

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <span className="search-icon">&#x1F50D;</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search projects, skills, blog, gallery..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-close" onClick={onClose}>&#x2715;</button>
        </div>

        <div className="search-results">
          {!query.trim() && (
            <p className="search-hint">Type to search across projects, blog posts, skills, timeline, and more.</p>
          )}

          {query.trim() && results.length === 0 && (
            <p className="search-empty">No results found for &ldquo;{query}&rdquo;</p>
          )}

          {sections.map(section => (
            <div key={section} className="search-section">
              <span className="search-section-label">// {section.toUpperCase()}</span>
              {results
                .filter(r => r.section === section)
                .map((r, i) => {
                  const globalIdx = results.indexOf(r)
                  return (
                    <div
                      key={i}
                      className={`search-result ${globalIdx === selectedIdx ? 'selected' : ''}`}
                      onClick={() => { r.action(); onClose() }}
                      onMouseEnter={() => setSelectedIdx(globalIdx)}
                    >
                      <span className="search-result-title">{r.label}</span>
                      <span className="search-result-preview">{r.preview}</span>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>

        {results.length > 0 && (
          <div className="search-footer">
            <span>&uarr;&darr; Navigate</span>
            <span>&#x23CE; Open</span>
            <span>&#x238B; Close</span>
          </div>
        )}
      </div>
    </div>
  )
}

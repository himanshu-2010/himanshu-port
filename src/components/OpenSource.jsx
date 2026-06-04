import { useEffect, useState } from 'react'

const GITHUB_USER = 'himanshu-2010'

function getLanguageColor(lang) {
  const colors = { Python: '#3572A5', TypeScript: '#3178C6', JavaScript: '#F7DF1E', HTML: '#E34F26', CSS: '#563D7C', 'C++': '#F34B7D' }
  return colors[lang] || '#6B7280'
}

function RepoCard({ data }) {
  if (!data) return null
  const langColor = getLanguageColor(data.language)
  return (
    <div className="repo-card">
      <div className="repo-card-name">{data.name}</div>
      <div className="repo-card-desc">{data.description || 'No description provided.'}</div>
      <div className="repo-card-stats">
        <span className="repo-stat">&#x2B50; <span>{data.stargazers_count || 0}</span></span>
        <span className="repo-stat">&#x1F500; <span>{data.forks_count || 0}</span></span>
        <span className="repo-stat">&#x1F4C5; <span>{data.pushed_at ? new Date(data.pushed_at).toLocaleDateString() : 'N/A'}</span></span>
      </div>
      <div className="repo-card-footer">
        <span className="repo-lang">
          <span className="repo-lang-dot" style={{ background: langColor }}></span>
          {data.language || 'N/A'}
        </span>
        <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="repo-card-link">View Repository &#8594;</a>
      </div>
    </div>
  )
}

export default function OpenSource({ repos }) {
  const [repoData, setRepoData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      const results = await Promise.all(
        repos.map(async (name) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`)
            return res.ok ? await res.json() : null
          } catch { return null }
        })
      )
      setRepoData(results.filter(r => r))
      setLoading(false)
    }
    fetchAll()
  }, [repos])

  return (
    <section className="section opensource-section" id="opensource">
      <div className="container">
        <span className="section-label">// OPEN SOURCE</span>
        <h2 className="section-title">Open Source Hub</h2>
        <p style={{ color: 'var(--text-muted)', fontWeight: 300, marginBottom: '2rem' }}>
          Live repository data fetched from GitHub.
        </p>
        <div className="opensource-grid">
          {loading
            ? <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Fetching repository data...</p>
            : repoData.length === 0
              ? <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>No repository data available.</p>
              : repoData.map(r => <RepoCard key={r.id} data={r} />)
          }
        </div>
      </div>
    </section>
  )
}

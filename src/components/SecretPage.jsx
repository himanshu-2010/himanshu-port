import { useState, useRef, useEffect, memo } from 'react'

const STORAGE_KEY = 'secret_auth'

const SecretPage = memo(function SecretPage({ secret, onBack }) {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [confirmSoumya, setConfirmSoumya] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')
  const [lightbox, setLightbox] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!lightbox) setDrawerOpen(false)
  }, [lightbox])

  useEffect(() => {
    if (drawerOpen && drawerRef.current) {
      const el = drawerRef.current
      const parent = el.closest('.secret-lightbox-content')
      if (parent) {
        const contentHeight = el.scrollHeight
        el.style.setProperty('--drawer-h', contentHeight + 'px')
      }
    }
  }, [drawerOpen])

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'himanshu.ilu') {
      localStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
      setError('')
    } else {
      setError('access denied — wrong passkey')
    }
  }

  function handleConfirm(isSoumya) {
    if (isSoumya) {
      setUnlocked(true)
    } else {
      localStorage.removeItem(STORAGE_KEY)
      setConfirmSoumya(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY)
    setUnlocked(false)
    setConfirmSoumya(false)
    setPassword('')
  }

  if (!unlocked && confirmSoumya) {
    return (
      <div className="secret-page">
        <div className="secret-gate">
          <div className="secret-lock-icon">&#x1F590;</div>
          <h2 className="secret-gate-title">Are you Soumya?</h2>
          <p className="secret-gate-sub">This device remembers you. Please confirm.</p>
          <div className="secret-confirm-btns">
            <button className="secret-gate-btn" onClick={() => handleConfirm(true)}>[ Yes, I'm Soumya ]</button>
            <button className="secret-gate-btn secret-gate-btn-secondary" onClick={() => handleConfirm(false)}>[ No, someone else ]</button>
          </div>
          <button className="secret-gate-back" onClick={onBack}>&larr; Back</button>
        </div>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="secret-page">
        <div className="secret-gate">
          <div className="secret-lock-icon">&#x1F512;</div>
          <h2 className="secret-gate-title">Restricted Area</h2>
          <p className="secret-gate-sub">This page is password protected.</p>
          <form className="secret-gate-form" onSubmit={handleSubmit}>
            <input
              type="password"
              className="secret-gate-input"
              placeholder="Enter passkey"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="secret-gate-error">{error}</p>}
            <button type="submit" className="secret-gate-btn">[ Unlock ]</button>
          </form>
          <button className="secret-gate-back" onClick={onBack}>&larr; Back</button>
        </div>
      </div>
    )
  }

  const allImages = [...(secret.originals || []), ...(secret.madeImages || [])]

  function openLightbox(item) {
    setLightbox(item)
  }

  return (
    <div className="secret-page">
      <div className="secret-hearts">
        <span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span>
        <span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span><span>&#x2665;</span>
        <span>&#x2665;</span><span>&#x2665;</span>
      </div>
      <div className="secret-container">
        <div className="secret-top-bar">
          <button className="secret-back" onClick={onBack}>&larr; Back to portfolio</button>
          <button className="secret-logout" onClick={handleLogout}>[ Lock this page ]</button>
        </div>

        <div className="secret-header">
          <h1 className="secret-title">{secret.title}</h1>
          <p className="secret-subtitle">{secret.subtitle}</p>
        </div>

        <div className="secret-lines">
          {secret.lines.map((line, i) => (
            <p key={i} className="secret-line">{line}</p>
          ))}
        </div>

        <div className="secret-masonry">
          {allImages.map((item, i) => (
            <div key={i} className="secret-card" onClick={() => openLightbox(item)}>
              {item.type === 'video' ? (
                <video className="secret-card-media" muted loop preload="metadata">
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt="" className="secret-card-media" loading="lazy" />
              )}
              {item.info && <span className="secret-card-badge">AI</span>}
            </div>
          ))}
        </div>
      </div>

      <div className={`secret-lightbox ${lightbox ? 'open' : ''}`} onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
        {lightbox && (
          <div className="secret-lightbox-content" onClick={e => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video controls autoPlay className="secret-lightbox-media">
                <source src={lightbox.src} type="video/mp4" />
              </video>
            ) : (
              <img src={lightbox.src} alt="" className="secret-lightbox-media" />
            )}

            {lightbox.info && (
              <div className={`secret-drawer ${drawerOpen ? 'open' : ''}`} ref={drawerRef}>
                <div className="secret-drawer-handle" onClick={() => setDrawerOpen(o => !o)}>
                  <span className="secret-drawer-bar" />
                  <span className="secret-drawer-label">{drawerOpen ? 'Hide Details' : 'Show Details'}</span>
                </div>
                <div className="secret-drawer-body">
                  <div className="secret-drawer-section">
                    <span className="secret-drawer-heading">Prompt</span>
                    <p className="secret-drawer-text">{lightbox.info.prompt}</p>
                  </div>
                  <div className="secret-drawer-meta">
                    {lightbox.info.guidanceScale && (
                      <span className="secret-drawer-tag">Guidance: {lightbox.info.guidanceScale}</span>
                    )}
                    {lightbox.info.dimensions && (
                      <span className="secret-drawer-tag">{lightbox.info.dimensions.w}&times;{lightbox.info.dimensions.h}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default SecretPage

import { useState, useRef, useEffect, memo } from 'react'
import IntroLoader from './IntroLoader'

const STORAGE_KEY = 'secret_auth'
const VIBE_KEY = 'secret_vibe_override'
const AI_KEY = 'secret_show_ai'

const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#%&@01'

function getVibe() {
  const now = new Date()
  return now.getMonth() === 8 ? 'birthday' : 'friend'
}

const FRIEND_HEARTS = ['♥', '💜', '🫶']
const BIRTHDAY_HEARTS = ['🎂', '🎈', '💖', '🎉', '✨', '🫶']

function GlitchName({ className = '', finalText = 'demonlord' }) {
  const [text, setText] = useState('himanshu')

  useEffect(() => {
    let timer
    let raf

    const cycle = () => {
      setText('himanshu')
      timer = setTimeout(() => {
        const total = 36
        const scramble = 24
        let f = 0
        const step = () => {
          f++
          if (f <= scramble) {
            setText(
              Array.from({ length: finalText.length },
                () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('')
            )
          } else if (f <= total) {
            const revealed = f - scramble
            setText(
              Array.from({ length: finalText.length }, (_, i) =>
                i < revealed ? finalText[i] : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('')
            )
          } else {
            setText(finalText)
            timer = setTimeout(cycle, 5000)
            return
          }
          raf = requestAnimationFrame(step)
        }
        step()
      }, 700)
    }

    cycle()
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [finalText])

  return (
    <span className={`secret-glitch ${className}`} data-text={finalText}>{text}</span>
  )
}

const SecretPage = memo(function SecretPage({ secret, onBack }) {
  const [vibe, setVibe] = useState(() => localStorage.getItem(VIBE_KEY) || getVibe())
  const isBirthday = vibe === 'birthday'
  const birthday = secret.birthday || {}
  const content = isBirthday ? birthday : secret
  const introTexts = isBirthday ? (birthday.introTexts || secret.introTexts || []) : (secret.introTexts || [])
  const lines = isBirthday ? (birthday.lines || secret.lines || []) : (secret.lines || [])
  const hearts = isBirthday ? BIRTHDAY_HEARTS : FRIEND_HEARTS

  useEffect(() => {
    window.__setSecretVibe = (v) => {
      if (v === 'birthday' || v === 'friend') {
        localStorage.setItem(VIBE_KEY, v)
        setVibe(v)
      } else if (v === null) {
        localStorage.removeItem(VIBE_KEY)
        setVibe(getVibe())
      }
    }
    return () => { delete window.__setSecretVibe }
  }, [])

  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [confirmSoumya, setConfirmSoumya] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')
  const [lightbox, setLightbox] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [introActive, setIntroActive] = useState(false)
  const [showAi, setShowAi] = useState(() => localStorage.getItem(AI_KEY) !== 'off')
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

  useEffect(() => {
    if (unlocked) setIntroActive(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'himanshu.ilu') {
      localStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
      setIntroActive(true)
      setError('')
    } else {
      setError('access denied — wrong passkey')
    }
  }

  function handleConfirm(isSoumya) {
    if (isSoumya) {
      setUnlocked(true)
      setIntroActive(true)
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

  function handleIntroDone() {
    setIntroActive(false)
  }

  function handleReplay() {
    setIntroActive(true)
  }

  function handleAiToggle() {
    setShowAi(s => {
      localStorage.setItem(AI_KEY, s ? 'off' : 'on')
      return !s
    })
  }

  const pageClass = `secret-page${isBirthday ? ' vibe-birthday' : ''}`

  if (!unlocked && confirmSoumya) {
    return (
      <div className={pageClass}>
        <div className="secret-heart-bg">
          <div className="heart-shape"></div>
        </div>

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
      <div className={pageClass}>
        <div className="secret-heart-bg">
          <div className="heart-shape"></div>
        </div>

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

  const allImages = [...(secret.originals || []), ...(showAi ? (secret.madeImages || []) : [])]

  function openLightbox(item) {
    setLightbox(item)
  }

  return (
    <div className={pageClass}>
      <div className="secret-heart-bg">
        <div className="heart-shape"></div>
      </div>

      <div className="secret-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}>{hearts[i % hearts.length]}</span>
        ))}
      </div>

      {introActive && (
        <IntroLoader texts={introTexts} onComplete={handleIntroDone} />
      )}
      <div className="secret-container">
        <div className="secret-top-bar">
          <button className="secret-back" onClick={onBack}>&larr; Back to portfolio</button>
          <button className="secret-replay" onClick={handleReplay}>[ Replay Intro ]</button>
          <button className="secret-logout" onClick={handleLogout}>[ Lock this page ]</button>
        </div>

        <div className="secret-header">
          <h1 className="secret-title">{content.title || secret.title}</h1>
          <p className="secret-subtitle">{content.subtitle || secret.subtitle}</p>
        </div>

        <div className="secret-lines">
          {lines.map((line, i) => (
            <p key={i} className={`secret-line ${i < 2 ? 'secret-line--message' : ''}`}>{line}</p>
          ))}
        </div>
        <div className="secret-signature">— <GlitchName finalText={content.signature || 'demonlord'} /></div>

        <div className="secret-controls">
          <button className={`secret-ai-toggle${showAi ? ' on' : ''}`} onClick={handleAiToggle}>
            [ AI Images: {showAi ? 'ON' : 'OFF'} ]
          </button>
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

import { useState, useEffect, memo } from 'react'

const NotFound = memo(function NotFound({ onGoHome }) {
  const [phase, setPhase] = useState(0)
  const messages = [
    'SCANNING...',
    'CHECKING ROUTES...',
    'SIGNAL NOT FOUND.',
    'HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?',
  ]

  useEffect(() => {
    if (phase < messages.length - 1) {
      const t = setTimeout(() => setPhase(p => p + 1), 800)
      return () => clearTimeout(t)
    }
  }, [phase, messages.length])

  return (
    <div className="not-found-page">
      <div className="not-found-crt">
        <div className="not-found-screen">
          <div className="not-found-scanline" />

          <div className="not-found-oscope">
            <svg viewBox="0 0 400 120" className="not-found-wave">
              <path d="M0 60 L30 60 L40 60 L50 20 L60 100 L70 20 L80 100 L90 60 L100 60 L110 60 L120 60 L130 60 L140 60 L150 60 L160 60 L170 60 L180 60 L190 60 L200 60 L210 60 L220 60 L230 60 L240 60 L250 60 L260 60 L270 60 L280 60 L290 60 L300 60 L310 60 L320 60 L330 60 L340 60 L350 60 L360 60 L370 60 L380 60 L390 60 L400 60"
                fill="none" stroke="#00D9FF" strokeWidth="2" opacity="0.8">
                <animate attributeName="d" dur="3s" repeatCount="indefinite"
                  values="M0 60 L30 60 L40 60 L50 20 L60 100 L70 20 L80 100 L90 60 L100 60 L110 60 L120 60 L130 60 L140 60 L150 60 L160 60 L170 60 L180 60 L190 60 L200 60 L210 60 L220 60 L230 60 L240 60 L250 60 L260 60 L270 60 L280 60 L290 60 L300 60 L310 60 L320 60 L330 60 L340 60 L350 60 L360 60 L370 60 L380 60 L390 60 L400 60;
                          M0 60 L40 60 L50 60 L60 60 L70 60 L80 60 L90 60 L100 60 L110 60 L120 60 L130 60 L140 60 L150 60 L160 60 L170 60 L180 60 L190 60 L200 60 L210 60 L220 60 L230 60 L240 60 L250 60 L260 60 L270 60 L280 60 L290 60 L300 60 L310 60 L320 60 L330 60 L340 60 L350 60 L360 60 L370 60 L380 60 L390 60 L400 60;
                          M0 60 L30 60 L40 60 L50 20 L60 100 L70 20 L80 100 L90 60 L100 60 L110 60 L120 60 L130 60 L140 60 L150 60 L160 60 L170 60 L180 60 L190 60 L200 60 L210 60 L220 60 L230 60 L240 60 L250 60 L260 60 L270 60 L280 60 L290 60 L300 60 L310 60 L320 60 L330 60 L340 60 L350 60 L360 60 L370 60 L380 60 L390 60 L400 60"
                />
              </path>
            </svg>
          </div>

          <div className="not-found-code">
            <span className="not-found-error">ERR_404</span>
            <span className="not-found-msg">PAGE_NOT_FOUND</span>
          </div>

          <div className="not-found-terminal">
            {messages.slice(0, phase + 1).map((m, i) => (
              <p key={i} className="not-found-line">
                <span className="not-found-prompt">$ </span>
                {m}
                {i === phase && i < messages.length - 1 && <span className="not-found-cursor">_</span>}
              </p>
            ))}
          </div>

          <div className="not-found-buttons">
            <button className="btn-primary" onClick={onGoHome}>[ Reboot System ]</button>
          </div>

          <div className="not-found-footer">
            <p>This page does not exist. It never did.</p>
            <p className="not-found-quote">"The only way to deal with an unfree URL is to become so absolutely free that your very existence is a 404." — Albert Camus, probably</p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default NotFound

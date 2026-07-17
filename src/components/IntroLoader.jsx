import { useState, useEffect, memo } from 'react'

function IntroLoader({ texts = [], onComplete }) {
  const [phase, setPhase] = useState('t0')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onComplete()
      return
    }
    const timers = [
      setTimeout(() => setPhase('t1'), 2500),
      setTimeout(() => setPhase('shatter'), 5000),
      setTimeout(() => onComplete(), 5900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const shards = Array.from({ length: 30 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.4
    const dist = 120 + Math.random() * 260
    return {
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      d: Math.random() * 0.25,
      rot: Math.random() * 60 - 30,
      size: 0.8 + Math.random() * 1.4,
    }
  })

  return (
    <div className={`intro-overlay ${phase === 'shatter' ? 'shatter' : ''}`}>
      <div className="intro-stage">
        <svg className="intro-heart" viewBox="0 0 32 29.6" aria-hidden="true">
          <defs>
            <linearGradient id="introHeartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3d6e" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#introHeartGrad)"
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </svg>

        {phase !== 'shatter' && (
          <p className="intro-heart-text">
            {phase === 't0' ? texts[0] : texts[1]}
          </p>
        )}

        {phase === 'shatter' && (
          <div className="intro-hearts-burst">
            {shards.map((s, i) => (
              <span
                key={i}
                style={{
                  '--tx': `${s.tx}px`,
                  '--ty': `${s.ty}px`,
                  '--rot': `${s.rot}deg`,
                  '--d': `${s.d}s`,
                  fontSize: `${s.size}rem`,
                }}
              >
                &#x2665;
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(IntroLoader)

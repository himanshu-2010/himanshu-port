import { memo } from 'react'
import Terminal from './Terminal'

const Hero = memo(function Hero({ personal, links }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-pcb">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pcb-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="#00D9FF" strokeWidth="0.3" opacity="0.15"/>
              <circle cx="30" cy="30" r="2" fill="#00D9FF" opacity="0.1"/>
            </pattern>
            <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0"/>
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#pcb-grid)"/>
          <path d="M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200" fill="none" stroke="url(#trace-grad)" strokeWidth="1.5">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200;M0 210 Q200 190 400 230 T800 210 T1200 230 T1440 210;M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200"/>
          </path>
          <path d="M0 500 Q300 480 600 520 T900 500 T1440 520" fill="none" stroke="url(#trace-grad)" strokeWidth="1">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0 500 Q300 480 600 520 T900 500 T1440 520;M0 510 Q300 490 600 530 T900 510 T1440 530;M0 500 Q300 480 600 520 T900 500 T1440 520"/>
          </path>
          <path d="M0 700 Q200 680 400 720 T800 700 T1200 720 T1440 700" fill="none" stroke="url(#trace-grad)" strokeWidth="0.8">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0 700 Q200 680 400 720 T800 700 T1200 720 T1440 700;M0 690 Q200 670 400 710 T800 690 T1200 710 T1440 690;M0 700 Q200 680 400 720 T800 700 T1200 720 T1440 700"/>
          </path>
        </svg>
      </div>
      <div className="hero-grid">
        <div className="hero-main">
          {personal.photo && <img src={personal.photo} alt="" className="hero-avatar" />}
          <h1 className="hero-title">{personal.name}</h1>
          <hr className="hero-divider" />
          <p className="hero-subtitle">{personal.tagline}<br />{personal.subtitle}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">[ Explore Workbench &#8595; ]</a>
            <a href={links.resumePdf} className="btn-outline" download>[ Download Resume PDF ]</a>
          </div>
          <div className="hero-socials">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="hero-social-link">&#9673; GitHub</a>
            <a href={`mailto:${links.email}`} className="hero-social-link">&#9673; Email</a>
          </div>
        </div>
        <Terminal lines={personal.terminalBootLines} />
      </div>
    </section>
  )
})

export default Hero

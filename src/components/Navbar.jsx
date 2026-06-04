import { useState, useEffect } from 'react'
import SearchModal from './SearchModal'

export default function Navbar({ links, onOpenGallery, portfolio, onOpenProject, onOpenSecret, onGoToSection }) {
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' })
    sections.forEach(s => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#contact', label: 'Contact' },
  ]

  const mobileLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#metrics', label: 'Metrics' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery', action: onOpenGallery },
    { href: '#timeline', label: 'Timeline' },
    { href: '#blog', label: 'Blog' },
    { href: '#opensource', label: 'Open Source' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#quotes', label: 'Quotes' },
    { href: '#contact', label: 'Contact' },
  ]

  function handleNavClick(e, href) {
    e.preventDefault()
    const id = href.replace('#', '')
    if (isOnHomePage) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else if (onGoToSection) {
      onGoToSection(id)
    }
    setMenuOpen(false)
  }

  const isOnHomePage = !window.location.search

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(s => !s)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>HIMANSHU</a>
          <div className="nav-links">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className={`nav-link ${activeSection === l.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>
            ))}
            {onOpenGallery && (
              <a href="?page=gallery" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenGallery() }}>Gallery</a>
            )}
            <button className="nav-search-btn" onClick={() => setShowSearch(true)} aria-label="Search" title="Search (Ctrl+K)">&#x1F50D;</button>
            <a href={links.resumePdf} className="nav-resume" download>[ Resume &#8595; ]</a>
          </div>
          <button className={`nav-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        {mobileLinks.map(l => (
          l.action ? (
            <a key={l.label} href={l.href} className="nav-link" onClick={(e) => { e.preventDefault(); l.action(); setMenuOpen(false) }}>{l.label}</a>
          ) : (
            <a key={l.href} href={l.href} className="nav-link" onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>
          )
        ))}
        <button className="nav-search-btn mobile-search-btn" onClick={() => { setShowSearch(true); setMenuOpen(false) }} aria-label="Search">&#x1F50D; Search</button>
        <a href={links.resumePdf} className="nav-resume" style={{ marginTop: '0.5rem', display: 'inline-block', textAlign: 'center' }} download>[ Resume &#8595; ]</a>
      </div>

      {showSearch && (
        <SearchModal portfolio={portfolio} onClose={() => setShowSearch(false)} onOpenProject={onOpenProject} onOpenGallery={onOpenGallery} onOpenSecret={onOpenSecret} />
      )}
    </>
  )
}

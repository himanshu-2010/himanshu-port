import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import portfolio from './data/portfolio.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import StatusBar from './components/StatusBar'
import BackToTop from './components/BackToTop'

const Gallery = lazy(() => import('./components/Gallery'))
const Timeline = lazy(() => import('./components/Timeline'))
const Blog = lazy(() => import('./components/Blog'))
const OpenSource = lazy(() => import('./components/OpenSource'))
const Achievements = lazy(() => import('./components/Achievements'))
const Quotes = lazy(() => import('./components/Quotes'))
const Contact = lazy(() => import('./components/Contact'))
const ProjectPage = lazy(() => import('./components/ProjectPage'))
const GalleryPage = lazy(() => import('./components/GalleryPage'))
const SecretPage = lazy(() => import('./components/SecretPage'))
const NotFound = lazy(() => import('./components/NotFound'))

function SectionFallback() {
  return <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Loading...</div>
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    const targets = document.querySelectorAll('.section, .project-card, .timeline-card, .blog-card, .repo-card, .achievement-card, .skill-card')
    targets.forEach(el => { el.classList.add('reveal'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const appRef = useRef(null)
  useScrollReveal()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const projectId = params.get('project')
    const page = params.get('page')
    if (projectId) {
      const found = portfolio.projects.find(p => p.id === projectId)
      if (found) setActiveProject(found)
      else setNotFound(true)
    }
    if (page === 'gallery') setShowGallery(true)
    else if (page === 'secret') setShowSecret(true)
    else if (page && page !== 'gallery' && page !== 'secret') setNotFound(true)
  }, [])

  function openProject(id) {
    const found = portfolio.projects.find(p => p.id === id)
    setActiveProject(found)
    window.history.pushState(null, '', `?project=${id}`)
  }

  function closeProject() {
    setActiveProject(null)
    window.history.pushState(null, '', window.location.pathname)
  }

  function openGallery() {
    setShowGallery(true)
    window.history.pushState(null, '', '?page=gallery')
  }

  function closeGallery() {
    setShowGallery(false)
    window.history.pushState(null, '', window.location.pathname)
  }

  function openSecret() {
    setShowSecret(true)
    window.history.pushState(null, '', '?page=secret')
  }

  function closeSecret() {
    setShowSecret(false)
    window.history.pushState(null, '', window.location.pathname)
  }

  function goToSection(sectionId) {
    setActiveProject(null)
    setShowGallery(false)
    setShowSecret(false)
    setNotFound(false)
    window.history.pushState(null, '', window.location.pathname)
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  if (notFound) {
    return (
      <div className="app">
        <Suspense fallback={<SectionFallback />}>
          <NotFound onGoHome={() => { setNotFound(false); window.history.pushState(null, '', window.location.pathname) }} />
        </Suspense>
      </div>
    )
  }

  if (showSecret) {
    return (
      <div className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <Suspense fallback={<SectionFallback />}>
          <SecretPage secret={portfolio.secret} onBack={closeSecret} />
        </Suspense>
      </div>
    )
  }

  if (activeProject) {
    return (
      <div ref={appRef} className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <div className="container">
          <Suspense fallback={<SectionFallback />}>
            <ProjectPage project={activeProject} onBack={closeProject} />
          </Suspense>
        </div>
      </div>
    )
  }

  if (showGallery) {
    return (
      <div className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <Suspense fallback={<SectionFallback />}>
          <GalleryPage gallery={portfolio.gallery} onBack={closeGallery} />
        </Suspense>
      </div>
    )
  }

  return (
    <div ref={appRef} className="app">
      <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
      <div className="app-bg-dots" />
      <Hero personal={portfolio.personal} links={portfolio.links} />
      <Metrics metrics={portfolio.metrics} />
      <About personal={portfolio.personal} />
      <Skills skillCategories={portfolio.skillCategories} />
      <Projects projects={portfolio.projects} categories={portfolio.projectFilterCategories} links={portfolio.links} onProjectClick={openProject} />
      <Suspense fallback={<SectionFallback />}>
        <Gallery gallery={portfolio.gallery} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Timeline timeline={portfolio.timeline} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Blog blog={portfolio.blog} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <OpenSource repos={portfolio.openSourceRepos} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Achievements achievements={portfolio.achievements} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Quotes quotes={portfolio.quotes} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact links={portfolio.links} />
      </Suspense>
      <Footer personal={portfolio.personal} />
      <StatusBar />
      <BackToTop />
    </div>
  )
}

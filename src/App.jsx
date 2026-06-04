import { useState, useEffect, useRef } from 'react'
import portfolio from './data/portfolio.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import Blog from './components/Blog'
import OpenSource from './components/OpenSource'
import Achievements from './components/Achievements'
import Quotes from './components/Quotes'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import GalleryPage from './components/GalleryPage'
import SecretPage from './components/SecretPage'
import StatusBar from './components/StatusBar'
import BackToTop from './components/BackToTop'
import NotFound from './components/NotFound'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.section, .project-card, .timeline-card, .blog-card, .repo-card, .achievement-card, .skill-card')
      .forEach(el => { el.classList.add('reveal'); observer.observe(el) })
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
        <NotFound onGoHome={() => { setNotFound(false); window.history.pushState(null, '', window.location.pathname) }} />
      </div>
    )
  }

  if (showSecret) {
    return (
      <div className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <SecretPage secret={portfolio.secret} onBack={closeSecret} />
      </div>
    )
  }

  if (activeProject) {
    return (
      <div ref={appRef} className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <div className="container">
          <ProjectPage project={activeProject} onBack={closeProject} />
        </div>
      </div>
    )
  }

  if (showGallery) {
    return (
      <div className="app">
        <Navbar links={portfolio.links} portfolio={portfolio} onOpenGallery={openGallery} onOpenProject={openProject} onOpenSecret={openSecret} onGoToSection={goToSection} />
        <GalleryPage gallery={portfolio.gallery} onBack={closeGallery} />
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
      <Gallery gallery={portfolio.gallery} />
      <Timeline timeline={portfolio.timeline} />
      <Blog blog={portfolio.blog} />
      <OpenSource repos={portfolio.openSourceRepos} />
      <Achievements achievements={portfolio.achievements} />
      <Quotes quotes={portfolio.quotes} />
      <Contact links={portfolio.links} />
      <Footer personal={portfolio.personal} />
      <StatusBar />
      <BackToTop />
    </div>
  )
}

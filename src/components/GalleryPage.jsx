import { useState, useMemo } from 'react'

export default function GalleryPage({ gallery, categories, onBack }) {
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  function openLightbox(item, idx) {
    setLightbox(item)
    setLightboxIdx(idx)
  }

  function nextItem(e) {
    e.stopPropagation()
    const next = (lightboxIdx + 1) % gallery.length
    setLightbox(gallery[next])
    setLightboxIdx(next)
  }

  function prevItem(e) {
    e.stopPropagation()
    const prev = (lightboxIdx - 1 + gallery.length) % gallery.length
    setLightbox(gallery[prev])
    setLightboxIdx(prev)
  }

  return (
    <div className="gallery-page">
      <div className="gallery-page-hero">
        <div className="gallery-page-hero-bg">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
            <rect width="100%" height="100%" fill="url(#gallery-grad)"/>
            <defs>
              <linearGradient id="gallery-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.03"/>
                <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.06"/>
                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.03"/>
              </linearGradient>
            </defs>
            <path d="M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200" fill="none" stroke="#00D9FF" strokeWidth="0.5" opacity="0.1">
              <animate attributeName="d" dur="12s" repeatCount="indefinite"
                values="M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200;M0 210 Q200 190 400 230 T800 210 T1200 230 T1440 210;M0 200 Q200 180 400 220 T800 200 T1200 220 T1440 200"/>
            </path>
          </svg>
        </div>

        <div className="gallery-page-hero-content">
          <div className="gallery-page-ornament">
            <svg viewBox="0 0 160 24" aria-hidden="true">
              <path d="M0 12 Q20 2 40 12 Q60 22 80 12 Q100 2 120 12 Q140 22 160 12" fill="none" stroke="#00D9FF" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="80" cy="12" r="2.5" fill="#00D9FF" opacity="0.4"/>
            </svg>
          </div>

          <button onClick={onBack} className="gallery-back-btn">
            &larr; Back to Workbench
          </button>

          <span className="section-label" style={{ textAlign: 'center' }}>// GALLERY</span>
          <h1 className="gallery-page-title">Engineering Gallery</h1>
          <p className="gallery-page-subtitle">{gallery.length} items</p>
        </div>
      </div>

      <div className="gallery-page-body">
        <div className="gallery-page-grid">
          {gallery.map((item, idx) => (
            <div key={idx} className="gallery-page-card" style={{ height: item.height + 'px' }} onClick={() => openLightbox(item, idx)}>
              {item.type === 'video' ? (
                <video className="gallery-page-card-img" muted loop preload="metadata">
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt="" className="gallery-page-card-img" loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`lightbox ${lightbox ? 'open' : ''}`} onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>

        {lightbox && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={prevItem}>&lsaquo;</button>

            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <div className="lightbox-visual">
                {lightbox.type === 'video' ? (
                  <video controls autoPlay className="lightbox-video">
                    <source src={lightbox.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={lightbox.src} alt="" className="lightbox-image" />
                )}
              </div>
              <div className="lightbox-info">
                <span className="lightbox-counter">{lightboxIdx + 1} / {gallery.length}</span>
              </div>
            </div>

            <button className="lightbox-nav lightbox-next" onClick={nextItem}>&rsaquo;</button>
          </>
        )}
      </div>
    </div>
  )
}

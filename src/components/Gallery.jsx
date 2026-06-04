import { useState } from 'react'

export default function Gallery({ gallery }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <span className="section-label">// GALLERY</span>
        <h2 className="section-title">Engineering Gallery</h2>

        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <div className="gallery-item" key={i} onClick={() => setLightbox(item)}>
              {item.type === 'video' ? (
                <video className="gallery-item-media" muted loop preload="metadata" style={{ width: '100%', display: 'block' }}>
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt="" className="gallery-item-media" loading="lazy" />
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="?page=gallery" className="btn-outline">[ View Full Gallery &rarr; ]</a>
        </div>
      </div>

      <div className={`lightbox ${lightbox ? 'open' : ''}`} onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
        {lightbox && (
          lightbox.type === 'video' ? (
            <video controls autoPlay style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '4px' }}>
              <source src={lightbox.src} type="video/mp4" />
            </video>
          ) : (
            <img src={lightbox.src} alt="" style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '4px' }} />
          )
        )}
      </div>
    </section>
  )
}

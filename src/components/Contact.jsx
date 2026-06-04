import { useState } from 'react'

export default function Contact({ links }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      e.target.reset()
    }, 3000)
  }

  const contactChannels = [
    { icon: '&#x2B24;', label: `GitHub — @himanshu-2010`, url: links.github },
    { icon: '&#x2709;', label: links.email, url: `mailto:${links.email}` },
  ]

  if (links.linkedin) {
    contactChannels.push({ icon: '&#x1F4E1;', label: 'LinkedIn', url: links.linkedin })
  }
  if (links.youtube) {
    contactChannels.push({ icon: '&#x1F4FA;', label: 'YouTube', url: links.youtube })
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <span className="section-label">// CONTACT</span>
        <h2 className="section-title">Contact Terminal</h2>

        <div className="contact-grid">
          <div className="contact-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">himanshu@workbench:~/contact</span>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label">[INPUT] Name</label>
                <input type="text" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label className="form-label">[INPUT] Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" required />
              </div>
              <div className="form-field">
                <label className="form-label">[INPUT] Message</label>
                <textarea className="form-input" placeholder="Your message..." required></textarea>
              </div>
              <button type="submit" className="btn-primary" disabled={sent}>
                {sent ? '[ Transmission Sent ]' : '[ Send Transmission ]'}
              </button>
            </form>
          </div>

          <div className="contact-links">
            {contactChannels.map((ch, i) => (
              <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className="contact-link-card">
                <span className="contact-link-icon" dangerouslySetInnerHTML={{ __html: ch.icon }} />
                <span className="contact-link-label">{ch.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

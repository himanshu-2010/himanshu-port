import { memo } from 'react'

const Footer = memo(function Footer({ personal }) {
  return (
    <footer className="footer">
      <p className="footer-text">Built with curiosity, powered by failure. &copy; 2026 {personal.name}</p>
      <p className="footer-motto">Every failed prototype is a diagnostic log. Every successful build is proof of concept.</p>
    </footer>
  )
})

export default Footer

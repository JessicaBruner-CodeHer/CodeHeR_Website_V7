import { useState, useEffect } from 'react'
import { Link, useRouter } from '../router.jsx'
import { navbarContent as c } from '../assets/constants/siteContent.js'
import Button from '../ui/Button.jsx'

export default function Navbar({ onQuoteClick }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { path } = useRouter()

  useEffect(() => { setMobileOpen(false) }, [path])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position:     'fixed',
      top:          0,
      left:         0,
      right:        0,
      zIndex:       30,
      height:       '80px',
      background:   'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(4px)',
      borderBottom: '1px solid var(--color-border-light)',
      boxShadow:    scrolled ? 'var(--shadow-md)' : 'none',
      transition:   'box-shadow var(--transition-base)',
    }}>
      <div className="site-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>

        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>
          CodeHe<span style={{ color: '#B85C38' }}>&#123;R&#125;</span> LLC
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop-links" aria-label="Main navigation">
          {c.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link${path === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="nav-desktop-cta">
          <Button variant="primary" size="sm" onClick={onQuoteClick}>
            {c.ctaLabel}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="nav-mobile-drawer">
          {c.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link-mobile${path === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '0.75rem', marginTop: '0.25rem', borderTop: '1px solid rgba(184,92,56,0.3)' }}>
            <Button variant="primary" size="md" onClick={onQuoteClick} style={{ width: '100%' }}>
              {c.ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

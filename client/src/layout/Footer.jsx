import { Link } from '../router.jsx'
import { footerContent as c } from '../assets/constants/siteContent.js'
import badgeGold from '../assets/images/NoMoreLabels_Badge_Hex_Gold.svg'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-main)', color: 'var(--color-text-faint)' }}>
      <div className="site-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="grid-4" style={{ marginBottom: '1.5rem' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-light)' }}>
              CodeHe<span style={{ color: '#B85C38' }}>&#123;R&#125;</span> LLC
            </span>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-faint)', lineHeight: '1.625' }}>
              {c.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: '1rem' }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {c.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: '1rem' }}>
              Contact
            </p>
            <a href={`mailto:${c.contact.email}`} className="footer-email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {c.contact.email}
            </a>
            <div style={{ marginTop: '1rem' }}>
              <Link
                to="/nomoreLabels"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'transparent',
                  color: 'var(--color-primary)',
                  boxShadow: '0 4px 0px #B85C38',
                  transition: 'color var(--transition-base)',
                }}
              >
                Apply for this Badge
              </Link>
            </div>
          </div>

          {/* NoMoreLabels Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <img src={badgeGold} alt="NoMoreLabels Badge" style={{ width: '100%', maxWidth: '180px' }} />
          </div>

        </div>

        {/* Legal */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(184,92,56,0.3)' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(200,191,180,0.6)' }}>
            © 2024 CodeHe<span style={{ color: '#B85C38' }}>&#123;R&#125;</span> LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

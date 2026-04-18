import { useInView } from '../hooks/useInView.js'
import { Link } from '../router.jsx'
import { servicesTeaserContent as c } from '../assets/constants/siteContent.js'

const SERVICE_ICONS = {
  Users: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Monitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
}

export default function ServicesTeaser() {
  const [headRef, headVisible] = useInView()

  return (
    <section id="services" style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-white)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
      <div className="site-container">

        <h2
          ref={headRef}
          className={`fade-up heading-section${headVisible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25 }}
        >
          <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Solutions</span>
        </h2>

        <div className="grid-2" style={{ marginTop: '4rem', maxWidth: '64rem', margin: '4rem auto 0' }}>
          {c.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service, delay }) {
  const [ref, visible] = useInView({ rootMargin: '-60px' })

  return (
    <div
      ref={ref}
      className={`service-card fade-up delay-${delay + 1}${visible ? ' visible' : ''}`}
    >
      <div
        className="hex-icon"
        style={{
          width: '4rem',
          height: '4rem',
          background: 'rgba(201,151,58,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          flexShrink: 0,
          filter: 'drop-shadow(4px 4px 0px #B85C38)',
        }}
      >
        {SERVICE_ICONS[service.icon]}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
          {service.label}
        </span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)', lineHeight: 1.375 }}>
          {service.tagline}
        </h3>
      </div>

      <p style={{ flex: 1, fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.625' }}>
        {service.description}
      </p>

      <Link to={service.cta.href} className="service-card-link">
        {service.cta.label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <polygon points="7,0 14,3.5 14,10.5 7,14 0,10.5 0,3.5" />
        </svg>
      </Link>
    </div>
  )
}

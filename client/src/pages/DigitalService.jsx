import { useSeo }    from '../hooks/useSeo.js'
import { useInView } from '../hooks/useInView.js'
import { digitalPageContent as c } from '../assets/constants/serviceContent.js'
import Button        from '../ui/Button.jsx'
import PortfolioCard from '../ui/PortfolioCard.jsx'

const SERVICE_ICONS = {
  Code: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  RefreshCw: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  Server: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
}

export default function DigitalService({ onQuoteClick }) {
  useSeo({ title: c.seo.title, description: c.seo.description })

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-bg-main)' }}>
        <div className="site-container">
          <h1 className="fade-up animate" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '1.5rem' }}>
            <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: '#f5ecd7', textShadow: '2px 2px 0px #c9973a' }}>The</span>{' '}
            <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Intersection</span>
            <span style={{ display: 'block', fontSize: '1.35rem', fontWeight: 400, color: '#c8bfb4', textShadow: 'none', marginTop: '0.75rem' }}>
              OF TECHNOLOGY
            </span>
          </h1>
        </div>
      </section>

      {/* Services */}
      <ServicesSection c={c} />

      {/* Portfolio */}
      <PortfolioSection c={c} />

      {/* CTA */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--color-surface-white)', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#1c1410', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {c.cta.headline}
            </h2>
            <Button variant="primary" size="lg" onClick={onQuoteClick}>
              {c.cta.label}
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

function ServicesSection({ c }) {
  const [ref, visible] = useInView()
  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-white)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <h2
          ref={ref}
          className={`fade-up${visible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.25, marginBottom: '3rem' }}
        >
          <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Services</span>
        </h2>
        <div className="grid-3" style={{ marginTop: '4rem', gap: '2.5rem' }}>
          {c.services.map((service, i) => (
            <DigitalServiceCard key={service.title} service={service} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DigitalServiceCard({ service, delay }) {
  const [ref, visible] = useInView({ rootMargin: '-60px' })
  return (
    <div
      ref={ref}
      className={`service-card fade-up delay-${delay + 1}${visible ? ' visible' : ''}`}
    >
      <div
        className="hex-icon"
        style={{ width: '4rem', height: '4rem', background: 'rgba(201,151,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0, filter: 'drop-shadow(4px 4px 0px #B85C38)' }}
      >
        {SERVICE_ICONS[service.icon]}
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)', lineHeight: 1.375 }}>
        {service.title}
      </h3>
      <p style={{ flex: 1, fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.625' }}>
        {service.body}
      </p>
    </div>
  )
}

function PortfolioSection({ c }) {
  const [ref, visible] = useInView()
  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-cream)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <h2
          ref={ref}
          className={`fade-up${visible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.25, marginBottom: '3rem' }}
        >
          <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Examples</span>
        </h2>
        <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2.5rem' }}>
          {c.portfolio.projects.map((project) => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              tags={project.tags}
              url={project.url}
              image={project.image}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

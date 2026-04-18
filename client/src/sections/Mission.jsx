import { useInView } from '../hooks/useInView.js'
import { missionContent as c } from '../assets/constants/siteContent.js'

const ICONS = {
  Target: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
}

const PILLAR_ICONS = ['Target', 'Shield', 'Zap']

export default function Mission() {
  const [headRef, headVisible]   = useInView()
  const [quoteRef, quoteVisible] = useInView()

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-bg-main)', color: 'var(--color-text-light)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,151,58,0.06), transparent)',
      }} />

      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Title */}
        <h2
          ref={headRef}
          className={`heading-section fade-up${headVisible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '2.5rem' }}
        >
          <span style={{ color: '#f5ecd7', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Promise</span>
        </h2>

        {/* Statement */}
        <blockquote
          ref={quoteRef}
          className={`heading-quote fade-up delay-1${quoteVisible ? ' visible' : ''}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: 'var(--color-text-light)',
            textAlign: 'center',
            lineHeight: 1.4,
            marginBottom: '3.5rem',
            border: 'none',
            padding: 0,
          }}
        >
          &ldquo;{c.statement}&rdquo;
        </blockquote>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(184,92,56,0.4)', marginBottom: '3.5rem' }} />

        {/* Pillars */}
        <div className="grid-3" style={{ gap: '4rem' }}>
          {c.pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} icon={PILLAR_ICONS[i]} delay={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

function PillarCard({ pillar, icon, delay }) {
  const [ref, visible] = useInView({ rootMargin: '-40px' })

  return (
    <div
      ref={ref}
      className={`fade-up delay-${delay + 1}${visible ? ' visible' : ''}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      <div
        className="hex-icon"
        style={{
          width: '3rem',
          height: '3rem',
          background: 'rgba(201,151,58,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          filter: 'drop-shadow(4px 4px 0px #B85C38)',
        }}
      >
        {ICONS[icon]}
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: '#c9973a' }}>
        {pillar.title}
      </h3>
      <p style={{ fontSize: '1rem', color: '#c8bfb4', lineHeight: '1.75' }}>
        {pillar.body}
      </p>
    </div>
  )
}

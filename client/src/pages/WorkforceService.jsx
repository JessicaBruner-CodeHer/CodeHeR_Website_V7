import { useSeo }        from '../hooks/useSeo.js'
import { useInView }     from '../hooks/useInView.js'
import { workforcePageContent as c } from '../assets/constants/serviceContent.js'
import Button            from '../ui/Button.jsx'
import WorkforceStats    from '../sections/WorkforceStats.jsx'

export default function WorkforceService({ onQuoteClick }) {
  useSeo({ title: c.seo.title, description: c.seo.description })

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-cream)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="site-container">
          <h1 className="fade-up animate" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '1.5rem' }}>
            <span className="heading-hero" style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>The</span>{' '}
            <span className="heading-hero" style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Intersection</span>
            <span style={{ display: 'block', fontSize: '1.35rem', fontWeight: 400, color: '#6f6256', textShadow: 'none', marginTop: '0.75rem' }}>
              OF PEOPLE
            </span>
          </h1>
        </div>
      </section>

      {/* Live Workforce Stats */}
      <WorkforceStats />

      {/* Our Approach */}
      <ApproachSection />

      {/* Mid-page dark CTA */}
      <section style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'var(--color-bg-main)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', maxWidth: '38rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#f5ecd7', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {c.cta.headline}
            </h2>
            <Button variant="outline" size="lg" onClick={onQuoteClick}>
              {c.cta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection c={c} />

      {/* Bottom CTA */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--color-surface-cream)', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#1c1410', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {c.cta.headline}
            </h2>
            <Button variant="outline" size="lg" onClick={onQuoteClick}>
              {c.cta.label}
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

const APPROACH_CARDS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'The Overlooked Workforce',
    body:  'The workforce is not missing. It is being overlooked. We help businesses identify where policies, practices, and processes may be limiting visibility into qualified talent.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Real-Time Assessment',
    body:  'We assess how your current hiring approach is functioning in real time, identifying where policies, practices, and processes could be limiting qualified people.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: 'The Results',
    body:  'The result is a more aligned hiring process, stronger candidate consideration, and a workforce strategy that supports long-term performance and retention.',
  },
]

function ApproachSection() {
  const [headRef, headVisible] = useInView()
  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-cream)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <h2
          ref={headRef}
          className={`heading-section fade-up${headVisible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '3rem' }}
        >
          <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Approach</span>
        </h2>
        <div className="grid-3" style={{ gap: '2.5rem' }}>
          {APPROACH_CARDS.map((card, i) => (
            <ApproachCard key={card.title} card={card} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ApproachCard({ card, delay }) {
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
        {card.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)', lineHeight: 1.375 }}>
        {card.title}
      </h3>
      <p style={{ flex: 1, fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.625' }}>
        {card.body}
      </p>
    </div>
  )
}

function ProcessSection({ c }) {
  const [ref, visible] = useInView()
  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-white)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <h2
          ref={ref}
          className={`heading-section fade-up${visible ? ' visible' : ''}`}
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '3rem' }}
        >
          <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>The</span>{' '}
          <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Process</span>
        </h2>
        <div className="grid-process">
          {c.process.steps.map((step, i) => (
            <StepCard key={step.title} step={step} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, delay }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`process-card fade-up delay-${delay + 1}${visible ? ' visible' : ''}`}
    >
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.625' }}>
        {step.body}
      </p>
    </div>
  )
}

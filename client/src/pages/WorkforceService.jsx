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
      <ApproachSection c={c} />

      {/* Mid-page dark CTA */}
      <section style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'var(--color-bg-main)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', maxWidth: '38rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#f5ecd7', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {c.cta.headline}
            </h2>
            <Button variant="primary" size="lg" onClick={onQuoteClick}>
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
            <Button variant="primary" size="lg" onClick={onQuoteClick}>
              {c.cta.label}
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

function ApproachSection({ c }) {
  const [ref, visible] = useInView()
  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-cream)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <div ref={ref} className={`fade-up${visible ? ' visible' : ''}`} style={{ maxWidth: '48rem' }}>
          <h2 className="heading-section" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '3rem' }}>
            <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
            <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Approach</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {c.whatItIs.body.map((para, i) => (
              <p key={i} style={{ color: '#6f6256', fontSize: '1.15rem', lineHeight: '1.85' }}>
                {i === 1
                  ? <>At CodeHe<span style={{ color: '#B85C38' }}>&#123;R&#125;</span> LLC, we help businesses identify where policies, practices, and processes may be limiting visibility into qualified talent.</>
                  : para
                }
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
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

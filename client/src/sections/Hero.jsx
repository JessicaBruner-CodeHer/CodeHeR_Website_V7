import { heroContent as c } from '../assets/constants/siteContent.js'
import Button from '../ui/Button.jsx'
import logoDark from '../assets/images/CodeHeR_Logo_Dark_Transparent.svg'
import logoLight from '../assets/images/CodeHeR_Logo_Transparent.svg'

export default function Hero({ onQuoteClick }) {
  return (
    <section className="hero-split">

      {/* Left panel — inkwell dark (desktop only) */}
      <div className="hero-left">
        <img
          src={logoDark}
          alt="CodeHeR LLC"
          className="fade-up animate"
          style={{ width: '100%' }}
        />
      </div>

      {/* Right panel — cream */}
      <div className="hero-right">
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,151,58,0.07), transparent)',
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '36rem' }}>

          {/* Logo — mobile only */}
          <div className="hero-mobile-logo fade-up animate">
            <img src={logoLight} alt="CodeHeR LLC" style={{ width: '100%', maxWidth: '300px' }} />
          </div>

          {/* Headline */}
          <h1
            className="fade-up animate delay-1 heading-hero"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.3, color: 'var(--color-text-strong)', marginBottom: '1.5rem' }}
          >
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>
              <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410', marginRight: '0.75rem' }}>Your</span>
              <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Business</span>
              <span style={{ color: 'var(--color-text-strong)' }}>.</span>
            </span>
            <span style={{ display: 'block' }}>
              <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a', marginRight: '0.75rem' }}>Our</span>
              <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Solutions</span>
              <span style={{ color: 'var(--color-text-strong)' }}>.</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up animate delay-2"
            style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: '1.625', marginBottom: '2.5rem' }}
          >
            {c.subheadline}
          </p>

          {/* CTA */}
          <div className="fade-up animate delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Button variant="outline" size="lg" onClick={onQuoteClick}>
              {c.primaryCta.label}
            </Button>
          </div>

        </div>
      </div>

    </section>
  )
}

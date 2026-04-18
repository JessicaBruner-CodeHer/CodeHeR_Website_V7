import { useInView } from '../hooks/useInView.js'
import bridgeImg from '../assets/images/codeher_bridge_refined.svg'

export default function AboutTeaser() {
  const [textRef, textVisible] = useInView()
  const [imgRef,  imgVisible]  = useInView()

  return (
    <section className="two-panel" style={{ borderTop: '1px solid var(--color-border-light)', minHeight: '520px' }}>

      {/* Left — cream, text content */}
      <div style={{ flex: 1, background: 'var(--color-surface-cream)', display: 'flex', alignItems: 'center', padding: '7rem 4rem' }}>
        <div
          ref={textRef}
          className={`fade-up${textVisible ? ' visible' : ''}`}
          style={{ maxWidth: '36rem' }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.25, marginBottom: '2rem' }}>
            <span className="heading-section" style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>Our</span>{' '}
            <span className="heading-section" style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Mission</span>
            <span style={{ display: 'block', fontSize: '1.35rem', fontWeight: 400, color: '#6f6256', textShadow: 'none', marginTop: '0.75rem', marginBottom: '2rem' }}>
              OF PEOPLE AND TECHNOLOGY
            </span>
          </h2>

          <p style={{ fontSize: '1.125rem', lineHeight: '1.85', color: 'var(--color-text-muted)' }}>
            CodeHe&#123;R&#125; LLC was founded with a passion to bridge a gap between economic stability
            and business growth. We are dedicated to providing business solutions that bring the
            needs of people and sustainable solutions together for powerful outcomes. Whether you
            are trying to solve for workforce shortages or you need to change your digital
            strategy, CodeHe&#123;R&#125; LLC is dedicated to solution driven results.
          </p>
        </div>
      </div>

      {/* Right — inkwell, bridge image */}
      <div style={{ flex: 1, background: 'var(--color-bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <img
          ref={imgRef}
          src={bridgeImg}
          alt="The bridge between people and technology"
          className={`scale-in${imgVisible ? ' visible' : ''}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

    </section>
  )
}

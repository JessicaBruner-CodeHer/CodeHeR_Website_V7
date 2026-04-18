import { useSeo }   from '../hooks/useSeo.js'
import BadgeForm    from '../components/forms/BadgeForm.jsx'

export default function BadgePage() {
  useSeo({
    title:       'NoMoreLabels Badge',
    description: 'Apply to receive the NoMoreLabels badge and show your commitment to fair chance hiring.',
  })

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-surface-cream)', minHeight: '100vh' }}>
        <div className="site-container">
          <div className="grid-2-lg" style={{ maxWidth: '1100px', margin: '0 auto' }}>

            {/* Left — context */}
            <div>
              <h1
                className="fade-up animate"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, lineHeight: 1.25, marginBottom: '1.5rem' }}
              >
                <span style={{ color: '#1c1410', textShadow: '2px 2px 0px #c9973a' }}>NoMore</span>
                <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Labels</span>
              </h1>
              <p className="fade-up animate delay-1" style={{ color: '#6f6256', fontSize: '1.1rem', lineHeight: '1.85', marginBottom: '1.5rem' }}>
                The NoMoreLabels badge is a mark of commitment. It tells job seekers, partners, and your community that your organization actively works to reduce barriers for people with criminal backgrounds.
              </p>
              <p className="fade-up animate delay-2" style={{ color: '#6f6256', fontSize: '1.1rem', lineHeight: '1.85' }}>
                Fair chance hiring is not just a policy. It is a practice. Complete the form to apply for your badge and join a growing network of employers building a stronger, more inclusive workforce.
              </p>
            </div>

            {/* Right — form card */}
            <div style={{
              background:    'var(--color-surface-white)',
              borderRadius:  'var(--radius-xl)',
              border:        '1px solid var(--color-border-light)',
              borderLeft:    '4px solid #B85C38',
              overflow:      'hidden',
              boxShadow:     '0 4px 24px rgba(0,0,0,0.08)',
            }}>
              <BadgeForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

import { projectCtaContent as c } from '../assets/constants/siteContent.js'
import Button from '../ui/Button.jsx'

export default function ProjectCta({ onQuoteClick }) {
  return (
    <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--color-surface-white)', borderTop: '1px solid var(--color-border-light)' }}>
      <div className="site-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#1c1410', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
            {c.headline}
          </h2>
          <Button variant="outline" size="lg" onClick={onQuoteClick}>
            {c.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}

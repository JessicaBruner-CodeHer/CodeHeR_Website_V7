import { useEffect, useRef, useState } from 'react'
import { workforceStatsContent as c } from '../assets/constants/serviceContent.js'

const COLOR_MAP = {
  warm: 'var(--color-accent)',
  gold: 'var(--color-primary)',
}

function parseStatValue(raw) {
  if (!raw) return 0
  return parseFloat(String(raw).replace(/,/g, ''))
}

function formatStatValue(num, originalValue) {
  if (!originalValue) return String(Math.round(num))
  const hasDecimal = String(originalValue).includes('.')
  const hasCommas  = String(originalValue).includes(',')
  if (hasDecimal) return num.toFixed(1)
  if (hasCommas)  return Math.round(num).toLocaleString('en-US')
  return String(Math.round(num))
}

function AnimatedNumber({ value, suffix, prefix, color }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          observer.unobserve(el)
          const target   = parseStatValue(value)
          const duration = 1800
          const startTime = performance.now()

          const tick = (now) => {
            const elapsed  = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            setDisplay(formatStatValue(target * eased, value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1, rootMargin: '-80px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} style={{ color, fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>
      {prefix}{display}{suffix}
    </span>
  )
}

function StatCard({ stat, value, index }) {
  const color = COLOR_MAP[stat.color] ?? COLOR_MAP.gold
  return (
    <div
      className="fade-up"
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '0.75rem',
        padding:       '2.25rem',
        background:    'var(--color-bg-warm)',
        border:        '1px solid rgba(201,151,58,0.15)',
        borderRadius:  'var(--radius-lg)',
        borderTop:     `3px solid ${color}`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <AnimatedNumber value={value} suffix={stat.suffix} prefix={stat.prefix} color={color} />
      <p style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
        {stat.label}
      </p>
      <p style={{ color: 'var(--color-text-faint)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
        {stat.context}
      </p>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{ padding: '2.25rem', background: 'var(--color-bg-warm)', border: '1px solid rgba(201,151,58,0.1)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ height: '2.75rem', width: '60%', background: 'rgba(255,255,255,0.06)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ height: '1rem',    width: '75%', background: 'rgba(255,255,255,0.04)', borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite 0.2s' }} />
      <div style={{ height: '0.875rem',width: '90%', background: 'rgba(255,255,255,0.04)', borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite 0.4s' }} />
    </div>
  )
}

export default function WorkforceStats() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    fetch('/api/workforce-stats')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '7rem', background: 'var(--color-bg-main)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="site-container">

        <div style={{ maxWidth: '40rem', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.25rem' }}>
            <span style={{ color: '#f5ecd7', textShadow: '2px 2px 0px #c9973a' }}>The</span>{' '}
            <span style={{ color: '#c9973a', textShadow: '2px 2px 0px #1c1410' }}>Data</span>
            <span style={{ display: 'block', fontSize: '1.35rem', fontWeight: 400, color: '#c8bfb4', textShadow: 'none', marginTop: '0.75rem' }}>
              THAT DRIVES OUR PASSION
            </span>
          </h2>
        </div>

        {error ? (
          <div style={{ color: 'var(--color-text-faint)', fontSize: '0.9rem', padding: '2rem 0' }}>
            Live data is temporarily unavailable. Check back shortly.
          </div>
        ) : (
          <div className="grid-2">
            {loading
              ? c.stats.map((_, i) => <SkeletonCard key={i} />)
              : c.stats.map((stat, i) => (
                  <StatCard key={stat.id} stat={stat} value={data?.[stat.id] ?? '0'} index={i} />
                ))
            }
          </div>
        )}

        {!error && (
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem', margin: 0 }}>
              {c.sourceNote}
            </p>
            {data?.lastUpdated && (
              <p style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem', margin: 0 }}>
                Last updated: <span style={{ color: 'var(--color-primary)' }}>{data.lastUpdated}</span>
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  )
}

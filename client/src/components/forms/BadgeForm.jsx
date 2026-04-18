import { useState, useEffect } from 'react'
import { useRouter } from '../../router.jsx'
import Button from '../../ui/Button.jsx'
import badgeGold      from '../../assets/images/NoMoreLabels_Badge_Hex_Gold.svg'
import badgeIvory     from '../../assets/images/NoMoreLabels_Badge_Hex_Ivory.svg'
import badgeAmberRust from '../../assets/images/NoMoreLabels_Badge_Hex_AmberRust.svg'
import badgeDark      from '../../assets/images/NoMoreLabels_Badge_Hex_Dark.svg'

const BADGE_OPTIONS = [
  { id: 'Gold',     label: 'Gold',     src: badgeGold,      bg: '#1c1410' },
  { id: 'Ivory',    label: 'Ivory',    src: badgeIvory,     bg: '#1c1410' },
  { id: 'Standard', label: 'Standard', src: badgeAmberRust, bg: '#f5ecd7' },
  { id: 'Dark',     label: 'Dark',     src: badgeDark,      bg: '#f5ecd7' },
]

export default function BadgeForm({ onSuccess }) {
  const { navigate } = useRouter()

  const [form, setForm] = useState({
    companyName:    '',
    firstName:      '',
    lastName:       '',
    email:          '',
    intentType:     '',
    badgeSelection: '',
  })
  const [errors,    setErrors]    = useState({})
  const [rootError, setRootError] = useState('')
  const [status,    setStatus]    = useState('idle')

  const isCommit     = form.intentType === 'commit'
  const isInterested = form.intentType === 'interested'

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => { onSuccess?.(); navigate('/') }, 4000)
    return () => clearTimeout(timer)
  }, [status, onSuccess, navigate])

  function update(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n })
    }
  }

  function handleIntentChange(type) {
    setForm((f) => ({
      ...f,
      intentType:     f.intentType === type ? '' : type,
      badgeSelection: type === 'interested' ? '' : f.badgeSelection,
    }))
    if (errors.intentType) setErrors((e) => { const n = { ...e }; delete n.intentType; return n })
  }

  function selectBadge(id) {
    setForm((f) => ({ ...f, badgeSelection: id }))
    if (errors.badgeSelection) setErrors((e) => { const n = { ...e }; delete n.badgeSelection; return n })
  }

  function validate() {
    const e = {}
    if (!form.companyName.trim()) e.companyName = 'Company name is required'
    if (!form.firstName.trim())   e.firstName   = 'First name is required'
    if (!form.lastName.trim())    e.lastName    = 'Last name is required'
    if (!form.email.trim())       e.email       = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.intentType)         e.intentType  = 'Please make a selection'
    if (isCommit && !form.badgeSelection) e.badgeSelection = 'Please select a badge style'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setRootError('')
    setStatus('submitting')
    try {
      const res = await fetch('/api/badge-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, agreementAccepted: isCommit }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch (err) {
      setRootError('Something went wrong. Please try again or email us at info@codeherllc.com.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '4rem 2rem' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'rgba(201,151,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>
          Request Received
        </h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.625', maxWidth: '24rem' }}>
          {isCommit
            ? 'Thank you for your commitment. We will review your request and send your selected badge within 1 to 2 business days.'
            : 'Thank you for your interest. Someone from our team will be in touch within 1 to 2 business days.'}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
          This window will close automatically…
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Dark branded header */}
      <div style={{ background: 'var(--color-bg-main)', padding: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
          CodeHe<span style={{ color: '#B85C38' }}>&#123;R&#125;</span>{' '}
          <span style={{ color: 'rgba(245,236,215,0.5)', fontSize: '0.7rem' }}>LLC</span>
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-light)', lineHeight: 1.2, marginBottom: '1rem' }}>
          NoMoreLabels<br />Badge Request
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(245,236,215,0.6)', lineHeight: 1.6 }}>
          Complete this form to request your badge or express your interest in becoming an inclusive employer.
        </p>
      </div>

      {/* Form body */}
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Company */}
          <div>
            <label className="form-label" htmlFor="bf-company">Company Name <span style={{ color: 'var(--color-primary)' }}>*</span></label>
            <input id="bf-company" type="text" className="form-field" placeholder="Your organization name" value={form.companyName} onChange={update('companyName')} />
            {errors.companyName && <p className="form-error"><ErrorIcon />{errors.companyName}</p>}
          </div>

          {/* First + Last */}
          <div className="grid-2-sm">
            <div>
              <label className="form-label" htmlFor="bf-first">First Name <span style={{ color: 'var(--color-primary)' }}>*</span></label>
              <input id="bf-first" type="text" className="form-field" placeholder="Jane" value={form.firstName} onChange={update('firstName')} />
              {errors.firstName && <p className="form-error"><ErrorIcon />{errors.firstName}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="bf-last">Last Name <span style={{ color: 'var(--color-primary)' }}>*</span></label>
              <input id="bf-last" type="text" className="form-field" placeholder="Smith" value={form.lastName} onChange={update('lastName')} />
              {errors.lastName && <p className="form-error"><ErrorIcon />{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="form-label" htmlFor="bf-email">Email Address <span style={{ color: 'var(--color-primary)' }}>*</span></label>
            <input id="bf-email" type="email" className="form-field" placeholder="jane@company.com" value={form.email} onChange={update('email')} />
            {errors.email && <p className="form-error"><ErrorIcon />{errors.email}</p>}
          </div>

          {/* Intent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="form-label">Your Commitment <span style={{ color: 'var(--color-primary)' }}>*</span></p>

            <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer', padding: '1rem', borderRadius: 'var(--radius-md)', background: isCommit ? 'rgba(201,151,58,0.06)' : 'var(--color-surface-muted)', border: isCommit ? '1px solid rgba(201,151,58,0.3)' : '1px solid var(--color-border-light)', transition: 'all 0.15s' }}>
              <input type="checkbox" checked={isCommit} onChange={() => handleIntentChange('commit')} style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                I guarantee that my organization is a fair chance employer with a sustainable program in place that reduces barriers of criminal backgrounds to employment within my company. I commit to putting this NoMoreLabels badge on my website.
              </span>
            </label>

            <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer', padding: '1rem', borderRadius: 'var(--radius-md)', background: isInterested ? 'rgba(201,151,58,0.06)' : 'var(--color-surface-muted)', border: isInterested ? '1px solid rgba(201,151,58,0.3)' : '1px solid var(--color-border-light)', transition: 'all 0.15s' }}>
              <input type="checkbox" checked={isInterested} onChange={() => handleIntentChange('interested')} style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                I am interested in becoming an inclusive employer.
              </span>
            </label>

            {errors.intentType && <p className="form-error"><ErrorIcon />{errors.intentType}</p>}
          </div>

          {/* Badge selection — only when committed */}
          {isCommit && (
            <div>
              <p className="form-label" style={{ marginBottom: '0.75rem' }}>
                Select Your Badge Style <span style={{ color: 'var(--color-primary)' }}>*</span>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {BADGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectBadge(opt.id)}
                    style={{
                      background:    opt.bg,
                      borderRadius:  'var(--radius-md)',
                      padding:       '2rem',
                      display:       'flex',
                      flexDirection: 'column',
                      alignItems:    'center',
                      gap:           '1rem',
                      cursor:        'pointer',
                      border:        form.badgeSelection === opt.id ? '2px solid #B85C38' : '2px solid transparent',
                      boxShadow:     form.badgeSelection === opt.id ? '0 0 0 1px #B85C38' : 'none',
                      transition:    'border 0.15s, box-shadow 0.15s',
                      width:         '100%',
                    }}
                  >
                    <img src={opt.src} alt={`${opt.label} badge`} style={{ width: '100%', maxWidth: '260px', height: 'auto' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: opt.bg === '#1c1410' ? 'rgba(245,236,215,0.7)' : '#6f6256' }}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.badgeSelection && <p className="form-error" style={{ marginTop: '0.5rem' }}><ErrorIcon />{errors.badgeSelection}</p>}
            </div>
          )}

          {/* Root error */}
          {rootError && (
            <div className="form-root-error">
              <ErrorIcon size={16} />
              {rootError}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" variant="outline" size="lg" disabled={status === 'submitting'} style={{ width: '100%' }}>
            {status === 'submitting' ? (
              <><span className="spinner" style={{ width: '1rem', height: '1rem', borderRadius: '9999px', border: '2px solid rgba(28,20,16,0.3)', borderTopColor: 'var(--color-bg-main)', display: 'inline-block' }} /> Sending…</>
            ) : 'Submit Request'}
          </Button>

        </form>
      </div>
    </div>
  )
}

function ErrorIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

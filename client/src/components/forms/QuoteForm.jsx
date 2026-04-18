import { useState, useEffect } from 'react'
import { quoteFormContent as c } from '../../assets/constants/siteContent.js'
import Button from '../../ui/Button.jsx'

export default function QuoteForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', organization: '', projectType: '', message: '' })
  const [errors,    setErrors]    = useState({})
  const [rootError, setRootError] = useState('')
  const [status,    setStatus]    = useState('idle') // idle | submitting | success

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(() => {
      onSuccess?.()
      setStatus('idle')
      setForm({ name: '', email: '', organization: '', projectType: '', message: '' })
    }, 4000)
    return () => clearTimeout(timer)
  }, [status, onSuccess])

  function update(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n })
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim())      e.name        = 'Name is required'
    if (!form.email.trim())     e.email       = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.projectType)      e.projectType = 'Please select a service'
    if (!form.message.trim())   e.message     = 'Please tell us about your project'
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
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setRootError(c.errorMessage)
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '4rem 2rem' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'rgba(201,151,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>
          {c.successTitle}
        </h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.625', maxWidth: '24rem' }}>
          {c.successBody}
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
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
          {c.eyebrow}
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-light)', lineHeight: 1.15, marginBottom: '0.75rem' }}>
          {c.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(245,236,215,0.6)', lineHeight: 1.6 }}>
          {c.subtitle}
        </p>
      </div>

      {/* Form body */}
      <div style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Name + Email */}
          <div className="grid-2-sm">
            <div>
              <label className="form-label" htmlFor="qf-name">
                {c.fields.name.label} <span style={{ color: 'var(--color-primary)' }}>*</span>
              </label>
              <input id="qf-name" type="text" className="form-field" placeholder={c.fields.name.placeholder} value={form.name} onChange={update('name')} />
              {errors.name && <p className="form-error"><ErrorIcon />{errors.name}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="qf-email">
                {c.fields.email.label} <span style={{ color: 'var(--color-primary)' }}>*</span>
              </label>
              <input id="qf-email" type="email" className="form-field" placeholder={c.fields.email.placeholder} value={form.email} onChange={update('email')} />
              {errors.email && <p className="form-error"><ErrorIcon />{errors.email}</p>}
            </div>
          </div>

          {/* Organization */}
          <div>
            <label className="form-label" htmlFor="qf-company">{c.fields.organization.label}</label>
            <input id="qf-company" type="text" className="form-field" placeholder={c.fields.organization.placeholder} value={form.organization} onChange={update('organization')} />
          </div>

          {/* Project Type */}
          <div>
            <label className="form-label" htmlFor="qf-service">
              {c.fields.projectType.label} <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <select id="qf-service" className="form-field" value={form.projectType} onChange={update('projectType')}>
              <option value="">Select a solution area…</option>
              {c.fields.projectType.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.projectType && <p className="form-error"><ErrorIcon />{errors.projectType}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="form-label" htmlFor="qf-message">
              {c.fields.message.label} <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <textarea
              id="qf-message"
              rows={4}
              className="form-field"
              style={{ resize: 'vertical', minHeight: '100px' }}
              placeholder={c.fields.message.placeholder}
              value={form.message}
              onChange={update('message')}
            />
            {errors.message && <p className="form-error"><ErrorIcon />{errors.message}</p>}
          </div>

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
            ) : c.submitLabel}
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

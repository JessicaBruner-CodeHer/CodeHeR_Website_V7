export default function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-surface-white)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div className="spinner" style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '9999px',
          border: '2px solid var(--color-border-light)',
          borderTopColor: 'var(--color-primary)',
        }} />
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
          Loading…
        </p>
      </div>
    </div>
  )
}

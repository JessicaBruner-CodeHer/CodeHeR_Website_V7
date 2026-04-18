export default function PortfolioCard({ title, tags = [], url, image, description }) {
  const hasImage = Boolean(image)
  const hasUrl   = Boolean(url)

  return (
    <div className="portfolio-card">
      <div className="portfolio-card-thumb">
        {hasImage ? (
          <img src={image} alt={title} />
        ) : (
          <div className="portfolio-card-no-image">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Coming soon</span>
          </div>
        )}

        {hasUrl && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title}`}
            className="portfolio-card-overlay"
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'var(--color-primary)',
              color: 'var(--color-bg-main)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View site
            </span>
          </a>
        )}
      </div>

      <div className="portfolio-card-body">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>
          {title}
        </h3>

        {description && (
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.625', flex: 1 }}>
            {description}
          </p>
        )}

        {hasUrl && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="portfolio-card-link">
            View site
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

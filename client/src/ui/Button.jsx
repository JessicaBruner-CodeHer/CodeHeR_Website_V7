import { Link } from '../router.jsx'

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  href     = null,
  onClick  = null,
  disabled = false,
  type     = 'button',
  style    = {},
  ...props
}) {
  const classes = `btn btn-${variant} btn-${size}`

  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={classes} style={style} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} style={style} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} style={style} {...props}>
      {children}
    </button>
  )
}

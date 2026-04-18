import { createContext, useContext, useState, useEffect } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  function navigate(to) {
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

export function Link({ to, children, className, style, onClick, ...props }) {
  const { navigate } = useRouter()

  function handleClick(e) {
    e.preventDefault()
    onClick?.()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className} style={style} {...props}>
      {children}
    </a>
  )
}

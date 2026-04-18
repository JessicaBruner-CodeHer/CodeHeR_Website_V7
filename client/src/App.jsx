import { Suspense, lazy } from 'react'
import { RouterProvider, useRouter } from './router.jsx'
import Navbar     from './layout/Navbar.jsx'
import Footer     from './layout/Footer.jsx'
import Modal      from './ui/Modal.jsx'
import PageLoader from './ui/PageLoader.jsx'
import QuoteForm  from './components/forms/QuoteForm.jsx'
import { useModal } from './hooks/useModal.js'

const Home             = lazy(() => import('./pages/Home.jsx'))
const WorkforceService = lazy(() => import('./pages/WorkforceService.jsx'))
const DigitalService   = lazy(() => import('./pages/DigitalService.jsx'))
const BadgePage        = lazy(() => import('./pages/BadgePage.jsx'))

function Routes({ onQuoteClick }) {
  const { path } = useRouter()

  return (
    <Suspense fallback={<PageLoader />}>
      {path === '/'                   && <Home             onQuoteClick={onQuoteClick} />}
      {path === '/services/workforce' && <WorkforceService onQuoteClick={onQuoteClick} />}
      {path === '/services/digital'   && <DigitalService   onQuoteClick={onQuoteClick} />}
      {path === '/nomoreLabels'        && <BadgePage />}
      {![
        '/', '/services/workforce', '/services/digital', '/nomoreLabels'
      ].includes(path) && <Home onQuoteClick={onQuoteClick} />}
    </Suspense>
  )
}

function AppInner() {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Navbar onQuoteClick={openModal} />
      <main>
        <Routes onQuoteClick={openModal} />
      </main>
      <Footer />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <QuoteForm onSuccess={closeModal} />
      </Modal>
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <AppInner />
    </RouterProvider>
  )
}

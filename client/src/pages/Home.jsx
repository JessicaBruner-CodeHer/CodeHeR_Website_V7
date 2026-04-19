import { useSeo }        from '../hooks/useSeo.js'
import Hero              from '../sections/Hero.jsx'
import ServicesTeaser    from '../sections/ServicesTeaser.jsx'
import Mission           from '../sections/Mission.jsx'
import AboutTeaser       from '../sections/AboutTeaser.jsx'
import ProjectCta        from '../sections/ProjectCta.jsx'

export default function Home({ onQuoteClick }) {
useSeo({
  title: 'CodeHe{R} LLC | Business Solutions Firm',
  description: 'CodeHe{R} delivers workforce consulting, web development, and digital infrastructure built for real business growth.'
})

  return (
    <div>
      <Hero          onQuoteClick={onQuoteClick} />
      <ServicesTeaser />
      <Mission />
      <AboutTeaser />
      <ProjectCta    onQuoteClick={onQuoteClick} />
    </div>
  )
}

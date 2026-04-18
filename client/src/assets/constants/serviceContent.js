// ── Workforce Consulting Page ────────────────────────────────
export const workforcePageContent = {
  seo: {
    title:       'Business Consulting',
    description: 'CodeHeR LLC reviews your hiring practices end-to-end, identifies where qualified candidates are being filtered out, and delivers clear recommendations to close your talent gaps.',
  },
  whatItIs: {
    body: [
      'The workforce is not missing. It is being overlooked.',
      'At CodeHe{R} LLC, we help businesses identify where policies, practices, and processes may be limiting visibility into qualified talent.',
      'We assess how your current approach to hiring is functioning in real time.',
      'The result is a more aligned hiring process, stronger candidate consideration, and a workforce strategy that supports long-term performance and retention.',
      'Because when barriers are reduced, better hiring decisions follow.',
    ],
  },
  process: {
    steps: [
      { title: 'Consultation',    body: 'We start with a focused call to identify your needs, challenges, and what success looks like for your business.' },
      { title: 'Strategy',        body: 'We build a tailored strategy that aligns directly with your business goals and the gaps you need to close.' },
      { title: 'Process Review',  body: 'We go through your current processes and policies in detail. Every document, every step, every friction point.' },
      { title: 'Recommendations', body: 'We walk you through clear, prioritized recommendations that are specific, actionable, and grounded in what we found.' },
      { title: 'Implementation',  body: 'We implement the agreed-upon changes with you and launch a sustainable program built to last.' },
      { title: 'Ongoing Support', body: 'We stay with you, making adjustments as needed and helping you track the KPIs and ROI that prove the program is working.' },
    ],
  },
  cta: {
    headline: 'Your Business Solution Starts Here',
    label:    'Get Started',
  },
}

// ── Workforce Stats ──────────────────────────────────────────
export const workforceStatsContent = {
  stats: [
    {
      id:      'unemployedPersons',
      label:   'People Unemployed',
      suffix:  '',
      prefix:  '',
      context: 'Americans currently without work',
      color:   'warm',
    },
    {
      id:      'jobOpenings',
      label:   'Open Jobs',
      suffix:  '',
      prefix:  '',
      context: 'positions employers cannot fill right now',
      color:   'gold',
    },
  ],
  sourceNote: 'Data sourced live from the U.S. Bureau of Labor Statistics public API. Updated monthly.',
}

// ── Digital Solutions Page ───────────────────────────────────
export const digitalPageContent = {
  seo: {
    title:       'Digital Solutions',
    description: 'Professional website development, rebuilds, hosting and support. CodeHeR LLC builds digital presence that reflects the quality of your business.',
  },
  services: [
    {
      icon:  'Code',
      title: 'New Website Builds',
      body:  'From concept to launch, we design and build professional sites tailored to your business goals and audience.',
    },
    {
      icon:  'RefreshCw',
      title: 'Website Rebuilds',
      body:  'Outdated site holding you back? We rebuild from the ground up with modern tech, better performance, and a design that fits where you are now.',
    },
    {
      icon:  'Server',
      title: 'Hosting & Support',
      body:  'We handle the technical side: hosting, updates, security, and ongoing support, so you can focus on running your business.',
    },
  ],
  portfolio: {
    projects: [
      { id: 1, title: 'Restaurant & Dining',    tags: ['New build'],  url: null, image: '/portfolio-restaurant.svg',  description: 'Farm-to-table restaurant site with online reservations and seasonal menu showcase.' },
      { id: 2, title: 'SaaS Dashboard',         tags: ['New build'],  url: null, image: '/portfolio-saas.svg',         description: 'Analytics platform with live metrics, revenue tracking, and team management.' },
      { id: 3, title: 'E-Commerce Store',       tags: ['E-commerce'], url: null, image: '/portfolio-ecommerce.svg',    description: 'Full-featured online store with product catalog, cart, and checkout flow.' },
      { id: 4, title: 'Fitness & Wellness',     tags: ['New build'],  url: null, image: '/portfolio-fitness.svg',      description: 'Gym membership site with class schedules, trainer profiles, and free trial signup.' },
      { id: 5, title: 'Nonprofit Organization', tags: ['New build'],  url: null, image: '/portfolio-nonprofit.svg',    description: 'Community impact site with donation flow, program highlights, and annual reporting.' },
      { id: 6, title: 'Real Estate Listings',   tags: ['New build'],  url: null, image: '/portfolio-realestate.svg',   description: 'Property search platform with map view, listing cards, and lead capture.' },
    ],
  },
  cta: {
    headline: 'Your Business Solution Starts Here',
    label:    'Get Started',
  },
}

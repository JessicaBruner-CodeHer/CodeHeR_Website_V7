// ── Navbar ──────────────────────────────────────────────────
export const navbarContent = {
  logoText: 'CodeHe{R} LLC',
  links: [
    { label: 'Home',              href: '/' },
    { label: 'Business Solutions', href: '/services/workforce' },
    { label: 'Digital Solutions', href: '/services/digital' },
  ],
  ctaLabel: 'Get Started',
}

// ── Hero ─────────────────────────────────────────────────────
export const heroContent = {
  subheadline: 'Where workforce strategy meets economic impact.',
  primaryCta:  { label: 'Get Started' },
}

// ── Services teaser ──────────────────────────────────────────
export const servicesTeaserContent = {
  services: [
    {
      id:          'workforce',
      icon:        'Users',
      label:       'Business Consulting',
      tagline:     'Building bridges between people and policies.',
      description: 'Identifying workforce gaps through policies, systems, and processes. We build sustainable workforce programs that connect the right people to the right opportunities and keep them there.',
      cta:         { label: 'Learn more', href: '/services/workforce' },
    },
    {
      id:          'digital',
      icon:        'Monitor',
      label:       'Digital Solutions',
      tagline:     'Web services that align your web goals with your budget.',
      description: 'Professional web builds, rebuilds, hosting and ongoing support. We create digital presence that reflects the quality of your business.',
      cta:         { label: 'Learn more', href: '/services/digital' },
    },
  ],
}

// ── Mission ──────────────────────────────────────────────────
export const missionContent = {
  statement: 'Strategic thinking. Practical execution. Meaningful change.',
  pillars: [
    {
      title: 'Intentional',
      body:  'We understand that your business is unique, and we tailor our approach to meet your specific needs.',
    },
    {
      title: 'Accountable',
      body:  'Together we discover the reason behind challenges and create solutions that work.',
    },
    {
      title: 'Practical',
      body:  'Our deliverables are actionable. You walk away with a clear path forward, not just a report.',
    },
  ],
}

// ── About Teaser ─────────────────────────────────────────────
export const aboutTeaserContent = {
  body: 'CodeHe{R} LLC was founded with a passion to bridge a gap between economic stability and business growth. We are dedicated to providing business solutions that bring the needs of people and sustainable solutions together for powerful outcomes. Whether you are trying to solve for workforce shortages or you need to change your digital strategy, CodeHe{R} LLC is dedicated to solution driven results.',
}

// ── Project CTA ──────────────────────────────────────────────
export const projectCtaContent = {
  headline: 'Your Business Solution Starts Here',
  cta:      { label: 'Get Started' },
}

// ── Footer ───────────────────────────────────────────────────
export const footerContent = {
  tagline: 'Business Solutions Firm',
  links: [
    { label: 'Home',              href: '/' },
    { label: 'Business Solutions', href: '/services/workforce' },
    { label: 'Digital Solutions', href: '/services/digital' },
  ],
  contact: {
    email: 'info@codeherllc.com',
  },
}

// ── Quote Form ───────────────────────────────────────────────
export const quoteFormContent = {
  eyebrow:      'Start a Conversation',
  title:        "Let's Build What's Next.",
  subtitle:     "Tell us about your goals and we'll reach out within one business day.",
  successTitle: "We've got your request!",
  successBody:  'Someone from our team will reach out within 1 business day to discuss next steps. Keep an eye on your inbox.',
  errorMessage: 'Something went wrong on our end. Please try again or email us directly at info@codeherllc.com.',
  fields: {
    name:         { label: 'Full Name',      placeholder: 'Jane Smith' },
    email:        { label: 'Email Address',  placeholder: 'jane@company.com' },
    projectType:  { label: 'Service needed', options: ['Workforce Consulting', 'Digital Solutions', 'Both'] },
    organization: { label: 'Company',        placeholder: 'Your company name (optional)' },
    message:      { label: 'Message',        placeholder: "Tell us about your current challenges, goals, or what you'd like to accomplish..." },
  },
  submitLabel: 'Send My Request →',
}

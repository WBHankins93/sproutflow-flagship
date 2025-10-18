// data/portfolio.ts - Portfolio Projects Data

export interface PortfolioProject {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    url?: string;
    metrics?: {
      label: string;
      value: string;
    }[];
  }
  
  export const portfolioProjects: PortfolioProject[] = [
    {
      id: 'demo-1',
      name: 'Local Coffee Roaster',
      category: 'Small Business',
      description: 'Modern e-commerce site for artisan coffee roaster, featuring product catalog, online ordering, and subscription management.',
      image: '/images/portfolio/coffee-roaster.jpg',
      tags: ['E-commerce', 'Shopify', 'Branding'],
      url: '#',
      metrics: [
        { label: 'Online Sales Increase', value: '+145%' },
        { label: 'Launch Timeline', value: '2 weeks' },
      ]
    },
    {
      id: 'demo-2',
      name: 'Wellness Studio',
      category: 'Health & Wellness',
      description: 'Booking-focused website for yoga and wellness studio with class schedules, instructor profiles, and online reservation system.',
      image: '/images/portfolio/wellness-studio.jpg',
      tags: ['Booking System', 'WordPress', 'SEO'],
      url: '#',
      metrics: [
        { label: 'New Client Bookings', value: '+89%' },
        { label: 'Mobile Traffic', value: '78%' },
      ]
    },
    {
      id: 'demo-3',
      name: 'Landscape Design Firm',
      category: 'Professional Services',
      description: 'Portfolio-driven site showcasing residential and commercial landscape projects with before/after galleries and service pages.',
      image: '/images/portfolio/landscape-design.jpg',
      tags: ['Portfolio', 'Custom Design', 'Lead Generation'],
      url: '#',
      metrics: [
        { label: 'Quality Leads', value: '+120%' },
        { label: 'Page Load Speed', value: '0.8s' },
      ]
    },
    {
      id: 'demo-4',
      name: 'Boutique Law Practice',
      category: 'Professional Services',
      description: 'Professional website for family law practice featuring attorney bios, practice areas, client resources, and secure contact forms.',
      image: '/images/portfolio/law-practice.jpg',
      tags: ['Professional', 'Custom CMS', 'Security'],
      url: '#',
      metrics: [
        { label: 'Consultation Requests', value: '+67%' },
        { label: 'Client Satisfaction', value: '4.9/5' },
      ]
    },
    {
      id: 'demo-5',
      name: 'Artisan Bakery',
      category: 'Food & Beverage',
      description: 'Appetizing website for local bakery with daily menu updates, online ordering, catering services, and customer testimonials.',
      image: '/images/portfolio/artisan-bakery.jpg',
      tags: ['Food Service', 'Online Ordering', 'Mobile-First'],
      url: '#',
      metrics: [
        { label: 'Online Orders', value: '+200%' },
        { label: 'Average Order Value', value: '+35%' },
      ]
    },
    {
      id: 'demo-6',
      name: 'Consulting Agency',
      category: 'Professional Services',
      description: 'Authority-building site for business consultancy with case studies, thought leadership blog, and lead capture strategy.',
      image: '/images/portfolio/consulting-agency.jpg',
      tags: ['B2B', 'Content Marketing', 'Analytics'],
      url: '#',
      metrics: [
        { label: 'Qualified Leads', value: '+95%' },
        { label: 'Avg. Session Time', value: '4:32' },
      ]
    },
  ];
  
  // Categories for filtering
  export const portfolioCategories = [
    'All',
    'Small Business',
    'Professional Services',
    'Health & Wellness',
    'Food & Beverage',
    'E-commerce',
  ];
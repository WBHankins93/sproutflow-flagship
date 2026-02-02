// data/content.ts - UPDATED (Streamlined add-ons section)

export const heroContent = {
  headline: "Business growth strategy that happens to include a website",
  subheading: "Most New Orleans agencies focus on affordable website building. We focus on business growth strategy. We bring the strategic thinking of $30,000 NYC agencies to New Orleans small businesses at $3,500-$15,000 because we have lower costs—not because we deliver less value.",
  description: "Our clients invest in revenue-generating assets, not digital brochures. Every project starts with understanding your business problems and revenue goals—not just how many pages you need.",
  primaryCTA: "Start Your Project",
  secondaryCTA: "View Our Work"
};

export const aboutContent = {
  headline: "Strategic thinking from NYC and SF agencies, at New Orleans prices",
  lead: "We deliver the strategic thinking and quality of NYC and SF agencies at 40-50% lower prices because we're based in New Orleans with lower operational costs—not because we cut corners on quality.",
  story: [
    "After years of building infrastructure for Fortune 500 companies and scaling startups, we recognized a gap in the market: small businesses deserved the same level of technical excellence and strategic thinking typically reserved for enterprise clients.",
    "We founded Sproutflow to bring that same precision, reliability, and business focus to companies ready to compete at the highest level. Every project leverages proven methodologies refined through years of enterprise work.",
    "Our approach starts with business outcomes: 'What business problems are you trying to solve?' and 'What revenue goals are tied to your digital presence?' Not 'How many pages do you need?' This positions us as a strategic partner rather than a vendor taking orders."
  ],
  credentials: {
    headline: "Proven at scale",
    points: [
      "Enterprise infrastructure background with IBM and Fortune 500 clients",
      "Technical expertise spanning cloud architecture to conversion optimization", 
      "Business-focused approach that prioritizes ROI over vanity metrics",
      "Track record of delivering projects that exceed performance expectations",
      "New Orleans-based with regional cost advantages, not quality compromises"
    ]
  }
};

export const servicesContent = {
  headline: "Three service levels, one standard of excellence",
  description: "Every project receives the same strategic approach and technical precision, scaled to match your business stage and requirements. Frame tiers around client readiness and investment appetite.",
  
  tiers: [
    {
      id: 'foundation',
      name: "Foundation",
      priceRange: "$2,000 - $2,800",
      timeline: "2-3 weeks",
      ideal: "New businesses or rebrands needing validated presence",
      description: "Strategic discovery process that ensures your website aligns with business goals. Custom solutions rather than template installations—a foundation for long-term growth, not just online presence.",
      businessOutcomes: [
        "Validated professional market presence",
        "Clear customer conversion pathway aligned with business goals",
        "Foundation for digital marketing initiatives",
        "Strategic architecture that scales with growth"
      ],
      technicalIncludes: [
        "5-10 pages with strategic architecture",
        "Semi-custom design (not pure templates)",
        "Mobile optimization and performance tuning",
        "SEO foundation with keyword research",
        "2-hour strategy session on business goals"
      ]
    },
    {
      id: 'growth',
      name: "Growth",
      priceRange: "$3,800 - $5,500",
      timeline: "4-6 weeks",
      ideal: "Established businesses ready to compete for market share",
      description: "Comprehensive digital presence that positions your business as the clear choice in your market. Custom design reflecting brand personality with conversion optimization and professional copywriting.",
      businessOutcomes: [
        "Clear market differentiation from competitors",
        "Improved customer acquisition metrics",
        "Enhanced brand perception and authority",
        "Scalable platform for business expansion",
        "Tracked revenue growth from digital presence"
      ],
      technicalIncludes: [
        "10-20 pages with conversion optimization",
        "Fully custom responsive design",
        "Professional copywriting for key pages (5-8 pages)",
        "Comprehensive SEO strategy with competitive analysis",
        "Blog integration with content strategy"
      ]
    },
    {
      id: 'market-leader',
      name: "Market Leader",
      priceRange: "$7,500+",
      timeline: "8-12 weeks",
      ideal: "Businesses where digital presence drives significant revenue",
      description: "Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages. Deep strategic planning with advanced functionality for businesses where digital presence is a primary revenue driver.",
      businessOutcomes: [
        "Technical competitive advantages in market",
        "Streamlined business operations and efficiency",
        "Platform designed for significant scaling",
        "Advanced customer acquisition and retention systems",
        "Measurable ROI from digital investment"
      ],
      technicalIncludes: [
        "20-50+ pages with advanced functionality",
        "Fully custom design and interactive elements",
        "Full-site professional copywriting",
        "Advanced SEO with technical implementations",
        "Custom integrations (CRM, email marketing, etc.)"
      ]
    }
  ],
  
  // UPDATED ADD-ONS - Enhanced with new services
  addOns: {
    headline: "Strategic enhancements",
    services: [
      { 
        name: "Website Care Plans", 
        price: "From $200/mo",
        description: "True agency-managed hosting with proactive security and priority support"
      },
      { 
        name: "Professional Photography", 
        price: "$800 - $2,000",
        description: "High-quality photography that captures your brand professionally"
      },
      { 
        name: "E-commerce Store Design & Integration", 
        price: "$1,500 - $3,500",
        description: "Custom design for Shopify/WooCommerce stores to match your website—not building a custom platform"
      },
      { 
        name: "Ongoing SEO Strategy", 
        price: "$800 - $2,000/mo",
        description: "Strategic SEO services separate from maintenance - keyword research, content optimization, performance tracking"
      }
    ]
  }
};

export const processContent = {
  headline: "How we work together",
  description: "A collaborative, transparent process designed for efficiency and results.",
  stages: [
    {
      id: 'discover',
      name: 'Discover',
      subtitle: 'Strategic Foundation',
      duration: '1-2 days',
      description: 'Deep-dive into your business objectives, target audience, and competitive landscape to build a solid strategic foundation.'
    },
    {
      id: 'design',
      name: 'Design',
      subtitle: 'Visual Identity',
      duration: '3-5 days',
      description: 'Craft messaging and visual identity that builds trust and drives action, aligned with your brand and business goals.'
    },
    {
      id: 'develop',
      name: 'Develop',
      subtitle: 'Technical Excellence',
      duration: '1-2 weeks',
      description: 'Enterprise-grade development with conversion optimization, performance focus, and attention to every technical detail.'
    },
    {
      id: 'deploy',
      name: 'Deploy',
      subtitle: 'Launch & Growth',
      duration: '2-3 days',
      description: 'Professional launch with comprehensive training, analytics setup, and ongoing partnership to ensure your continued success.'
    }
  ]
};

export const portfolioContent = {
  headline: "Where Small Businesses Come Alive Online",
  subheadline: "Real transformations from small businesses who chose growth over settling. These are demonstration portfolios showcasing the kind of impact we create for our clients.",
  items: [
    {
      id: 'bayou-heritage',
      title: 'Bayou Heritage Tours',
      category: 'Tourism & Experiences',
      isDemo: true
    },
    {
      id: 'creole-corner',
      title: 'Créole Corner Café',
      category: 'Restaurant & Local Business',
      isDemo: true
    },
    {
      id: 'gulf-coast-legal',
      title: 'Gulf Coast Legal',
      category: 'Professional Services',
      isDemo: true
    }
  ]
};

export const contactContent = {
  headline: "Let's start something beautiful",
  description: "Every great partnership begins with a conversation. Choose the option that feels right for where you are in your journey.",
  
  conversationOptions: [
    {
      type: "Quick Discovery Call",
      duration: "15 minutes",
      ideal: "Just starting to consider a professional website",
      description: "Perfect for exploring ideas and seeing if we're a good fit for your project.",
      icon: "MessageSquare"
    },
    {
      type: "Strategy Consultation",
      duration: "30 minutes", 
      ideal: "Ready to discuss your project in detail",
      description: "Dive deep into your vision, challenges, and goals to map out a strategic approach.",
      icon: "Calendar" 
    },
    {
      type: "Project Planning",
      duration: "60 minutes", 
      ideal: "Committed to moving forward with professional solution",
      description: "Detailed project scoping, timeline development, and strategic roadmap creation for your business.",
      icon: "Target"
    }
  ],
  
  businessInfo: {
    email: "ben@sproutflow-studio.com",
    phone: "(228) 327-1082",
    address: "New Orleans, LA • Portland, OR",
    availability: "Monday - Friday, 9 AM - 6 PM CST"
  }
};

export const navigationContent = {
  mainNav: [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" }
  ],
  
  footerNav: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Accessibility", href: "/accessibility" }
  ]
};

export const seoContent = {
  home: {
    title: "Sproutflow | Strategic Web Design for New Orleans Businesses",
    description: "Business growth strategy that happens to include a website. We bring NYC/SF agency strategic thinking to New Orleans small businesses at $3,500-$15,000. Revenue-generating assets, not digital brochures.",
    keywords: ["professional web design", "custom website development", "small business websites", "conversion optimization", "business growth", "New Orleans web design", "strategic web design", "business growth strategy"]
  }
};
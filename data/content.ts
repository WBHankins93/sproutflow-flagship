// data/content.ts - UPDATED (Streamlined add-ons section)

export const heroContent = {
  headline: "Websites that mean business",
  subheading: "Professional web design for small businesses ready to compete at the highest level. No templates. No shortcuts. Just results that justify your investment.",
  description: "We build custom websites that convert visitors into customers and establish your business as the clear choice in your market. Every project is designed to deliver measurable business outcomes.",
  primaryCTA: "Start Your Project",
  secondaryCTA: "View Our Work"
};

export const aboutContent = {
  headline: "Built on expertise, delivered with precision",
  lead: "Sproutflow bridges enterprise-level technical capabilities with the personal attention your business deserves.",
  story: [
    "After years of building infrastructure for Fortune 500 companies and scaling startups, we recognized a gap in the market: small businesses deserved the same level of technical excellence and strategic thinking typically reserved for enterprise clients.",
    "We founded Sproutflow to bring that same precision, reliability, and business focus to companies ready to compete at the highest level. Every project leverages proven methodologies refined through years of enterprise work.",
    "Our approach is straightforward: understand your business objectives, design for measurable outcomes, and deliver a digital presence that positions you as the clear choice in your market."
  ],
  credentials: {
    headline: "Proven at scale",
    points: [
      "Enterprise infrastructure background with IBM and Fortune 500 clients",
      "Technical expertise spanning cloud architecture to conversion optimization", 
      "Business-focused approach that prioritizes ROI over vanity metrics",
      "Track record of delivering projects that exceed performance expectations"
    ]
  }
};

export const servicesContent = {
  headline: "Three service levels, one standard of excellence",
  description: "Every project receives the same strategic approach and technical precision, scaled to match your business stage and requirements.",
  
  tiers: [
    {
      id: 'launch',
      name: "Launch",
      priceRange: "$750 - $1,250",
      timeline: "5-7 business days",
      ideal: "New businesses and focused market entry",
      description: "Strategic website foundation designed to establish immediate professional credibility and drive customer acquisition from day one.",
      businessOutcomes: [
        "Immediate professional market presence",
        "Clear customer conversion pathway",
        "Credibility establishment for business growth",
        "Foundation for digital marketing initiatives"
      ],
      technicalIncludes: [
        "1-3 strategically architected pages",
        "Mobile-responsive professional design",
        "Domain setup and business email configuration",
        "Performance optimization (sub-3 second loading)",
        "+1 additional features"
      ]
    },
    {
      id: 'elevate',
      name: "Elevate",
      priceRange: "$2,000 - $2,500",
      timeline: "2-3 weeks",
      ideal: "Established businesses ready for competitive advantage",
      description: "Comprehensive digital presence that positions your business as the clear choice in your market through strategic design and content architecture.",
      businessOutcomes: [
        "Clear market differentiation from competitors",
        "Improved customer acquisition metrics",
        "Enhanced brand perception and authority",
        "Scalable platform for business expansion"
      ],
      technicalIncludes: [
        "Custom 4-6 page architecture",
        "Fully custom responsive design",
        "Content management system integration",
        "Advanced performance optimization",
        "+2 additional features"
      ]
    },
    {
      id: 'thrive',
      name: "Thrive",
      priceRange: "Starting at $5,000",
      timeline: "4-8 weeks",
      ideal: "Growing businesses with specific technical requirements",
      description: "Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages through advanced functionality.",
      businessOutcomes: [
        "Technical competitive advantages in market",
        "Streamlined business operations and efficiency",
        "Platform designed for significant scaling",
        "Advanced customer acquisition and retention systems"
      ],
      technicalIncludes: [
        "Fully custom website architecture",
        "Advanced integrations and functionality",
        "Customer portals and booking systems",
        "E-commerce capabilities where applicable",
        "+2 additional features"
      ]
    }
  ],
  
  // UPDATED ADD-ONS - Removed Strategy Consultation & Blog Integration
  addOns: {
    headline: "Strategic enhancements",
    services: [
      { 
        name: "Logo Design", 
        price: "$300",
        description: "Professional brand mark design"
      },
      { 
        name: "SEO Audit & Strategy", 
        price: "$300",
        description: "Competitive analysis and recommendations"
      },
      { 
        name: "Website Care Plans", 
        price: "From $150/mo",
        description: "Ongoing updates, optimization, and support"
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
    email: "hello@sproutflow.com",
    phone: "+1 (555) 123-4567",
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
    title: "Sproutflow | Professional Web Design for Serious Businesses",
    description: "Custom website design and development for small businesses ready to compete at the highest level. $750-$5000 projects delivering measurable results.",
    keywords: ["professional web design", "custom website development", "small business websites", "conversion optimization", "business growth"]
  }
};
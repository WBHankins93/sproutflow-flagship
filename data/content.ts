// data/content.ts - Professional Studio Content Strategy

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
        name: "Launch",
        priceRange: "$750 - $1,250",
        timeline: "1 Week",
        ideal: "New businesses and focused projects",
        description: "Professional foundation designed to establish credibility and drive initial customer acquisition.",
        features: [
          "Strategic 1-3 page website architecture",
          "Mobile-responsive professional design",
          "Domain setup and business email configuration",
          "Performance optimization for fast loading",
          "30-minute strategy consultation"
        ],
        outcomes: [
          "Immediate professional online presence",
          "Clear path for customer conversion",
          "Foundation for future growth"
        ]
      },
      {
        name: "Elevate", 
        priceRange: "$2,000 - $2,500",
        timeline: "2-3 Weeks",
        ideal: "Established businesses ready to scale",
        description: "Comprehensive digital presence that positions your business as the clear choice in your market.",
        features: [
          "Custom 4-6 page website with strategic messaging",
          "Brand refinement and visual identity alignment",
          "SEO foundation and content optimization",
          "Content management system for easy updates",
          "Google Analytics and conversion tracking",
          "One round of strategic revisions"
        ],
        outcomes: [
          "Market differentiation through design",
          "Improved customer acquisition metrics", 
          "Scalable platform for business growth"
        ]
      },
      {
        name: "Thrive",
        priceRange: "Starting at $5,000",
        timeline: "4+ Weeks", 
        ideal: "Growing businesses with specific technical requirements",
        description: "Custom solutions that solve specific business challenges and create competitive advantages.",
        features: [
          "Fully custom website architecture",
          "Advanced integrations and functionality",
          "Customer portals and booking systems",
          "E-commerce capabilities where needed",
          "Comprehensive SEO and performance optimization",
          "Ongoing technical consultation"
        ],
        outcomes: [
          "Technical competitive advantages",
          "Streamlined business operations",
          "Platform designed for significant scale"
        ]
      }
    ],
    
    addOns: {
      headline: "Strategic enhancements",
      services: [
        { name: "Logo Design", price: "$300", description: "Professional brand mark design" },
        { name: "Blog Integration", price: "$250", description: "Content marketing foundation" },
        { name: "SEO Audit & Strategy", price: "$300", description: "Competitive analysis and recommendations" },
        { name: "Monthly Maintenance", price: "$150/month", description: "Ongoing updates and optimization" },
        { name: "Strategy Consultation", price: "$100/hour", description: "Recorded planning sessions" }
      ]
    }
  };
  
  export const processContent = {
    headline: "A proven approach to measurable results",
    description: "Every project follows our refined methodology, ensuring consistent outcomes and strategic alignment.",
    
    steps: [
      {
        phase: "Discovery & Strategy",
        duration: "Week 1",
        focus: "Understanding objectives",
        description: "We begin with a comprehensive analysis of your business objectives, target market, and competitive landscape to inform every design decision.",
        deliverables: [
          "Business objective analysis",
          "Target audience profiling", 
          "Competitive positioning review",
          "Technical requirements assessment"
        ]
      },
      {
        phase: "Design & Architecture", 
        duration: "Week 2-3",
        focus: "Strategic execution",
        description: "Custom design development focused on conversion optimization and brand differentiation, with architecture planned for performance and scalability.",
        deliverables: [
          "Strategic site architecture",
          "Custom design concepts",
          "Content strategy framework",
          "Technical specification document"
        ]
      },
      {
        phase: "Development & Testing",
        duration: "Week 3-4",
        focus: "Technical excellence",
        description: "Professional development with enterprise-grade practices, comprehensive testing, and performance optimization across all devices.",
        deliverables: [
          "Fully responsive website",
          "Performance optimization",
          "Cross-browser testing",
          "Security implementation"
        ]
      },
      {
        phase: "Launch & Optimization",
        duration: "Week 4+", 
        focus: "Results delivery",
        description: "Strategic launch with comprehensive training and initial performance analysis to ensure immediate impact and long-term success.",
        deliverables: [
          "Domain and hosting setup",
          "Analytics configuration",
          "Client training session",
          "Performance benchmarking"
        ]
      }
    ]
  };
  
  export const portfolioContent = {
    headline: "Results that speak for themselves",
    description: "Each project demonstrates our commitment to delivering measurable business outcomes through strategic design and technical excellence.",
    
    // Professional case study structure
    caseStudies: [
      {
        name: "Bayou Heritage Tours",
        industry: "Tourism & Hospitality",
        challenge: "Seasonal business needed year-round booking system and professional credibility to compete with larger tour operators.",
        solution: "Custom booking platform with integrated payment processing and mobile-optimized experience for on-site bookings.",
        results: [
          "150% increase in online bookings",
          "40% reduction in administrative overhead",
          "Year-round revenue stream establishment"
        ],
        technologies: ["Custom CMS", "Payment Integration", "Mobile Optimization"],
        timeline: "3 weeks",
        category: "Elevate Tier"
      },
      {
        name: "Gulf Coast Legal",
        industry: "Professional Services",
        challenge: "Regional law firm needed to establish authority and attract high-value clients in competitive market.",
        solution: "Professional website with strategic content architecture, case study integration, and conversion-optimized contact flow.",
        results: [
          "200% increase in qualified leads",
          "35% improvement in client retention",
          "Establishment as regional market leader"
        ],
        technologies: ["Strategic SEO", "Content Management", "Lead Tracking"],
        timeline: "2 weeks", 
        category: "Elevate Tier"
      },
      {
        name: "Créole Corner Café",
        industry: "Restaurant & Local Business",
        challenge: "Local restaurant needed online presence to compete with chain establishments and increase takeout orders.",
        solution: "Visual-first design showcasing authenticity with integrated ordering system and local SEO optimization.",
        results: [
          "300% increase in online orders",
          "45% growth in new customer acquisition",
          "Successful expansion to catering services"
        ],
        technologies: ["Online Ordering", "Local SEO", "Visual Optimization"],
        timeline: "1 week",
        category: "Launch Tier"
      }
    ]
  };
  
  export const contactContent = {
    headline: "Ready to compete at the highest level?",
    description: "Every successful project starts with understanding your specific business objectives and competitive challenges.",
    
    // Revolutionary contact approach - conversation focused
    conversationOptions: [
      {
        type: "Strategic Discussion",
        duration: "15 minutes",
        ideal: "Exploring possibilities and initial feasibility",
        description: "Quick conversation to understand your objectives and determine if we're the right fit for your project.",
        icon: "MessageCircle"
      },
      {
        type: "Business Analysis", 
        duration: "30 minutes",
        ideal: "Ready to discuss specific requirements and approach",
        description: "Comprehensive discussion of your business objectives, competitive landscape, and strategic opportunities.",
        icon: "TrendingUp" 
      },
      {
        type: "Project Planning",
        duration: "60 minutes", 
        ideal: "Committed to moving forward with professional solution",
        description: "Detailed project scoping, timeline development, and strategic roadmap creation for your business.",
        icon: "Target"
      }
    ],
    
    // Backup traditional form
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Business Email", type: "email", required: true },
      { name: "company", label: "Company Name", type: "text", required: true },
      { name: "project", label: "Project Type", type: "select", options: ["Launch", "Elevate", "Thrive", "Not Sure"], required: true },
      { name: "timeline", label: "Target Timeline", type: "select", options: ["Within 1 month", "1-3 months", "3-6 months", "Flexible"], required: true },
      { name: "message", label: "Project Details", type: "textarea", required: true }
    ],
    
    businessInfo: {
      email: "hello@sproutflow.com",
      phone: "+1 (555) 123-4567", // Update with real number
      address: "New Orleans, LA • Portland, OR", // Geographic coverage
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
  
  // SEO and meta content
  export const seoContent = {
    home: {
      title: "Sproutflow | Professional Web Design for Serious Businesses",
      description: "Custom website design and development for small businesses ready to compete at the highest level. $750-$5000 projects delivering measurable results.",
      keywords: ["professional web design", "custom website development", "small business websites", "conversion optimization", "business growth"]
    }
  };
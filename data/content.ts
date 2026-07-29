// data/content.ts - UPDATED (Streamlined add-ons section)

export const heroContent = {
  headline: "Websites that win the right clients—and systems that make growth easier",
  subheading: "Sproutflow designs and builds custom websites, CRMs, admin tools, and automation for small businesses.",
  description: "One founder-led partner from the first strategy call through launch and support. Clear scope and a fixed quote before work begins.",
  primaryCTA: "Tell us about your project",
  secondaryCTA: "See client results"
};

export const aboutContent = {
  headline: "Founder-led strategy, design, and development",
  lead: "You work directly with the person responsible for the strategy and the build, from first conversation through launch.",
  story: [
    "Ben Hankins spent years building and operating software for large companies, with a focus on reliability, security, and clear delivery.",
    "Sproutflow started after he saw strong local businesses held back by unclear websites and disconnected tools.",
    "Every project starts with the buyer, the business goal, and the operational problem—not a page count."
  ],
  credentials: {
    headline: "Proven at scale",
    points: [
      "Infrastructure background with IBM and Fortune 500 clients",
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
      description: "Strategic discovery process that ensures your website aligns with business goals. Custom solutions rather than template installations. A foundation for long-term growth, not just online presence.",
      businessOutcomes: [
        "Validated professional market presence",
        "Clear customer conversion pathway aligned with business goals",
        "Foundation for digital marketing initiatives",
        "Strategic architecture that scales with growth"
      ],
      technicalIncludes: [
        "Semi-custom design aligned with your business goals",
        "Mobile optimization and performance tuning",
        "SEO foundation with keyword research",
        "Basic CMS: edit pages, images, blog posts, and metadata",
        "Clear customer conversion pathways",
        "2-hour strategy session on business goals"
      ]
    },
    {
      id: 'growth',
      name: "Growth",
      priceRange: "$3,500 - $5,500",
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
        "Fully custom responsive design",
        "Conversion-focused user experience",
        "Professional copywriting for key pages",
        "Comprehensive SEO strategy with competitive analysis",
        "Blog integration with content strategy"
      ]
    },
    {
      id: 'market-leader',
      name: "Market Leader",
      priceRange: "$7,500+",
      timeline: "8-12 weeks",
      ideal: "Companies where the website is a core growth engine driving measurable revenue",
      description: "Fully custom digital platform designed to solve specific business challenges and generate measurable competitive advantage. This tier goes beyond website design to create a scalable digital foundation where marketing, customer acquisition, and operations work together to drive revenue.",
      businessOutcomes: [
        "Revenue-focused digital architecture built for measurable growth",
        "Advanced conversion optimization across the full customer journey",
        "Custom integrations connecting your website to core business systems",
        "Scalable platform designed for long-term competitive advantage",
        "Unified digital foundation where marketing and operations drive revenue"
      ],
      technicalIncludes: [
        "Revenue-focused digital architecture built around your business model",
        "Fully custom design and interactive elements",
        "Full content platform with CRM integrations, marketing automation, and multi-user workflows",
        "Advanced SEO with technical implementations",
        "Full-site professional copywriting",
        "Custom integrations with your business systems (CRM, email marketing, operations)"
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
        description: "Custom design for Shopify/WooCommerce stores to match your website, not building a custom platform"
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
      description: 'Careful development with conversion, performance, accessibility, and real-device testing.'
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
  headline: "Tell us what you want to improve",
  description: "Share the basics in about five minutes. We reply within one business day with the clearest next step.",
  
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
    phone: "(504) 326-1676",
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
    description: "Founder-led websites and business systems for New Orleans small businesses. Clear scope, fixed quotes, and practical tools built around your growth goals.",
    keywords: ["professional web design", "custom website development", "small business websites", "conversion optimization", "business growth", "New Orleans web design", "strategic web design", "business growth strategy"]
  }
};

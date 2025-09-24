// data/services.ts - Professional Service Architecture

export interface ServiceTier {
    id: string;
    name: string;
    tagline: string;
    priceRange: string;
    timeline: string;
    idealFor: string;
    description: string;
    businessOutcomes: string[];
    technicalFeatures: string[];
    strategicInclusions: string[];
    deliverables: string[];
    limitations?: string[];
    popular?: boolean;
  }
  
  export const serviceTiers: ServiceTier[] = [
    {
      id: "launch",
      name: "Launch",
      tagline: "Professional foundation for immediate impact",
      priceRange: "$750 - $1,250",
      timeline: "5-7 business days",
      idealFor: "New businesses and focused market entry",
      description: "Strategic website foundation designed to establish immediate professional credibility and drive customer acquisition from day one.",
      
      businessOutcomes: [
        "Immediate professional market presence",
        "Clear customer conversion pathway",
        "Credibility establishment for business growth",
        "Foundation for digital marketing initiatives"
      ],
      
      technicalFeatures: [
        "1-3 strategically architected pages",
        "Mobile-responsive professional design", 
        "Domain setup and business email configuration",
        "Performance optimization (sub-3 second loading)",
        "Basic SEO foundation and meta optimization"
      ],
      
      strategicInclusions: [
        "30-minute business strategy consultation",
        "Competitive positioning analysis",
        "Conversion-focused design decisions",
        "Professional copywriting guidance"
      ],
      
      deliverables: [
        "Fully functional professional website",
        "Domain and hosting configuration", 
        "Business email setup",
        "Basic analytics implementation",
        "Launch checklist and best practices guide"
      ],
      
      limitations: [
        "Template-based foundation (professionally customized)",
        "Limited custom functionality",
        "Standard integrations only"
      ]
    },
    
    {
      id: "elevate", 
      name: "Elevate",
      tagline: "Market differentiation through strategic design",
      priceRange: "$2,000 - $2,500", 
      timeline: "2-3 weeks",
      idealFor: "Established businesses ready for competitive advantage",
      description: "Comprehensive digital presence that positions your business as the clear choice in your market through strategic design and content architecture.",
      popular: true,
      
      businessOutcomes: [
        "Clear market differentiation from competitors",
        "Improved customer acquisition metrics",
        "Enhanced brand perception and authority",
        "Scalable platform for business expansion"
      ],
      
      technicalFeatures: [
        "Custom 4-6 page architecture", 
        "Fully custom responsive design",
        "Content management system integration",
        "Advanced performance optimization",
        "Comprehensive SEO implementation",
        "Google Analytics and conversion tracking"
      ],
      
      strategicInclusions: [
        "Brand refinement and visual identity alignment",
        "Competitive analysis and positioning strategy", 
        "Content strategy and messaging framework",
        "User experience optimization",
        "One round of strategic revisions"
      ],
      
      deliverables: [
        "Fully custom website with CMS",
        "Brand guideline documentation",
        "SEO strategy implementation", 
        "Analytics dashboard setup",
        "Content management training",
        "Performance benchmarking report"
      ]
    },
    
    {
      id: "thrive",
      name: "Thrive", 
      tagline: "Custom solutions for competitive advantage",
      priceRange: "Starting at $5,000",
      timeline: "4-8 weeks",
      idealFor: "Growing businesses with specific technical requirements",
      description: "Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages through advanced functionality.",
      
      businessOutcomes: [
        "Technical competitive advantages in market",
        "Streamlined business operations and efficiency",
        "Platform designed for significant scaling",
        "Advanced customer acquisition and retention systems"
      ],
      
      technicalFeatures: [
        "Fully custom website architecture",
        "Advanced integrations and functionality",
        "Customer portals and booking systems",
        "E-commerce capabilities where applicable",
        "Database integration and management",
        "API integrations and third-party connections"
      ],
      
      strategicInclusions: [
        "Comprehensive business analysis and planning",
        "Custom user experience design",
        "Advanced conversion optimization",
        "Ongoing technical consultation",
        "Strategic roadmap for future development"
      ],
      
      deliverables: [
        "Fully custom web application",
        "Technical documentation and architecture guide",
        "Advanced analytics and reporting systems",
        "Staff training and ongoing support plan", 
        "Performance optimization and monitoring",
        "Strategic growth recommendations"
      ]
    }
  ];
  
  // Professional add-on services
  export interface AddOnService {
    id: string;
    name: string; 
    price: string;
    description: string;
    businessValue: string;
    deliverables: string[];
    timeline: string;
  }
  
  export const addOnServices: AddOnService[] = [
    {
      id: "logo-design",
      name: "Professional Logo Design",
      price: "$300",
      description: "Strategic brand mark development that reinforces your market positioning",
      businessValue: "Consistent brand recognition and professional credibility across all touchpoints",
      deliverables: [
        "3 strategic logo concepts",
        "Final logo in all required formats",
        "Brand guideline documentation", 
        "Usage guidelines and best practices"
      ],
      timeline: "1 week"
    },
    
    {
      id: "blog-integration",
      name: "Content Marketing Foundation",
      price: "$250", 
      description: "Strategic blog integration designed for business growth and SEO advantage",
      businessValue: "Long-term organic traffic growth and thought leadership establishment",
      deliverables: [
        "Blog system integration",
        "Content strategy framework",
        "SEO optimization for posts",
        "Social sharing integration"
      ],
      timeline: "3-5 days"
    },
    
    {
      id: "seo-audit",
      name: "SEO Strategy & Competitive Analysis", 
      price: "$300",
      description: "Comprehensive analysis of search opportunities and competitive positioning",
      businessValue: "Data-driven strategy for organic traffic growth and market visibility",
      deliverables: [
        "Comprehensive SEO audit report",
        "Competitive analysis and opportunities",
        "Keyword strategy recommendations",
        "Implementation roadmap and priorities"
      ],
      timeline: "1 week"
    },
    
    {
      id: "maintenance",
      name: "Professional Maintenance & Updates",
      price: "$150/month",
      description: "Ongoing technical maintenance and strategic optimization",
      businessValue: "Consistent performance, security, and continuous improvement",
      deliverables: [
        "Monthly performance optimization",
        "Security updates and monitoring",
        "Content updates and modifications",
        "Monthly performance reports"
      ],
      timeline: "Ongoing"
    },
    
    {
      id: "consultation", 
      name: "Strategic Business Consultation",
      price: "$100/hour",
      description: "Recorded planning sessions focused on digital strategy and business growth",
      businessValue: "Expert guidance on digital strategy and business optimization decisions",
      deliverables: [
        "Recorded consultation sessions",
        "Strategic recommendations document",
        "Action item prioritization",
        "Follow-up resource recommendations"
      ],
      timeline: "Scheduled as needed"
    }
  ];
  
  // Service comparison matrix
  export const serviceComparison = {
    features: [
      {
        feature: "Professional Design",
        launch: "Template-based (customized)",
        elevate: "Fully custom design",
        thrive: "Advanced custom architecture"
      },
      {
        feature: "Page Count", 
        launch: "1-3 pages",
        elevate: "4-6 pages",
        thrive: "Unlimited strategic pages"
      },
      {
        feature: "Timeline",
        launch: "5-7 business days", 
        elevate: "2-3 weeks",
        thrive: "4-8 weeks"
      },
      {
        feature: "Content Management",
        launch: "Basic updates",
        elevate: "Full CMS integration", 
        thrive: "Advanced CMS + training"
      },
      {
        feature: "SEO Optimization",
        launch: "Basic foundation",
        elevate: "Comprehensive strategy",
        thrive: "Advanced optimization"
      },
      {
        feature: "Analytics & Tracking", 
        launch: "Basic Google Analytics",
        elevate: "Advanced tracking setup",
        thrive: "Custom analytics dashboard"
      },
      {
        feature: "Integrations",
        launch: "Standard only",
        elevate: "Business-focused integrations",
        thrive: "Custom API integrations"
      },
      {
        feature: "Support Level",
        launch: "Launch support + documentation",
        elevate: "Strategic consultation + training", 
        thrive: "Ongoing partnership + consultation"
      }
    ]
  };
  
  // Professional workflow process
  export const clientWorkflow = {
    steps: [
      {
        step: 1,
        name: "Strategic Discovery",
        description: "Comprehensive business analysis and objective alignment",
        duration: "30-60 minutes",
        deliverables: ["Business objective analysis", "Competitive positioning review", "Strategic recommendations"]
      },
      {
        step: 2, 
        name: "Proposal & Agreement",
        description: "Detailed project scope with strategic recommendations and timeline",
        duration: "24-48 hours",
        deliverables: ["Detailed project proposal", "Timeline and milestone schedule", "Service agreement"]
      },
      {
        step: 3,
        name: "Deposit & Project Initiation", 
        description: "Project kickoff with 50% deposit and detailed planning session",
        duration: "Immediate",
        deliverables: ["Project initiation", "Detailed timeline confirmation", "Resource gathering"]
      },
      {
        step: 4,
        name: "Design & Development",
        description: "Strategic design and technical development with regular updates",
        duration: "Per timeline",
        deliverables: ["Progress updates", "Milestone reviews", "Strategic consultations"]
      },
      {
        step: 5,
        name: "Review & Refinement",
        description: "Strategic review and optimization based on business objectives",
        duration: "2-5 business days", 
        deliverables: ["Complete project review", "Strategic recommendations", "Optimization implementation"]
      },
      {
        step: 6,
        name: "Launch & Training", 
        description: "Professional launch with comprehensive training and support",
        duration: "1-2 days",
        deliverables: ["Live website launch", "Training documentation", "Ongoing support setup"]
      },
      {
        step: 7,
        name: "Performance Analysis",
        description: "Initial performance benchmarking and optimization recommendations", 
        duration: "30 days post-launch",
        deliverables: ["Performance analysis report", "Optimization recommendations", "Growth strategy guidance"]
      }
    ]
  };
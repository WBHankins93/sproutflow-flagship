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
      id: "foundation",
      name: "Foundation",
      tagline: "Strategic foundation for validated online presence",
      priceRange: "$1,800 - $2,400",
      timeline: "2-3 weeks",
      idealFor: "New businesses or rebrands needing validated presence",
      description: "Strategic discovery process that ensures your website aligns with business goals. Custom solutions rather than template installations—a foundation for long-term growth, not just online presence.",
      
      businessOutcomes: [
        "Validated professional market presence",
        "Clear customer conversion pathway aligned with business goals",
        "Foundation for digital marketing initiatives",
        "Strategic architecture that scales with growth"
      ],
      
      technicalFeatures: [
        "5-10 pages with strategic architecture",
        "Semi-custom design (not pure templates)",
        "Mobile optimization and performance tuning",
        "SEO foundation with keyword research",
        "CMS training and documentation"
      ],
      
      strategicInclusions: [
        "2-hour strategy session on business goals",
        "Competitive positioning analysis",
        "Conversion-focused design decisions",
        "Basic content guidance (not full copywriting)"
      ],
      
      deliverables: [
        "Fully functional professional website",
        "Domain and hosting configuration", 
        "Business email setup",
        "Basic analytics implementation",
        "Launch checklist and best practices guide",
        "CMS training documentation"
      ],
      
      limitations: [
        "Semi-custom foundation (professionally customized)",
        "Basic content guidance rather than full copywriting",
        "Standard integrations only"
      ]
    },
    
    {
      id: "growth", 
      name: "Growth",
      tagline: "Competitive differentiation for market share",
      priceRange: "$3,800 - $5,500", 
      timeline: "4-6 weeks",
      idealFor: "Established businesses ready to compete for market share",
      description: "Comprehensive digital presence that positions your business as the clear choice in your market. Custom design reflecting brand personality with conversion optimization and professional copywriting.",
      popular: true,
      
      businessOutcomes: [
        "Clear market differentiation from competitors",
        "Improved customer acquisition metrics",
        "Enhanced brand perception and authority",
        "Scalable platform for business expansion",
        "Tracked revenue growth from digital presence"
      ],
      
      technicalFeatures: [
        "10-20 pages with conversion optimization", 
        "Fully custom responsive design",
        "Content management system integration",
        "Advanced performance optimization",
        "Comprehensive SEO strategy with competitive analysis",
        "Analytics and conversion tracking setup",
        "Blog integration with content strategy"
      ],
      
      strategicInclusions: [
        "Brand refinement and visual identity alignment",
        "Competitive analysis and positioning strategy", 
        "Customer acquisition strategy consultation",
        "Professional copywriting for key pages (5-8 pages)",
        "User experience optimization",
        "One round of strategic revisions"
      ],
      
      deliverables: [
        "Fully custom website with CMS",
        "Brand guideline documentation",
        "SEO strategy implementation", 
        "Analytics dashboard setup",
        "Content management training",
        "Performance benchmarking report",
        "Professional copywriting for key pages"
      ]
    },
    
    {
      id: "market-leader",
      name: "Market Leader", 
      tagline: "Revenue-driving digital presence",
      priceRange: "$8,000 - $18,000",
      timeline: "8-12 weeks",
      idealFor: "Businesses where digital presence drives significant revenue",
      description: "Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages. Deep strategic planning with advanced functionality for businesses where digital presence is a primary revenue driver.",
      
      businessOutcomes: [
        "Technical competitive advantages in market",
        "Streamlined business operations and efficiency",
        "Platform designed for significant scaling",
        "Advanced customer acquisition and retention systems",
        "Measurable ROI from digital investment"
      ],
      
      technicalFeatures: [
        "20-50+ pages with advanced functionality",
        "Fully custom design and interactive elements",
        "Advanced SEO with technical implementations",
        "Custom integrations (CRM, email marketing, etc.)",
        "Customer portals and booking systems",
        "E-commerce capabilities where applicable",
        "Database integration and management",
        "API integrations and third-party connections"
      ],
      
      strategicInclusions: [
        "Deep strategic planning with competitive research",
        "Comprehensive business analysis and planning",
        "Custom user experience design",
        "Advanced conversion optimization",
        "Full-site professional copywriting",
        "Content strategy and quarterly planning",
        "Ongoing technical consultation",
        "Strategic roadmap for future development"
      ],
      
      deliverables: [
        "Fully custom web application",
        "Technical documentation and architecture guide",
        "Advanced analytics and reporting systems",
        "Staff training and ongoing support plan", 
        "Performance optimization and monitoring",
        "Strategic growth recommendations",
        "Priority support and dedicated account management",
        "Full-site professional copywriting"
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
      id: "maintenance-basic",
      name: "Website Care - Basic",
      price: "$200/month",
      description: "True agency-managed hosting with proactive security and basic support",
      businessValue: "Consistent performance, security, and peace of mind with faster response times",
      deliverables: [
        "Monthly performance optimization",
        "Security updates and monitoring",
        "Content updates and modifications (up to 2 hours/month)",
        "Monthly performance reports",
        "Priority support with faster response times"
      ],
      timeline: "Ongoing"
    },
    {
      id: "maintenance-professional",
      name: "Website Care - Professional",
      price: "$300/month",
      description: "Comprehensive maintenance with monthly optimization and enhanced support",
      businessValue: "Proactive optimization and strategic improvements with dedicated support",
      deliverables: [
        "Monthly performance optimization and monitoring",
        "Security updates and monitoring",
        "Content updates and modifications (up to 4 hours/month)",
        "Monthly optimization recommendations",
        "Priority support with faster response times",
        "Quarterly strategic review"
      ],
      timeline: "Ongoing"
    },
    {
      id: "maintenance-comprehensive",
      name: "Website Care - Comprehensive",
      price: "$450/month",
      description: "Full-service partnership with ongoing optimization and strategic guidance",
      businessValue: "Continuous improvement and strategic growth support with maximum priority",
      deliverables: [
        "Monthly performance optimization and monitoring",
        "Security updates and monitoring",
        "Content updates and modifications (up to 6 hours/month)",
        "Monthly optimization and strategic recommendations",
        "Priority support with fastest response times",
        "Quarterly strategic review and planning",
        "Ongoing conversion optimization"
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
    },
    
    {
      id: "database-image-hosting",
      name: "Database Provisioning & Image Hosting",
      price: "Starting at $50/month",
      description: "Dedicated database and optimized image hosting solution for sites with extensive media libraries and image requirements",
      businessValue: "Transparent, scalable hosting costs for image-heavy sites with fast load times and reliable storage",
      deliverables: [
        "Dedicated database provisioning",
        "Optimized image hosting and CDN",
        "Image optimization and compression",
        "Storage monitoring and reporting",
        "Scalable pricing based on usage"
      ],
      timeline: "Ongoing service"
    },
    {
      id: "professional-photography",
      name: "Professional Photography",
      price: "$800 - $2,000",
      description: "High-quality photography that captures your brand and products professionally",
      businessValue: "Professional imagery that elevates brand perception and conversion rates",
      deliverables: [
        "Professional photo shoot (on-location or studio)",
        "Edited high-resolution images",
        "Images optimized for web use",
        "Usage rights and licensing"
      ],
      timeline: "1-2 weeks"
    },
    {
      id: "ecommerce-integration",
      name: "E-commerce Store Design & Integration",
      price: "$1,500 - $3,500",
      description: "Custom design and integration for Shopify, WooCommerce, or other e-commerce platforms. This is NOT building a custom e-commerce platform from scratch—we design and customize your existing platform to seamlessly match your custom website brand. Perfect for businesses who want Shopify's proven infrastructure but need it to look and feel like part of their custom website.",
      businessValue: "Seamless brand experience between your custom website and e-commerce store. Your customers never feel like they've left your site when shopping—it all feels like one cohesive brand experience.",
      deliverables: [
        "Custom Shopify/WooCommerce theme design matching your brand",
        "Seamless integration between custom website and store",
        "Payment processing and checkout flow configuration",
        "Product catalog design and layout optimization",
        "Cross-platform navigation and user experience",
        "Mobile-optimized shopping experience"
      ],
      timeline: "2-4 weeks"
    },
    {
      id: "custom-app-development",
      name: "Custom Application Development",
      price: "$3,000 - $15,000",
      description: "Custom web applications and functionality tailored to specific business needs",
      businessValue: "Custom solutions that solve unique business challenges and create competitive advantages",
      deliverables: [
        "Custom application development",
        "Technical documentation",
        "User training and support",
        "Ongoing maintenance plan"
      ],
      timeline: "6-12 weeks"
    },
    {
      id: "ongoing-seo-services",
      name: "Ongoing SEO Strategy & Optimization",
      price: "$800 - $2,000/month",
      description: "Strategic SEO services separate from maintenance. While maintenance handles technical updates and security, SEO services focus on search strategy: keyword research, content optimization recommendations, competitive analysis, and search performance tracking. Best for businesses where organic search is a primary customer acquisition channel.",
      businessValue: "Sustained organic traffic growth and improved search rankings through strategic optimization",
      deliverables: [
        "Monthly SEO audits and strategic recommendations",
        "Keyword research and content strategy",
        "On-page optimization recommendations",
        "Search performance tracking and reporting",
        "Competitive analysis and opportunity identification",
        "Note: Implementation of recommendations may be included in maintenance plan or billed separately"
      ],
      timeline: "Ongoing"
    }
  ];
  
  // Service comparison matrix
  export const serviceComparison = {
    features: [
      {
        feature: "Professional Design",
        foundation: "Semi-custom (professionally customized)",
        growth: "Fully custom design",
        marketLeader: "Advanced custom architecture"
      },
      {
        feature: "Page Count", 
        foundation: "5-10 pages",
        growth: "10-20 pages",
        marketLeader: "20-50+ pages"
      },
      {
        feature: "Timeline",
        foundation: "2-3 weeks", 
        growth: "4-6 weeks",
        marketLeader: "8-12 weeks"
      },
      {
        feature: "Content Management",
        foundation: "Basic CMS + training (headless CMS like Sanity or Contentful for easy content updates)",
        growth: "Full CMS integration + training (headless CMS for pages, blog, and content management)", 
        marketLeader: "Advanced CMS + dedicated support (headless CMS with custom content types and workflows)"
      },
      {
        feature: "SEO Optimization",
        foundation: "SEO foundation with keyword research",
        growth: "Comprehensive SEO with competitive analysis",
        marketLeader: "Advanced SEO with technical implementations"
      },
      {
        feature: "Copywriting", 
        foundation: "Basic content guidance",
        growth: "Professional copywriting (5-8 pages)",
        marketLeader: "Full-site professional copywriting"
      },
      {
        feature: "Analytics & Tracking", 
        foundation: "Basic analytics implementation",
        growth: "Advanced tracking setup",
        marketLeader: "Custom analytics dashboard"
      },
      {
        feature: "Integrations",
        foundation: "Standard only",
        growth: "Business-focused integrations",
        marketLeader: "Custom API integrations"
      },
      {
        feature: "Support Level",
        foundation: "Launch support + documentation",
        growth: "Strategic consultation + training", 
        marketLeader: "Priority support + dedicated account management"
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
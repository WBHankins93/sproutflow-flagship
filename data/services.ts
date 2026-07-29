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
      tagline: "A credible site without a long sales process",
      priceRange: "$500 fixed + Care",
      timeline: "5-7 business days",
      idealFor: "For a solo owner who needs a simple, credible place to be found online",
      description: "A productized three-page website using a proven template foundation and content supplied by the client.",
      businessOutcomes: ["Create a credible online presence", "Give customers a clear way to make contact"],
      technicalFeatures: ["Up to three pages", "Google Business Profile setup", "Mobile, performance, contact form, and basic SEO"],
      strategicInclusions: ["Published intake instead of a discovery call", "One revision round"],
      deliverables: ["Live website", "Google Business Profile setup", "Launch handoff"],
      limitations: ["Client-supplied content", "Template foundation", "Care plan required for 12 months"]
    },
    {
      id: "core",
      name: "Core",
      tagline: "A focused website built to win more of the right work",
      priceRange: "Starting at $2,000",
      timeline: "2-4 weeks",
      idealFor: "For an established small business that needs a stronger website and a clear lead path",
      description: "Semi-custom design, content management, SEO foundations, and conversion tracking.",
      popular: true,
      businessOutcomes: ["Make the business easier to understand and trust", "Turn more visits into qualified inquiries"],
      technicalFeatures: ["Semi-custom responsive design", "Content management system", "SEO foundation and conversion tracking"],
      strategicInclusions: ["Positioning and page planning", "Content guidance", "Conversion path design"],
      deliverables: ["Live website", "CMS training", "Analytics and launch handoff"]
    },
    {
      id: "custom",
      name: "Custom",
      tagline: "Original design and deeper functionality without a preset ceiling",
      priceRange: "Starting at $4,500",
      timeline: "4-8+ weeks",
      idealFor: "For a business that needs custom copy, original interaction, catalogs, or integrations",
      description: "Fully custom design and copy with application features, integrations, and motion as the scope requires.",
      businessOutcomes: ["Stand apart in a crowded market", "Support a more complex buyer journey or operating model"],
      technicalFeatures: ["Fully custom responsive design", "Catalogs and application features", "Integrations and custom workflows"],
      strategicInclusions: ["Positioning and content strategy", "Custom copy", "Original interaction direction"],
      deliverables: ["Custom production website", "Documentation and training", "Analytics and launch support"]
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
      description: "Custom design and integration for Shopify, WooCommerce, or other e-commerce platforms. This is NOT building a custom e-commerce platform from scratch. We design and customize your existing platform to seamlessly match your custom website brand. Perfect for businesses who want Shopify's proven infrastructure but need it to look and feel like part of their custom website.",
      businessValue: "Seamless brand experience between your custom website and e-commerce store. Your customers never feel like they've left your site when shopping. It all feels like one cohesive brand experience.",
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
        feature: "Typical Scope (internal scoping reference only)",
        foundation: "5-10 pages",
        growth: "10-20 pages",
        marketLeader: "20+ pages, scales with business needs"
      },
      {
        feature: "Timeline",
        foundation: "2-3 weeks", 
        growth: "4-6 weeks",
        marketLeader: "8-12 weeks"
      },
      {
        feature: "Content Management",
        foundation: "Basic CMS: edit pages, images, blog posts, and metadata",
        growth: "Structured CMS with scalable content architecture and SEO controls",
        marketLeader: "Full content platform: advanced content models, CRM integrations, marketing automation, multi-user workflows"
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

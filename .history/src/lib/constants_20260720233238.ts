import { Leaf, TrendingDown, Globe, Users, Zap, Droplets, Sprout, RefreshCw } from "lucide-react";

export const sCIRCULAR_BENEFITS = [
  {
    icon: Leaf,
    title: "Elimination of Synthetic Inputs",
    desc: "On-farm production of organic fertilizer and livestock feed removes dependence on synthetic agrochemicals, improving food safety, soil biology, and long-term production economics.",
  },
  {
    icon: TrendingDown,
    title: "Reduced Production Costs",
    desc: "Closed-loop resource utilization significantly lowers expenditure on external inputs, strengthening the farm's financial resilience against commodity price volatility and supply chain disruptions.",
  },
  {
    icon: Sprout,
    title: "Improved Soil Fertility and Crop Yields",
    desc: "Continuous application of organic matter and bioslurry progressively improves soil structure, microbial activity, and nutrient availability — resulting in higher and more consistent crop yields season after season.",
  },
  {
    icon: Zap,
    title: "On-Farm Renewable Energy Generation",
    desc: "Biogas recovered through anaerobic digestion of livestock manure provides clean energy for cooking, heating, and farm operations — reducing fossil fuel dependency and lowering the farm's carbon footprint.",
  },
  {
    icon: Droplets,
    title: "Sustainable Water Resource Management",
    desc: "Treated effluent from biogas digesters and processing operations is reclaimed for field irrigation and farm sanitation, reducing freshwater abstraction and minimizing discharge into local water bodies.",
  },
  {
    icon: Globe,
    title: "Environmental Regeneration",
    desc: "Circular agriculture eliminates chemical runoff, prevents organic waste accumulation, and actively restores soil health — ensuring the farm contributes positively to the surrounding ecosystem rather than degrading it.",
  },
  {
    icon: Users,
    title: "Replicable Model for Smallholder Farmers",
    desc: "The Ingaju system has been adapted and transferred to over 300 farmers across Rwanda. The principles are scalable, low-cost, and applicable to smallholder operations of any size.",
  },
  {
    icon: RefreshCw,
    title: "Complete Nutrient and Resource Recovery",
    desc: "Every by-product — manure, crop residues, processing effluent, and biogas digestate — is captured, processed, and reintegrated into the production system. No resource leaves the loop unutilized.",
  },
];

export const PARTNERS = [
  { name: "Agrivet", logo: "/images/partners/agrivet.png" },
  { name: "AIF", logo: "/images/partners/aif.png" },
  { name: "BK Insurance", logo: "/images/partners/bk-insurance.png" },
  { name: "Ingabo", logo: "/images/partners/ingabo.png" },
  { name: "Inyanje", logo: "/images/partners/inyanje.png" },
  { name: "KAFCO", logo: "/images/partners/kafco.png" },
  { name: "Nyagatare Cooperative", logo: "/images/partners/nyagatare-cooporative.png" },
  { name: "RAB", logo: "/images/partners/rab.png" },
  { name: "Sonarwa", logo: "/images/partners/sonarwa.png" },
  { name: "Western Seed", logo: "/images/partners/western-seed.png" },
];

export const CATEGORIES = [
  {
    key: "dairy",
    title: "Dairy & Livestock",
    description: "Premium milk and breeding livestock raised under strict welfare, nutrition, and hormone free protocols.",
    ctaLabel: "Explore Dairy",
    ctaHref: "/products/dairy",
    image: "/images/hero/bg-img.png",
    alt: "Dairy cattle grazing on the Ingaju farm",
  },
  {
    key: "crops",
    title: "Crop Production",
    description: "Premium maize, legumes, and macadamia nuts cultivated using climate-smart, organic agronomic practices.",
    ctaLabel: "Explore Crops",
    ctaHref: "/products/crops",
    image: "/images/crops/crop-production.png",
    alt: "Rows of maize growing in the field",
  },
  {
    key: "organic-manure",
    title: "Organic Fertilizer",
    description: "Nutrient-rich, pathogen-reduced organic fertilizer processed from livestock manure to maximize soil fertility.",
    ctaLabel: "Order Now",
    ctaHref: "/contact",
    image: "/images/dairy/organic-manure.png",
    alt: "Organic fertilizer produced at Ingaju Farms",
  },
  {
    key: "trainings",
    title: "Farmer Training",
    description: "Practical on-farm capacity building in circular agriculture for smallholders, cooperatives, and agribusiness professionals.",
    ctaLabel: "Explore Trainings",
    ctaHref: "/trainings",
    image: "/images/farm/training-1.png",
    alt: "Farmers attending a practical training session at Ingaju Farms",
  },
];

export const IMPACT_STATS = [
  { key: "jobs", value: 50, label: "Jobs Created" },
  { key: "farmers", value: 300, label: "Farmers Trained" },
  { key: "products", value: 10, label: "Organic Products Produced" },
  { key: "partnerships", value: 12, label: "Local Partnerships" },
];

export const TRAININGS = [
  {
    key: "dairy",
    title: "Dairy Production & Herd Management",
    description: "Hands-on training in dairy herd management, animal nutrition, hygienic milking procedures, milk quality assurance, and preventive animal health protocols.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/dairy-farming",
    image: "/images/hero/bg-img.png",
    alt: "Farmer working with dairy cattle at Ingaju Farms",
  },
  {
    key: "organic",
    title: "Organic Crop Production",
    description: "Practical instruction in organic soil fertility management, composting, integrated pest and disease control, and sustainable agronomic practices for food and feed crop production.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/organic-farming",
    image: "/images/hero/bg-2.png",
    alt: "Farmer demonstrating organic farming techniques",
  },
  {
    key: "circular",
    title: "Integrated Circular Agriculture",
    description: "Comprehensive training in circular farming systems — covering manure management, biogas production, organic fertilizer processing, crop-livestock integration, and nutrient recycling.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/circular-agriculture",
    image: "/images/hero/bg-3.png",
    alt: "Group training session on circular agriculture at Ingaju Farms",
  },
];

export const BLOG_POSTS = [
  {
    slug: "circular-agriculture-small-scale-farms",
    category: "Circular Farming",
    title: "How Circular Agriculture Is Transforming Small-Scale Farms",
    excerpt: "Discover how integrating livestock, crop production, and waste recycling creates a self-sustaining farming system that benefits both farmers and the environment.",
    date: "June 12, 2025",
    readTime: "6 min read",
    image: "/images/blog-circular-farming.png",
    alt: "Farmer working on a circular agriculture farm",
    content: [
      {
        type: "paragraph" as const,
        text: "Circular agriculture is a farming approach where outputs from one part of the system become inputs for another — creating a closed loop that minimizes waste and maximizes resource efficiency. For small-scale farms across Africa, this model is proving to be both economically viable and environmentally responsible.",
      },
      {
        type: "heading" as const,
        text: "What Is Circular Agriculture?",
      },
      {
        type: "paragraph" as const,
        text: "At its core, circular agriculture means nothing goes to waste. Livestock manure becomes compost for crop fields. Crop residues become animal feed. Water is recycled and reused. Every element of the farm contributes to the productivity of every other element.",
      },
      {
        type: "paragraph" as const,
        text: "At Ingaju Farms, we have built our entire operation around this principle. Our dairy cattle produce manure that fertilizes our corn and bean fields. The crop residues feed back to the livestock. The result is a farm that produces more while spending less on external inputs.",
      },
      {
        type: "heading" as const,
        text: "Why It Works for Small-Scale Farmers",
      },
      {
        type: "paragraph" as const,
        text: "Small-scale farmers often operate with tight margins and limited access to expensive fertilizers or veterinary inputs. Circular agriculture reduces dependency on external inputs, which directly lowers operating costs. Farmers who have adopted integrated systems report up to 40% reductions in input costs within the first two seasons.",
      },
      {
        type: "list" as const,
        items: [
          "Lower fertilizer costs through organic manure recycling",
          "Reduced feed costs by utilizing crop by-products",
          "Improved soil health leading to higher crop yields",
          "Diversified income streams from multiple farm outputs",
          "Greater resilience to market price fluctuations",
        ],
      },
      {
        type: "heading" as const,
        text: "The Role of Training in Adoption",
      },
      {
        type: "paragraph" as const,
        text: "Knowledge transfer is the single most important factor in whether a farmer successfully transitions to circular methods. Without understanding why the system works, farmers may abandon practices when they encounter early challenges. This is why Ingaju Farms invests heavily in hands-on training programs that take farmers through the entire cycle, not just individual components.",
      },
      {
        type: "paragraph" as const,
        text: "Our training programs have reached over 300 farmers across the region, equipping them with practical skills in manure management, integrated pest control, water harvesting, and crop-livestock integration. The results speak for themselves — trained farmers consistently outperform untrained peers in both yield and profitability.",
      },
      {
        type: "heading" as const,
        text: "Getting Started with Circular Agriculture",
      },
      {
        type: "paragraph" as const,
        text: "You do not need to transform your entire farm overnight. Start with one connection — perhaps composting manure from your livestock and applying it to one crop field. Observe the results over one season. Then add another loop. Gradual integration is more sustainable than wholesale change and allows you to build confidence and knowledge at each step.",
      },
      {
        type: "paragraph" as const,
        text: "Ingaju Farms offers farm visits and training workshops for farmers interested in learning more. Whether you are a smallholder with a few animals or managing a larger operation, our team can help you identify the right entry point for circular practices on your farm.",
      },
    ],
  },
  {
    slug: "improve-milk-quality-organic-dairy",
    category: "Dairy Farming",
    title: "5 Practices That Improve Milk Quality on Organic Dairy Farms",
    excerpt: "From feed management to hygiene protocols, these practices help dairy farmers consistently produce clean, high-quality milk.",
    date: "May 28, 2025",
    readTime: "5 min read",
    image: "/images/blog-dairy-quality.png",
    alt: "Dairy cattle in a clean farm environment",
    content: [
      {
        type: "paragraph" as const,
        text: "Milk quality is the foundation of a successful dairy operation. Whether you are selling directly to consumers, supplying a processor, or producing for your own household, high-quality milk commands better prices and builds the kind of trust that sustains long-term business relationships.",
      },
      {
        type: "heading" as const,
        text: "1. Feed Quality Directly Determines Milk Quality",
      },
      {
        type: "paragraph" as const,
        text: "The single greatest influence on milk composition and taste is what your cattle eat. Cattle grazing on diverse, well-managed pastures produce milk with superior fat content, richer flavor, and better nutritional profile than those fed solely on dry rations. At Ingaju Farms, we supplement pasture grazing with balanced dry feed formulated to support both milk production and animal health.",
      },
      {
        type: "heading" as const,
        text: "2. Milking Hygiene Is Non-Negotiable",
      },
      {
        type: "paragraph" as const,
        text: "Contamination at the point of milking is the most common cause of milk quality failures. Clean hands, sanitized equipment, and a clean milking environment are the baseline. At Ingaju, milking equipment is cleaned and sanitized before and after every session, and each animal's udder is cleaned and pre-dipped before milking begins.",
      },
      {
        type: "heading" as const,
        text: "3. Animal Health Monitoring",
      },
      {
        type: "paragraph" as const,
        text: "Subclinical mastitis — an udder infection with no visible symptoms — is one of the leading causes of reduced milk quality and yield on dairy farms. Regular somatic cell count testing and daily observation of milk appearance help catch problems early before they affect the entire herd.",
      },
      {
        type: "heading" as const,
        text: "4. Proper Milk Cooling and Storage",
      },
      {
        type: "paragraph" as const,
        text: "Milk begins to deteriorate rapidly at temperatures above 10°C. Cooling milk to below 4°C within two hours of milking significantly extends shelf life and preserves quality. For farms without refrigeration, selling or processing milk immediately after milking is essential.",
      },
      {
        type: "heading" as const,
        text: "5. Consistent Milking Schedules",
      },
      {
        type: "paragraph" as const,
        text: "Dairy cattle are creatures of habit. Irregular milking schedules cause stress, which elevates cortisol levels and directly suppresses milk let-down. Milking at the same times each day — typically morning and evening — keeps animals calm, productive, and healthy. Farms that maintain consistent schedules report both higher volumes and better quality scores.",
      },
      {
        type: "paragraph" as const,
        text: "Implementing these five practices requires discipline and attention to detail, but the returns are significant. Farms that invest in quality consistently earn higher prices per litre, build loyal customer relationships, and face fewer rejections from processors. If you would like to learn more about dairy management practices, Ingaju Farms offers hands-on training programs tailored to local conditions.",
      },
    ],
  },
  {
    slug: "farm-training-sustainable-agriculture",
    category: "Training & Education",
    title: "Why Farm Training Programs Are Key to Sustainable Agriculture",
    excerpt: "Hands-on training equips farmers with the knowledge and skills to adopt sustainable methods that increase yields and protect natural resources.",
    date: "May 10, 2025",
    readTime: "4 min read",
    image: "/images/farm/students.png",
    alt: "Group of farmers attending a training session",
    content: [
      {
        type: "paragraph" as const,
        text: "The gap between what farmers know and what they need to know to farm sustainably is one of the most significant barriers to agricultural transformation in Africa. Technology exists. Better seed varieties exist. Improved practices are documented. Yet adoption remains low because knowledge is not reaching farmers in formats they can access and apply.",
      },
      {
        type: "heading" as const,
        text: "The Knowledge Gap in African Agriculture",
      },
      {
        type: "paragraph" as const,
        text: "Most smallholder farmers in sub-Saharan Africa learned to farm from their parents, using methods passed down across generations. These traditional practices have value, but they were developed for different climate conditions, different market realities, and different input environments than what farmers face today. Bridging this gap requires structured, practical, and accessible training.",
      },
      {
        type: "heading" as const,
        text: "What Effective Farm Training Looks Like",
      },
      {
        type: "paragraph" as const,
        text: "The most effective training programs share several characteristics. They are delivered on actual farms — not in classrooms. They use demonstration plots where farmers can see results with their own eyes. They involve farmers in the learning process rather than treating them as passive recipients. And they provide follow-up support so that knowledge translates into lasting behavior change.",
      },
      {
        type: "list" as const,
        items: [
          "On-farm demonstrations with measurable outcomes",
          "Peer learning groups that sustain knowledge sharing",
          "Follow-up visits and ongoing mentorship",
          "Practical skills over theoretical knowledge",
          "Training in local languages and cultural context",
        ],
      },
      {
        type: "heading" as const,
        text: "Ingaju Farms' Approach to Training",
      },
      {
        type: "paragraph" as const,
        text: "At Ingaju Farms, our training programs are built around real farm operations, not hypothetical scenarios. Participants work alongside our team on active farm tasks — managing livestock, composting manure, preparing soil, and harvesting crops. This hands-on approach ensures that skills are genuinely transferred, not just described.",
      },
      {
        type: "paragraph" as const,
        text: "We offer training in dairy farming, organic crop production, and circular agriculture systems. Programs are available for individuals, farmer groups, schools, and corporate teams interested in understanding sustainable food systems. To date, we have trained over 300 farmers, and we track their progress to ensure the knowledge continues to produce results in the field.",
      },
      {
        type: "heading" as const,
        text: "The Multiplier Effect of Training",
      },
      {
        type: "paragraph" as const,
        text: "When one farmer learns a better practice and achieves better results, their neighbors notice. They ask questions. They visit the farm. Knowledge spreads through social networks in ways that no extension program can replicate through top-down delivery alone. This is why investing in training is not just about the individual farmer — it is about creating the conditions for community-wide transformation.",
      },
    ],
  },
  {
    slug: "biogas-from-cow-manure-farm-energy",
    category: "Energy Recovery",
    title: "How Biogas from Cow Manure Powers a Circular Farm",
    excerpt: "Discover how anaerobic digesters convert livestock waste into clean biogas energy, reducing farm costs and carbon emissions in one closed loop.",
    date: "April 22, 2025",
    readTime: "5 min read",
    image: "/images/blog-biogas.png",
    alt: "Biogas energy recovery system on a farm",
    content: [
      {
        type: "paragraph" as const,
        text: "One of the most underutilised resources on any livestock farm is the manure produced daily by the animals. At Ingaju Farms, we treat manure not as waste but as a primary energy feedstock. Through anaerobic digestion, organic waste is broken down by microorganisms in the absence of oxygen, releasing biogas — a mixture of methane and carbon dioxide that can be used directly as a clean fuel source.",
      },
      {
        type: "heading" as const,
        text: "What Is Anaerobic Digestion?",
      },
      {
        type: "paragraph" as const,
        text: "Anaerobic digestion is a biological process that occurs naturally when organic matter decomposes without oxygen. On a farm, this process is managed inside a sealed digester tank where manure, crop residues, and other organic inputs are fed continuously. The biogas produced rises to the top of the tank and is captured through pipes for use across the farm.",
      },
      {
        type: "heading" as const,
        text: "How We Use Biogas at Ingaju",
      },
      {
        type: "list" as const,
        items: [
          "Cooking and heating in farm facilities",
          "Electricity generation for lighting and equipment",
          "Powering milk processing operations",
          "Reducing reliance on firewood and charcoal",
        ],
      },
      {
        type: "paragraph" as const,
        text: "The digestate — the solid and liquid material remaining after digestion — is not discarded. It is processed into high-quality organic fertilizer that goes directly to our crop fields, completing the resource loop between livestock, energy, and crop production.",
      },
      {
        type: "heading" as const,
        text: "The Financial and Environmental Case",
      },
      {
        type: "paragraph" as const,
        text: "For a farm producing significant quantities of manure daily, the energy savings from biogas are substantial. Farms that have installed digesters report reductions in energy costs of 40 to 60 percent within the first year of operation. Beyond cost savings, eliminating open manure decomposition reduces methane emissions — one of the most potent greenhouse gases — from escaping into the atmosphere unmanaged.",
      },
    ],
  },
];


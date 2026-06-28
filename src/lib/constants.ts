import { Leaf, TrendingDown, Globe, Users, Zap, Droplets, Sprout, RefreshCw } from "lucide-react";

export const CIRCULAR_BENEFITS = [
  {
    icon: Leaf,
    title: "Zero Synthetic Inputs",
    desc: "By producing our own fertilizer and feed on-site, we have eliminated reliance on chemical inputs entirely — safer food, healthier soil, and lower costs.",
  },
  {
    icon: TrendingDown,
    title: "Lower Operating Costs",
    desc: "A closed-loop system dramatically reduces what we spend on external supplies, making the farm more resilient to market fluctuations and price shocks.",
  },
  {
    icon: Sprout,
    title: "Healthier Soil, Better Yields",
    desc: "Returning organic matter and nutrients to the land continuously improves soil structure and fertility — leading to higher crop yields and better feed quality each season.",
  },
  {
    icon: Zap,
    title: "Renewable Energy On-Site",
    desc: "Biogas captured from organic waste powers cooking, heating, and electricity generation on the farm — reducing energy costs and cutting carbon emissions.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    desc: "Treated wastewater is reclaimed for irrigation and farm cleaning, conserving fresh water sources and reducing the farm's impact on local water systems.",
  },
  {
    icon: Globe,
    title: "Minimal Environmental Impact",
    desc: "No chemical runoff, no wasted organic matter, no soil depletion. Circular farming actively regenerates the land it operates on rather than extracting from it.",
  },
  {
    icon: Users,
    title: "A Model Others Can Learn",
    desc: "We have trained 300+ farmers using this system. What works at Ingaju can work across Rwanda — and beyond. Knowledge is part of the loop.",
  },
  {
    icon: RefreshCw,
    title: "Full Resource Recovery",
    desc: "Every output — manure, crop residue, wastewater, biogas — is captured and fed back into the system. Nothing is discarded. Everything has a next purpose.",
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
    description: "Fresh milk, organic manure, and quality breeding livestock produced through responsible farm management and circular farming practices.",
    ctaLabel: "Explore Dairy",
    ctaHref: "/categories/dairy-livestock",
    image: "/images/hero/bg-img.png",
    alt: "Dairy cattle grazing on the Ngaju farm",
  },
  {
    key: "crops",
    title: "Crop Production",
    description: "Naturally grown corn, beans & soybeans, and nuts cultivated using sustainable farming methods that support healthy soil and quality harvests.",
    ctaLabel: "Explore Crops",
    ctaHref: "/categories/crop-production",
    image: "/images/crops/crop-production.png",
    alt: "Rows of corn growing in the field",
  },
  {
    key: "Learn Order Now",
    title: "Organic Manure",
    description: "Strong and well-managed livestock raised to support productivity and genetic improvement for farmers and livestock enterprises.",
    ctaLabel: "Order Now",
    ctaHref: "/marketplace",
    image: "/images/dairy/organic-manure.png",
    alt: "Organic Manure",
  },
  {
    key: "trainings",
    title: "Ingaju Trainings",
    description: "Strong and well-managed livestock raised to support productivity and genetic improvement for farmers and livestock enterprises.",
    ctaLabel: "Explore Trainings",
    ctaHref: "/trainings",
    image: "/images/farm/training-1.png",
    alt: "Group of farmers gathered for a community training session",
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
    title: "Dairy Farming Training",
    description: "Practical skills in livestock management and milk production.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/dairy-farming",
    image: "/images/hero/bg-img.png",
    alt: "Farmer working with dairy cattle",
  },
  {
    key: "organic",
    title: "Organic Farming Training",
    description: "Sustainable farming techniques for healthier production systems.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/organic-farming",
    image: "/images/hero/bg-2.png",
    alt: "Farmer demonstrating organic farming techniques to a group",
  },
  {
    key: "circular",
    title: "Circular Agriculture Training",
    description: "Hands-on methods for turning farm waste into fertilizer and feed.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/circular-agriculture",
    image: "/images/hero/bg-3.png",
    alt: "Group training session on circular agriculture practices",
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


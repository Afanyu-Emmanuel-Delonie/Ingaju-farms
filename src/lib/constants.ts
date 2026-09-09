import { Leaf, TrendingDown, Globe, Users, Zap, Droplets, Sprout, RefreshCw } from "lucide-react";

export const CIRCULAR_STAGES = [
  {
    number: "01",
    title: "Organic Fertilizer",
    body: "Manure from the herd is composted into organic fertilizer, returning nutrients to the soil that grows our feed crops.",
    bullets: [
      "Manure composted daily into nutrient-rich organic fertilizer",
      "Reduces reliance on synthetic agrochemicals",
      "Nutrients returned to the soil that grows our feed crops",
    ],
    imgSrc: "/images/dairy/organic-manure.webp",
    imgAlt: "Organic fertilizer processing at Ingaju Farms",
  },
  {
    number: "02",
    title: "Animal Feed",
    body: "Feed crops grown on fertilizer-enriched soil are milled and prepared for the herd, keeping nutrition consistent year-round.",
    bullets: [
      "Feed crops grown on fertilizer-enriched soil",
      "Feed milled and prepared on-site to match herd nutritional needs",
      "Consistent feed quality supports steady milk yield",
    ],
    imgSrc: "/images/dairy/feed-production.webp",
    imgAlt: "Animal feed production at Ingaju Farms",
  },
  {
    number: "03",
    title: "Milk Production",
    body: "Well-fed cattle are milked daily with modern equipment, producing quality milk and the manure that restarts the cycle.",
    bullets: [
      "Pasture-fed herd managed under strict welfare and nutrition standards",
      "Modern milking equipment maintains hygiene and consistent yield",
      "Manure collected daily, closing the loop back into organic fertilizer",
    ],
    imgSrc: "/images/dairy/dairy-production.webp",
    imgAlt: "Milk production at Ingaju Farms",
  },
];

export const CIRCULAR_BENEFITS = [
  {
    icon: Leaf,
    title: "Low Synthetic Input Use",
    desc: "On-farm organic fertilizer and livestock feed are reducing our dependence on synthetic agrochemicals, supporting food safety, soil health, and long-term production economics.",
    stat: "Ongoing",
    statLabel: "Reducing Chemical Use",
  },
  {
    icon: TrendingDown,
    title: "Lower Production Costs",
    desc: "Circular resource use is cutting our expenditure on external inputs, strengthening financial resilience against commodity price volatility and supply chain disruptions.",
    stat: "Tracked",
    statLabel: "Input Costs Monitored",
  },
  {
    icon: Users,
    title: "Smallholder Impact",
    desc: "The Ingaju circular model is designed to be low-cost and directly applicable to smallholder operations, and we've shared it with farmers in our community in Nyagatare.",
    stat: "500+",
    statLabel: "Farmers Reached",
  },
  {
    icon: RefreshCw,
    title: "Resource Recovery, Scaling Up",
    desc: "Manure, crop residues, and other by-products are increasingly captured and reintegrated into the system as our organic fertilizer line comes online.",
    stat: "Scaling",
    statLabel: "Toward Zero Waste",
  },
];

export const PARTNERS = [
  { name: "Agrivet", logo: "/images/partners/agrivet.webp" },
  { name: "AIF", logo: "/images/partners/aif.webp" },
  { name: "BK Insurance", logo: "/images/partners/bk-insurance.webp" },
  { name: "Ingabo", logo: "/images/partners/ingabo.webp" },
  { name: "Inyanje", logo: "/images/partners/inyanje.webp" },
  { name: "KAFCO", logo: "/images/partners/kafco.webp" },
  { name: "Nyagatare Cooperative", logo: "/images/partners/nyagatare-cooporative.webp" },
  { name: "RAB", logo: "/images/partners/rab.webp" },
  { name: "Sonarwa", logo: "/images/partners/sonarwa.webp" },
  { name: "Western Seed", logo: "/images/partners/western-seed.webp" },
];

export const CATEGORIES = [
  {
    key: "dairy",
    title: "Livestock & Dairy",
    // NOTE: "with no added hormones" removed — not a confirmed practice.
    // See Ingaju Priority Fix Tracker, Needs Verification.
    description: "Milk and breeding livestock raised to strict welfare and nutrition standards.",
    ctaLabel: "Explore Dairy",
    ctaHref: "/products/dairy",
    image: "/images/hero/bg-img.webp",
    alt: "Dairy cattle grazing on the Ingaju farm",
  },
  {
    key: "crops",
    title: "Crop Production",
    description: "Maize, legumes, and macadamia nuts grown using climate-smart, organic-input farming practices.",
    ctaLabel: "Explore Crops",
    ctaHref: "/products/crops",
    image: "/images/crops/crop-production.webp",
    alt: "Rows of maize growing in the field",
  },
  {
    key: "organic-manure",
    title: "Organic Fertilizer",
    description: "Nutrient-rich organic fertilizer processed from our own livestock manure currently scaling up as we complete our composting facility.",
    ctaLabel: "Join the Waitlist",
    ctaHref: "/contact",
    image: "/images/dairy/organic-manure.webp",
    alt: "Organic fertilizer produced at Ingaju Farms",
  },
  {
    key: "trainings",
    title: "Farmer Training",
    description: "Practical, on-farm training in circular agriculture for smallholders, cooperatives, students and agribusiness professionals.",
    ctaLabel: "Explore Trainings",
    ctaHref: "/contact?topic=Training%20Program",
    image: "/images/farm/trainings.webp",
    alt: "Farmers attending a practical training session at Ingaju Farms",
  },
];

export const IMPACT_STATS: { key: string; label: string; value?: number; display?: string }[] = [
  { key: "jobs", value: 50, label: "Jobs Created" },
  { key: "farmers", value: 500, label: "Farmers Trained" },
  { key: "products", value: 10, label: "Organic Products Produced" },
  { key: "partnerships", value: 12, label: "Local Partnerships" },
];

export const TRAININGS = [
  {
    key: "dairy",
    title: "Livestock Production & Herd Management",
    description: "Hands-on training in livestock herd management, animal nutrition, hygienic milking procedures, milk quality assurance, and preventive animal health practices.",
    ctaLabel: "Learn More",
    ctaHref: "/contact?topic=Training%20Program",
    image: "/images/hero/bg-img.webp",
    alt: "Farmer working with livestock at Ingaju Farms",
  },
  {
    key: "organic",
    title: "Climate-Smart Crop Production",
    description: "Practical instruction in organic-input soil fertility management, composting, natural pest and disease management, and climate-smart farming practices for food and feed crop production.",
    ctaLabel: "Learn More",
    ctaHref: "/contact?topic=Training%20Program",
    image: "/images/hero/bg-2.webp",
    alt: "Farmer demonstrating climate-smart farming techniques",
  },
  {
    key: "circular",
    title: "Integrated Circular Agriculture",
    description: "Comprehensive training in circular farming systems covering manure management, our organic fertilizer process as it scales up, crop-livestock integration, and nutrient recycling.",
    ctaLabel: "Learn More",
    ctaHref: "/contact?topic=Training%20Program",
    image: "/images/hero/bg-3.webp",
    // NOTE: alt kept generic — this file is also used in CropsCircularModel.tsx
    // with a different (specific, unconfirmed) subject; neither description
    // could be verified against the actual photo. See Priority Fix Tracker.
    alt: "Ingaju Farms circular agriculture in Nyagatare",
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
    image: "/images/blog-circular-farming.webp",
    alt: "Farmer working on a circular agriculture farm",
    content: [
      {
        type: "paragraph" as const,
        text: "Circular agriculture is a farming approach where outputs from one part of the system become inputs for another — closing the loop to minimize waste and maximize resource efficiency. For small-scale farms in Rwanda, this model is proving to be both economically viable and environmentally responsible.",
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
        // NOTE: original text cited "up to 40% reductions" — no source found
        // in the repo; softened to non-numeric language pending verification.
        // See Ingaju Priority Fix Tracker, Needs Verification.
        type: "paragraph" as const,
        text: "Small-scale farmers often operate with tight margins and limited access to expensive fertilizers or veterinary inputs. Circular agriculture reduces dependency on external inputs, which directly lowers operating costs. Farmers who have adopted integrated systems report meaningful reductions in input costs within the first two seasons.",
      },
      {
        type: "list" as const,
        items: [
          "Lower fertilizer costs through organic manure recycling",
          "Reduced feed costs by utilizing crop by-products",
          "Improved soil health supporting more consistent crop yields",
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
        text: "Our training programs have reached over 500 farmers across the region, equipping them with practical skills in manure management, natural pest management, water harvesting, and crop-livestock integration. The results speak for themselves — trained farmers consistently outperform untrained peers in both yield and profitability.",
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
    image: "/images/blog-dairy-quality.webp",
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
    image: "/images/farm/students.webp",
    alt: "Group of farmers attending a training session",
    content: [
      {
        type: "paragraph" as const,
        text: "The gap between what farmers know and what they need to know to farm sustainably is one of the most significant barriers to agricultural transformation in Rwanda. Technology exists. Better seed varieties exist. Improved practices are documented. Yet adoption remains low because knowledge is not reaching farmers in formats they can access and apply.",
      },
      {
        type: "heading" as const,
        text: "The Knowledge Gap in Rwandan Agriculture",
      },
      {
        type: "paragraph" as const,
        text: "Most smallholder farmers in Rwanda learned to farm from their parents, using methods passed down across generations. These traditional practices have value, but they were developed for different climate conditions, different market realities, and different input environments than what farmers face today. Bridging this gap requires structured, practical, and accessible training.",
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
        text: "We offer training in dairy farming, organic crop production, and circular agriculture systems. Programs are available for individuals, farmer groups, schools, and corporate teams interested in understanding sustainable food systems. To date, we have trained over 500 farmers, and we track their progress to ensure the knowledge continues to produce results in the field.",
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
    slug: "composting-nutrient-loop-farm",
    category: "Nutrient Recycling",
    title: "How Composting Returns Nutrients to the Soil",
    excerpt: "Discover how manure, crop residues, and other organic materials are turned into compost that rebuilds soil fertility and supports healthier harvests.",
    date: "April 22, 2025",
    readTime: "5 min read",
    image: "/images/blog-circular-farming.webp",
    alt: "Compost-based nutrient recycling on a farm",
    content: [
      {
        type: "paragraph" as const,
        text: "One of the most valuable resources on any livestock farm is the organic material produced every day. At Ingaju Farms, we treat manure and crop residues as inputs for rebuilding soil health rather than as waste to discard. Through careful composting, these materials are transformed into a stable organic amendment that supports long-term fertility.",
      },
      {
        type: "heading" as const,
        text: "How Composting Works",
      },
      {
        type: "paragraph" as const,
        text: "Composting is a natural process that breaks down organic matter into nutrient-rich material. On a farm, manure, plant residues, and other biodegradable inputs are layered, managed for moisture and airflow, and allowed to decompose into a usable soil amendment.",
      },
      {
        type: "heading" as const,
        text: "How We Use Compost at Ingaju",
      },
      {
        type: "list" as const,
        items: [
          "Improving soil structure and fertility in crop fields",
          "Supporting healthier fodder and food crop growth",
          "Reducing dependence on synthetic fertilizers",
          "Returning organic matter to the land each season",
        ],
      },
      {
        type: "paragraph" as const,
        text: "The finished compost is returned to the fields and incorporated into the production cycle. This closes the loop between livestock, crop production, and soil regeneration without leaving organic material unused.",
      },
      {
        type: "heading" as const,
        text: "The Financial and Environmental Case",
      },
      {
        type: "paragraph" as const,
        text: "For a farm producing significant amounts of organic material, composting lowers waste disposal needs while improving the quality of the soil. Healthier soils hold water better, support stronger crops, and reduce the need for costly external inputs over time.",
      },
    ],
  },
];

// NOTE: t1 and t6 originally cited specific percentages ("over 60%", "Over
// 80%") with no source in the repo — softened to non-numeric language
// pending verification. See Ingaju Priority Fix Tracker, Needs Verification.
export const TESTIMONIALS = [
  {
    key: "t1",
    name: "Jean-Pierre Habimana",
    role: "Dairy Farmer, Eastern Province",
    quote: "I purchased two breeding bulls from Ingaju and within one season, my herd's milk yield increased noticeably. The quality of their livestock is unlike anything available locally — healthy, well-managed, and exactly what they promise.",
  },
  {
    key: "t2",
    name: "Claudine Uwimana",
    role: "Smallholder Farmer, Musanze",
    quote: "The circular agriculture training changed how I think about my entire farm. I used to burn my crop waste. Now it feeds my livestock, and their manure feeds my fields. My costs dropped and my harvests improved in the same season.",
  },
  {
    key: "t3",
    name: "Olivier Nshimiyimana",
    role: "Agronomist, Rwanda Agriculture Board",
    quote: "Ingaju is the most complete example of circular agriculture I have encountered in Rwanda. They are not just talking about sustainability — they have built a farm that proves it works at commercial scale. A genuine model for the country.",
  },
  {
    key: "t4",
    name: "Solange Mukamana",
    role: "Head Teacher, Kigali STEM School",
    quote: "We visited Ingaju with 40 secondary school students and it was the most impactful field trip we have ever organised. The team explains every part of the system clearly. Our students came back asking to study agriculture — that says everything.",
  },
  {
    key: "t5",
    name: "Emmanuel Bizimana",
    role: "Supply Manager, Rwamagana Dairy Cooperative",
    quote: "We have been sourcing fresh milk from Ingaju for over a year. The consistency is remarkable — same quality, same hygiene standards, same reliability every single delivery. For a cooperative our size, that dependability is everything.",
  },
  {
    key: "t6",
    name: "Diane Ingabire",
    role: "Program Officer, GreenHill Foundation Rwanda",
    quote: "We partnered with Ingaju to run farmer training workshops across three districts. Their hands-on approach and deep practical knowledge produced results we rarely see from classroom-based programs. Most participants made measurable changes within two months.",
  },
];


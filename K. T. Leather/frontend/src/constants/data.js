export const COMPANY = {
  name: "K.T. Leather Store",
  tagline: "Excellence in Corporate Uniforms & Leather Since 1965",
  proprietor: "Yogesh Chandrakantbhai Makwana",
  established: 1965,
  gst: "24AOXPM5482M1Z0",
  address: "09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004",
  email: "ktlsyogesh114@gmail.com",
  phone1: "9825562702",
  phone2: "8200647440",
  whatsapp: "9825562702",
};

export const PRODUCTS = [
  {
    id: 1, category: "uniforms", name: "Executive Corporate Uniform",
    description: "Premium corporate uniforms with your company branding. Available in all sizes.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Navy Blue", "Black", "Grey", "White", "Maroon", "Royal Blue"],
    qualities: ["Cotton", "Polyester-Cotton Blend", "Premium Wool Blend"],
    priceRange: "₹450 – ₹1,200 per piece",
    icon: "👔",
    features: ["Custom Logo Embroidery", "Multiple Fabric Options", "Bulk Orders Welcome"]
  },
  {
    id: 2, category: "uniforms", name: "Industrial Work Uniform",
    description: "Heavy-duty uniforms for industrial environments. Durable and comfortable.",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Orange", "Navy", "Grey", "Green", "Blue"],
    qualities: ["Heavy Cotton", "FR Fabric", "Ripstop Polyester"],
    priceRange: "₹600 – ₹1,800 per piece",
    icon: "🦺",
    features: ["Fire Retardant Options", "Reflective Strips", "Reinforced Stitching"]
  },
  {
    id: 3, category: "safety", name: "Safety Shoes",
    description: "ISI certified safety footwear for industrial and corporate use.",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown", "Grey"],
    qualities: ["Basic Safety", "Premium Leather", "Steel Toe Cap"],
    priceRange: "₹600 – ₹2,500 per pair",
    icon: "👟",
    features: ["Steel Toe Cap", "Anti-slip Sole", "ISI Certified"]
  },
  {
    id: 4, category: "safety", name: "Safety Equipment Kit",
    description: "Complete safety solutions – helmets, gloves, goggles, masks and more.",
    sizes: ["Standard", "Universal"],
    colors: ["Yellow", "White", "Orange", "Blue"],
    qualities: ["Standard", "Premium", "Industrial Grade"],
    priceRange: "₹200 – ₹5,000 per kit",
    icon: "⛑️",
    features: ["ISI Certified", "Bulk Supply", "Custom Branding"]
  },
  {
    id: 5, category: "gifts", name: "Corporate Gift Articles",
    description: "Premium branded gift items for corporate clients and events.",
    sizes: ["N/A"],
    colors: ["Customizable"],
    qualities: ["Standard", "Premium", "Luxury"],
    priceRange: "₹150 – ₹5,000 per piece",
    icon: "🎁",
    features: ["Company Branding", "Bulk Discounts", "Custom Packaging"]
  },
  {
    id: 6, category: "gifts", name: "Promotional T-Shirts",
    description: "Custom printed/embroidered T-shirts for events, teams, and promotions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["All Colors Available"],
    qualities: ["Basic Cotton", "Premium Cotton", "Dri-Fit"],
    priceRange: "₹180 – ₹650 per piece",
    icon: "👕",
    features: ["Custom Print/Embroidery", "Quick Turnaround", "Minimum 10 pcs"]
  },
  {
    id: 7, category: "leather", name: "Furniture Leather & Rexine",
    description: "Premium leather and Rexine material for furniture manufacturers and upholstery.",
    sizes: ["Per Meter", "Per Roll"],
    colors: ["All Shades Available"],
    qualities: ["Synthetic Rexine", "Semi-Leather", "Genuine Leather"],
    priceRange: "₹80 – ₹800 per meter",
    icon: "🛋️",
    features: ["Wide Variety", "Wholesale Rates", "Color Matching"]
  },
  {
    id: 8, category: "leather", name: "Upholstery Materials",
    description: "Complete upholstery solutions for furniture makers – fabric, foam, accessories.",
    sizes: ["Per Meter", "Per Roll"],
    colors: ["Extensive Range"],
    qualities: ["Economy", "Standard", "Premium"],
    priceRange: "₹60 – ₹500 per meter",
    icon: "🪑",
    features: ["Bulk Supply", "Trade Pricing", "Sample Swatches Available"]
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Products", icon: "🏪" },
  { id: "uniforms", label: "Uniforms", icon: "👔" },
  { id: "safety", label: "Safety Equipment", icon: "⛑️" },
  { id: "gifts", label: "Gifts & T-Shirts", icon: "🎁" },
  { id: "leather", label: "Leather & Rexine", icon: "🛋️" },
];

export const TESTIMONIALS = [
  { company: "Adani Group Supplier", text: "K.T. Leather Store has been our uniform partner for 8 years. Quality and delivery are always on point.", person: "Procurement Head" },
  { company: "Gujarat State Corporation", text: "Excellent quality safety shoes and uniforms. Yogesh bhai always provides the best fabric options for our budget.", person: "Admin Manager" },
  { company: "Pharmaceutical Company, Ahmedabad", text: "We source all our corporate gifts and T-shirts from KT Leather. Always satisfied with branding quality.", person: "HR Director" },
];

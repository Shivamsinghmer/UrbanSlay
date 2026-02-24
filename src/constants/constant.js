import { Twitter, Github, MessageCircle, Linkedin, Instagram } from "lucide-react";

export const navItems = [
  {
    label: "Men",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Bracelets", href: "/shop/men?category=bracelets", ariaLabel: "Men Bracelets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474673/SKU-01-_1_u0hkrt.webp" },
      { label: "Rings", href: "/shop/men?category=rings", ariaLabel: "Men Rings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474594/Salty-1949256_6731d7bd-2d4e-4613-9717-115483a412ee_vm7rgw.webp" },
      { label: "Chains", href: "/shop/men?category=chains", ariaLabel: "Men Chains", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474479/MN1S0556_White_20_281_29_rlgbxm.webp" },
    ]
  },
  {
    label: "Women",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Earrings", href: "/shop/women?category=earrings", ariaLabel: "Women Earrings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473864/Earrings_-Salty-156605146_orjot3.webp" },
      { label: "Rings", href: "/shop/women?category=rings", ariaLabel: "Women Rings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474135/RC24349-S_MAIN1_rnvhmg.webp" },
      { label: "Pendants", href: "/shop/women?category=pendants", ariaLabel: "Women Pendants", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473977/BIPS0004P07_YAA14DIG6BLTOXXXX_ABCD00-PICS-00004-1024-34391_utruqa.webp" },
      { label: "Bracelets", href: "/shop/women?category=bracelets", ariaLabel: "Women Bracelets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473864/Earrings_-Salty-156605146_orjot3.webp" },
      { label: "Necklace Sets", href: "/shop/women?category=necklace-sets", ariaLabel: "Women Necklace Sets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474171/Jewellery-Sets_-Salty-156607652_gksa4p.webp" },
    ]
  },
  {
    label: "Collections",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Best Sellers", href: "/collections/best-sellers", ariaLabel: "Best Sellers" },
      { label: "Under ₹149", href: "/collections/under-149", ariaLabel: "Under 149" },
      { label: "Under ₹299", href: "/collections/under-299", ariaLabel: "Under 299" },
      { label: "Under ₹499", href: "/collections/under-499", ariaLabel: "Under 499" },
      { label: "Gift Hampers", href: "/shop/gift-hampers", ariaLabel: "Gift Hampers" },
    ]
  }
];


export const footerData = () => ({
  navigation: {
    product: [
      { name: "Men's Collection", href: "/shop/men" },
      { name: "Women's Collection", href: "/shop/women" },
      { name: "New Arrivals", href: "/search?q=new" },
      { name: "Gift Hampers", href: "/shop/gift-hampers" },
    ],
    resources: [
      { name: "Our Story", href: "/about" },
      { name: "Track Your Order", href: "/account/orders" },
      { name: "Returns & Exchanges", href: "/privacy-policy#returns" },
      { name: "Contact Us", href: "/contact" },
    ]
  },
  socialLinks: [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/urbanslay.in/" },
  ],
  bottomLinks: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/privacy-policy/terms", label: "Terms of Service" },
    { href: "/privacy-policy/refund", label: "Refund Policy" },
    { href: "/privacy-policy/shipping", label: "Shipping Policy" },
  ],
});

export const heroImages = [
  {
    src_pc: "/hero-carousel/carousel2.jpg",
    src_mobile: "/hero-carousel/carousel2mobile.jpg",
    alt: "UrbanSlay Exclusive Men's and Women's Jewelry Collection",
  },
  {
    src_pc: "/hero-carousel/carousel3.jpg",
    src_mobile: "/hero-carousel/carousel3mobile.jpg",
    alt: "Modern Rings, Bracelets and Necklaces by UrbanSlay",
  },
  {
    src_pc: "/hero-carousel/carousel4.jpg",
    src_mobile: "/hero-carousel/carousel4mobile.jpg",
    alt: "Premium Lifestyle Jewelry Accessories For Him and Her",
  }
]

export const reviews = [
  {
    name: "Pratyush G.",
    text: '"This piece is just amazing, I want to purchase 1 more set but it was out of stock 😭 😭 😭 I wish I could get more"',
    product: "Palm Leaf Chain",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474479/MN1S0556_White_20_281_29_rlgbxm.webp"
  },
  {
    name: "Riddhima G.",
    text: '"They are soooo pretty. I always wished to have such earrings in real gold, but gold is sooo expensive now. So I am glad I stumbled into UrbanSlay. Thank you and keep up the awesome work."',
    product: "Infinity Jewelry Set",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474171/Jewellery-Sets_-Salty-156607652_gksa4p.webp"
  },
  {
    name: "Prachi",
    text: '"My experience was amazing after purchasing this product. I was eagerly waiting to buy this. Price and quality is amazing you can buy it. It\'s give a tough competition to gold products."',
    product: "Bracelet",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474075/Bracelets_-Salty-156605755_zrgujq.webp"
  },
  {
    name: "Piyush",
    text: '"Absolutely love the unique and edgy design of this bracelet. The quality is exceptional and it feels very premium. Highly recommended!"',
    product: "Nail Bangle Bracelet",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474594/Salty-1949256_6731d7bd-2d4e-4613-9717-115483a412ee_vm7rgw.webp"
  },
  {
    name: "Shrija K.",
    text: '"The pendant is incredibly beautiful and delicate! The blue stone shines so beautifully in the sunlight. I\'ve received so many compliments already. Best purchase ever!"',
    product: "Blue Heart Pendant",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473977/BIPS0004P07_YAA14DIG6BLTOXXXX_ABCD00-PICS-00004-1024-34391_utruqa.webp"
  },
  {
    name: "Shreya S.",
    text: '"These hoops are a game changer! They are so lightweight I almost forget I\'m wearing them, but they give a very premium and classy look. Simply perfect for daily wear."',
    product: "Gold Hoop Earrings",
    img: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473864/Earrings_-Salty-156605146_orjot3.webp"
  }
];
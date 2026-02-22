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
    ]
  }
];


export const footerData = () => ({
  navigation: {
    product: [
      { name: "Men's Collection", href: "/shop/men" },
      { name: "Women's Collection", href: "/shop/women" },
      { name: "New Arrivals", href: "/search?q=new" },
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
    alt: "posters",
  },
  {
    src_pc: "/hero-carousel/carousel3.jpg",
    src_mobile: "/hero-carousel/carousel3mobile.jpg",
    alt: "posters",
  },
  {
    src_pc: "/hero-carousel/carousel4.jpg",
    src_mobile: "/hero-carousel/carousel4mobile.jpg",
    alt: "posters",
  }
]
import { Twitter, Github, MessageCircle, Linkedin } from "lucide-react";

export const navItems = [
  {
    label: "Men",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Bracelets", ariaLabel: "Men Bracelets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474673/SKU-01-_1_u0hkrt.webp" },
      { label: "Rings", ariaLabel: "Men Rings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474594/Salty-1949256_6731d7bd-2d4e-4613-9717-115483a412ee_vm7rgw.webp" },
      { label: "Watches", ariaLabel: "Men Watches", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474904/unnamed_ccqaqv.jpg" },
      { label: "Chains", ariaLabel: "Men Chains", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474479/MN1S0556_White_20_281_29_rlgbxm.webp" },
    ]
  },
  {
    label: "Women",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Earings", ariaLabel: "Women Earings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473864/Earrings_-Salty-156605146_orjot3.webp" },
      { label: "Rings", ariaLabel: "Women Rings", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474135/RC24349-S_MAIN1_rnvhmg.webp" },
      { label: "Pendants", ariaLabel: "Women Pendants", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473977/BIPS0004P07_YAA14DIG6BLTOXXXX_ABCD00-PICS-00004-1024-34391_utruqa.webp" },
      { label: "Bracelets", ariaLabel: "Women Bracelets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771473864/Earrings_-Salty-156605146_orjot3.webp" },
      { label: "Watches", ariaLabel: "Women Watches", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474256/carlington_golden_women_analogue_watch_yfgjwm.avif" },
      { label: "Jewelry Sets", ariaLabel: "Women Jewelry Sets", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771474171/Jewellery-Sets_-Salty-156607652_gksa4p.webp" },
    ]
  },
  {
    label: "Home Decor",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Decor Objects", ariaLabel: "Decor Objects", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771477389/kecFKxERx95SbWdvGJyiNxjMMLooY03dmQty4JIn9j0_dorm5v.webp" },
      { label: "Vases", ariaLabel: "Vases", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771477251/usLobRPmIaG_69i0SBeDUfUinhlYZSoixuGv6P9ypX8_ou4uf9.webp" },
      { label: "Candles & Stands", ariaLabel: "Candles & Stands", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771477340/aNeE8SIPCuCMdpu0GLQHy-oey_kiYe3jmxNH4Nhp4YQ_g0maye.webp" },
      { label: "Clocks", ariaLabel: "Clocks", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771477072/3gqN0buaWVjcCYcWdn560bJkUsbp7A80mz5RIvnZhGI_rj9wdp.jpg" },
      { label: "Aroma Diffusers", ariaLabel: "Aroma Diffusers", hoverImageUrl: "https://res.cloudinary.com/dpr46qjaz/image/upload/v1771477340/aNeE8SIPCuCMdpu0GLQHy-oey_kiYe3jmxNH4Nhp4YQ_g0maye.webp" },
    ]
  }
];


export const footerData = () => ({
  navigation: {
    product: [
      { name: "Men's Collection", href: "/men" },
      { name: "Women's Collection", href: "/women" },
      { name: "Home Decor", href: "/home-decor" },
      { name: "New Arrivals", href: "/new-arrivals" },
    ],
    resources: [
      { name: "Our Story", href: "/about" },
      { name: "Track Your Order", href: "/track-order" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Contact Us", href: "/contact" },
    ]
  },
  socialLinks: [
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/urbanslay" },
    { icon: Github, label: "GitHub", href: "https://github.com/urbanslay" },
    { icon: MessageCircle, label: "Message", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/urbanslay" },
  ],
  bottomLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund", label: "Refund Policy" },
    { href: "/shipping-policy", label: "Shipping Policy" },
  ],
});

export const heroImages = [
    {
      src_pc: "/hero-carousel/carousel1-pc.webp",
      src_mobile: "/hero-carousel/carousel1-mobile.webp",
      alt: "posters",
    },
    {
      src_pc: "/hero-carousel/carousel1-pc.webp",
      src_mobile: "/hero-carousel/carousel1-mobile.webp",
      alt: "posters",
    },
    {
      src_pc: "/hero-carousel/carousel1-pc.webp",
      src_mobile: "/hero-carousel/carousel1-mobile.webp",
      alt: "posters",
    },
    {
      src_pc: "/hero-carousel/carousel1-pc.webp",
      src_mobile: "/hero-carousel/carousel1-mobile.webp",
      alt: "posters",
    },
    {
      src_pc: "/hero-carousel/carousel1-pc.webp",
      src_mobile: "/hero-carousel/carousel1-mobile.webp",
      alt: "posters",
    },
  ]
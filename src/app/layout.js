import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import FooterStandard from "@/components/mvpblocks/footer-standard";
import CardNav from "@/components/CardNav";
import { ClerkProvider } from "@clerk/nextjs";
import { navItems } from "@/constants/constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://urbanslay.in"),
  title: "UrbanSlay – Trendy Artificial Jewellery & Fashion Accessories Online",
  description: "Shop trendy artificial jewellery, bracelets, necklaces, rings and stylish accessories for men and women at UrbanSlay. Affordable prices. Fast delivery across India.",
  keywords: [
    "artificial jewellery online India",
    "trendy artificial jewellery for women",
    "fashion accessories online India",
    "modern jewellery for men and women",
    "affordable jewellery India"
  ],
  authors: [{ name: "UrbanSlay" }],
  creator: "UrbanSlay",
  publisher: "UrbanSlay",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "UrbanSlay – Trendy Artificial Jewellery & Fashion Accessories Online",
    description: "Shop trendy artificial jewellery, bracelets, necklaces, rings and stylish accessories for men and women at UrbanSlay. Affordable prices. Fast delivery across India.",
    url: "https://urbanslay.in",
    siteName: "UrbanSlay",
    images: [
      {
        url: "/navImages/logo.jpg",
        width: 1200,
        height: 630,
        alt: "UrbanSlay - Modern Curated Jewelry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanSlay – Trendy Artificial Jewellery & Fashion Accessories Online",
    description: "Shop trendy artificial jewellery, bracelets, necklaces, rings and stylish accessories.",
    images: ["/navImages/logo.jpg"],
  },
};

import Badge from "@/components/Badge";
import { ShopProvider } from "@/context/ShopContext";
import FloatingContact from "@/components/FloatingContact";

const badgeMessages = [
  { text: "Free Delivery on orders over ₹600", linkText: "Learn more" },
  { text: "Cash on Delivery available ✨", linkText: "Learn more" },
];

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        >
          <ShopProvider>
            <div className=" top-0 left-0 right-0 z-100">
              <Badge messages={badgeMessages} />
            </div>
            <CardNav
              logo="/navImages/logo.jpg"
              logoAlt="UrbanSlay"
              items={navItems}
              baseColor="#fff"
              menuColor="#000"
              buttonBgColor="#111"
              buttonTextColor="#fff"
              ease="power3.out"
              theme="color"
              className="top-[3.5em]! md:top-[3em]!"
            />
            <div className="pt-10 md:pt-12">
              {children}
            </div>
            <FloatingContact />
            <FooterStandard />
          </ShopProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


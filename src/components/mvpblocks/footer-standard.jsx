"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Moon,
  Sun,
  ArrowDownLeft,
  MessageCircle,
} from "lucide-react";
import { footerData } from "@/constants/constant";

export default function FooterStandard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const currentYear = new Date().getFullYear();
  if (!mounted) return null;
  return (
    <footer className="mt-20 w-full relative overflow-hidden">
      {/* Massive Background Text - Responsive scaling */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden px-4 opacity-15">
        <h1 className="text-[25vw] md:text-[20vw] font-serif font-black tracking-tighter text-transparent bg-linear-to-b from-black/90 to-transparent bg-clip-text whitespace-nowrap leading-none transition-all duration-300">
          URBANSLAY
        </h1>
      </div>

      <div className="relative w-full px-5 z-10 pt-20">
        {/* Top Section */}
        <div className="container m-auto grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info - Centered on mobile */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-8 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <Image
                src="/navImages/logo.jpg"
                alt="Logo"
                width={200}
                height={200}
                className="size-14 border border-primary/20 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-500"
              />
              <span className="text-3xl font-serif font-medium tracking-wide">UrbanSlay</span>
            </Link>
            <p className="text-gray-600 max-w-sm mx-auto md:mx-0 font-medium leading-relaxed tracking-wide text-sm">
              Elevating your lifestyle with curated jewelry.
              Modern designs for the contemporary soul.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
              {footerData().socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-black/10 hover:border-primary hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide text-gray-600 group shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] bg-white">
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  Follow us on {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links - Stacked on mobile, 2 columns on small screens */}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:col-span-3 items-start justify-between gap-10 sm:gap-4 md:gap-8 px-0 sm:px-5">
            {Object.keys(footerData().navigation).map((section) => (
              <div key={section} className="w-full text-center sm:text-left">
                <h3 className="mb-6 text-[14px] font-bold tracking-[0.25em] uppercase text-gray-900 drop-shadow-xs">
                  {section === 'product' ? 'Collections' : section === 'resources' ? 'Client Care' : section}
                </h3>
                <ul className="space-y-4">
                  {footerData().navigation[section].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group text-gray-700 hover:text-black flex sm:inline-flex items-center justify-center sm:justify-start gap-2 transition-all duration-300 sm:hover:pl-2 text-sm  tracking-wide">
                        <ArrowDownLeft className="text-primary rotate-225 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100 sm:group-hover:rotate-225 w-4 h-4 -ml-6" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-black/10 to-transparent mt-12 mb-6" />
        <div className="text-gray-600 container m-auto flex flex-col items-center justify-between gap-6 p-6 text-[11px] md:flex-row md:px-0 uppercase tracking-widest font-medium">
          <p className="order-2 md:order-1">
            &copy; {currentYear} URBANSLAY | ALL RIGHTS RESERVED
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 order-1 md:order-2">
            {footerData().bottomLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-black transition-colors duration-300 text-center">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
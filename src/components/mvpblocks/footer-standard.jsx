"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const currentYear = new Date().getFullYear();
  if (!mounted) return null;
  return (
    <footer className="mt-20 w-full relative overflow-hidden">
      {/* Massive Background Text - Responsive scaling */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden px-4">
        <h1 className="text-[25vw] md:text-[18vw] font-black uppercase tracking-tighter text-transparent bg-linear-to-b from-primary/40 to-transparent bg-clip-text whitespace-nowrap leading-none brightness-150 transition-all duration-300">
          UrbanSlay
        </h1>
      </div>

      <div className="animate-energy-flow via-primary h-px w-full bg-linear-to-r from-transparent to-transparent" />

      <div className="relative w-full px-5 z-10">
        {/* Top Section */}
        <div className="container m-auto grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info - Centered on mobile */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={200}
                height={200}
                className="size-10 border border-primary/20 rounded-md"
              />
              <span className="text-xl font-semibold font-mono">UrbanSlay</span>
            </Link>
            <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
              Elevating your lifestyle with curated jewelry and premium home decor.
              Modern designs for the contemporary home and soul.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex gap-2">
                {footerData().socialLinks.map(({ icon: Icon, label, href }) => (
                  <Button
                    key={label}
                    size="icon"
                    variant="outline"
                    asChild
                    className="!border-primary/30 cursor-pointer shadow-none transition-all duration-500">
                    <Link href={href}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="!border-primary/30 cursor-pointer shadow-none transition-all duration-1000">
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Navigation Links - Stacked on mobile, 2 columns on small screens */}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:col-span-3 items-start justify-between gap-8 sm:gap-4 md:gap-8 px-0 sm:px-5">
            {Object.keys(footerData().navigation).map((section) => (
              <div key={section} className="w-full text-center sm:text-left">
                <h3 className="border-primary mb-4 sm:-ml-5 sm:border-l-2 sm:pl-5 text-sm font-semibold tracking-wider uppercase">
                  {section === 'product' ? 'Collections' : section === 'resources' ? 'Help' : section}
                </h3>
                <ul className="space-y-3">
                  {footerData().navigation[section].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group text-muted-foreground hover:text-foreground decoration-primary flex sm:inline-flex items-center justify-center sm:justify-start gap-2 underline-offset-8 transition-all duration-500 sm:hover:pl-5 hover:underline decoration-1">
                        <ArrowDownLeft className="text-primary rotate-225 opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 sm:group-hover:rotate-225" />
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
        <div className="animate-rotate-3d via-primary h-px w-full bg-linear-to-r from-transparent to-transparent" />
        <div className="text-muted-foreground container m-auto flex flex-col items-center justify-between gap-6 p-6 text-xs md:flex-row md:px-0 md:text-sm">
          <p className="order-2 md:order-1">
            &copy; {currentYear} UrbanSlay | All rights reserved
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 order-1 md:order-2">
            {footerData().bottomLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-foreground transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <span className="from-primary/20 absolute inset-x-0 bottom-0 left-0 -z-10 h-1/3 w-full bg-linear-to-t" />
      </div>

    </footer>
  );
}
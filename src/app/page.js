"use client";
import React from "react";
import Hero from "@/sections/Hero";
import Categories from "@/sections/Categories";
import TopProducts from "@/sections/TopProducts";
import GiftHampers from "@/sections/GiftHampers";
import ShopByRecipient from "@/sections/ShopByRecipient";
import Confidence from "@/sections/Confidence";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import Marquee from "@/components/Marquee";

const App = () => {
  return (
    <main>
      <Hero />
      <Marquee text="Jewellery that actually gets worn? That’s the kind worth gifting." />

      <section className="space-y-4">
        <Categories />
        <TopProducts />
        <GiftHampers />
        <ShopByRecipient />
      </section>

      <Confidence />
      <Testimonials />
      <FAQ />
    </main>
  );
};

export default App;
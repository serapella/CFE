"use client";

import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProductSpotlight } from "@/components/home/productSpotlight";
import { TrendingRecipes } from "@/components/home/trendingRecipes";
import { HowItWorks } from "@/components/home/howItWorks";
import { Banner } from "@/components/home/banner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ProductSpotlight />
      <HowItWorks />
      <TrendingRecipes />
      <Banner />
    </main>
  );
}

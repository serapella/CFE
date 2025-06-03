"use client";

import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProductSpotlight } from "@/components/home/product-spotlight";
import { TrendingRecipes } from "@/components/home/trending-recipes";
import { HowItWorks } from "@/components/home/how-it-works";
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

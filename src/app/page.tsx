import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProductSpotlight } from "@/components/home/productSpotlight";
import TrendingRecipes from "@/components/home/trendingRecipes";
import { HowItWorks } from "@/components/home/howItWorks";
import { Banner } from "@/components/home/banner";

export const metadata: Metadata = {
  title: "Home | BODYMATTERS",
  description: "Discover natural and safe cosmetics, learn about ingredients, and find beauty recipes.",
};

export default async function Home() {
  return (
    <div className="flex flex-col space-y-16">
      <Hero />
      <div className="space-y-16">
        <Features />
        <HowItWorks />
        <TrendingRecipes />
      </div>
      <ProductSpotlight />
      <Banner />
    </div>
  );
}

import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProductSpotlight } from "@/components/home/productSpotlight";
import { TrendingRecipes } from "@/components/home/trendingRecipes";
import { HowItWorks } from "@/components/home/howItWorks";
import { Banner } from "@/components/home/banner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="px-4 sm:px-6 lg:px-8">
        <Features />
        <HowItWorks />
        <TrendingRecipes />
      </div>
      <ProductSpotlight />
      <Banner />
    </div>
  );
}

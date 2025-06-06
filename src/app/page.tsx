import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProductSpotlight } from "@/components/home/productSpotlight";
import TrendingRecipes from "@/components/home/trendingRecipes";
import { HowItWorks } from "@/components/home/howItWorks";
import { Banner } from "@/components/home/banner";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Home | BODYMATTERS",
  description: "Discover natural and safe cosmetics, learn about ingredients, and find beauty recipes.",
};

export default async function Home() {
  const cookieStore = await cookies();
  // Pas de cookie naam aan naar jouw auth-cookie, bijvoorbeeld 'token' of 'laravel_session'
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return (
    <div className="flex flex-col space-y-16">
      <Hero />
      <div className="space-y-16">
        <Features />
        <HowItWorks />
        {isLoggedIn && <TrendingRecipes />}
      </div>
      {isLoggedIn && <ProductSpotlight />}
      <Banner />
    </div>
  );
}

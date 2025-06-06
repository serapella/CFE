"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Guide to Safer Cosmetics
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Make informed choices about your beauty products. Scan, search, and discover safer alternatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5" />
    </section>
  );
}

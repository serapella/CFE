"use client";

import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QrCode } from "lucide-react";

export function Banner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Safe & Natural Cosmetics
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find products that are good for you and the environment. Our database helps you make informed choices about your beauty products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <Link href="/scan">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Scan Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Scan } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "@/components/ui/motion";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative py-20 md:py-32">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--peacock))] via-background to-[hsl(var(--azure))] opacity-10"></div>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]"></div>
      </div>
      <div className="container relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--peacock))]/10 text-[hsl(var(--peacock))] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[hsl(var(--peacock))]"></span>
              Your Personal Care Companion
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--peacock))] to-[hsl(var(--azure))]">
              Make informed choices for your health
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Discover product ingredients, health scores, and make better choices for your personal care.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 max-w-xl mx-auto"
          >
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--peacock))] to-[hsl(var(--azure))] rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Input
                type="text"
                placeholder="Search products or ingredients..."
                className="w-full h-12 pl-12 pr-4 bg-background/80 backdrop-blur-sm border-[hsl(var(--peacock))] focus:ring-[hsl(var(--azure))]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--peacock))]" />
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--peacock))] to-[hsl(var(--azure))] hover:opacity-90 transition-opacity"
            >
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link href="/products/scan">
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden border-[hsl(var(--peacock))] text-[hsl(var(--peacock))]"
              >
                <span className="absolute inset-0 bg-[hsl(var(--peacock))] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                <Scan className="mr-2 h-4 w-4" /> Scan product
              </Button>
            </Link>
            <Link href="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden border-[hsl(var(--azure))] text-[hsl(var(--azure))]"
              >
                <span className="absolute inset-0 bg-[hsl(var(--azure))] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                Browse products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, Scan } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { motion } from '@/components/ui/motion';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/80 z-10"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <Image 
            src="/window.svg" 
            alt="Background image with skincare products"
            className="object-cover"
            priority
            fill
          />
        </div>
      </div>

      <div className="container relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Make informed choices for your <span className="text-chart-1 dark:text-chart-1">health</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover product ingredients, health scores, and recipes that align with your wellness goals.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search products or ingredients..."
                className="pr-10 h-12 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button size="lg" className="w-full sm:w-auto">
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
              <Button variant="outline" size="lg">
                <Scan className="mr-2 h-4 w-4" /> Scan product
              </Button>
            </Link>
            <Link href="/recipes">
              <Button variant="outline" size="lg">
                Browse recipes
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
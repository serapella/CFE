"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Scan, Info, Leaf, Heart, ArrowRight } from "lucide-react";
import { motion } from "@/components/ui/motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-background py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover what's really in your products
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Make informed choices about your personal care products. Scan,
                analyze, and understand ingredients for better health decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Scan className="mr-2 h-5 w-5" /> Scan Product
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Search className="mr-2 h-5 w-5" /> Search Database
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    8000+
                  </Badge>
                  <span>Products analyzed</span>
                </div>
                <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
                <span>100% Independent advice</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square"
            >
              <Image
                src="/window.svg"
                alt="Product analysis illustration"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-accent/20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make better choices for your health
            </h2>
            <p className="text-lg text-muted-foreground">
              We help you understand what goes into your personal care products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scan className="h-8 w-8 text-[hsl(var(--peacock))]" />,
                title: "Scan & Analyze",
                description:
                  "Instantly analyze product ingredients with a simple scan",
              },
              {
                icon: <Info className="h-8 w-8 text-[hsl(var(--papaya))]" />,
                title: "Understand Ingredients",
                description:
                  "Learn about ingredients and their impact on your health",
              },
              {
                icon: <Leaf className="h-8 w-8 text-[hsl(var(--azure))]" />,
                title: "Find Alternatives",
                description:
                  "Discover healthier alternatives for your favorite products",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-xl border"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Analyses */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Recently Analyzed Products
              </h2>
              <p className="text-muted-foreground">
                See what others have discovered
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center">
              View all analyses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Natural Face Cream", score: "A", concerns: [] },
              {
                name: "Organic Shampoo",
                score: "B",
                concerns: ["Contains fragrance"],
              },
              {
                name: "Body Lotion",
                score: "C",
                concerns: [
                  "Contains parabens",
                  "Contains synthetic fragrances",
                ],
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group bg-background rounded-xl border overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src="/window.svg"
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={
                          product.score === "A"
                            ? "default"
                            : product.score === "B"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-lg font-bold"
                      >
                        {product.score}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    {product.concerns.length > 0 ? (
                      <div className="space-y-2">
                        {product.concerns.map((concern, j) => (
                          <Badge key={j} variant="secondary" className="mr-2">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-[hsl(var(--secondary))] text-[hsl(var(--peacock))] border-[hsl(var(--peacock))]"
                      >
                        No concerns found
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY Section */}
      <section className="py-20 bg-accent/20">
        <div className="container">
          <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--peacock))] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Create your own natural care products
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  Discover simple recipes for natural alternatives you can make
                  at home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary">
                    View Recipes
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/20"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/window.svg"
                  alt="DIY Recipes"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start making informed choices today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community and get access to all features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[hsl(var(--peacock))] hover:bg-[hsl(var(--peacock))]/90"
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[hsl(var(--peacock))] text-[hsl(var(--peacock))] hover:bg-[hsl(var(--peacock))]/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { motion } from '@/components/ui/motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertTriangle, ThumbsUp, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import Link from 'next/link';

// Product data with danger scores visualization
const products = [
  {
    id: 1,
    name: "Natural Daily Moisturizer",
    image: "/window.svg",
    brand: "Pure Essentials",
    category: "Moisturizer",
    dangerScore: 12, // Low danger score (good)
    rating: "A",
    keyIngredients: ["Aloe Vera", "Jojoba Oil", "Vitamin E"],
    concerns: [],
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    image: "/window.svg",
    brand: "GlowBoost",
    category: "Face Cream",
    dangerScore: 35, // Medium danger score
    rating: "B",
    keyIngredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
    concerns: ["Contains fragrance"],
  },
  {
    id: 3,
    name: "Ultra Shine Shampoo",
    image: "/window.svg",
    brand: "LuxHair",
    category: "Shampoo",
    dangerScore: 72, // High danger score (bad)
    rating: "C",
    keyIngredients: ["Sodium Laureth Sulfate", "Fragrance", "Methylparaben"],
    concerns: ["Contains sulfates", "Contains parabens", "Contains fragrance"],
  },
];

// Function to determine progress bar color based on danger score
const getDangerScoreColor = (score: number) => {
  if (score < 30) return "bg-green-500"; // Low danger (good)
  if (score < 60) return "bg-yellow-500"; // Medium danger
  return "bg-red-500"; // High danger (bad)
};

// Function to determine badge variant based on rating
const getRatingBadgeVariant = (rating: string) => {
  if (rating === "A") return "outline";
  if (rating === "B") return "secondary";
  return "destructive";
};

export function ProductSpotlight() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Product health spotlight
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              See how products rate on our health scale
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                Browse all products <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <Badge variant={getRatingBadgeVariant(product.rating)}>
                        {product.rating} Rating
                      </Badge>
                      <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Danger Score</span>
                      <span className="text-sm font-medium">{product.dangerScore}%</span>
                    </div>
                    <Progress value={product.dangerScore} className="h-2" 
                      style={{ 
                        "--progress-background": getDangerScoreColor(product.dangerScore)
                      } as React.CSSProperties} 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.keyIngredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {product.concerns.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                        <AlertTriangle className="h-3.5 w-3.5" /> Concerns:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {product.concerns.map((concern, i) => (
                          <li key={i} className="flex items-start gap-1 mt-1">
                            <span className="h-3.5 w-3.5 rounded-full border border-yellow-500 dark:border-yellow-400 flex-shrink-0"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {product.concerns.length === 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-green-500">
                        <ThumbsUp className="h-3.5 w-3.5" /> No concerns detected
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <Search className="h-3.5 w-3.5 mr-1" /> Details
                      </Button>
                    </Link>
                    <Link href={`/products/alternatives/${product.id}`} className="flex-1">
                      <Button variant="secondary" className="w-full" size="sm">
                        Alternatives
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
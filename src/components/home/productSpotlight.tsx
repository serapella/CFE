"use client";

import { ApiService } from "@/lib/api";
import type { Product } from "@/types";
import { motion } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertTriangle, ThumbsUp, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

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

export async function ProductSpotlight() {
  let products: Product[] = [];
  let error = null;
  try {
    products = await ApiService.getProducts();
  } catch (err: any) {
    error = err.message || "Unknown error";
  }

  if (error) return <div className="container py-12 text-red-500">{error}</div>;

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container px-4 sm:px-6 lg:px-8">
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
          {products.slice(0, 3).map((product) => (
            <motion.div key={product.id}>
              <Card className="overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image_url || "/fallback.png"}
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mt-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.brand?.name} • {product.category?.name}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-medium">Score: </span>
                    <span className="text-sm font-medium">
                      {product.score ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <Search className="h-3.5 w-3.5 mr-1" /> Details
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

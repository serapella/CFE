"use client";

import { useState } from "react";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Search, Star, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock data for favorites
const favorites = {
  products: [
    {
      id: 1,
      name: "Natural Daily Moisturizer",
      image:
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
      brand: "Pure Essentials",
      category: "Moisturizer",
      dangerScore: 12,
      rating: "A",
      keyIngredients: ["Aloe Vera", "Jojoba Oil", "Vitamin E"],
      concerns: [],
    },
    {
      id: 2,
      name: "Hydrating Face Cream",
      image:
        "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg",
      brand: "GlowBoost",
      category: "Face Cream",
      dangerScore: 35,
      rating: "B",
      keyIngredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
      concerns: ["Contains fragrance"],
    },
  ],
  recipes: [
    {
      id: 1,
      title: "Natural Face Mask",
      image:
        "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg",
      time: "15 min",
      difficulty: "Easy",
      rating: 4.8,
      ingredients: 5,
      category: "Face Care",
    },
    {
      id: 2,
      title: "Herbal Hair Mask",
      image:
        "https://images.pexels.com/photos/6621264/pexels-photo-6621264.jpeg",
      time: "30 min",
      difficulty: "Medium",
      rating: 4.5,
      ingredients: 6,
      category: "Hair Care",
    },
  ],
};

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--peacock))]/10 text-[hsl(var(--peacock))] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Your Favorites
          </div>
          <h1 className="text-4xl font-bold mb-4">My Favorites</h1>
          <p className="text-lg text-muted-foreground">
            Manage your favorite products and recipes in one place
          </p>
        </motion.div>

        <div className="relative w-full max-w-lg mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search your favorites..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="products" className="flex-1">
              Products ({favorites.products.length})
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex-1">
              Recipes ({favorites.recipes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0"></div>
                        <div>
                          <Badge
                            variant={
                              product.rating === "A"
                                ? "outline"
                                : product.rating === "B"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {product.rating} Rating
                          </Badge>
                          <h3 className="font-semibold text-lg mt-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.brand} • {product.category}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            Health Score
                          </span>
                          <span className="text-sm font-medium">
                            {100 - product.dangerScore}%
                          </span>
                        </div>
                        <Progress
                          value={100 - product.dangerScore}
                          className="h-2"
                          style={
                            {
                              "--progress-background": `hsl(var(${
                                product.dangerScore < 30
                                  ? "--peacock"
                                  : product.dangerScore < 60
                                  ? "--sunshine"
                                  : "--coral"
                              }))`,
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                        {recipe.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">
                            {recipe.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{recipe.time}</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                        <span>•</span>
                        <span>{recipe.ingredients} ingredients</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Link href={`/recipes/${recipe.id}`}>
                          <Button variant="outline">View Recipe</Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use client";

import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const recipes = [
  {
    id: 1,
    title: "Natural Face Cream",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg",
    time: "20 min",
    difficulty: "Easy",
    ingredients: 5,
    category: "Face Care",
    description: "A nourishing face cream made with natural ingredients"
  },
  {
    id: 2,
    title: "Lavender Body Scrub",
    image: "https://images.pexels.com/photos/6621323/pexels-photo-6621323.jpeg",
    time: "15 min",
    difficulty: "Easy",
    ingredients: 4,
    category: "Body Care",
    description: "Exfoliating scrub with calming lavender"
  },
  {
    id: 3,
    title: "Herbal Hair Mask",
    image: "https://images.pexels.com/photos/6621264/pexels-photo-6621264.jpeg",
    time: "30 min",
    difficulty: "Medium",
    ingredients: 6,
    category: "Hair Care",
    description: "Strengthening hair mask with natural herbs"
  }
];

const categories = [
  "All Recipes",
  "Face Care",
  "Body Care",
  "Hair Care",
  "Essential Oils",
  "Natural Makeup"
];

export default function RecipesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">DIY Natural Care Recipes</h1>
        <p className="text-lg text-muted-foreground">
          Create your own natural beauty and personal care products at home
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "outline"}
            className="flex-shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/recipes/${recipe.id}`}>
              <Card className="group overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                    {recipe.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                  <p className="text-muted-foreground mb-4">{recipe.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.ingredients} ingredients
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Recipe
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg">
          Load More Recipes <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 
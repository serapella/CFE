"use client";

import { motion } from '@/components/ui/motion';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Utensils, ChevronRight, Heart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const trendingRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "/window.svg",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    healthScore: "A",
    tags: ["Vegetarian", "High Protein"],
  },
  {
    id: 2,
    title: "Berry Smoothie Bowl",
    image: "/window.svg",
    time: "10 min",
    difficulty: "Easy",
    rating: 4.7,
    healthScore: "A",
    tags: ["Vegan", "Breakfast"],
  },
  {
    id: 3,
    title: "Avocado & Egg Toast",
    image: "/window.svg",
    time: "15 min",
    difficulty: "Easy",
    rating: 4.5,
    healthScore: "B",
    tags: ["Breakfast", "High Protein"],
  },
  {
    id: 4,
    title: "Grilled Salmon with Asparagus",
    image: "/window.svg",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.9,
    healthScore: "A",
    tags: ["Keto", "High Protein"],
  },
];

export function TrendingRecipes() {
  return (
    <section className="py-20">
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
              Trending healthy recipes
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Discover popular recipes loved by our community
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link href="/recipes">
              <Button variant="outline" className="gap-2">
                View all recipes <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-[4/3]">
                  <Image 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    fill
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {recipe.healthScore} Score
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex gap-2 mb-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span className="mr-3">{recipe.time}</span>
                    <Utensils className="h-3.5 w-3.5 mr-1" />
                    <span>{recipe.difficulty}</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{recipe.rating}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Link href={`/recipes/${recipe.id}`} className="w-full">
                    <Button variant="secondary" className="w-full">View Recipe</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "essential-oils",
    name: "Essential Oils",
    description: "Natural aromatic compounds found in plants",
    image: "/sunscreen.jpg",
    color: "bg-sunshine"
  },
  {
    id: "face-care",
    name: "Face Care",
    description: "Products for facial skincare and treatment",
    image: "/facemask.jpg",
    color: "bg-peony"
  },
  {
    id: "body-care",
    name: "Body Care",
    description: "Full body care and treatment products",
    image: "/cream.jpg",
    color: "bg-azure"
  },
  {
    id: "hair-care",
    name: "Hair Care",
    description: "Products for hair health and styling",
    image: "/child.jpg",
    color: "bg-papaya"
  },
  {
    id: "natural-makeup",
    name: "Natural Makeup",
    description: "Clean and natural cosmetic products",
    image: "/facemask2.jpg",
    color: "bg-coral"
  },
  {
    id: "supplements",
    name: "Supplements",
    description: "Natural health supplements and vitamins",
    image: "/mirror.jpg",
    color: "bg-peacock"
  }
];

export default function CategoriesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-lg text-muted-foreground">
          Explore our curated collection of natural and organic personal care products
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/categories/${category.id}`}>
              <Card className="group overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className={`absolute inset-0 opacity-20 ${category.color}`} />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" className="w-full">
                    Explore Category
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
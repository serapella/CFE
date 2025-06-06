import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Categories | BODYMATTERS",
  description: "Browse products by category",
};

const categories = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Face creams, serums, and treatments",
    image: "/categories/skincare.jpg"
  },
  {
    id: "haircare",
    name: "Hair Care",
    description: "Shampoos, conditioners, and styling products",
    image: "/categories/haircare.jpg"
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Cosmetics and beauty products",
    image: "/categories/makeup.jpg"
  },
  {
    id: "bodycare",
    name: "Body Care",
    description: "Body lotions, soaps, and treatments",
    image: "/categories/bodycare.jpg"
  }
];

export default function CategoriesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <Link href={`/categories/${category.id}`}>
                <Button variant="outline" className="w-full">
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
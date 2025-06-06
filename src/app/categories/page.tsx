import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/models";
import { categoryQueries } from "@/queries/categoryQueries";

export const metadata: Metadata = {
  title: "Categories | BODYMATTERS",
  description: "Browse products by category",
};

export default async function CategoriesPage() {
  const categories = await categoryQueries.getAll();

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category: Category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={category.icon || "/fallback.png"}
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
                  View Category
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
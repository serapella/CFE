import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = {
  "baby-care": {
    title: "Baby Care",
    description: "Gentle and safe products for your little ones",
    subcategories: [
      { id: "baby-cleansing", name: "Baby Cleansing", count: 24 },
      { id: "baby-shampoo-soap", name: "Baby Shampoo & Soap", count: 18 },
      { id: "diaper-cream", name: "Diaper Cream", count: 12 },
      { id: "baby-wipes", name: "Baby Wipes", count: 15 },
    ],
  },
  "body-face-care": {
    title: "Body & Face Care",
    description: "Complete skincare solutions for your body and face",
    subcategories: [
      { id: "moisturizers", name: "Moisturizers", count: 45 },
      { id: "anti-aging", name: "Anti-Aging", count: 38 },
      { id: "cleansers", name: "Cleansers", count: 42 },
      { id: "acne-imperfections", name: "Acne & Imperfections", count: 28 },
    ],
  },
  "hair-care": {
    title: "Hair Care",
    description: "Products for healthy and beautiful hair",
    subcategories: [
      { id: "shampoo", name: "Shampoo", count: 56 },
      { id: "conditioner", name: "Conditioner", count: 48 },
      { id: "hair-masks", name: "Hair Masks", count: 22 },
      { id: "styling", name: "Styling", count: 34 },
    ],
  },
  makeup: {
    title: "Makeup",
    description: "Beauty products for every look",
    subcategories: [
      { id: "face-makeup", name: "Face Makeup", count: 62 },
      { id: "eye-makeup", name: "Eye Makeup", count: 58 },
      { id: "lip-makeup", name: "Lip Makeup", count: 45 },
      { id: "makeup-removers", name: "Makeup Removers", count: 18 },
    ],
  },
  perfume: {
    title: "Perfume",
    description: "Fragrances for every occasion",
    subcategories: [
      { id: "women", name: "Women", count: 86 },
      { id: "men", name: "Men", count: 64 },
      { id: "baby-children", name: "Baby & Children", count: 12 },
      { id: "unisex", name: "Unisex", count: 28 },
    ],
  },
  "dental-hygiene": {
    title: "Dental Hygiene",
    description: "Products for oral health and care",
    subcategories: [
      { id: "toothpaste", name: "Toothpaste", count: 32 },
      { id: "mouthwash", name: "Mouthwash", count: 24 },
      { id: "floss", name: "Floss", count: 15 },
    ],
  },
  "shaving-hair-removal": {
    title: "Shaving & Hair Removal",
    description: "Solutions for hair removal and grooming",
    subcategories: [
      { id: "for-men", name: "For Men", count: 38 },
      { id: "for-women", name: "For Women", count: 42 },
      { id: "wax-creams", name: "Wax & Creams", count: 26 },
      { id: "aftershave", name: "Aftershave", count: 22 },
    ],
  },
  "mens-care": {
    title: "Men's Care",
    description: "Specialized products for men's grooming",
    subcategories: [
      { id: "face", name: "Face", count: 45 },
      { id: "body", name: "Body", count: 38 },
      { id: "beard", name: "Beard", count: 28 },
    ],
  },
  "solar-products": {
    title: "Solar Products",
    description: "Protection and care for sun exposure",
    subcategories: [
      { id: "sunscreens", name: "Sunscreens", count: 52 },
      { id: "after-sun", name: "After Sun", count: 24 },
      { id: "tanners", name: "Tanners", count: 18 },
    ],
  },
  "well-being": {
    title: "Well-being",
    description: "Products for relaxation and wellness",
    subcategories: [
      { id: "massage", name: "Massage", count: 32 },
      { id: "essential-oils", name: "Essential Oils", count: 68 },
      { id: "sleep-aids", name: "Sleep Aids", count: 24 },
    ],
  },
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = categories[params.category as keyof typeof categories];

  if (!category) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        <p className="text-lg text-muted-foreground">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {category.subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            href={`/categories/${params.category}/${subcategory.id}`}
          >
            <Card className="group hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {subcategory.name}
                </h2>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {subcategory.count} products
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Card className="bg-muted/50">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Popular Products in {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={`https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg`}
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4">Top Rated</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Product Name</h3>
                    <Button variant="outline" className="w-full">
                      <Search className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

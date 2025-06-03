import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    category: string;
    subcategory: string;
  };
};

export default function Page({ params }: Props) {
  const { category, subcategory } = params;
  const products = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    brand: "Brand Name",
    rating: 4.5,
    reviews: 128,
    price: 29.99,
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg",
  }));

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Brand</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="brand1">Brand 1</SelectItem>
                    <SelectItem value="brand2">Brand 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50+">$50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="4+">4+ Stars</SelectItem>
                    <SelectItem value="3+">3+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="outline">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{category} - {subcategory}</h1>
              <p className="text-muted-foreground">
                Showing {products.length} products
              </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>

              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4">New</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.brand}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${product.price}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg">Load More Products</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

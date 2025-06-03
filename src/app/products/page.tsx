import { ApiService } from "@/lib/api";
import type { Product } from "@/types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  FilterX,
  SlidersHorizontal,
  AlertTriangle,
  ThumbsUp,
  ChevronDown,
  QrCode,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  let products: Product[] = [];
  let error = null;
  try {
    products = await ApiService.getProducts();
  } catch (err: any) {
    error = err.message || "Unknown error";
  }

  if (error) return <div className="container py-12 text-red-500">{error}</div>;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Browse and search for products to see their health scores and ingredients
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products by name or brand..."
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="w-full md:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Link href="/products/scan">
            <Button variant="secondary" className="w-full md:w-auto">
              <QrCode className="mr-2 h-4 w-4" />
              Scan Product
            </Button>
          </Link>
        </div>
      </div>

      <Collapsible>
        <CollapsibleContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Category
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {["Moisturizer", "Face Cream", "Shampoo"].map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Health Rating
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="A">A Rating</SelectItem>
                    <SelectItem value="B">B Rating</SelectItem>
                    <SelectItem value="C">C Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Sort By
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="score">
                      Health Score (Best First)
                    </SelectItem>
                    <SelectItem value="rating">Rating (Best First)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} products
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Card key={product.id} className="overflow-hidden h-full">
                <div className="relative aspect-square rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image_url || "/fallback.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    {product.brand?.name && <span>{product.brand.name}</span>}
                    {product.category?.name && <span> • {product.category.name}</span>}
                  </div>
                  {typeof product.score === 'number' && (
                    <div className="mb-2">
                      <span className="font-medium">Score: </span>
                      <span className="font-medium">{product.score}</span>
                    </div>
                  )}
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" className="w-full mt-2">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image_url || "/fallback.png"}
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mt-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.brand?.name && <span>{product.brand.name}</span>}
                            {product.category?.name && <span> • {product.category.name}</span>}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium mr-2">
                              Health Score:
                            </span>
                            <span className="font-bold">
                              {typeof product.score === 'number' ? product.score : 'N/A'}
                            </span>
                          </div>
                          <Progress
                            value={typeof product.score === 'number' ? product.score : 0}
                            className="h-2 w-32"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Key Ingredients:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {product.keyIngredients?.map((ingredient: any) => (
                              <Badge
                                key={ingredient.id}
                                variant="outline"
                                className="text-xs"
                              >
                                {ingredient.name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/products/alternatives/${product.id}`}>
                            <Button variant="secondary" size="sm">
                              Alternatives
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

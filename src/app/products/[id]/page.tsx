import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Product } from '@/types/models';
import { PageProps } from '@/types/page';
import { productQueries } from "@/queries/productQueries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Review } from "@/types/models";
import { ProductForm } from "@/components/products/ProductForm";

async function fetchProduct(id: string): Promise<Product> {
  try {
    return await productQueries.getById(Number(id));
  } catch (error) {
    throw new Error('Product not found');
  }
}

export default async function ProductPage({ params }: PageProps) {
  try {
    const product = await fetchProduct(params.id);
    let reviews: Review[] = [];
    let error: string | null = null;
    try {
      reviews = await productQueries.getReviews(Number(params.id));
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Unknown error";
      }
    }

    if (error) return <div className="container py-12 text-red-500">{error}</div>;
    if (!product) return <div className="container py-12">No product found.</div>;

    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
              <Image
                src={product.image_url || "/fallback.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.image_url || "/fallback.png"}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mt-2 mb-1">{product.name}</h1>
                <div className="text-lg text-muted-foreground mb-2">
                  {product.brand?.name && <span>{product.brand.name}</span>}
                  {product.category?.name && (
                    <span> • {product.category.name}</span>
                  )}
                </div>
                {product.barcode && (
                  <div className="mb-2 text-sm text-muted-foreground">
                    Barcode: {product.barcode}
                  </div>
                )}
                {typeof product.score === "number" && (
                  <div className="mb-4">
                    <span className="font-medium">Score: </span>
                    <span className="font-medium">{product.score}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {product.description && (
              <p className="text-muted-foreground mb-6">{product.description}</p>
            )}

            <div className="mb-8">
              <h2 className="font-semibold mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {(product.ingredients || []).map((ingredient, i) => (
                  <li
                    key={i}
                    className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <span className="font-medium">{ingredient.name}</span>
                    {ingredient.description && (
                      <span className="text-muted-foreground text-sm">
                        {ingredient.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 text-sm text-muted-foreground">
              {product.created_at && (
                <div>
                  Created: {new Date(product.created_at).toLocaleDateString()}
                </div>
              )}
              {product.updated_at && (
                <div>
                  Updated: {new Date(product.updated_at).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-12">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
              </Button>
              <Link
                href={`/products/alternatives/${product.id}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View Alternatives
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="ingredients">
              <TabsList className="w-full">
                <TabsTrigger value="ingredients" className="flex-1">
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-6">
                <div className="space-y-4">
                  {(product.ingredients || []).map((ingredient, i) => (
                    <Card key={i}>
                      <div className="p-4">
                        <h3 className="font-semibold">{ingredient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ingredient.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Edit Product Form */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
              <ProductForm product={product} />
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Similar Products</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={product.image_url || "/fallback.png"}
                    alt="Similar product"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4">A Rating</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Product Name</h3>
                  <p className="text-sm text-muted-foreground mb-4">Brand Name</p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const product = await fetchProduct(params.id);
    return {
      title: product.name,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

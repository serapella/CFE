import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ThumbsUp,
  Heart,
  Share2,
  Info,
  ShoppingCart,
  ChevronRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock product data
const product = {
  id: 1,
  name: "Natural Daily Moisturizer",
  image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
  brand: "Pure Essentials",
  category: "Moisturizer",
  dangerScore: 12,
  rating: "A",
  keyIngredients: ["Aloe Vera", "Jojoba Oil", "Vitamin E"],
  concerns: [],
  description:
    "A gentle, natural moisturizer suitable for all skin types. Made with organic ingredients to nourish and hydrate your skin.",
  benefits: [
    "Deeply hydrates skin",
    "Non-comedogenic",
    "Suitable for sensitive skin",
    "100% natural ingredients",
  ],
  ingredients: [
    {
      name: "Aloe Vera",
      safety: "Safe",
      description: "Natural moisturizer with healing properties",
      rating: "A",
    },
    {
      name: "Jojoba Oil",
      safety: "Safe",
      description: "Mimics skin's natural oils, non-comedogenic",
      rating: "A",
    },
    {
      name: "Vitamin E",
      safety: "Safe",
      description: "Antioxidant, helps protect skin",
      rating: "A",
    },
  ],
  reviews: {
    average: 4.8,
    count: 128,
    distribution: {
      5: 80,
      4: 32,
      3: 12,
      2: 3,
      1: 1,
    },
  },
};

// Function to determine progress bar color based on danger score
function getScoreColor(score: number) {
  if (score < 30) return "bg-[hsl(var(--peacock))]";
  if (score < 60) return "bg-[hsl(var(--sunshine))]";
  return "bg-[hsl(var(--coral))]";
}

// Function to determine badge variant based on rating
const getRatingBadgeVariant = (rating: string) => {
  if (rating === "A") return "outline";
  if (rating === "B") return "secondary";
  return "destructive";
};

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
            <Image
              src={product.image}
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
                  src={product.image}
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
              <Badge variant={getRatingBadgeVariant(product.rating)}>
                {product.rating} Rating
              </Badge>
              <h1 className="text-3xl font-bold mt-2 mb-1">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
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

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Health Score</span>
              <span className="font-medium">{product.dangerScore}%</span>
            </div>
            <Progress
              value={product.dangerScore}
              className="h-3 mb-2"
              style={
                {
                  "--progress-background": getScoreColor(
                    product.dangerScore
                  ),
                } as React.CSSProperties
              }
            />
            {product.concerns.length > 0 ? (
              <div className="flex items-center gap-2 text-[hsl(var(--sunshine))]">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">This product has some concerns</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[hsl(var(--peacock))]">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">This product is safe to use</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-8">
            <h2 className="font-semibold mb-3">Key Benefits</h2>
            <ul className="grid grid-cols-2 gap-2">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-[hsl(var(--peacock))]" />
                  {benefit}
                </li>
              ))}
            </ul>
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
                {product.ingredients.map((ingredient, i) => (
                  <Card key={i}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{ingredient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ingredient.description}
                          </p>
                        </div>
                        <Badge
                          variant={getRatingBadgeVariant(ingredient.rating)}
                        >
                          {ingredient.rating}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-[hsl(var(--peacock))]" />
                        <span className="text-[hsl(var(--peacock))]">
                          {ingredient.safety}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="flex items-start gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">
                    {product.reviews.average}
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.reviews.average)
                            ? "text-[hsl(var(--sunshine))] fill-[hsl(var(--sunshine))]"
                            : "text-[hsl(var(--muted-foreground))]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.reviews.count} reviews
                  </p>
                </div>

                <div className="flex-1">
                  {Object.entries(product.reviews.distribution)
                    .reverse()
                    .map(([rating, count]) => (
                      <div
                        key={rating}
                        className="flex items-center gap-2 mb-2"
                      >
                        <div className="w-8 text-sm">{rating}★</div>
                        <div className="flex-1">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[hsl(var(--sunshine))]"
                              style={{
                                width: `${
                                  (count / product.reviews.count) * 100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-8 text-sm text-right">{count}</div>
                      </div>
                    ))}
                </div>
              </div>

              <Button className="w-full">
                Read All Reviews <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
          </Tabs>
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
                  src={product.image}
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
}

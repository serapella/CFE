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

// Product data
const products = [
  {
    id: 1,
    name: "Natural Daily Moisturizer",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
    brand: "Pure Essentials",
    category: "Moisturizer",
    dangerScore: 12, // Low danger score (good)
    rating: "A",
    keyIngredients: ["Aloe Vera", "Jojoba Oil", "Vitamin E"],
    concerns: [],
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    image: "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg",
    brand: "GlowBoost",
    category: "Face Cream",
    dangerScore: 35, // Medium danger score
    rating: "B",
    keyIngredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
    concerns: ["Contains fragrance"],
  },
  {
    id: 3,
    name: "Ultra Shine Shampoo",
    image: "https://images.pexels.com/photos/3735219/pexels-photo-3735219.jpeg",
    brand: "LuxHair",
    category: "Shampoo",
    dangerScore: 72, // High danger score (bad)
    rating: "C",
    keyIngredients: ["Sodium Laureth Sulfate", "Fragrance", "Methylparaben"],
    concerns: ["Contains sulfates", "Contains parabens", "Contains fragrance"],
  },
];

// Function to determine progress bar color based on danger score
const getDangerScoreColor = (score: number) => {
  if (score < 30) return "bg-[hsl(var(--peacock))]"; // Low danger (good)
  if (score < 60) return "bg-[hsl(var(--sunshine))]"; // Medium danger
  return "bg-[hsl(var(--coral))]"; // High danger (bad)
};

// Function to determine badge variant based on rating
const getRatingBadgeVariant = (rating: string) => {
  if (rating === "A") return "outline";
  if (rating === "B") return "secondary";
  return "destructive";
};

export default function ProductsPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Database</h1>
        <p className="text-muted-foreground">
          Browse and search for products to see their health scores and
          ingredients
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
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <Badge variant={getRatingBadgeVariant(product.rating)}>
                        {product.rating} Rating
                      </Badge>
                      <h3 className="font-semibold text-lg mt-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.brand} • {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Danger Score</span>
                      <span className="text-sm font-medium">
                        {product.dangerScore}%
                      </span>
                    </div>
                    <Progress
                      value={product.dangerScore}
                      className="h-2"
                      style={
                        {
                          "--progress-background": getDangerScoreColor(
                            product.dangerScore
                          ),
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.keyIngredients.map((ingredient) => (
                        <Badge
                          key={ingredient}
                          variant="outline"
                          className="text-xs"
                        >
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {product.concerns.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-[hsl(var(--sunshine))]">
                        <AlertTriangle className="h-3.5 w-3.5" /> Concerns:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {product.concerns.map((concern, i) => (
                          <li key={i} className="flex items-start gap-1 mt-1">
                            <span className="h-3.5 w-3.5 rounded-full border border-[hsl(var(--sunshine))] flex-shrink-0"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.concerns.length === 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-[hsl(var(--peacock))]">
                        <ThumbsUp className="h-3.5 w-3.5" /> No concerns
                        detected
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Search className="h-3.5 w-3.5 mr-1" /> Details
                      </Button>
                    </Link>
                    <Link
                      href={`/products/alternatives/${product.id}`}
                      className="flex-1"
                    >
                      <Button variant="secondary" className="w-full">
                        Alternatives
                      </Button>
                    </Link>
                  </div>
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
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                        fill
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            variant={getRatingBadgeVariant(product.rating)}
                          >
                            {product.rating} Rating
                          </Badge>
                          <h3 className="font-semibold text-lg mt-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product.brand} • {product.category}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium mr-2">
                              Danger Score:
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                product.dangerScore < 30
                                  ? "text-[hsl(var(--peacock))]"
                                  : product.dangerScore < 60
                                  ? "text-[hsl(var(--sunshine))]"
                                  : "text-[hsl(var(--coral))]"
                              }`}
                            >
                              {product.dangerScore}%
                            </span>
                          </div>
                          <Progress
                            value={product.dangerScore}
                            className="h-2 w-32"
                            style={
                              {
                                "--progress-background": getDangerScoreColor(
                                  product.dangerScore
                                ),
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Key Ingredients:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {product.keyIngredients.map((ingredient) => (
                              <Badge
                                key={ingredient}
                                variant="outline"
                                className="text-xs"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              <Search className="h-3.5 w-3.5 mr-1" /> Details
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

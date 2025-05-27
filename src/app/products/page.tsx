"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  FilterX, 
  SlidersHorizontal, 
  AlertTriangle,
  ThumbsUp,
  ChevronDown,
  QrCode,
  ShoppingCart
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
    image: "/window.svg",
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
    image: "/window.svg",
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
    image: "/window.svg",
    brand: "LuxHair",
    category: "Shampoo",
    dangerScore: 72, // High danger score (bad)
    rating: "C",
    keyIngredients: ["Sodium Laureth Sulfate", "Fragrance", "Methylparaben"],
    concerns: ["Contains sulfates", "Contains parabens", "Contains fragrance"],
  },
  {
    id: 4,
    name: "Sensitive Skin Cleanser",
    image: "/window.svg",
    brand: "DermaCare",
    category: "Face Cleanser",
    dangerScore: 18,
    rating: "A",
    keyIngredients: ["Glycerin", "Chamomile Extract", "Allantoin"],
    concerns: [],
  },
  {
    id: 5,
    name: "Volumizing Hair Spray",
    image: "/window.svg",
    brand: "VolumePlus",
    category: "Hair Spray",
    dangerScore: 65,
    rating: "C",
    keyIngredients: ["Alcohol Denat.", "Butane", "Fragrance"],
    concerns: ["Contains propellants", "Contains alcohol", "Contains fragrance"],
  },
  {
    id: 6,
    name: "Organic Body Lotion",
    image: "/window.svg",
    brand: "EcoBody",
    category: "Body Lotion",
    dangerScore: 8,
    rating: "A",
    keyIngredients: ["Shea Butter", "Coconut Oil", "Aloe Vera"],
    concerns: [],
  },
];

// Function to determine progress bar color based on danger score
const getDangerScoreColor = (score: number) => {
  if (score < 30) return "bg-green-500"; // Low danger (good)
  if (score < 60) return "bg-yellow-500"; // Medium danger
  return "bg-red-500"; // High danger (bad)
};

// Function to determine badge variant based on rating
const getRatingBadgeVariant = (rating: string) => {
  if (rating === "A") return "outline";
  if (rating === "B") return "secondary";
  return "destructive";
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    if (category !== "all" && product.category !== category) {
      return false;
    }
    
    if (rating !== "all" && product.rating !== rating) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "score") {
      return a.dangerScore - b.dangerScore;
    } else if (sortBy === "rating") {
      return a.rating.localeCompare(b.rating);
    }
    return 0;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Database</h1>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
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

      <Collapsible open={filtersVisible} onOpenChange={setFiltersVisible}>
        <CollapsibleContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Health Rating</label>
                <Select value={rating} onValueChange={setRating}>
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
                <label className="text-sm font-medium mb-1 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="score">Health Score (Best First)</SelectItem>
                    <SelectItem value="rating">Rating (Best First)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("all");
                    setRating("all");
                    setSortBy("name");
                  }}
                >
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
            Showing {sortedProducts.length} of {products.length} products
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-6">
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
                      <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Danger Score</span>
                      <span className="text-sm font-medium">{product.dangerScore}%</span>
                    </div>
                    <Progress value={product.dangerScore} className="h-2" 
                      style={{ 
                        "--progress-background": getDangerScoreColor(product.dangerScore)
                      } as React.CSSProperties} 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.keyIngredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {product.concerns.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                        <AlertTriangle className="h-3.5 w-3.5" /> Concerns:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {product.concerns.map((concern, i) => (
                          <li key={i} className="flex items-start gap-1 mt-1">
                            <span className="h-3.5 w-3.5 rounded-full border border-yellow-500 dark:border-yellow-400 flex-shrink-0"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {product.concerns.length === 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium flex items-center gap-1 text-green-500">
                        <ThumbsUp className="h-3.5 w-3.5" /> No concerns detected
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Search className="h-3.5 w-3.5 mr-1" /> Details
                      </Button>
                    </Link>
                    <Link href={`/products/alternatives/${product.id}`} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        Alternatives
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
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
                          <Badge variant={getRatingBadgeVariant(product.rating)}>
                            {product.rating} Rating
                          </Badge>
                          <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium mr-2">Danger Score:</span>
                            <span 
                              className={`text-sm font-bold ${
                                product.dangerScore < 30 
                                  ? 'text-green-500' 
                                  : product.dangerScore < 60 
                                    ? 'text-yellow-500' 
                                    : 'text-red-500'
                              }`}
                            >
                              {product.dangerScore}%
                            </span>
                          </div>
                          <Progress value={product.dangerScore} className="h-2 w-32" 
                            style={{ 
                              "--progress-background": getDangerScoreColor(product.dangerScore)
                            } as React.CSSProperties} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Key Ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.keyIngredients.map((ingredient) => (
                              <Badge key={ingredient} variant="outline" className="text-xs">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
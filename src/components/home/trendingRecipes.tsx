import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Utensils, ChevronRight, Heart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/models';

async function getTrendingRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/recipes`, {
      next: { tags: ["recipes"] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const allRecipes: Recipe[] = await response.json();
    const sorted = allRecipes.sort((a, b) => {
      if (a.preparation_time && b.preparation_time) {
        return a.preparation_time - b.preparation_time;
      }
      return a.id - b.id;
    });
    return sorted.slice(0, 4);
  } catch (error) {
    console.error('Error fetching trending recipes:', error);
    return [];
  }
}

export default async function TrendingRecipes() {
  const recipes = await getTrendingRecipes();
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending healthy recipes
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover popular recipes loved by our community
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/recipes">
              <Button variant="outline" className="gap-2">
                View all recipes <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden h-full">
              <div className="relative aspect-[4/3]">
                <Image 
                  src={recipe.image_url || "/BarcodeBM.png"} 
                  alt={recipe.name}
                  className="object-cover"
                  fill
                />
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {recipe.difficulty_level ? `Level ${recipe.difficulty_level}` : "-"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span className="mr-3">{recipe.preparation_time ? `${recipe.preparation_time} min` : "-"}</span>
                  <Utensils className="h-3.5 w-3.5 mr-1" />
                  <span>{recipe.difficulty_level ? `Level ${recipe.difficulty_level}` : "-"}</span>
                </div>
                {recipe.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {recipe.description}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/recipes/${recipe.id}`} className="w-full">
                  <Button variant="secondary" className="w-full">View Recipe</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
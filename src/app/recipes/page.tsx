import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/models";
import { recipeQueries } from "@/queries/recipeQueries";

export const metadata: Metadata = {
  title: "Recipes | BODYMATTERS",
  description: "Discover natural beauty recipes and DIY solutions",
};

export default async function RecipesPage() {
  const recipes = await recipeQueries.getAll();

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Natural Beauty Recipes</h1>
        <p className="text-lg text-muted-foreground">
          Discover DIY beauty solutions using natural ingredients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe: Recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={recipe.image_url || "/fallback.png"}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  {recipe.difficulty_level ? `Level ${recipe.difficulty_level}` : 'Easy'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {recipe.preparation_time ? `${recipe.preparation_time} mins` : '15 mins'}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {recipe.description}
              </p>
              <Link href={`/recipes/${recipe.id}`}>
                <Button variant="outline" className="w-full">
                  View Recipe
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
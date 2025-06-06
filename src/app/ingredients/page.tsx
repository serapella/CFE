import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ingredient } from "@/types/models";
import { ingredientQueries } from "@/queries/ingredientQueries";

export default async function IngredientsPage() {
  const ingredients = await ingredientQueries.getAll();

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Ingredients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ingredients.map((ingredient: Ingredient) => (
          <Card key={ingredient.id} className="overflow-hidden">
            <div className="relative aspect-square"></div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{ingredient.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {ingredient.description}
              </p>
              <Link href={`/ingredients/${ingredient.id}`}>
                <Button variant="outline" className="w-full">
                  View Ingredient
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Recipes | BODYMATTERS",
  description: "Discover natural beauty recipes and DIY solutions",
};

const recipes = [
  {
    id: "face-mask",
    title: "Natural Face Mask",
    description: "A soothing face mask made with honey and oatmeal",
    image: "/recipes/face-mask.jpg",
    difficulty: "Easy",
    time: "15 mins"
  },
  {
    id: "hair-mask",
    title: "Nourishing Hair Mask",
    description: "Deep conditioning treatment with coconut oil",
    image: "/recipes/hair-mask.jpg",
    difficulty: "Medium",
    time: "30 mins"
  },
  {
    id: "body-scrub",
    title: "Exfoliating Body Scrub",
    description: "Gentle scrub with sugar and essential oils",
    image: "/recipes/body-scrub.jpg",
    difficulty: "Easy",
    time: "10 mins"
  },
  {
    id: "lip-balm",
    title: "Natural Lip Balm",
    description: "Moisturizing lip balm with shea butter",
    image: "/recipes/lip-balm.jpg",
    difficulty: "Medium",
    time: "20 mins"
  }
];

export default function RecipesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Natural Beauty Recipes</h1>
        <p className="text-lg text-muted-foreground">
          Discover DIY beauty solutions using natural ingredients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{recipe.difficulty}</span>
                <span className="text-sm text-muted-foreground">{recipe.time}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
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
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { productQueries } from "@/queries/productQueries";
import { Product } from "@/types/models";

export const metadata: Metadata = {
  title: "Products | BODYMATTERS",
  description: "Browse our collection of natural and organic beauty products",
};

export default async function ProductsPage() {
  const products = await productQueries.getAll();

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our curated collection of natural and organic beauty products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image_url || "/fallback.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {product.brand?.name}
              </p>
              <Link href={`/products/${product.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

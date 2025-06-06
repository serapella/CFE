"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingGrid } from "@/components/ui/loading";
import Link from "next/link";

export function ProductList() {
  const [data, setData] = useState<{ data: Product[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load products. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const productList = data?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productList.map((product: Product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {product.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
            )}
            {product.barcode && (
              <p className="text-sm text-muted-foreground mb-4">
                Barcode: {product.barcode}
              </p>
            )}
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}

      {productList.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}

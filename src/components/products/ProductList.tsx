"use client";

import { useState } from "react";
import { Product } from "@/types/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingGrid } from "@/components/ui/loading";
import Link from "next/link";
import { useFormState } from "react-dom";
import { handleAddProduct } from "@/action";
import type { Message } from "@/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";

interface ProductListProps {
  initialProducts: Product[];
}

const initialState: Message = {
  type: undefined,
  message: undefined,
};

export function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [createState, createAction] = useFormState(
    (prevState: Message, formData: FormData) => handleAddProduct(formData),
    initialState
  );

  // Update products list when a new product is created
  if (createState.type === "success") {
    setIsDialogOpen(false);
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form action={createAction} className="space-y-4" onInvalid={e => e.preventDefault()}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" name="barcode" />
              </div>
              <Button type="submit" className="w-full">
                Create Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {createState.message && (
        <Alert
          variant={createState.type === "success" ? "default" : "destructive"}
        >
          <AlertDescription>{createState.message}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <LoadingGrid />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{product.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                    className={
                      favorites.includes(product.id) ? "text-red-500" : ""
                    }
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                </div>
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
                <Link href={`/products/${product.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

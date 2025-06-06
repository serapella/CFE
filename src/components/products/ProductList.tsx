"use client";

import { useState } from "react";
import { Product } from "@/types/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingGrid } from "@/components/ui/loading";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createProduct, deleteProduct, ProductFormState } from "@/actions/productActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProductListProps {
  initialProducts?: Product[];
}

const initialState: ProductFormState = {
  success: undefined,
  message: undefined,
  errors: undefined,
  data: undefined,
};

export function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [createState, createAction] = useFormState(createProduct, initialState);
  const [deleteState, deleteAction] = useFormState(deleteProduct, initialState);

  // Update products list when a new product is created
  if (createState.success && createState.data) {
    setProducts([...products, createState.data]);
    setIsDialogOpen(false);
  }

  // Remove product from list when deleted
  if (deleteState.success) {
    const productId = deleteState.data?.id;
    if (productId) {
      setProducts(products.filter(p => p.id !== productId));
    }
  }

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
            <form action={createAction} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className={createState.errors?.name ? "border-red-500" : ""}
                />
                {createState.errors?.name && (
                  <p className="text-sm text-red-500">{createState.errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  className={createState.errors?.description ? "border-red-500" : ""}
                />
                {createState.errors?.description && (
                  <p className="text-sm text-red-500">{createState.errors.description}</p>
                )}
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  name="barcode"
                  className={createState.errors?.barcode ? "border-red-500" : ""}
                />
                {createState.errors?.barcode && (
                  <p className="text-sm text-red-500">{createState.errors.barcode}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {createState.message && (
        <Alert variant={createState.success ? "default" : "destructive"}>
          <AlertDescription>{createState.message}</AlertDescription>
        </Alert>
      )}

      {deleteState.message && (
        <Alert variant={deleteState.success ? "default" : "destructive"}>
          <AlertDescription>{deleteState.message}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <LoadingGrid />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
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
                <div className="flex gap-2">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <form action={deleteAction} className="flex-1">
                    <input type="hidden" name="id" value={product.id} />
                    <Button variant="destructive" className="w-full" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
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

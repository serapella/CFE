"use client";

import { useFormState } from "react-dom";
import { Product } from "@/types/models";
import { updateProduct, ProductFormState } from "@/actions/productActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductFormProps {
  product: Product;
}

const initialState: ProductFormState = {
  success: undefined,
  message: undefined,
  errors: undefined,
  data: undefined,
};

export function ProductForm({ product }: ProductFormProps) {
  const [state, formAction] = useFormState(updateProduct, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={product.id} />
        
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            className={state.errors?.name ? "border-red-500" : ""}
          />
          {state.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            defaultValue={product.description || ""}
            className={state.errors?.description ? "border-red-500" : ""}
          />
          {state.errors?.description && (
            <p className="text-sm text-red-500">{state.errors.description}</p>
          )}
        </div>

        <div>
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            name="barcode"
            defaultValue={product.barcode || ""}
            className={state.errors?.barcode ? "border-red-500" : ""}
          />
          {state.errors?.barcode && (
            <p className="text-sm text-red-500">{state.errors.barcode}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Update Product
        </Button>
      </form>

      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
} 
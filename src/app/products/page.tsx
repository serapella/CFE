import { Suspense } from "react";
import { Metadata } from "next";
import { Product } from "@/types";
import { LoadingGrid } from "@/components/ui/loading";
import { ProductList } from "@/components/features/products/ProductList";

export const metadata: Metadata = {
  title: "Products | BODYMATTERS",
  description: "Browse our collection of natural and safe cosmetic products.",
};

async function getProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.data as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <Suspense fallback={<LoadingGrid />}>
        <ProductList initialProducts={products} />
      </Suspense>
    </div>
  );
}

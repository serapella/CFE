//VOOR PAGE COMPONENTEN (SERVER SIDE), initial data , SEO kritieke content gebruiken
// Page components (Server Components)
// Initial data loading
// SEO-kritieke content
// Statische data
import { Product, Review, Ingredient } from '@/types/models';
import { Tags } from '@/action';

// Server-side fetch functions for Next.js pages
export const productQueries = {
  getAll: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products`, {
      next: { tags: [Tags.products] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}`, {
      next: { tags: [`${Tags.productDetail}-${id}`] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  getReviews: async (id: number): Promise<Review[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/reviews`, {
      next: { tags: [`${Tags.productDetail}-${id}`] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  },

  getAlternatives: async (id: number): Promise<Product[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/alternatives`, {
      next: { tags: [`${Tags.productDetail}-${id}`] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch alternatives');
    }
    return response.json();
  },

  getByBarcode: async (barcode: string): Promise<Product> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/barcode/${barcode}`, {
      next: { tags: [Tags.products] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch product by barcode');
    }
    return response.json();
  },

  getIngredients: async (id: number): Promise<Ingredient[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/ingredients`, {
      next: { tags: [`${Tags.productDetail}-${id}`] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }
    return response.json();
  }
}; 
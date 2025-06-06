//VOOR PAGE COMPONENTEN (SERVER SIDE), initial data , SEO kritieke content gebruiken

import { Product, Review, Ingredient } from '@/types/models';

// Server-side fetch functions for Next.js pages
export const productQueries = {
  getAll: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products`, {
      cache: 'force-cache', // Default caching
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  getReviews: async (id: number): Promise<Review[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/reviews`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  },

  getAlternatives: async (id: number): Promise<Product[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/alternatives`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch alternatives');
    }
    return response.json();
  },

  getByBarcode: async (barcode: string): Promise<Product> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/barcode/${barcode}`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch product by barcode');
    }
    return response.json();
  },

  getIngredients: async (id: number): Promise<Ingredient[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/products/${id}/ingredients`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }
    return response.json();
  }
}; 
// src/types.ts
// Fallback RowDataPacket type if mysql2 is not available
// Remove this if you have @types/mysql2 installed
// @ts-ignore

  
  export interface ProductDB extends RowDataPacket {
  
      id: number;
      name: string;
      barcode: string;
      brand?: { id: number; name: string };
      category?: { id: number; name: string };
      ingredients?: { id: number; name: string; description?: string }[];
      score?: number;
      image_url?: string;
      description?: string;
      created_at?: string;
      updated_at?: string;
    }
  
  
  export interface Product {
    id: number;
    name: string;
    barcode: string;
    brand?: { id: number; name: string };
    category?: { id: number; name: string };
    ingredients?: { id: number; name: string; description?: string }[];
    score?: number;
    image_url?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface IngredientDB extends RowDataPacket {
    id: number;
    name: string;
    danger_level: number;
    origin: string;
  }
  
  export interface Ingredient {
    id: number;
    name: string;
    dangerLevel: number;
    origin: string;
  }
  
  export interface RecipeDB extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    category_id: number;
  }
  
  export interface Recipe {
    id: number;
    title: string;
    description: string;
    categoryId: number;
  }
  
  export interface ReviewDB extends RowDataPacket {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
  }
  
  export interface Review {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    comment: string;
  }
  
  export interface CategoryDB extends RowDataPacket {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  export type Message = { type: string; message: string };
  
// Add your TypeScript types and interfaces here. 
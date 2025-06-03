// src/types.ts
// Fallback RowDataPacket type if mysql2 is not available
// Remove this if you have @types/mysql2 installed
// @ts-ignore
// src/types.ts


export interface Product {
  id: number;
  name: string;
  barcode: string;
  brand?: Brand;
  category?: Category;
  ingredients?: Ingredient[];
  score?: number;
  image_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  reviews?: Review[]; // Optioneel: lijst van reviews bij het product
}

// Brand type
export interface Brand {
  id: number;
  name: string;
}

// Category type
export interface Category {
  id: number;
  name: string;
  description?: string;
}

// Ingredient type
export interface Ingredient {
  id: number;
  name: string;
  description?: string;
  dangerLevel?: number;
  origin?: string;
}

// Recipe type
export interface Recipe {
  id: number;
  title: string;
  description?: string;
  categoryId: number;
  ingredients?: Ingredient[]; // Optioneel: lijst van ingrediënten in het recept
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Review type
export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  created_at?: string;
  user?: User; // Optioneel: user info bij de review
}

// User type (optioneel, voor reviews)
export interface User {
  id: number;
  name: string;
  avatar_url?: string;
}

// Message type
export type Message = { type: string; message: string };

// Voeg hier extra types/interfaces toe indien nodig.
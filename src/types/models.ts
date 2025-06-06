export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  profile_photo_path?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  barcode?: string;
  image_url?: string;
  brand?: Brand;
  category?: Category;
  score?: number;
  ingredients?: Ingredient[];
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: number;
  name: string;
  description?: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  time: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  product: Product;
  amount: number;
  unit: string;
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
} 
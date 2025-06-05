export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  category: Category;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  time: number; // in minutes
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  product: Product;
  amount: number;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: {
    products: Product[];
    recipes: Recipe[];
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
} 
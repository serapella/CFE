import type { Product, Category, Ingredient, Recipe } from "./types";
import { ApiService } from "./lib/api";

// Products
export async function getProducts(): Promise<Product[]> {
  return ApiService.getProducts();
}

export async function getProduct(id: number): Promise<Product> {
  return ApiService.getProduct(id);
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return ApiService.getCategories();
}

export async function getCategory(id: number): Promise<Category> {
  return ApiService.getCategory(id);
}

// Ingredients
export async function getIngredients(): Promise<Ingredient[]> {
  return ApiService.getIngredients();
}

export async function getIngredient(id: number): Promise<Ingredient> {
  return ApiService.getIngredient(id);
}

// Recipes
export async function getRecipes(): Promise<Recipe[]> {
  return ApiService.getRecipes();
}

export async function getRecipe(id: number): Promise<Recipe> {
  return ApiService.getRecipe(id);
}

// Add similar functions for ingredients, categories, reviews, etc.

// Add your data fetching or query logic here. 
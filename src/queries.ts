import type { Product, Category, Ingredient, Recipe } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json() as Promise<Product[]>;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json() as Promise<Product>;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json() as Promise<Category[]>;
}

export async function getCategory(id: number): Promise<Category> {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json() as Promise<Category>;
}

// Ingredients
export async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${API_URL}/ingredients`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  return res.json() as Promise<Ingredient[]>;
}

export async function getIngredient(id: number): Promise<Ingredient> {
  const res = await fetch(`${API_URL}/ingredients/${id}`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch ingredient');
  return res.json() as Promise<Ingredient>;
}

// Recipes
export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${API_URL}/recipes`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json() as Promise<Recipe[]>;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    headers: { 'CBE-API-KEY': API_KEY! },
  });
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json() as Promise<Recipe>;
}

// Add similar functions for ingredients, categories, reviews, etc.

// Add your data fetching or query logic here. 
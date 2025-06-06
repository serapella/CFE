// src/action.ts
// Add your server actions or utilities here. 

"use server";

import { revalidateTag } from "next/cache";
import type { Product } from "@/types/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Message = {
  type: "success" | "error" | undefined;
  message: string | undefined;
};

// Tags voor verschillende types data
export const Tags = {
  products: "products",
  productDetail: "product-detail",
  recipes: "recipes",
  recipeDetail: "recipe-detail",
  ingredients: "ingredients",
  categories: "categories"
} as const;

// Product Actions
export const handleAddProduct = async (fd: FormData): Promise<Message> => {
  const name = fd.get("name") as string | null;
  const description = fd.get("description") as string | null;
  const barcode = fd.get("barcode") as string | null;

  if (!name) {
    return { type: "error", message: "Please enter a product name" };
  }

  try {
    const res = await fetch(`${API_URL}/api/proxy/products`, {
      method: "POST",
      body: JSON.stringify({ name, description, barcode }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to add product" };
    }

    revalidateTag(Tags.products);
    return { type: "success", message: "Product added successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while adding the product" };
  }
};

export const handleUpdateProduct = async (fd: FormData): Promise<Message> => {
  const id = fd.get("id") as string | null;
  const name = fd.get("name") as string | null;
  const description = fd.get("description") as string | null;
  const barcode = fd.get("barcode") as string | null;

  if (!id || !name) {
    return { type: "error", message: "Product ID and name are required" };
  }

  try {
    const res = await fetch(`${API_URL}/api/proxy/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description, barcode }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to update product" };
    }

    revalidateTag(Tags.products);
    revalidateTag(`${Tags.productDetail}-${id}`);
    return { type: "success", message: "Product updated successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while updating the product" };
  }
};

export const handleDeleteProduct = async (id: number): Promise<Message> => {
  try {
    const res = await fetch(`${API_URL}/api/proxy/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to delete product" };
    }

    revalidateTag(Tags.products);
    revalidateTag(`${Tags.productDetail}-${id}`);
    return { type: "success", message: "Product deleted successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while deleting the product" };
  }
};

// Recipe Actions
export const handleAddRecipe = async (fd: FormData): Promise<Message> => {
  const title = fd.get("title") as string | null;
  const description = fd.get("description") as string | null;
  if (!title || !description) {
    return { type: "error", message: "Please enter a title and description" };
  }

  try {
    const res = await fetch(`${API_URL}/api/proxy/recipes`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to add recipe" };
    }

    revalidateTag(Tags.recipes);
    return { type: "success", message: "Recipe added successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while adding the recipe" };
  }
};

export const handleDeleteRecipe = async (id: number): Promise<Message> => {
  try {
    const res = await fetch(`${API_URL}/api/proxy/recipes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to delete recipe" };
    }

    revalidateTag(Tags.recipes);
    revalidateTag(`${Tags.recipeDetail}-${id}`);
    return { type: "success", message: "Recipe deleted successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while deleting the recipe" };
  }
};

export const handleToggleFavoriteRecipe = async (id: number): Promise<Message> => {
  try {
    const res = await fetch(`${API_URL}/api/proxy/recipes/${id}/favorite`, {
      method: "POST",
    });

    if (!res.ok) {
      return { type: "error", message: "Failed to toggle favorite" };
    }

    revalidateTag(Tags.recipes);
    revalidateTag(`${Tags.recipeDetail}-${id}`);
    return { type: "success", message: "Favorite status updated successfully" };
  } catch (error) {
    return { type: "error", message: "An error occurred while updating favorite status" };
  }
};

// Repeat similar patterns for products, ingredients, categories, reviews, etc. 
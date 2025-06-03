// src/action.ts
// Add your server actions or utilities here. 

import type { Message } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Example: Add a new recipe
export const handleAddRecipe = async (fd: FormData): Promise<Message> => {
  const title = fd.get("title") as string | null;
  const description = fd.get("description") as string | null;
  if (!title || !description) {
    return { type: "error", message: "Please enter a title and description" };
  }
  const res = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return { type: "error", message: "Failed to add recipe" };
  return { type: "success", message: "Recipe added successfully" };
};

// Example: Delete a recipe
export const handleDeleteRecipe = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/recipes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete recipe");
};

// Example: Toggle favorite for a recipe
export const handleToggleFavoriteRecipe = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/recipes/${id}/favorite`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to toggle favorite");
};

// Repeat similar patterns for products, ingredients, categories, reviews, etc. 
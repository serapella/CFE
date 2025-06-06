import { Recipe } from '@/types/models';

export const recipeQueries = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/recipes`, {
      next: { tags: ["recipes"] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Recipe> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/recipes/${id}`, {
      next: { tags: [`recipe-${id}`] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    return response.json();
  }
}; 
import { Recipe } from '@/types/models';

export const recipeQueries = {
  getAll: async (): Promise<Recipe[]> => {
    console.time('recipesFetch');
    const response = await fetch(`/api/proxy/recipes`, {
      next: { tags: ["recipes"] },
      credentials: 'include',
    });
    console.timeEnd('recipesFetch');
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Recipe> => {
    const response = await fetch(`/api/proxy/recipes/${id}`, {
      next: { tags: [`recipe-${id}`] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    return response.json();
  }
}; 
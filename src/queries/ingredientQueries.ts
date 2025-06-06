import { Ingredient } from '@/types/models';

export const ingredientQueries = {
  getAll: async (): Promise<Ingredient[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/ingredients`, {
      next: { tags: ["ingredients"] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Ingredient> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/ingredients/${id}`, {
      next: { tags: [`ingredient-${id}`] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ingredient');
    }
    return response.json();
  }
}; 
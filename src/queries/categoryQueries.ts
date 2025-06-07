import { Category } from '@/types/models';

export const categoryQueries = {
  getAll: async (): Promise<Category[]> => {
    console.time('categoriesFetch');
    const response = await fetch(`/api/categories`, {
      next: { tags: ["categories"] },
      credentials: 'include',
    });
    console.timeEnd('categoriesFetch');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Category> => {
    const response = await fetch(`/api/proxy/categories/${id}`, {
      next: { tags: [`category-${id}`] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return response.json();
  }
}; 
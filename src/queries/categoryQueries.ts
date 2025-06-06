import { Category } from '@/types/models';

export const categoryQueries = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/categories`, {
      next: { tags: ["categories"] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Category> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/categories/${id}`, {
      next: { tags: [`category-${id}`] }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    return response.json();
  }
}; 
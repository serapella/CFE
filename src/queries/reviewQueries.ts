import { Review } from '@/types/models';

export const reviewQueries = {
  getAll: async (): Promise<Review[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/reviews`, {
      next: { tags: ["reviews"] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  },

  getById: async (id: number): Promise<Review> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy/reviews/${id}`, {
      next: { tags: [`review-${id}`] },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch review');
    }
    return response.json();
  }
}; 
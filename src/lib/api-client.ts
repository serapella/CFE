import { Product, Recipe, Category } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiError extends Error {
  status?: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = new Error('API request failed');
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// API endpoints
export const api = {
  products: {
    list: () => apiClient<{ data: Product[] }>('/products'),
    get: (id: string) => apiClient<{ data: Product }>(`/products/${id}`),
    create: (data: Partial<Product>) => apiClient<{ data: Product }>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Product>) => apiClient<{ data: Product }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiClient<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    }),
  },
  recipes: {
    list: () => apiClient<{ data: Recipe[] }>('/recipes'),
    get: (id: string) => apiClient<{ data: Recipe }>(`/recipes/${id}`),
    create: (data: Partial<Recipe>) => apiClient<{ data: Recipe }>('/recipes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Recipe>) => apiClient<{ data: Recipe }>(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiClient<{ success: boolean }>(`/recipes/${id}`, {
      method: 'DELETE',
    }),
  },
  categories: {
    list: () => apiClient<{ data: Category[] }>('/categories'),
    get: (id: string) => apiClient<{ data: Category }>(`/categories/${id}`),
  },
}; 
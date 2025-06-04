// Types for API responses
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token?: string;
}

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.ddev.site';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/proxy/auth/login`,
    register: `${API_BASE_URL}/proxy/auth/register`,
    logout: `${API_BASE_URL}/proxy/auth/logout`,
    me: `${API_BASE_URL}/proxy/auth/me`,
    check: `${API_BASE_URL}/proxy/auth/check`,
  },
  products: {
    list: `${API_BASE_URL}/proxy/products`,
    create: `${API_BASE_URL}/proxy/products`,
    getById: (id: string) => `${API_BASE_URL}/proxy/products/${id}`,
    update: (id: string) => `${API_BASE_URL}/proxy/products/${id}`,
    delete: (id: string) => `${API_BASE_URL}/proxy/products/${id}`,
    getByBarcode: (barcode: string) => `${API_BASE_URL}/proxy/products/barcode/${barcode}`,
  },
  categories: {
    list: `${API_BASE_URL}/proxy/categories`,
    create: `${API_BASE_URL}/proxy/categories`,
    getById: (id: string) => `${API_BASE_URL}/proxy/categories/${id}`,
    update: (id: string) => `${API_BASE_URL}/proxy/categories/${id}`,
    delete: (id: string) => `${API_BASE_URL}/proxy/categories/${id}`,
    products: (id: string) => `${API_BASE_URL}/proxy/categories/${id}/products`,
  },
  ingredients: {
    list: `${API_BASE_URL}/proxy/ingredients`,
    create: `${API_BASE_URL}/proxy/ingredients`,
    getById: (id: string) => `${API_BASE_URL}/proxy/ingredients/${id}`,
    update: (id: string) => `${API_BASE_URL}/proxy/ingredients/${id}`,
    delete: (id: string) => `${API_BASE_URL}/proxy/ingredients/${id}`,
  },
} as const;

// API Service class for handling all API calls
export class ApiService {
  private static async fetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Auth methods
  static async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async logout(): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.auth.logout, {
      method: 'POST',
    });
  }

  static async getCurrentUser(): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>(API_ENDPOINTS.auth.me);
  }

  static async checkAuth(): Promise<ApiResponse<AuthResponse>> {
    return this.fetch<AuthResponse>(API_ENDPOINTS.auth.check);
  }

  // Product methods
  static async getProducts(): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.products.list);
  }

  static async getProductById(id: string): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.products.getById(id));
  }

  static async getProductByBarcode(barcode: string): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.products.getByBarcode(barcode));
  }

  // Category methods
  static async getCategories(): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.categories.list);
  }

  static async getCategoryById(id: string): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.categories.getById(id));
  }

  static async getCategoryProducts(id: string): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.categories.products(id));
  }

  // Ingredient methods
  static async getIngredients(): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.ingredients.list);
  }

  static async getIngredientById(id: string): Promise<ApiResponse> {
    return this.fetch(API_ENDPOINTS.ingredients.getById(id));
  }
} 
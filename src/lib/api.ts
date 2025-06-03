import type { Product, Category, Ingredient, Recipe } from "../types";

export class ApiService {
  private static getApiUrl() {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Voor frontend routes (session auth) - gebruikt door de web applicatie
  private static async fetchFrontend<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(path, {
      ...options,
      credentials: 'include', // Belangrijk voor session cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Niet ingelogd');
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  // Voor externe API integraties (API key) - gebruikt door externe services/apps
  private static async fetchExternal<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.getApiUrl()}${path}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'CBE-API-KEY': process.env.NEXT_PUBLIC_API_KEY!, // Alleen voor externe integraties
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  // Auth routes
  static async checkAuth(): Promise<boolean> {
    return this.fetchFrontend<boolean>('/auth/check');
  }

  static async login(email: string, password: string): Promise<void> {
    return this.fetchFrontend<void>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async logout(): Promise<void> {
    return this.fetchFrontend<void>('/auth/logout', {
      method: 'POST',
    });
  }

  // Product routes
  static async getProducts(): Promise<Product[]> {
    return this.fetchFrontend<Product[]>('/products');
  }

  static async getProduct(id: number): Promise<Product> {
    return this.fetchFrontend<Product>(`/products/${id}`);
  }

  static async searchProducts(query: string): Promise<Product[]> {
    return this.fetchFrontend<Product[]>(`/products/search?query=${query}`);
  }

  static async getProductByBarcode(barcode: string): Promise<Product> {
    return this.fetchFrontend<Product>(`/products/barcode/${barcode}`);
  }

  static async getProductReviews(id: number) {
    return this.fetchFrontend(`/products/${id}/reviews`);
  }

  // Category routes
  static async getCategories(): Promise<Category[]> {
    return this.fetchFrontend<Category[]>('/categories');
  }

  static async getCategory(id: number): Promise<Category> {
    return this.fetchFrontend<Category>(`/categories/${id}`);
  }

  static async getCategoryProducts(id: number): Promise<Product[]> {
    return this.fetchFrontend<Product[]>(`/categories/${id}/products`);
  }

  // Ingredient routes
  static async getIngredients(): Promise<Ingredient[]> {
    return this.fetchFrontend<Ingredient[]>('/ingredients');
  }

  static async getIngredient(id: number): Promise<Ingredient> {
    return this.fetchFrontend<Ingredient>(`/ingredients/${id}`);
  }

  static async searchIngredients(query: string): Promise<Ingredient[]> {
    return this.fetchFrontend<Ingredient[]>(`/ingredients/search?query=${query}`);
  }

  // Recipe routes
  static async getRecipes(): Promise<Recipe[]> {
    return this.fetchFrontend<Recipe[]>('/recipes');
  }

  static async getRecipe(id: number): Promise<Recipe> {
    return this.fetchFrontend<Recipe>(`/recipes/${id}`);
  }

  static async searchRecipes(query: string): Promise<Recipe[]> {
    return this.fetchFrontend<Recipe[]>(`/recipes/search?query=${query}`);
  }

  static async getRecipeIngredients(id: number): Promise<Ingredient[]> {
    return this.fetchFrontend<Ingredient[]>(`/recipes/${id}/ingredients`);
  }

  // Externe API routes (API key)
  static async getExternalProducts(): Promise<Product[]> {
    return this.fetchExternal<Product[]>('/api/products');
  }

  static async getExternalProduct(id: number): Promise<Product> {
    return this.fetchExternal<Product>(`/api/products/${id}`);
  }

  static async searchExternalProducts(query: string): Promise<Product[]> {
    return this.fetchExternal<Product[]>(`/api/products/search?query=${query}`);
  }

  static async getExternalProductByBarcode(barcode: string): Promise<Product> {
    return this.fetchExternal<Product>(`/api/products/barcode/${barcode}`);
  }

  static async getExternalCategories(): Promise<Category[]> {
    return this.fetchExternal<Category[]>('/api/categories');
  }

  static async getExternalCategory(id: number): Promise<Category> {
    return this.fetchExternal<Category>(`/api/categories/${id}`);
  }

  static async getExternalCategoryProducts(id: number): Promise<Product[]> {
    return this.fetchExternal<Product[]>(`/api/categories/${id}/products`);
  }

  static async getExternalIngredients(): Promise<Ingredient[]> {
    return this.fetchExternal<Ingredient[]>('/api/ingredients');
  }

  static async getExternalIngredient(id: number): Promise<Ingredient> {
    return this.fetchExternal<Ingredient>(`/api/ingredients/${id}`);
  }

  static async searchExternalIngredients(query: string): Promise<Ingredient[]> {
    return this.fetchExternal<Ingredient[]>(`/api/ingredients/search?query=${query}`);
  }

  static async getExternalRecipes(): Promise<Recipe[]> {
    return this.fetchExternal<Recipe[]>('/api/recipes');
  }

  static async getExternalRecipe(id: number): Promise<Recipe> {
    return this.fetchExternal<Recipe>(`/api/recipes/${id}`);
  }

  static async searchExternalRecipes(query: string): Promise<Recipe[]> {
    return this.fetchExternal<Recipe[]>(`/api/recipes/search?query=${query}`);
  }

  static async getExternalRecipeIngredients(id: number): Promise<Ingredient[]> {
    return this.fetchExternal<Ingredient[]>(`/api/recipes/${id}/ingredients`);
  }
} 
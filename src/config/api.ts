import axios from 'axios';

// Create an axios instance with cookie and CSRF defaults
export const api = axios.create({
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://bodymattersadmin-8brl4.ondigitalocean.app',
});

// Helper to ensure CSRF cookie is set before mutating requests
async function ensureCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

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
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.ddev.site/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/proxy/auth/login',
    register: '/proxy/auth/register',
    logout: '/proxy/auth/logout',
    me: '/proxy/auth/me',
    check: '/proxy/auth/check',
  },
  products: {
    list: '/proxy/products',
    create: '/proxy/products',
    getById: (id: string) => `/proxy/products/${id}`,
    update: (id: string) => `/proxy/products/${id}`,
    delete: (id: string) => `/proxy/products/${id}`,
    getByBarcode: (barcode: string) => `/proxy/products/barcode/${barcode}`,
    reviews: (id: string) => `/proxy/products/${id}/reviews`,
  },
  categories: {
    list: '/proxy/categories',
    create: '/proxy/categories',
    getById: (id: string) => `/proxy/categories/${id}`,
    update: (id: string) => `/proxy/categories/${id}`,
    delete: (id: string) => `/proxy/categories/${id}`,
    products: (id: string) => `/proxy/categories/${id}/products`,
  },
  ingredients: {
    list: '/proxy/ingredients',
    create: '/proxy/ingredients',
    getById: (id: string) => `/proxy/ingredients/${id}`,
    update: (id: string) => `/proxy/ingredients/${id}`,
    delete: (id: string) => `/proxy/ingredients/${id}`,
  },
} as const;

// API Service class for handling all API calls
export const ApiService = {
  async login(email: string, password: string) {
    await ensureCsrfCookie();
    return api.post(API_ENDPOINTS.auth.login, { email, password });
  },
  async register(data: { name: string; email: string; password: string; password_confirmation: string }) {
    await ensureCsrfCookie();
    return api.post(API_ENDPOINTS.auth.register, data);
  },
  async logout() {
    await ensureCsrfCookie();
    return api.post(API_ENDPOINTS.auth.logout);
  },
  async getCurrentUser() {
    return api.get(API_ENDPOINTS.auth.me);
  },
  async checkAuth() {
    return api.get(API_ENDPOINTS.auth.check);
  },
  async getProducts() {
    return api.get(API_ENDPOINTS.products.list);
  },
  async getProductById(id: string) {
    return api.get(API_ENDPOINTS.products.getById(id));
  },
  async getProductByBarcode(barcode: string) {
    return api.get(API_ENDPOINTS.products.getByBarcode(barcode));
  },
  async getProductReviews(id: string) {
    return api.get(API_ENDPOINTS.products.reviews(id));
  },
  async getCategories() {
    return api.get(API_ENDPOINTS.categories.list);
  },
  async getCategoryById(id: string) {
    return api.get(API_ENDPOINTS.categories.getById(id));
  },
  async getCategoryProducts(id: string) {
    return api.get(API_ENDPOINTS.categories.products(id));
  },
  async getIngredients() {
    return api.get(API_ENDPOINTS.ingredients.list);
  },
  async getIngredientById(id: string) {
    return api.get(API_ENDPOINTS.ingredients.getById(id));
  },
}; 
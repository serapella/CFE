export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  profile_photo_path?: string | null;
  profile_photo_url?: string;
  created_at: string;
  updated_at: string;
  api_keys?: ApiKey[];
}

export interface ApiKey {
  id: number;
  key: string;
  credits: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  barcode?: string;
  image_url?: string;
  external_id?: string;
  composition_score?: number;
  brand_id?: number;
  created_at: string;
  updated_at: string;
  brand?: Brand;
  category?: Category;
  categories?: Category[];
  ingredients?: Ingredient[];
  reviews?: Review[];
  articles?: Article[];
  product_photos?: ProductPhoto[];
  primary_photo?: ProductPhoto;
}

export interface ProductPhoto {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string;
  order?: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Brand {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  logo_url?: string;
  website?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  products?: Product[];
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
  order?: number;
  parent_id?: number;
  created_at: string;
  updated_at: string;
  parent?: Category;
  children?: Category[];
  products?: Product[];
}

export interface Ingredient {
  id: number;
  external_id?: string;
  name: string;
  slug?: string;
  inci_name?: string;
  additive?: string;
  package_name?: string;
  score?: number;
  is_optional?: boolean;
  is_active?: boolean;
  description?: string;
  risk_level?: number;
  regulation?: string;
  reference?: string;
  cheminical_iupac_name?: string;
  cas?: string;
  einecs_elincs?: string;
  cosmetic_restriction?: string;
  created_at: string;
  updated_at: string;
  products?: Product[];
  articles?: Article[];
  recipes?: Recipe[];
  families?: IngredientFamily[];
  functions?: IngredientFunction[];
  dangers?: IngredientDanger[];
  special_mentions?: IngredientSpecialMention[];
  origins?: IngredientOrigin[];
}

export interface IngredientFamily {
  id: number;
  external_id?: string;
  name: string;
  score?: number;
  created_at: string;
  updated_at: string;
  ingredients?: Ingredient[];
}

export interface IngredientFunction {
  id: number;
  ingredient_id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  ingredient?: Ingredient;
}

export interface IngredientDanger {
  id: number;
  ingredient_id: number;
  value: number;
  label: string;
  color?: string;
  created_at: string;
  updated_at: string;
  ingredient?: Ingredient;
  categories?: IngredientDangerCategory[];
}

export interface IngredientDangerCategory {
  id: number;
  danger_id: number;
  label: string;
  icon?: string;
  created_at: string;
  updated_at: string;
  danger?: IngredientDanger;
}

export interface IngredientSpecialMention {
  id: number;
  ingredient_id: number;
  label: string;
  icon?: string;
  created_at: string;
  updated_at: string;
  ingredient?: Ingredient;
}

export interface IngredientOrigin {
  id: number;
  ingredient_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  ingredient?: Ingredient;
}

export interface Article {
  id: number;
  title: string;
  author?: string;
  source?: string;
  url?: string;
  abstract?: string;
  year?: number;
  journal?: string;
  pdf_path?: string;
  created_at: string;
  updated_at: string;
  ingredients?: Ingredient[];
}

export interface Recipe {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  instructions?: string;
  image_url?: string;
  preparation_time?: number;
  difficulty_level?: number;
  is_published?: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
  ingredients?: Ingredient[];
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  product?: Product;
}

export interface AuthResponse {
  user: User;
}
'use server'

import { revalidatePath } from 'next/cache';
import { Product } from '@/types/models';

export type ProductFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string;
    description?: string;
    barcode?: string;
  };
  data?: Product;
};

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    // Validate form data
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const barcode = formData.get('barcode') as string;

    const errors: ProductFormState['errors'] = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (errors.name) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors,
      };
    }

    const data: Partial<Product> = {
      name,
      description: description || undefined,
      barcode: barcode || undefined,
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const result = await response.json();
    revalidatePath('/products');
    
    return { 
      success: true, 
      message: 'Product created successfully',
      data: result.data 
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create product',
      errors: {
        name: 'An error occurred while creating the product'
      }
    };
  }
}

export async function updateProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    const id = formData.get('id') as string;
    if (!id) {
      throw new Error('Product ID is required');
    }

    // Validate form data
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const barcode = formData.get('barcode') as string;

    const errors: ProductFormState['errors'] = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (errors.name) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors,
      };
    }

    const data: Partial<Product> = {
      name,
      description: description || undefined,
      barcode: barcode || undefined,
    };

    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const result = await response.json();
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);
    
    return { 
      success: true, 
      message: 'Product updated successfully',
      data: result.data 
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update product',
      errors: {
        name: 'An error occurred while updating the product'
      }
    };
  }
}

export async function deleteProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    const id = formData.get('id') as string;
    if (!id) {
      throw new Error('Product ID is required');
    }

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    revalidatePath('/products');
    
    return { 
      success: true,
      message: 'Product deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete product',
      errors: {
        name: 'An error occurred while deleting the product'
      }
    };
  }
} 
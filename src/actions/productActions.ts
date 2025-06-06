'use server'

import { revalidatePath } from 'next/cache';
import { Product } from '@/types/models';

export async function createProduct(formData: FormData) {
  try {
    const data: Partial<Product> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      barcode: formData.get('barcode') as string || undefined,
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
      data: result.data 
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create product'
    };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const data: Partial<Product> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      barcode: formData.get('barcode') as string || undefined,
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
      data: result.data 
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update product'
    };
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete product'
    };
  }
} 
import { api } from './api';
import { Product, ProductFilters, ProductFormData, PriceHistoryEntry } from '../types/product';

export const productService = {
  // Get all products with optional filters
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    return api.get<Product[]>('/products', {
      name: filters?.name,
      min_stock: filters?.minStock,
      max_stock: filters?.maxStock,
      category: filters?.category,
    });
  },
  
  // Get a single product by ID
  getProduct: async (id: number): Promise<Product> => {
    return api.get<Product>(`/products/${id}`);
  },
  
  // Add a new product
  createProduct: async (product: ProductFormData): Promise<Product> => {
    return api.post<Product>('/products', product);
  },
  
  // Update an existing product
  updateProduct: async (id: number, product: Partial<ProductFormData>): Promise<Product> => {
    return api.put<Product>(`/products/${id}`, product);
  },
  
  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    return api.delete<void>(`/products/${id}`);
  },
  
  // Get price history for a product
  getPriceHistory: async (id: number): Promise<PriceHistoryEntry[]> => {
    return api.get<PriceHistoryEntry[]>(`/products/${id}/price-history`);
  }
};
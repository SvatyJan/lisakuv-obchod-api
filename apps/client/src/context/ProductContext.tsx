import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { Product, ProductFilters, ProductFormData, PriceHistoryEntry } from '../types/product';
import { productService } from '../services/productService';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  selectedProduct: Product | null;
  priceHistory: PriceHistoryEntry[];
  loadProducts: (filters?: ProductFilters) => Promise<void>;
  getProductById: (id: number) => Promise<void>;
  createProduct: (product: ProductFormData) => Promise<boolean>;
  updateProduct: (id: number, product: Partial<ProductFormData>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
  getPriceHistory: (id: number) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});

  const loadProducts = async (newFilters?: ProductFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const currentFilters = newFilters || filters;
      const data = await productService.getProducts(currentFilters);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await productService.getProduct(id);
      setSelectedProduct(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load product details';
      setError(errorMessage);
      toast.error('Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriceHistory = async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await productService.getPriceHistory(id);
      setPriceHistory(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load price history';
      setError(errorMessage);
      toast.error('Failed to load price history');
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (product: ProductFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await productService.createProduct(product);
      toast.success('Product created successfully!');
      await loadProducts();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      setError(errorMessage);
      toast.error('Failed to create product');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: number, product: Partial<ProductFormData>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await productService.updateProduct(id, product);
      toast.success('Product updated successfully!');
      
      // Reload the current product and the product list
      if (selectedProduct?.id === id) {
        await getProductById(id);
      }
      await loadProducts();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      toast.error('Failed to update product');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await productService.deleteProduct(id);
      toast.success('Product deleted successfully!');
      
      // Clear selected product if it was deleted
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
      
      // Reload the product list
      await loadProducts();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      setError(errorMessage);
      toast.error('Failed to delete product');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        filters,
        selectedProduct,
        priceHistory,
        loadProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        getPriceHistory,
        setFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
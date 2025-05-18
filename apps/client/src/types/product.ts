export type Product = {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategory = 
  | 'fruits' 
  | 'nuts' 
  | 'vegetables' 
  | 'berries' 
  | 'mushrooms' 
  | 'herbs'
  | 'other';

export type PriceHistoryEntry = {
  id: number;
  productId: number;
  oldPrice: number;
  newPrice: number;
  changedAt: string;
};

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type ProductFilters = {
  name?: string;
  minStock?: number;
  maxStock?: number;
  category?: ProductCategory;
};
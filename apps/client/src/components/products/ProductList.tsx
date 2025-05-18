import React, { useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { Package } from 'lucide-react';

const ProductList: React.FC = () => {
  const { products, isLoading, error, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <Package className="h-12 w-12 text-forest-400" />
          <p className="mt-2 text-forest-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-600">Error: {error}</p>
        <button 
          className="mt-2 text-sm text-forest-500 hover:text-forest-700"
          onClick={() => loadProducts()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <ProductFilter />
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-forest-300" />
          <h3 className="mt-4 text-xl font-medium text-forest-500">No products found</h3>
          <p className="mt-1 text-forest-400">
            Try adjusting your filters or add a new product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
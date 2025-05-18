import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-forest-700">Products</h1>
          <p className="text-forest-600 mt-1">
            Manage your forest products inventory
          </p>
        </div>
        
        <Link to="/add">
          <Button className="bg-fox-500 hover:bg-fox-600 flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      
      <ProductList />
    </Layout>
  );
};

export default ProductsPage;
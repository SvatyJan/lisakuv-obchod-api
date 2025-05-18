import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import type { ProductFormData } from '../types/product';
import { Button } from '../components/ui/button';
import ProductForm from '../components/products/ProductForm';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, isLoading } = useProducts();

  const handleSubmit = async (data: ProductFormData) => {
    const success = await createProduct(data);
    if (success) {
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-forest-700">Add New Product</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-forest-100">
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </div>
    </Layout>
  );
};

export default AddProductPage;

function useProducts(): { createProduct: any; isLoading: any; } {
  throw new Error('Function not implemented.');
}

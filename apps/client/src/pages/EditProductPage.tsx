import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Edit, PackageOpen } from 'lucide-react';
import { ProductFormData } from '../types/product';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProduct, getProductById, updateProduct, isLoading, error } = useProducts();

  useEffect(() => {
    if (id) {
      getProductById(parseInt(id));
    }
  }, [id]);

  const handleSubmit = async (data: ProductFormData) => {
    if (id) {
      const success = await updateProduct(parseInt(id), data);
      if (success) {
        navigate(`/product/${id}`);
      }
    }
  };

  if (isLoading && !selectedProduct) {
    return (
      <Layout>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <PackageOpen className="h-12 w-12 text-forest-400" />
            <p className="mt-2 text-forest-500">Loading product details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !selectedProduct) {
    return (
      <Layout>
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || "Product not found"}</p>
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate(`/product/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-forest-700">
          <Edit className="h-6 w-6 inline mr-2" />
          Edit {selectedProduct.name}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-forest-100">
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </div>
    </Layout>
  );
};

export default EditProductPage;
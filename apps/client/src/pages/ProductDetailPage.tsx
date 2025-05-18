import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { Edit, ArrowLeft, Trash2, PackageOpen, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatCurrency, formatDate } from '../utils/formatters';
import PriceHistoryChart from '../components/products/PriceHistoryChart';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    selectedProduct, 
    getProductById, 
    deleteProduct, 
    priceHistory,
    getPriceHistory,
    isLoading, 
    error 
  } = useProducts();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      getProductById(productId);
      getPriceHistory(productId);
    }
  }, [id]);

  const handleDelete = async () => {
    if (selectedProduct && window.confirm(`Are you sure you want to delete ${selectedProduct.name}?`)) {
      const success = await deleteProduct(selectedProduct.id);
      if (success) {
        navigate('/');
      }
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'fruits':
        return '🍎';
      case 'nuts':
        return '🌰';
      case 'vegetables':
        return '🥕';
      case 'berries':
        return '🍓';
      case 'mushrooms':
        return '🍄';
      case 'herbs':
        return '🌿';
      default:
        return '📦';
    }
  };

  if (isLoading) {
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
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-forest-700">
          {getCategoryIcon(selectedProduct.category)} {selectedProduct.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="forest-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-forest-700">Details</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-forest-100">
                <div>
                  <Badge className="bg-forest-200 text-forest-700 hover:bg-forest-100">
                    {selectedProduct.category}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-forest-800 mt-2 md:mt-0">
                  {formatCurrency(selectedProduct.price)}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-forest-600 mb-1">Description</h3>
                <p className="text-forest-700">{selectedProduct.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h3 className="text-sm font-medium text-forest-600 mb-1">Stock</h3>
                  <p className="text-lg font-semibold text-forest-700">
                    {selectedProduct.stock} units
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-forest-600 mb-1">Added On</h3>
                  <p className="text-forest-700">{formatDate(selectedProduct.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
                
                <Button 
                  className="bg-forest-500 hover:bg-forest-600"
                  onClick={() => navigate(`/edit/${selectedProduct.id}`)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="forest-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-forest-700">
                <Clock className="h-5 w-5 mr-2" />
                Price History
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <PriceHistoryChart priceHistory={priceHistory} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
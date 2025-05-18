import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types/product';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/formatters';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const getCategoryIcon = () => {
    switch (product.category) {
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

  const getStockStatusClass = () => {
    if (product.stock <= 0) return 'bg-red-100 text-red-700';
    if (product.stock < 10) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${product.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      await deleteProduct(product.id);
    }
  };

  return (
    <Card 
      className="forest-card cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-forest-600 flex items-center">
            <span className="mr-2">{getCategoryIcon()}</span>
            {product.name}
          </CardTitle>
          <Badge className={getStockStatusClass()}>
            {product.stock} in stock
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <p className="text-sm text-gray-600 line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="mt-3 font-bold text-xl text-forest-800">
          {formatCurrency(product.price)}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="border-forest-300 text-forest-600 hover:bg-forest-50"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
        >
          <PackageOpen className="h-4 w-4 mr-1" />
          Details
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            className="border-forest-300 text-forest-600 hover:bg-forest-50"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="border-red-300 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
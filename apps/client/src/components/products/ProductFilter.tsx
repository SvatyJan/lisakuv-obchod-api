import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from '../ui/button';
import { ProductFilters } from '../../types/product';

const ProductFilter: React.FC = () => {
  const { filters, setFilters, loadProducts } = useProducts();
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(localFilters);
    loadProducts(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {};
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    loadProducts(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-forest-100 p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={localFilters.name || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, name: e.target.value })}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              type="button"
              className="flex items-center gap-1 border-forest-200 text-forest-600 hover:bg-forest-50"
              onClick={() => setExpanded(!expanded)}
            >
              <Filter className="h-4 w-4" />
              {expanded ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <Button 
              type="submit"
              className="bg-forest-500 hover:bg-forest-600"
            >
              Search
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1">Category</label>
              <Select 
                value={localFilters.category} 
                onValueChange={(value) => setLocalFilters({ ...localFilters, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="nuts">Nuts</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="berries">Berries</SelectItem>
                    <SelectItem value="mushrooms">Mushrooms</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1">Min Stock</label>
              <Input
                type="number"
                min={0}
                placeholder="Minimum stock"
                value={localFilters.minStock || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  minStock: e.target.value ? parseInt(e.target.value) : undefined 
                })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-forest-700 mb-1">Max Stock</label>
              <Input
                type="number"
                min={0}
                placeholder="Maximum stock"
                value={localFilters.maxStock || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  maxStock: e.target.value ? parseInt(e.target.value) : undefined 
                })}
              />
            </div>
            
            <div className="md:col-span-3 flex justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="text-muted-foreground"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductFilter;
import React from 'react';
import { Link } from 'react-router-dom';
import { Squirrel } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-forest-500 to-forest-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Squirrel className="h-8 w-8" />
            <span className="text-xl font-bold">Fox's Shop</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className="text-forest-100 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/add" 
                  className="text-forest-100 hover:text-white transition-colors"
                >
                  Add Product
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
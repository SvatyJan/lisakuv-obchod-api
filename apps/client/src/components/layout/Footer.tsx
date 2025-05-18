import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-forest-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-5 w-5 mr-2" />
            <span>Fox's Shop &copy; {new Date().getFullYear()}</span>
          </div>
          
          <div className="text-sm text-forest-200">
            From the heart of the forest to your home
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [apiError, setApiError] = useState<string | null>(null);

  // Check if API is available
  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('/api/health-check', {
          method: 'HEAD',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('API may not be available. Status:', response.status);
        }
      } catch (error) {
        console.warn('API health check failed:', error);
        setApiError('The API server might not be available. Sample data will be displayed.');
      }
    };

    checkApi();
  }, []);

  return (
    <div className="min-h-screen flex flex-col leaf-bg">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Connection Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
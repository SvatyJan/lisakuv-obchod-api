const API_BASE_URL = '/api';

export const api = {
  get: async <T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`, 'http://localhost:8000');
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    try {
      console.log(`API GET request to: ${url.toString()}`);
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        } catch (jsonError) {
          // If we can't parse JSON, use status text
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }
      
      // Check if response is empty
      const text = await response.text();
      if (!text) {
        console.log('Empty response received');
        return {} as T;
      }
      
      // Try to parse JSON
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error('Failed to parse response as JSON:', text.substring(0, 150) + '...');
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      console.log(`API POST request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }
      
      const text = await response.text();
      if (!text) {
        return {} as T;
      }
      
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error('Failed to parse response as JSON');
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      console.log(`API PUT request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }
      
      const text = await response.text();
      if (!text) {
        return {} as T;
      }
      
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error('Failed to parse response as JSON');
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      console.log(`API DELETE request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }
      
      const text = await response.text();
      if (!text) {
        return {} as T;
      }
      
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error('Failed to parse response as JSON');
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
};
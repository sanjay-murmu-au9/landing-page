import { useState, useEffect } from 'react';
import { ApiResponse } from './apiService';

interface UseFetchOptions<T> {
  initialData?: T;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  skip?: boolean;
}

// Custom hook for handling API calls
export function useFetch<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  options: UseFetchOptions<T> = {}
) {
  const {
    initialData,
    dependencies = [],
    onSuccess,
    onError,
    skip = false
  } = options;
  
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<Error | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  
  // Function to trigger a refetch
  const refetch = () => {
    setRefetchIndex(prev => prev + 1);
  };
  
  useEffect(() => {
    // Don't fetch if skip is true
    if (skip) {
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetcher();
        
        if (response.success && isMounted) {
          const responseData = response.data as T;
          setData(responseData);
          
          if (onSuccess) {
            onSuccess(responseData);
          }
        } else {
          throw new Error(response.message || 'Unknown error');
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          
          if (onError) {
            onError(error);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [...dependencies, refetchIndex]);
  
  return { data, loading, error, refetch };
}

// Hook for API mutations (create, update, delete)
export function useMutation<T, U = any>(
  mutationFn: (data: U) => Promise<ApiResponse<T>>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const mutate = async (mutationData: U, options?: { onSuccess?: (data: T) => void; onError?: (error: Error) => void }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await mutationFn(mutationData);
      
      if (response.success) {
        const responseData = response.data as T;
        setData(responseData);
        
        if (options?.onSuccess) {
          options.onSuccess(responseData);
        }
        
        return responseData;
      } else {
        throw new Error(response.message || 'Unknown error');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      if (options?.onError) {
        options.onError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    mutate,
    data,
    loading,
    error,
    reset: () => {
      setData(null);
      setError(null);
    }
  };
}

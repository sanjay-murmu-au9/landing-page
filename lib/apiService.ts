import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from './apiConfig';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: REQUEST_TIMEOUT
});

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage or cookies
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') || document.cookie.match(/admin_token=([^;]+)/)?.[1] : null;
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Redirect to login or clear auth
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // Avoid redirect loops
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login?session=expired';
        }
      }
    }
    
    // Handle rate limiting
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded. Please try again later.');
    }
    
    // Network errors
    if (!error.response) {
      console.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Type for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
  errors?: any[];
}

// HOD user interface
export interface HodUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
  propertyInterest?: string;
  budget?: string;
  callStatus?: string;
  callNotes?: string;
  preferredLocation?: string;
}

// Interface for pagination
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// HOD API service
export const hodService = {
  // Get all HODs
  getAll: async (page = 1, pageSize = 10): Promise<ApiResponse<{hods: HodUser[], totalHods: number}>> => {
    try {
      const response = await apiClient.get<ApiResponse<{hods: HodUser[], totalHods: number}>>(
        '/tp/hods',
        { params: { page, pageSize } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching HODs:', error);
      throw error;
    }
  },
  
  // Get a HOD by ID
  getById: async (id: string): Promise<ApiResponse<HodUser>> => {
    try {
      const response = await apiClient.get<ApiResponse<HodUser>>(`/tp/hod/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching HOD with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Update a HOD
  update: async (id: string, data: Partial<HodUser>): Promise<ApiResponse<HodUser>> => {
    try {
      const response = await apiClient.put<ApiResponse<HodUser>>(`/tp/hod/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating HOD with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a HOD
  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/tp/hod/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting HOD with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new HOD
  create: async (data: Omit<HodUser, '_id' | 'createdAt'>): Promise<ApiResponse<HodUser>> => {
    try {
      const response = await apiClient.post<ApiResponse<HodUser>>('/tp/hod/join', data);
      return response.data;
    } catch (error) {
      console.error('Error creating HOD:', error);
      throw error;
    }
  }
};

export default apiClient;

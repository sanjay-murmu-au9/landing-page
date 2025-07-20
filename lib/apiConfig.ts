// API configuration with environment-specific settings

// Base URLs for different environments
const API_URLS = {
  development: 'https://api.lutui.in', // Local development
  test: 'https://api.lutui.in', // Test environment
  staging: 'https://api.lutui.in', // Staging environment
  production: 'https://api.lutui.in' // Production environment
};

// Determine current environment
const environment = process.env.NEXT_PUBLIC_APP_ENV || 'development';

// Export the base URL for the current environment
export const API_BASE_URL = API_URLS[environment as keyof typeof API_URLS];

// Common headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

// Timeouts
export const REQUEST_TIMEOUT = 30000; // 30 seconds

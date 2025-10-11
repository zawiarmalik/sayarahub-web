import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  status: number;
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
  timestamp?: string;
  requestId?: string;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize tokens from localStorage
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token to requests
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        // Log request in development
        if (import.meta.env.DEV) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }

        return response;
      },
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Log error in development
        if (import.meta.env.DEV) {
          console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        }

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.axiosInstance(originalRequest);
            }).catch((err) => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.refreshAccessToken();
            this.processQueue(null);
            
            // Retry original request
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.clearTokens();
            
            // Redirect to login or show auth error
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        const apiError: ApiError = {
          status: error.response?.status || 500,
          success: false,
          error: {
            code: error.response?.data?.error?.code || 'UNKNOWN_ERROR',
            message: error.response?.data?.error?.message || error.message || 'An unexpected error occurred',
            details: error.response?.data?.error?.details,
          },
          timestamp: (error.response?.data as any)?.timestamp || new Date().toISOString(),
          requestId: error.response?.headers?.['x-request-id'],
        };

        return Promise.reject(apiError);
      }
    );
  }

  private processQueue(error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    this.failedQueue = [];
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: this.refreshToken,
      });

      if (response.data.success) {
        this.setToken(response.data.data.accessToken);
        return;
      }

      throw new Error('Token refresh failed');
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  setRefreshToken(refreshToken: string | null) {
    this.refreshToken = refreshToken;
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }

  // Generic HTTP methods
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  // File upload method
  async uploadFile<T>(
    endpoint: string,
    file: File,
    fieldName: string = 'file',
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data;
  }

  // Multiple files upload
  async uploadFiles<T>(
    endpoint: string,
    files: File[],
    fieldName: string = 'images',
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(fieldName, file);
    });

    const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data;
  }

  // Get axios instance for custom requests
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiService = new ApiService(API_BASE_URL);

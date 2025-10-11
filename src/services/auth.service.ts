import { apiService, ApiResponse } from './api';
import type { User, LoginCredentials, SignupData } from '../types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  userId: string;
  email: string;
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      // Set the access token and refresh token for future requests
      apiService.setToken(response.data.tokens.accessToken);
      apiService.setRefreshToken(response.data.tokens.refreshToken);
      
      // Store user data in localStorage
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Login failed');
  }

  async register(data: SignupData): Promise<RegisterResponse> {
    const response = await apiService.post<RegisterResponse>('/auth/register', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Registration failed');
  }

  async refreshToken(): Promise<{ accessToken: string; expiresIn: number }> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<{ accessToken: string; expiresIn: number }>(
      '/auth/refresh',
      { refreshToken }
    );
    
    if (response.success && response.data) {
      apiService.setToken(response.data.accessToken);
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Token refresh failed');
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await apiService.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and user data regardless of API call success
      apiService.clearTokens();
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiService.post('/auth/verify-email', { token });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Email verification failed');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post('/auth/forgot-password', { email });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/auth/reset-password', {
      token,
      newPassword,
    });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset failed');
    }
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Initialize auth state from localStorage
  initializeAuth(): void {
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (token) {
      apiService.setToken(token);
    }
    
    if (refreshToken) {
      apiService.setRefreshToken(refreshToken);
    }
  }
}

export const authService = new AuthService();

import { apiService, ApiResponse } from './api';
import type { User } from '../types';

export interface UserStats {
  totalListings: number;
  activeListings: number;
  soldCars: number;
}

export interface UserProfile extends User {
  stats: UserStats;
}

export interface PublicUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export class UserService {
  async getProfile(): Promise<UserProfile> {
    const response = await apiService.get<UserProfile>('/users/profile');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch profile');
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiService.put<User>('/users/profile', data);
    
    if (response.success && response.data) {
      // Update localStorage with new user data
      localStorage.setItem('user_data', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to update profile');
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const response = await apiService.uploadFile<{ avatarUrl: string }>(
      '/users/upload-avatar',
      file,
      'avatar'
    );
    
    if (response.success && response.data) {
      // Update user data in localStorage
      const userData = this.getCurrentUser();
      if (userData) {
        userData.avatar = response.data.avatarUrl;
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
      
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to upload avatar');
  }

  async getUserPublicInfo(userId: string): Promise<PublicUserInfo> {
    const response = await apiService.get<PublicUserInfo>(`/users/${userId}/public`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch user information');
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
}

export const userService = new UserService();


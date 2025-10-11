import { apiService, ApiResponse, PaginationInfo } from './api';
import type { Car, CarFilters, CarFormData } from '../types';

export interface CarListResponse {
  cars: Car[];
  pagination: PaginationInfo;
}

export interface CarFiltersResponse {
  makes: string[];
  categories: string[];
  cities: string[];
  provinces: string[];
  priceRange: {
    min: number;
    max: number;
  };
  yearRange: {
    min: number;
    max: number;
  };
}

export interface MakeResponse {
  id: string;
  name: string;
  count: number;
}

export interface ModelResponse {
  id: string;
  name: string;
  count: number;
}

export class CarService {
  async getCars(filters?: CarFilters): Promise<CarListResponse> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() 
      ? `/cars?${queryParams.toString()}`
      : '/cars';
    
    const response = await apiService.get<CarListResponse>(endpoint);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch cars');
  }

  async getCarById(carId: string): Promise<Car> {
    const response = await apiService.get<Car>(`/cars/${carId}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Car not found');
  }

  async createCar(carData: CarFormData, images: File[]): Promise<Car> {
    // First upload images
    let imageUrls: string[] = [];
    
    if (images.length > 0) {
      const uploadResponse = await apiService.uploadFiles<{ uploadedImages: Array<{ url: string }> }>(
        '/upload/images',
        images,
        'images'
      );
      
      if (uploadResponse.success && uploadResponse.data) {
        imageUrls = uploadResponse.data.uploadedImages.map(img => img.url);
      }
    }

    // Create car with image URLs
    const carPayload = {
      ...carData,
      images: imageUrls,
    };

    const response = await apiService.post<Car>('/cars', carPayload);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to create car listing');
  }

  async updateCar(carId: string, carData: Partial<CarFormData>, images?: File[]): Promise<Car> {
    let imageUrls: string[] = [];
    
    // Upload new images if provided
    if (images && images.length > 0) {
      const uploadResponse = await apiService.uploadFiles<{ uploadedImages: Array<{ url: string }> }>(
        '/upload/images',
        images,
        'images'
      );
      
      if (uploadResponse.success && uploadResponse.data) {
        imageUrls = uploadResponse.data.uploadedImages.map(img => img.url);
      }
    }

    // Update car with new data and image URLs
    const updatePayload = {
      ...carData,
      ...(imageUrls.length > 0 && { images: imageUrls }),
    };

    const response = await apiService.put<Car>(`/cars/${carId}`, updatePayload);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to update car listing');
  }

  async deleteCar(carId: string): Promise<void> {
    const response = await apiService.delete(`/cars/${carId}`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to delete car listing');
    }
  }

  async getUserCars(userId: string, page: number = 1, limit: number = 12): Promise<CarListResponse> {
    const response = await apiService.get<CarListResponse>(
      `/cars/user/${userId}?page=${page}&limit=${limit}`
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch user cars');
  }

  async getFavoriteCars(page: number = 1, limit: number = 12): Promise<CarListResponse> {
    const response = await apiService.get<CarListResponse>(
      `/cars/favorites?page=${page}&limit=${limit}`
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch favorite cars');
  }

  async addToFavorites(carId: string): Promise<void> {
    const response = await apiService.post(`/cars/${carId}/favorite`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to add to favorites');
    }
  }

  async removeFromFavorites(carId: string): Promise<void> {
    const response = await apiService.delete(`/cars/${carId}/favorite`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to remove from favorites');
    }
  }

  async searchCars(query: string, filters?: CarFilters): Promise<CarListResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await apiService.get<CarListResponse>(`/search/cars?${queryParams.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Search failed');
  }

  async getFilters(): Promise<CarFiltersResponse> {
    const response = await apiService.get<CarFiltersResponse>('/search/filters');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch filters');
  }

  async getMakes(): Promise<MakeResponse[]> {
    const response = await apiService.get<MakeResponse[]>('/search/makes');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch makes');
  }

  async getModels(make: string): Promise<ModelResponse[]> {
    const response = await apiService.get<ModelResponse[]>(`/search/models?make=${make}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to fetch models');
  }
}

export const carService = new CarService();


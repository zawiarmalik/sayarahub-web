import { apiService, ApiResponse } from './api';

export interface ContactSellerData {
  carId: string;
  message: string;
  contactMethod?: 'email' | 'phone';
}

export interface TestDriveData {
  carId: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  phone?: string;
}

export interface ContactResponse {
  sellerName: string;
  contactMethod?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export class ContactService {
  async contactSeller(data: ContactSellerData): Promise<ContactResponse> {
    const response = await apiService.post<ContactResponse>('/contact/seller', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to send message');
  }

  async scheduleTestDrive(data: TestDriveData): Promise<ContactResponse> {
    const response = await apiService.post<ContactResponse>('/contact/test-drive', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error?.message || 'Failed to schedule test drive');
  }
}

export const contactService = new ContactService();


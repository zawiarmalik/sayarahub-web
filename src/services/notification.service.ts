import { toast } from 'react-toastify';
import type { ApiError } from './api';

export interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

class NotificationService {
  show(options: NotificationOptions): void {
    const {
      type,
      message,
      duration = type === 'error' ? 5000 : 3000,
      position = 'top-right',
    } = options;

    const toastOptions = {
      position: position as any,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warn(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
    }
  }

  success(message: string, duration?: number): void {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration?: number): void {
    this.show({ type: 'error', message, duration });
  }

  warning(message: string, duration?: number): void {
    this.show({ type: 'warning', message, duration });
  }

  info(message: string, duration?: number): void {
    this.show({ type: 'info', message, duration });
  }

  // Handle API errors specifically
  handleApiError(error: ApiError): void {
    let message = error.error?.message || 'An unexpected error occurred';

    // Handle specific error codes
    switch (error.error?.code) {
      case 'VALIDATION_ERROR':
        if (error.error.details && error.error.details.length > 0) {
          message = error.error.details.map(detail => detail.message).join(', ');
        }
        break;
      case 'UNAUTHORIZED':
        message = 'Please log in to continue';
        break;
      case 'FORBIDDEN':
        message = 'You do not have permission to perform this action';
        break;
      case 'NOT_FOUND':
        message = 'The requested resource was not found';
        break;
      case 'RATE_LIMIT_EXCEEDED':
        message = 'Too many requests. Please try again later';
        break;
      case 'EMAIL_ALREADY_EXISTS':
        message = 'An account with this email already exists';
        break;
      case 'INVALID_CREDENTIALS':
        message = 'Invalid email or password';
        break;
      case 'EMAIL_NOT_VERIFIED':
        message = 'Please verify your email address';
        break;
      case 'CAR_NOT_FOUND':
        message = 'Car listing not found';
        break;
      case 'FILE_TOO_LARGE':
        message = 'File size exceeds the maximum limit';
        break;
      case 'INVALID_FILE_TYPE':
        message = 'Invalid file type. Please upload a valid image file';
        break;
      default:
        // Keep the original message for unknown errors
        break;
    }

    this.error(message);
  }

  // Handle success messages for common actions
  loginSuccess(): void {
    this.success('Welcome back!');
  }

  logoutSuccess(): void {
    this.success('You have been logged out successfully');
  }

  registerSuccess(): void {
    this.success('Account created successfully! Please verify your email');
  }

  profileUpdated(): void {
    this.success('Profile updated successfully');
  }

  carCreated(): void {
    this.success('Car listing created successfully');
  }

  carUpdated(): void {
    this.success('Car listing updated successfully');
  }

  carDeleted(): void {
    this.success('Car listing deleted successfully');
  }

  addedToFavorites(): void {
    this.success('Added to favorites');
  }

  removedFromFavorites(): void {
    this.success('Removed from favorites');
  }

  messageSent(): void {
    this.success('Message sent successfully');
  }

  testDriveScheduled(): void {
    this.success('Test drive request sent successfully');
  }

  avatarUpdated(): void {
    this.success('Avatar updated successfully');
  }

  passwordResetSent(): void {
    this.success('Password reset instructions sent to your email');
  }

  passwordResetSuccess(): void {
    this.success('Password reset successfully. Please log in with your new password');
  }

  emailVerified(): void {
    this.success('Email verified successfully');
  }
}

export const notificationService = new NotificationService();











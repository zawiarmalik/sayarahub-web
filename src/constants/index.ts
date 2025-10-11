export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  DEALER: 'dealer',
  ADMIN: 'admin'
} as const

export const CAR_CATEGORIES = {
  SUV: 'SUV',
  SEDAN: 'Sedan',
  HATCHBACK: 'Hatchback',
  COUPE: 'Coupe',
  CONVERTIBLE: 'Convertible',
  WAGON: 'Wagon',
  PICKUP: 'Pickup',
  VAN: 'Van'
} as const

export const CAR_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
  'Audi', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen', 'Mazda',
  'Subaru', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln',
  'Buick', 'GMC', 'Ram', 'Jeep', 'Dodge', 'Chrysler'
] as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh'
  },
  CARS: {
    LIST: '/api/cars',
    DETAILS: '/api/cars/:id',
    CREATE: '/api/cars',
    UPDATE: '/api/cars/:id',
    DELETE: '/api/cars/:id'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/profile'
  }
} as const

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data'
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CAR_DETAILS: '/car/:id',
  POST_AD: '/post-ad',
  PROFILE: '/profile'
} as const

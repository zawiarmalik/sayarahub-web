export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Car {
  id: string
  title: string
  description: string
  make: string
  model: string
  year: number
  mileage: number
  price: number
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Pickup' | 'Van'
  images: string[]
  sellerId: string
  seller: User
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface CarFilters {
  make?: string
  model?: string
  category?: string
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  search?: string
  city?: string
  province?: string
  mileageMin?: number
  mileageMax?: number
  transmission?: string
  fuelType?: string
  color?: string
  trustedCars?: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface CarFormData {
  title: string
  description: string
  make: string
  model: string
  year: number
  manufacturingMonth: string
  manufacturingYear: number
  mileage: number
  price: number
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Pickup' | 'Van'
  images: File[]
}

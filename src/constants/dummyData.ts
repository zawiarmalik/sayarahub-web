import type { Car, User } from '../types'

export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'ahmed@example.com',
    firstName: 'Ahmed',
    lastName: 'Al-Mansoori',
    phone: '+97333123456',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'fatima@example.com',
    firstName: 'Fatima',
    lastName: 'Al-Khalifa',
    phone: '+97333123457',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
]

export const dummyCars: Car[] = [
  {
    id: '1',
    title: '2022 Toyota Camry LE',
    description: 'Well-maintained Toyota Camry with low mileage. Perfect for daily commuting in Manama. Located in Seef District.',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    mileage: 15000,
    price: 9500, // BHD
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228ba1b6?w=800'
    ],
    sellerId: '1',
    seller: dummyUsers[0],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: '2021 Honda CR-V EX',
    description: 'Spacious SUV with excellent fuel economy and reliability. Perfect for family trips around Bahrain. Located in Riffa.',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    mileage: 22000,
    price: 12000, // BHD
    category: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ],
    sellerId: '2',
    seller: dummyUsers[1],
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    title: '2023 BMW 3 Series',
    description: 'Luxury sedan with premium features and sporty performance. Ideal for business meetings in Manama. Located in Adliya.',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    mileage: 8000,
    price: 18000, // BHD
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    sellerId: '1',
    seller: dummyUsers[0],
    isActive: true,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '4',
    title: '2020 Ford F-150 XLT',
    description: 'Powerful pickup truck perfect for work and recreation. Great for construction sites in Sitra. Located in Muharraq.',
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    mileage: 35000,
    price: 15000, // BHD
    category: 'Pickup',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228ba1b6?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228ba1b6?w=800'
    ],
    sellerId: '2',
    seller: dummyUsers[1],
    isActive: true,
    createdAt: '2024-01-30T00:00:00Z',
    updatedAt: '2024-01-30T00:00:00Z'
  },
  {
    id: '5',
    title: '2022 Tesla Model 3',
    description: 'Electric vehicle with autopilot and premium interior. Perfect for eco-conscious driving in Bahrain. Located in Juffair.',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    mileage: 12000,
    price: 22000, // BHD
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
    ],
    sellerId: '1',
    seller: dummyUsers[0],
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '6',
    title: '2021 Mercedes-Benz GLC',
    description: 'Luxury SUV with advanced safety features and comfort. Perfect for family outings to Al Dar Islands. Located in Hamala.',
    make: 'Mercedes-Benz',
    model: 'GLC',
    year: 2021,
    mileage: 18000,
    price: 19000, // BHD
    category: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
    ],
    sellerId: '2',
    seller: dummyUsers[1],
    isActive: true,
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z'
  }
]

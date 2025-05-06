import { create } from 'zustand';

export interface Salon {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  services: Service[];
  openingHours: {
    [key: string]: { open: string; close: string } | null;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

interface SalonState {
  salons: Salon[];
  loading: boolean;
  error: string | null;
  selectedSalon: Salon | null;
  fetchSalons: (filters?: any) => Promise<void>;
  fetchSalonById: (id: string) => Promise<void>;
  fetchNearbyAvailableSalons: () => Promise<void>;
}

// Mock data
const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Elegance Hair Studio',
    description: 'A luxury hair salon offering premium services for all hair types. Our experienced stylists deliver exceptional cuts, colors, and styling.',
    address: '123 Fashion Street',
    city: 'New York',
    image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 124,
    priceRange: '$$',
    services: [
      { id: 's1', name: 'Women\'s Haircut', description: 'Professional cut and style', price: 75, duration: 60, category: 'haircut' },
      { id: 's2', name: 'Men\'s Haircut', description: 'Professional cut and style', price: 45, duration: 30, category: 'haircut' },
      { id: 's3', name: 'Hair Coloring', description: 'Full color treatment', price: 120, duration: 120, category: 'color' },
      { id: 's4', name: 'Highlights', description: 'Partial or full highlights', price: 150, duration: 150, category: 'color' },
    ],
    openingHours: {
      'Monday': { open: '09:00', close: '18:00' },
      'Tuesday': { open: '09:00', close: '18:00' },
      'Wednesday': { open: '09:00', close: '18:00' },
      'Thursday': { open: '09:00', close: '20:00' },
      'Friday': { open: '09:00', close: '20:00' },
      'Saturday': { open: '10:00', close: '16:00' },
      'Sunday': null,
    }
  },
  {
    id: '2',
    name: 'Zen Spa & Wellness',
    description: 'A tranquil oasis offering massage therapy, facials, and body treatments. Escape the stress of everyday life.',
    address: '456 Relaxation Avenue',
    city: 'Los Angeles',
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 98,
    priceRange: '$$$',
    services: [
      { id: 's5', name: 'Swedish Massage', description: '60-minute relaxation massage', price: 95, duration: 60, category: 'massage' },
      { id: 's6', name: 'Deep Tissue Massage', description: '60-minute therapeutic massage', price: 110, duration: 60, category: 'massage' },
      { id: 's7', name: 'Facial Treatment', description: 'Customized facial for your skin type', price: 120, duration: 75, category: 'facial' },
      { id: 's8', name: 'Body Scrub', description: 'Full body exfoliation treatment', price: 85, duration: 45, category: 'body' },
    ],
    openingHours: {
      'Monday': { open: '10:00', close: '20:00' },
      'Tuesday': { open: '10:00', close: '20:00' },
      'Wednesday': { open: '10:00', close: '20:00' },
      'Thursday': { open: '10:00', close: '20:00' },
      'Friday': { open: '10:00', close: '22:00' },
      'Saturday': { open: '09:00', close: '22:00' },
      'Sunday': { open: '11:00', close: '18:00' },
    }
  },
  {
    id: '3',
    name: 'Classic Cuts Barbershop',
    description: 'Traditional barbershop with modern techniques. Specializing in men\'s cuts, fades, and beard trims.',
    address: '789 Dapper Boulevard',
    city: 'Chicago',
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$',
    services: [
      { id: 's9', name: 'Classic Haircut', description: 'Traditional cut with modern styling', price: 35, duration: 30, category: 'haircut' },
      { id: 's10', name: 'Fade Haircut', description: 'Precision fade with styling', price: 40, duration: 45, category: 'haircut' },
      { id: 's11', name: 'Beard Trim', description: 'Shape and trim for any beard style', price: 20, duration: 15, category: 'beard' },
      { id: 's12', name: 'Hot Towel Shave', description: 'Traditional straight razor shave', price: 45, duration: 30, category: 'shave' },
    ],
    openingHours: {
      'Monday': { open: '08:00', close: '19:00' },
      'Tuesday': { open: '08:00', close: '19:00' },
      'Wednesday': { open: '08:00', close: '19:00' },
      'Thursday': { open: '08:00', close: '19:00' },
      'Friday': { open: '08:00', close: '20:00' },
      'Saturday': { open: '09:00', close: '17:00' },
      'Sunday': null,
    }
  }
];

export const useSalonStore = create<SalonState>((set) => ({
  salons: [],
  loading: false,
  error: null,
  selectedSalon: null,
  
  fetchSalons: async (filters) => {
    set({ loading: true, error: null });
    try {
      // Mock API call - would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply mock filtering logic if filters are provided
      let filteredSalons = [...mockSalons];
      
      if (filters) {
        if (filters.category) {
          filteredSalons = filteredSalons.filter(salon => 
            salon.services.some(service => service.category === filters.category)
          );
        }
        
        if (filters.priceRange) {
          filteredSalons = filteredSalons.filter(salon => 
            salon.priceRange === filters.priceRange
          );
        }
      }
      
      set({ salons: filteredSalons, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch salons' 
      });
    }
  },
  
  fetchSalonById: async (id) => {
    set({ loading: true, error: null });
    try {
      // Mock API call - would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const salon = mockSalons.find(s => s.id === id);
      
      if (!salon) {
        throw new Error('Salon not found');
      }
      
      set({ selectedSalon: salon, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch salon details' 
      });
    }
  },

  fetchNearbyAvailableSalons: async () => {
    set({ loading: true, error: null });
    try {
      // Mock API call - would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter salons by distance and immediate availability
      const nearbySalons = mockSalons.filter(salon => {
        // In a real app, we would:
        // 1. Use geolocation to calculate actual distances
        // 2. Check real-time availability
        // 3. Consider salon operating hours
        return true; // Mock implementation
      });
      
      set({ salons: nearbySalons, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch nearby salons' 
      });
    }
  }
}));

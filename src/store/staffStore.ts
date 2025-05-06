import { create } from 'zustand';

export interface Staff {
  id: string;
  salonId: string;
  name: string;
  email: string;
  phone: string;
  role: 'stylist' | 'colorist' | 'manager' | 'assistant';
  image: string;
  bio: string;
  specialties: string[];
  schedule: {
    [key: string]: { // day of week
      start: string;
      end: string;
      breakStart?: string;
      breakEnd?: string;
    } | null;
  };
  services: string[]; // service IDs they can perform
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive' | 'on_leave';
  permissions: {
    canManageBookings: boolean;
    canManageStaff: boolean;
    canManageServices: boolean;
    canManageProducts: boolean;
    canViewReports: boolean;
  };
}

interface StaffState {
  staff: Staff[];
  selectedStaff: Staff | null;
  loading: boolean;
  error: string | null;
  fetchStaff: (salonId: string) => Promise<void>;
  fetchStaffMember: (staffId: string) => Promise<void>;
  addStaffMember: (staffData: Omit<Staff, 'id'>) => Promise<void>;
  updateStaffMember: (staffId: string, updates: Partial<Staff>) => Promise<void>;
  updateStaffSchedule: (staffId: string, schedule: Staff['schedule']) => Promise<void>;
  updateStaffServices: (staffId: string, services: string[]) => Promise<void>;
  updateStaffPermissions: (staffId: string, permissions: Staff['permissions']) => Promise<void>;
  setStaffStatus: (staffId: string, status: Staff['status']) => Promise<void>;
}

const mockStaff: Staff[] = [
  {
    id: 'staff1',
    salonId: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567890',
    role: 'stylist',
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1600',
    bio: 'Master stylist with 8 years of experience specializing in color and cutting techniques.',
    specialties: ['Color Specialist', 'Balayage', 'Bridal'],
    schedule: {
      'Monday': { start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      'Tuesday': { start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      'Wednesday': { start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      'Thursday': { start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      'Friday': { start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      'Saturday': { start: '10:00', end: '16:00' },
      'Sunday': null
    },
    services: ['s1', 's2', 's3'],
    rating: 4.9,
    reviewCount: 156,
    status: 'active',
    permissions: {
      canManageBookings: true,
      canManageStaff: false,
      canManageServices: true,
      canManageProducts: false,
      canViewReports: false
    }
  },
  {
    id: 'staff2',
    salonId: '1',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1234567891',
    role: 'manager',
    image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600',
    bio: 'Salon manager with extensive experience in customer service and team leadership.',
    specialties: ['Precision Cuts', 'Fades', 'Beard Grooming'],
    schedule: {
      'Monday': { start: '08:00', end: '16:00' },
      'Tuesday': { start: '08:00', end: '16:00' },
      'Wednesday': { start: '08:00', end: '16:00' },
      'Thursday': { start: '08:00', end: '16:00' },
      'Friday': { start: '08:00', end: '16:00' },
      'Saturday': null,
      'Sunday': null
    },
    services: ['s1', 's2'],
    rating: 4.8,
    reviewCount: 142,
    status: 'active',
    permissions: {
      canManageBookings: true,
      canManageStaff: true,
      canManageServices: true,
      canManageProducts: true,
      canViewReports: true
    }
  }
];

export const useStaffStore = create<StaffState>((set) => ({
  staff: [],
  selectedStaff: null,
  loading: false,
  error: null,

  fetchStaff: async (salonId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const filteredStaff = mockStaff.filter(s => s.salonId === salonId);
      set({ staff: filteredStaff, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch staff' 
      });
    }
  },

  fetchStaffMember: async (staffId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const staffMember = mockStaff.find(s => s.id === staffId);
      if (!staffMember) throw new Error('Staff member not found');
      set({ selectedStaff: staffMember, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch staff member' 
      });
    }
  },

  addStaffMember: async (staffData) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newStaff: Staff = {
        ...staffData,
        id: `staff${Date.now()}`,
      };
      set(state => ({
        staff: [...state.staff, newStaff],
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to add staff member' 
      });
    }
  },

  updateStaffMember: async (staffId, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        staff: state.staff.map(staff =>
          staff.id === staffId ? { ...staff, ...updates } : staff
        ),
        selectedStaff: state.selectedStaff?.id === staffId
          ? { ...state.selectedStaff, ...updates }
          : state.selectedStaff,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update staff member' 
      });
    }
  },

  updateStaffSchedule: async (staffId, schedule) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        staff: state.staff.map(staff =>
          staff.id === staffId ? { ...staff, schedule } : staff
        ),
        selectedStaff: state.selectedStaff?.id === staffId
          ? { ...state.selectedStaff, schedule }
          : state.selectedStaff,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update schedule' 
      });
    }
  },

  updateStaffServices: async (staffId, services) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        staff: state.staff.map(staff =>
          staff.id === staffId ? { ...staff, services } : staff
        ),
        selectedStaff: state.selectedStaff?.id === staffId
          ? { ...state.selectedStaff, services }
          : state.selectedStaff,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update services' 
      });
    }
  },

  updateStaffPermissions: async (staffId, permissions) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        staff: state.staff.map(staff =>
          staff.id === staffId ? { ...staff, permissions } : staff
        ),
        selectedStaff: state.selectedStaff?.id === staffId
          ? { ...state.selectedStaff, permissions }
          : state.selectedStaff,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update permissions' 
      });
    }
  },

  setStaffStatus: async (staffId, status) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        staff: state.staff.map(staff =>
          staff.id === staffId ? { ...staff, status } : staff
        ),
        selectedStaff: state.selectedStaff?.id === staffId
          ? { ...state.selectedStaff, status }
          : state.selectedStaff,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update status' 
      });
    }
  }
}));

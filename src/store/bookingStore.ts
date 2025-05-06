import { create } from 'zustand';
import { format, addMinutes, parseISO, setMinutes, setHours } from 'date-fns';
import { RRule } from 'rrule';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Appointment {
  id: string;
  salonId: string;
  salonName: string;
  services: Service[];
  date: string; // ISO string
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  recurringRule?: string; // RRule string for recurring appointments
  recurringGroupId?: string; // ID to group recurring appointments
}

interface TimeSlot {
  time: string;
  score: number;
  price: number;
  isOptimal: boolean;
  reason?: string;
}

interface BookingState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  selectedServices: Service[];
  selectedTimeSlot: { date: Date | null; startTime: string | null; endTime: string | null };
  availableTimeSlots: Array<{ startTime: string; endTime: string }>;
  fetchUserAppointments: () => Promise<void>;
  fetchAvailableTimeSlots: (salonId: string, date: Date) => Promise<void>;
  fetchSmartTimeSlots: (salonId: string, date: Date, duration: number) => Promise<TimeSlot[]>;
  selectTimeSlot: (date: Date, startTime: string | null, endTime: string | null) => void;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clearSelectedServices: () => void;
  createBooking: (bookingData: { salonId: string; recurringRule?: string | null }) => Promise<boolean>;
  cancelAppointment: (appointmentId: string, cancelFuture?: boolean) => Promise<void>;
  cancelRecurringGroup: (groupId: string) => Promise<void>;
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    salonId: '1',
    salonName: 'Elegance Hair Studio',
    services: [
      { id: 's1', name: 'Women\'s Haircut', duration: 60, price: 75 },
      { id: 's3', name: 'Hair Coloring', duration: 120, price: 120 }
    ],
    date: '2025-05-05',
    startTime: '14:00',
    endTime: '17:00',
    totalPrice: 195,
    status: 'confirmed'
  }
];

// Helper function to generate smart time slots
const generateSmartTimeSlots = (date: Date, duration: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = setMinutes(setHours(date, hour), minute);
      const score = Math.random(); // In real app, calculate based on various factors
      
      // Simulate dynamic pricing based on demand
      const price = hour < 11 || hour > 15 ? -10 : 0; // 10% discount for off-peak
      
      // Determine if slot is optimal based on various factors
      const isOptimal = score > 0.8;
      
      let reason;
      if (hour < 11) reason = 'Off-peak discount';
      else if (score > 0.9) reason = 'Perfect slot availability';
      else if (score > 0.8) reason = 'Stylist specialty time';
      
      slots.push({
        time: format(time, 'HH:mm'),
        score,
        price,
        isOptimal,
        reason
      });
    }
  }
  
  return slots;
};

export const useBookingStore = create<BookingState>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,
  selectedServices: [],
  selectedTimeSlot: { date: null, startTime: null, endTime: null },
  availableTimeSlots: [],
  
  fetchUserAppointments: async () => {
    set({ loading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ appointments: mockAppointments, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch appointments' 
      });
    }
  },
  
  fetchAvailableTimeSlots: async (salonId, date) => {
    set({ loading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const formattedDate = format(date, 'yyyy-MM-dd');
      const dayOfWeek = format(date, 'EEEE');
      
      const timeSlots = [];
      const totalDuration = get().selectedServices.reduce((total, service) => total + service.duration, 0);
      
      if (dayOfWeek !== 'Sunday') {
        for (let hour = 9; hour < 17; hour++) {
          if ((formattedDate === '2025-05-15' && hour === 10) || 
              (formattedDate === '2025-05-16' && (hour === 11 || hour === 14))) {
            continue;
          }
          
          const startTime = `${hour.toString().padStart(2, '0')}:00`;
          const endHour = hour + Math.ceil(totalDuration / 60);
          const endTime = `${endHour.toString().padStart(2, '0')}:00`;
          
          if (endHour <= 17) {
            timeSlots.push({ startTime, endTime });
          }
        }
      }
      
      set({ availableTimeSlots: timeSlots, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch available time slots' 
      });
    }
  },

  fetchSmartTimeSlots: async (salonId, date, duration) => {
    set({ loading: true, error: null });
    try {
      // Mock API call - would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const slots = generateSmartTimeSlots(date, duration);
      set({ loading: false });
      return slots;
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch smart time slots' 
      });
      return [];
    }
  },
  
  selectTimeSlot: (date, startTime, endTime) => {
    set({ selectedTimeSlot: { date, startTime, endTime } });
  },

  addService: (service) => {
    set(state => ({
      selectedServices: [...state.selectedServices, service]
    }));
  },

  removeService: (serviceId) => {
    set(state => ({
      selectedServices: state.selectedServices.filter(service => service.id !== serviceId)
    }));
  },

  clearSelectedServices: () => {
    set({ selectedServices: [] });
  },
  
  createBooking: async (bookingData) => {
    const { selectedTimeSlot, selectedServices } = get();
    set({ loading: true, error: null });
    
    try {
      if (!selectedTimeSlot.date || !selectedTimeSlot.startTime || !selectedTimeSlot.endTime) {
        throw new Error('Please select a time slot');
      }
      
      if (selectedServices.length === 0) {
        throw new Error('Please select at least one service');
      }
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
      const recurringGroupId = bookingData.recurringRule ? `rg-${Math.random().toString(36).substr(2, 9)}` : undefined;
      
      let appointments: Appointment[] = [];
      
      if (bookingData.recurringRule) {
        const rule = RRule.fromString(`DTSTART:${format(selectedTimeSlot.date, 'yyyyMMdd')}T000000Z;${bookingData.recurringRule}`);
        const dates = rule.all((date, i) => i < 6); // Generate next 6 occurrences
        
        appointments = dates.map((date, index) => ({
          id: `a${Math.floor(Math.random() * 1000)}-${index}`,
          salonId: bookingData.salonId,
          salonName: 'Sample Salon',
          services: selectedServices,
          date: format(date, 'yyyy-MM-dd'),
          startTime: selectedTimeSlot.startTime!,
          endTime: selectedTimeSlot.endTime!,
          totalPrice,
          status: 'pending',
          recurringRule: bookingData.recurringRule!,
          recurringGroupId
        }));
      } else {
        appointments = [{
          id: `a${Math.floor(Math.random() * 1000)}`,
          salonId: bookingData.salonId,
          salonName: 'Sample Salon',
          services: selectedServices,
          date: format(selectedTimeSlot.date, 'yyyy-MM-dd'),
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          totalPrice,
          status: 'pending'
        }];
      }
      
      set(state => ({ 
        appointments: [...state.appointments, ...appointments],
        loading: false,
        selectedTimeSlot: { date: null, startTime: null, endTime: null },
        selectedServices: []
      }));
      
      return true;
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to create booking' 
      });
      return false;
    }
  },
  
  cancelAppointment: async (appointmentId, cancelFuture = false) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => {
        const appointment = state.appointments.find(a => a.id === appointmentId);
        if (!appointment) return state;

        let updatedAppointments = state.appointments;
        
        if (cancelFuture && appointment.recurringGroupId) {
          const appointmentDate = new Date(appointment.date);
          updatedAppointments = state.appointments.map(a => {
            if (a.recurringGroupId === appointment.recurringGroupId && 
                new Date(a.date) >= appointmentDate) {
              return { ...a, status: 'cancelled' };
            }
            return a;
          });
        } else {
          updatedAppointments = state.appointments.map(a =>
            a.id === appointmentId ? { ...a, status: 'cancelled' } : a
          );
        }

        return { appointments: updatedAppointments, loading: false };
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to cancel appointment' 
      });
    }
  },

  cancelRecurringGroup: async (groupId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        appointments: state.appointments.map(appointment =>
          appointment.recurringGroupId === groupId
            ? { ...appointment, status: 'cancelled' }
            : appointment
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to cancel recurring appointments' 
      });
    }
  }
}));

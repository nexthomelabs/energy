import { create } from 'zustand';
import { format, subDays, eachDayOfInterval } from 'date-fns';

interface DailyStats {
  date: string;
  bookings: number;
  revenue: number;
  newClients: number;
  completedServices: number;
}

interface ServiceStats {
  serviceId: string;
  serviceName: string;
  bookings: number;
  revenue: number;
  percentageOfTotal: number;
}

interface ClientStats {
  totalClients: number;
  newClients: number;
  returningClients: number;
  averageVisitsPerClient: number;
  retentionRate: number;
}

interface AnalyticsState {
  dailyStats: DailyStats[];
  serviceStats: ServiceStats[];
  clientStats: ClientStats;
  loading: boolean;
  error: string | null;
  fetchAnalytics: (salonId: string, dateRange: 'week' | 'month' | 'year') => Promise<void>;
}

// Mock data generator
const generateMockData = (days: number): DailyStats[] => {
  const end = new Date();
  const start = subDays(end, days);
  
  return eachDayOfInterval({ start, end }).map(date => ({
    date: format(date, 'yyyy-MM-dd'),
    bookings: Math.floor(Math.random() * 15) + 5,
    revenue: Math.floor(Math.random() * 1000) + 500,
    newClients: Math.floor(Math.random() * 5),
    completedServices: Math.floor(Math.random() * 20) + 10
  }));
};

const mockServiceStats: ServiceStats[] = [
  {
    serviceId: 's1',
    serviceName: 'Haircut',
    bookings: 145,
    revenue: 7250,
    percentageOfTotal: 35
  },
  {
    serviceId: 's2',
    serviceName: 'Color Treatment',
    bookings: 98,
    revenue: 11760,
    percentageOfTotal: 28
  },
  {
    serviceId: 's3',
    serviceName: 'Styling',
    bookings: 112,
    revenue: 4480,
    percentageOfTotal: 22
  },
  {
    serviceId: 's4',
    serviceName: 'Treatment',
    bookings: 67,
    revenue: 4020,
    percentageOfTotal: 15
  }
];

const mockClientStats: ClientStats = {
  totalClients: 450,
  newClients: 45,
  returningClients: 405,
  averageVisitsPerClient: 2.8,
  retentionRate: 85
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  dailyStats: [],
  serviceStats: [],
  clientStats: {
    totalClients: 0,
    newClients: 0,
    returningClients: 0,
    averageVisitsPerClient: 0,
    retentionRate: 0
  },
  loading: false,
  error: null,

  fetchAnalytics: async (salonId, dateRange) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const days = dateRange === 'week' ? 7 : dateRange === 'month' ? 30 : 365;
      const dailyStats = generateMockData(days);
      
      set({
        dailyStats,
        serviceStats: mockServiceStats,
        clientStats: mockClientStats,
        loading: false
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch analytics' 
      });
    }
  }
}));

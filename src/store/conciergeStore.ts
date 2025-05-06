import { create } from 'zustand';

export interface ConciergeRequest {
  id: string;
  userId: string;
  type: 'appointment' | 'group' | 'special_event';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  details: {
    date?: string;
    time?: string;
    partySize?: number;
    eventType?: string;
    preferences: string[];
    specialRequests?: string;
  };
  assignedConcierge?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    senderId: string;
    senderType: 'client' | 'concierge';
    message: string;
    timestamp: string;
  }[];
}

interface ConciergeState {
  requests: ConciergeRequest[];
  activeRequest: ConciergeRequest | null;
  loading: boolean;
  error: string | null;
  createRequest: (request: Omit<ConciergeRequest, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'messages'>) => Promise<void>;
  updateRequest: (requestId: string, updates: Partial<ConciergeRequest>) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
  sendMessage: (requestId: string, message: string, senderType: 'client' | 'concierge') => Promise<void>;
  fetchRequests: (userId: string) => Promise<void>;
  fetchRequestById: (requestId: string) => Promise<void>;
}

const mockConcierge = {
  id: 'c1',
  name: 'Emma Thompson',
  email: 'emma@salonsphere.com',
  phone: '+1 (555) 123-4567'
};

export const useConciergeStore = create<ConciergeState>((set, get) => ({
  requests: [],
  activeRequest: null,
  loading: false,
  error: null,

  createRequest: async (request) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest: ConciergeRequest = {
        id: `req-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
        assignedConcierge: mockConcierge,
        ...request
      };

      set(state => ({
        requests: [newRequest, ...state.requests],
        activeRequest: newRequest,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to create request' 
      });
    }
  },

  updateRequest: async (requestId, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        requests: state.requests.map(req =>
          req.id === requestId
            ? { ...req, ...updates, updatedAt: new Date().toISOString() }
            : req
        ),
        activeRequest: state.activeRequest?.id === requestId
          ? { ...state.activeRequest, ...updates, updatedAt: new Date().toISOString() }
          : state.activeRequest,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update request' 
      });
    }
  },

  cancelRequest: async (requestId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        requests: state.requests.map(req =>
          req.id === requestId
            ? { ...req, status: 'cancelled', updatedAt: new Date().toISOString() }
            : req
        ),
        activeRequest: state.activeRequest?.id === requestId
          ? { ...state.activeRequest, status: 'cancelled', updatedAt: new Date().toISOString() }
          : state.activeRequest,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to cancel request' 
      });
    }
  },

  sendMessage: async (requestId, message, senderType) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage = {
        id: `msg-${Date.now()}`,
        senderId: senderType === 'client' ? 'user1' : mockConcierge.id,
        senderType,
        message,
        timestamp: new Date().toISOString()
      };

      set(state => ({
        requests: state.requests.map(req =>
          req.id === requestId
            ? {
                ...req,
                messages: [...req.messages, newMessage],
                updatedAt: new Date().toISOString()
              }
            : req
        ),
        activeRequest: state.activeRequest?.id === requestId
          ? {
              ...state.activeRequest,
              messages: [...state.activeRequest.messages, newMessage],
              updatedAt: new Date().toISOString()
            }
          : state.activeRequest,
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to send message' 
      });
    }
  },

  fetchRequests: async (userId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - would be replaced with actual API call
      const mockRequests: ConciergeRequest[] = [
        {
          id: 'req1',
          userId,
          type: 'group',
          status: 'in_progress',
          details: {
            date: '2025-04-15',
            partySize: 4,
            preferences: ['Bridal Party', 'Champagne Service'],
            specialRequests: 'Need private area for the group'
          },
          assignedConcierge: mockConcierge,
          createdAt: '2025-03-15T10:00:00Z',
          updatedAt: '2025-03-15T10:30:00Z',
          messages: [
            {
              id: 'msg1',
              senderId: userId,
              senderType: 'client',
              message: 'Looking to book for a bridal party of 4',
              timestamp: '2025-03-15T10:00:00Z'
            },
            {
              id: 'msg2',
              senderId: mockConcierge.id,
              senderType: 'concierge',
              message: 'I\'d be happy to help arrange this for you. Do you have a specific date in mind?',
              timestamp: '2025-03-15T10:30:00Z'
            }
          ]
        }
      ];

      set({ requests: mockRequests, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch requests' 
      });
    }
  },

  fetchRequestById: async (requestId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const request = get().requests.find(req => req.id === requestId);
      if (!request) throw new Error('Request not found');
      
      set({ activeRequest: request, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch request' 
      });
    }
  }
}));

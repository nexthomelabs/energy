import { create } from 'zustand';

interface UserPreferences {
  gender: 'male' | 'female';
  onboardingCompleted: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'salon';
  onboardingCompleted?: boolean;
  preferences?: UserPreferences;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; name: string; type: 'client' | 'salon' }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'client@example.com' && password === 'password') {
        set({ 
          isAuthenticated: true, 
          user: { 
            id: '1', 
            name: 'Test Client', 
            email: 'client@example.com',
            type: 'client',
            onboardingCompleted: false
          }, 
          loading: false 
        });
      } else if (email === 'salon@example.com' && password === 'password') {
        set({ 
          isAuthenticated: true, 
          user: { 
            id: '2', 
            name: 'Test Salon', 
            email: 'salon@example.com',
            type: 'salon',
            onboardingCompleted: true
          }, 
          loading: false 
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },
  
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        isAuthenticated: true, 
        user: { 
          id: '3', 
          name: userData.name, 
          email: userData.email,
          type: userData.type,
          onboardingCompleted: false
        }, 
        loading: false 
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  clearError: () => {
    set({ error: null });
  },

  updateUserPreferences: (preferences) => {
    set(state => ({
      user: state.user ? {
        ...state.user,
        ...preferences,
        preferences: {
          ...state.user.preferences,
          ...preferences
        }
      } : null
    }));
  }
}));

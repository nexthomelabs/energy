import { create } from 'zustand';

export interface ClientNote {
  id: string;
  clientId: string;
  salonId: string;
  type: 'service_note' | 'preference' | 'allergy' | 'general';
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  private: boolean;
}

export interface ClientHistory {
  id: string;
  clientId: string;
  salonId: string;
  appointmentId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  notes: string;
  stylistId: string;
  stylistName: string;
  colorFormula?: string;
  images?: string[];
}

interface ClientState {
  notes: ClientNote[];
  history: ClientHistory[];
  loading: boolean;
  error: string | null;
  fetchClientNotes: (clientId: string, salonId: string) => Promise<void>;
  fetchClientHistory: (clientId: string, salonId: string) => Promise<void>;
  addNote: (note: Omit<ClientNote, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (noteId: string, updates: Partial<ClientNote>) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  addHistoryEntry: (entry: Omit<ClientHistory, 'id'>) => Promise<void>;
  updateHistoryEntry: (entryId: string, updates: Partial<ClientHistory>) => Promise<void>;
}

const mockNotes: ClientNote[] = [
  {
    id: 'n1',
    clientId: '1',
    salonId: '1',
    type: 'service_note',
    title: 'Color Formula',
    content: '20vol developer with 6N + 7N (1:1)',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-03-10T10:00:00Z',
    private: true
  },
  {
    id: 'n2',
    clientId: '1',
    salonId: '1',
    type: 'preference',
    title: 'Styling Preference',
    content: 'Prefers loose waves, sensitive scalp',
    createdAt: '2025-03-09T14:30:00Z',
    updatedAt: '2025-03-09T14:30:00Z',
    private: true
  }
];

const mockHistory: ClientHistory[] = [
  {
    id: 'h1',
    clientId: '1',
    salonId: '1',
    appointmentId: 'a1',
    serviceId: 's1',
    serviceName: 'Hair Coloring',
    date: '2025-03-10T10:00:00Z',
    notes: 'Full color treatment, client very satisfied',
    stylistId: 'staff1',
    stylistName: 'Sarah Johnson',
    colorFormula: '20vol developer with 6N + 7N (1:1)',
    images: [
      'https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ]
  }
];

export const useClientStore = create<ClientState>((set) => ({
  notes: [],
  history: [],
  loading: false,
  error: null,

  fetchClientNotes: async (clientId, salonId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredNotes = mockNotes.filter(
        note => note.clientId === clientId && note.salonId === salonId
      );
      set({ notes: filteredNotes, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch client notes' 
      });
    }
  },

  fetchClientHistory: async (clientId, salonId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredHistory = mockHistory.filter(
        entry => entry.clientId === clientId && entry.salonId === salonId
      );
      set({ history: filteredHistory, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch client history' 
      });
    }
  },

  addNote: async (note) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newNote: ClientNote = {
        ...note,
        id: `n${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set(state => ({
        notes: [newNote, ...state.notes],
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to add note' 
      });
    }
  },

  updateNote: async (noteId, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId
            ? { ...note, ...updates, updatedAt: new Date().toISOString() }
            : note
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update note' 
      });
    }
  },

  deleteNote: async (noteId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        notes: state.notes.filter(note => note.id !== noteId),
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete note' 
      });
    }
  },

  addHistoryEntry: async (entry) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newEntry: ClientHistory = {
        ...entry,
        id: `h${Date.now()}`
      };
      set(state => ({
        history: [newEntry, ...state.history],
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to add history entry' 
      });
    }
  },

  updateHistoryEntry: async (entryId, updates) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        history: state.history.map(entry =>
          entry.id === entryId
            ? { ...entry, ...updates }
            : entry
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update history entry' 
      });
    }
  }
}));

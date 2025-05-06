import { create } from 'zustand';

export interface StyleRecommendation {
  id: string;
  name: string;
  description: string;
  confidence: number;
  image: string;
  suitabilityScore: number;
  salonId?: string;
  stylistId?: string;
}

export interface HairProfile {
  type: 'straight' | 'wavy' | 'curly' | 'coily';
  texture: 'fine' | 'medium' | 'coarse';
  density: 'thin' | 'medium' | 'thick';
  length: 'short' | 'medium' | 'long';
  concerns: string[];
  currentColor?: string;
  desiredColor?: string;
}

interface StyleConsultationState {
  userPhoto: string | null;
  referencePhotos: string[];
  hairProfile: HairProfile | null;
  recommendations: StyleRecommendation[];
  loading: boolean;
  error: string | null;
  uploadPhoto: (photo: File, type: 'user' | 'reference') => Promise<void>;
  removePhoto: (type: 'user' | 'reference', index?: number) => void;
  updateHairProfile: (profile: HairProfile) => void;
  getRecommendations: () => Promise<void>;
  clearConsultation: () => void;
}

// Mock recommendations
const mockRecommendations: StyleRecommendation[] = [
  {
    id: 'style1',
    name: 'Modern Layered Bob',
    description: 'A versatile cut that frames your face shape perfectly. The layers will add volume and movement to your hair.',
    confidence: 0.92,
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1600',
    suitabilityScore: 95,
    salonId: '1',
    stylistId: 'staff1'
  },
  {
    id: 'style2',
    name: 'Balayage Highlights',
    description: 'Natural-looking, low-maintenance color that complements your skin tone. The gradient effect creates depth and dimension.',
    confidence: 0.87,
    image: 'https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600',
    suitabilityScore: 90,
    salonId: '2',
    stylistId: 'staff2'
  }
];

export const useStyleConsultationStore = create<StyleConsultationState>((set) => ({
  userPhoto: null,
  referencePhotos: [],
  hairProfile: null,
  recommendations: [],
  loading: false,
  error: null,

  uploadPhoto: async (photo, type) => {
    set({ loading: true, error: null });
    try {
      // Mock photo upload and processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const photoUrl = URL.createObjectURL(photo);
      
      if (type === 'user') {
        set({ userPhoto: photoUrl });
      } else {
        set(state => ({
          referencePhotos: [...state.referencePhotos, photoUrl]
        }));
      }
      
      set({ loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to upload photo' 
      });
    }
  },

  removePhoto: (type, index) => {
    if (type === 'user') {
      set({ userPhoto: null });
    } else if (typeof index === 'number') {
      set(state => ({
        referencePhotos: state.referencePhotos.filter((_, i) => i !== index)
      }));
    }
  },

  updateHairProfile: (profile) => {
    set({ hairProfile: profile });
  },

  getRecommendations: async () => {
    set({ loading: true, error: null });
    try {
      // Mock API call for style analysis and recommendations
      await new Promise(resolve => setTimeout(resolve, 2000));
      set({ recommendations: mockRecommendations, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to get recommendations' 
      });
    }
  },

  clearConsultation: () => {
    set({
      userPhoto: null,
      referencePhotos: [],
      hairProfile: null,
      recommendations: [],
      error: null
    });
  }
}));

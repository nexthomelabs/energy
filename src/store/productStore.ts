import { create } from 'zustand';

export interface Product {
  id: string;
  salonId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  inStock: number;
  deliveryOptions: ('delivery' | 'pickup')[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  salonId: string;
  deliveryOption: 'delivery' | 'pickup';
}

interface ProductState {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  fetchProducts: (salonId?: string) => Promise<void>;
  addToCart: (product: Product, quantity: number, deliveryOption: 'delivery' | 'pickup') => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
}

const mockProducts: Product[] = [
  {
    id: 'p1',
    salonId: '1',
    name: 'Professional Shampoo',
    description: 'Salon-quality shampoo for all hair types',
    price: 24.99,
    image: 'https://images.pexels.com/photos/3735639/pexels-photo-3735639.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Hair Care',
    brand: 'LuxeHair',
    inStock: 15,
    deliveryOptions: ['delivery', 'pickup']
  },
  {
    id: 'p2',
    salonId: '1',
    name: 'Styling Cream',
    description: 'Medium hold styling cream with natural finish',
    price: 18.99,
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Styling',
    brand: 'StylePro',
    inStock: 20,
    deliveryOptions: ['delivery', 'pickup']
  }
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  cart: [],
  loading: false,
  error: null,

  fetchProducts: async (salonId) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const products = salonId 
        ? mockProducts.filter(p => p.salonId === salonId)
        : mockProducts;
      set({ products, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch products' 
      });
    }
  },

  addToCart: (product, quantity, deliveryOption) => {
    set(state => {
      const existingItem = state.cart.find(item => item.productId === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      return {
        cart: [...state.cart, {
          productId: product.id,
          salonId: product.salonId,
          quantity,
          deliveryOption
        }]
      };
    });
  },

  removeFromCart: (productId) => {
    set(state => ({
      cart: state.cart.filter(item => item.productId !== productId)
    }));
  },

  updateCartItemQuantity: (productId, quantity) => {
    set(state => ({
      cart: state.cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  checkout: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      get().clearCart();
      set({ loading: false });
      return true;
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Checkout failed' 
      });
      return false;
    }
  }
}));

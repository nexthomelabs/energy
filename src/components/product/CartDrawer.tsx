import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Truck, Store, Trash2 } from 'lucide-react';
import { useProductStore, Product } from '../../store/productStore';
import Button from '../common/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, products, removeFromCart, updateCartItemQuantity, checkout, loading } = useProductStore();

  const getProduct = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <motion.div
        className={`fixed right-0 top-0 bottom-0 w-[80%] max-w-md bg-white z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-medium">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-neutral-600">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const product = getProduct(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-neutral-600">${product.price}</p>
                      <div className="flex items-center mt-2">
                        {item.deliveryOption === 'delivery' ? (
                          <Truck className="w-4 h-4 text-neutral-500" />
                        ) : (
                          <Store className="w-4 h-4 text-neutral-500" />
                        )}
                        <span className="text-sm text-neutral-600 ml-1">
                          {item.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item.productId, parseInt(e.target.value))}
                        className="p-1 border rounded"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-neutral-500 hover:text-error-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">${calculateTotal().toFixed(2)}</span>
            </div>
            <Button
              fullWidth
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;

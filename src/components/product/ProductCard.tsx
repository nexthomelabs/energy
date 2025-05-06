import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Store } from 'lucide-react';
import { Product } from '../../store/productStore';
import Card from '../common/Card';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (deliveryOption: 'delivery' | 'pickup') => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-neutral-600">{product.brand}</p>
          <h3 className="font-medium text-lg">{product.name}</h3>
        </div>
        
        <p className="text-sm text-neutral-600 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">${product.price}</span>
          <span className={`text-sm ${
            product.inStock > 10 ? 'text-success-600' : 
            product.inStock > 0 ? 'text-warning-600' : 
            'text-error-600'
          }`}>
            {product.inStock > 10 ? 'In Stock' :
             product.inStock > 0 ? `Only ${product.inStock} left` :
             'Out of Stock'}
          </span>
        </div>

        <div className="space-y-2">
          {product.deliveryOptions.includes('delivery') && (
            <Button
              variant="outline"
              fullWidth
              onClick={() => onAddToCart('delivery')}
              disabled={product.inStock === 0}
              className="flex items-center justify-center"
            >
              <Truck className="w-4 h-4 mr-2" />
              Delivery
            </Button>
          )}
          
          {product.deliveryOptions.includes('pickup') && (
            <Button
              variant="outline"
              fullWidth
              onClick={() => onAddToCart('pickup')}
              disabled={product.inStock === 0}
              className="flex items-center justify-center"
            >
              <Store className="w-4 h-4 mr-2" />
              Click & Collect
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;

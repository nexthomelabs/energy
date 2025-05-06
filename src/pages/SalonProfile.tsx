import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Phone, Mail, Calendar, Users, Image, ShoppingBag } from 'lucide-react';
import { useSalonStore } from '../store/salonStore';
import { useProductStore, Product } from '../store/productStore';
import Button from '../components/common/Button';
import ServiceCard from '../components/salon/ServiceCard';
import ReviewCard from '../components/salon/ReviewCard';
import StylistCard from '../components/salon/StylistCard';
import PortfolioGallery from '../components/salon/PortfolioGallery';
import ProductCard from '../components/product/ProductCard';
import CartDrawer from '../components/product/CartDrawer';

const SalonProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSalon, fetchSalonById, loading } = useSalonStore();
  const { products, fetchProducts, addToCart } = useProductStore();
  const [activeTab, setActiveTab] = useState<'services' | 'stylists' | 'portfolio' | 'reviews' | 'shop'>('services');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSalonById(id);
      fetchProducts(id);
    }
  }, [id, fetchSalonById, fetchProducts]);

  if (loading || !selectedSalon) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const mockStylists = [
    {
      id: '1',
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Senior Stylist',
      rating: 4.9,
      reviewCount: 156,
      specialties: ['Color Specialist', 'Balayage', 'Bridal'],
      experience: '8',
      availability: 'Mon-Fri, 9AM-7PM'
    },
    {
      id: '2',
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Master Barber',
      rating: 4.8,
      reviewCount: 142,
      specialties: ['Precision Cuts', 'Fades', 'Beard Grooming'],
      experience: '10',
      availability: 'Tue-Sat, 10AM-8PM'
    }
  ];

  const mockPortfolio = [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Haircuts',
      description: 'Modern Bob Cut'
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Color',
      description: 'Balayage Highlights'
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/3993425/pexels-photo-3993425.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Styling',
      description: 'Wedding Updo'
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/3993432/pexels-photo-3993432.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Color',
      description: 'Platinum Blonde'
    }
  ];

  const mockReviews = [
    {
      id: '1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing service! The staff was very professional and friendly.',
      date: '2025-02-15'
    },
    {
      id: '2',
      userName: 'Michael Brown',
      rating: 4,
      comment: 'Great experience overall. Will definitely come back.',
      date: '2025-02-10'
    }
  ];

  const handleAddToCart = (product: Product, deliveryOption: 'delivery' | 'pickup') => {
    addToCart(product, 1, deliveryOption);
    setIsCartOpen(true);
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-64">
        <img
          src={selectedSalon.image}
          alt={selectedSalon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h1 className="text-2xl font-bold mb-2">{selectedSalon.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-secondary-400 fill-current mr-1" />
              <span>{selectedSalon.rating} ({selectedSalon.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{selectedSalon.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 py-6">
        <div className="grid gap-4 mb-6">
          <div className="flex items-center text-neutral-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{selectedSalon.address}</span>
          </div>
          <div className="flex items-center text-neutral-600">
            <Phone className="w-5 h-5 mr-2" />
            <span>+1 234 567 8900</span>
          </div>
          <div className="flex items-center text-neutral-600">
            <Mail className="w-5 h-5 mr-2" />
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center text-neutral-600">
            <Clock className="w-5 h-5 mr-2" />
            <div className="flex flex-col">
              <span className="font-medium">Opening Hours</span>
              <span className="text-sm">Mon-Fri: 9:00 AM - 8:00 PM</span>
              <span className="text-sm">Sat-Sun: 10:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 mb-6 overflow-x-auto">
          <button
            className={`flex-1 py-3 text-center font-medium whitespace-nowrap ${
              activeTab === 'services'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600'
            }`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium whitespace-nowrap ${
              activeTab === 'stylists'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600'
            }`}
            onClick={() => setActiveTab('stylists')}
          >
            Stylists
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600'
            }`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium whitespace-nowrap ${
              activeTab === 'shop'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600'
            }`}
            onClick={() => setActiveTab('shop')}
          >
            Shop
          </button>
        </div>

        {/* Content */}
        {activeTab === 'services' && (
          <div className="space-y-4 px-4">
            {selectedSalon.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => navigate(`/booking/${selectedSalon.id}/${service.id}`)}
              />
            ))}
          </div>
        )}

        {activeTab === 'stylists' && (
          <div className="space-y-4 px-4">
            {mockStylists.map((stylist) => (
              <motion.div
                key={stylist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StylistCard
                  stylist={stylist}
                  onBook={() => navigate(`/booking/${selectedSalon.id}?stylist=${stylist.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="px-4">
            <PortfolioGallery images={mockPortfolio} />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 px-4">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-4 px-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(deliveryOption) => handleAddToCart(product, deliveryOption)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-4 right-4 flex gap-2">
        <Button
          fullWidth
          onClick={() => navigate(`/booking/${selectedSalon.id}`)}
          className="shadow-harsh"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Appointment
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => setIsCartOpen(true)}
          className="shadow-harsh"
        >
          <ShoppingBag className="w-5 h-5" />
        </Button>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default SalonProfile;

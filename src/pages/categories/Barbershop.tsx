import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Clock, MapPin, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';

const Barbershop = () => {
  const navigate = useNavigate();

  const barbershops = [
    {
      id: '3',
      name: 'Classic Cuts Barbershop',
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600',
      rating: 4.9,
      reviewCount: 156,
      location: 'Chicago',
      specialties: ['Fades', 'Beard Trim', 'Hot Towel Shave'],
      priceRange: '$'
    },
    {
      id: '4',
      name: 'Modern Gentleman',
      image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1600',
      rating: 4.7,
      reviewCount: 89,
      location: 'Manhattan',
      specialties: ['Premium Cuts', 'Grooming', 'Hair Design'],
      priceRange: '$$'
    }
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="relative h-40 mb-6 rounded-xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Barbershop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h1 className="text-2xl font-bold text-white">Barbershops</h1>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Haircuts', 'Beard Trim', 'Shave', 'Kids Cut'].map((filter, index) => (
            <motion.button
              key={index}
              className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 whitespace-nowrap"
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {barbershops.map((shop, index) => (
          <motion.div
            key={shop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => navigate(`/salons/${shop.id}`)}
              className="overflow-hidden"
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{shop.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-neutral-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {shop.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-secondary-500 fill-current mr-1" />
                    <span className="font-medium">{shop.rating}</span>
                    <span className="text-sm text-neutral-600 ml-1">
                      ({shop.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    {shop.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <span className="text-neutral-600">{shop.priceRange}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Barbershop;

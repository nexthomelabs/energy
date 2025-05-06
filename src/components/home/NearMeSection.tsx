import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';

interface NearMeSalonProps {
  id: string;
  name: string;
  image: string;
  distance: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  services: string[];
}

const NearMeSection: React.FC = () => {
  const navigate = useNavigate();

  const nearbySalons: NearMeSalonProps[] = [
    {
      id: '1',
      name: 'Elegance Hair Studio',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600',
      distance: '0.3 miles',
      rating: 4.8,
      reviewCount: 124,
      nextAvailable: '11:30 AM',
      services: ['Haircut', 'Styling']
    },
    {
      id: '2',
      name: 'Modern Cuts',
      image: 'https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600',
      distance: '0.5 miles',
      rating: 4.6,
      reviewCount: 98,
      nextAvailable: '12:15 PM',
      services: ['Beard Trim', 'Haircut']
    }
  ];

  return (
    <div className="px-4 py-6 bg-primary-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Available Now Near You</h2>
        <button
          onClick={() => navigate('/salons?availability=now')}
          className="text-primary-600 text-sm font-medium"
        >
          See All
        </button>
      </div>

      <div className="space-y-4">
        {nearbySalons.map((salon, index) => (
          <motion.div
            key={salon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => navigate(`/salons/${salon.id}?instant=true`)}
              className="flex overflow-hidden"
            >
              <img
                src={salon.image}
                alt={salon.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{salon.name}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-secondary-500 fill-current mr-1" />
                    <span>{salon.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-neutral-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {salon.distance}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  {salon.nextAvailable}
                </div>
                <div className="flex gap-2">
                  {salon.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NearMeSection;

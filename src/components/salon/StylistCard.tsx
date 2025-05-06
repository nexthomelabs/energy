import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface StylistCardProps {
  stylist: {
    id: string;
    name: string;
    image: string;
    title: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    experience: string;
    availability: string;
  };
  onBook: () => void;
}

const StylistCard: React.FC<StylistCardProps> = ({ stylist, onBook }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={stylist.image}
          alt={stylist.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="w-4 h-4 text-secondary-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{stylist.rating}</span>
          <span className="text-xs text-neutral-600 ml-1">({stylist.reviewCount})</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg">{stylist.name}</h3>
        <p className="text-neutral-600 text-sm mb-3">{stylist.title}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {stylist.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <div className="space-y-2 mb-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {stylist.experience} years experience
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {stylist.availability}
          </div>
        </div>
        
        <Button
          fullWidth
          onClick={onBook}
          className="flex items-center justify-center"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book with {stylist.name.split(' ')[0]}
        </Button>
      </div>
    </Card>
  );
};

export default StylistCard;

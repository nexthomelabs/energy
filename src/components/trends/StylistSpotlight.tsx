import React from 'react';
import { motion } from 'framer-motion';
import { Star, Scissors, Award, ExternalLink } from 'lucide-react';
import Card from '../common/Card';

interface StylistSpotlightProps {
  stylist: {
    id: string;
    name: string;
    image: string;
    salonName: string;
    specialty: string;
    achievements: string[];
    quote: string;
    rating: number;
    reviewCount: number;
    featured: boolean;
  };
  onClick: () => void;
}

const StylistSpotlight: React.FC<StylistSpotlightProps> = ({ stylist, onClick }) => {
  return (
    <Card onClick={onClick} className="overflow-hidden cursor-pointer">
      <div className="relative">
        <img
          src={stylist.image}
          alt={stylist.name}
          className="w-full h-64 object-cover"
        />
        {stylist.featured && (
          <div className="absolute top-2 left-2 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Award className="w-3 h-3 mr-1" />
            Featured Artist
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">{stylist.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-secondary-500 fill-current mr-1" />
            <span className="font-medium">{stylist.rating}</span>
            <span className="text-sm text-neutral-600 ml-1">
              ({stylist.reviewCount})
            </span>
          </div>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4">{stylist.salonName}</p>
        
        <div className="flex items-center text-sm text-primary-600 mb-4">
          <Scissors className="w-4 h-4 mr-2" />
          {stylist.specialty}
        </div>
        
        <blockquote className="italic text-neutral-600 text-sm mb-4 border-l-2 border-primary-200 pl-4">
          "{stylist.quote}"
        </blockquote>
        
        <div className="space-y-2">
          {stylist.achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-neutral-600"
            >
              <Award className="w-4 h-4 text-secondary-500 mr-2" />
              {achievement}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <ExternalLink className="w-5 h-5 text-primary-600" />
        </div>
      </div>
    </Card>
  );
};

export default StylistSpotlight;

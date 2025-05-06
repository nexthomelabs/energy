import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Card from '../common/Card';

interface TrendCardProps {
  trend: {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    author: {
      name: string;
      role: string;
    };
    category: string;
  };
  onClick: () => void;
}

const TrendCard: React.FC<TrendCardProps> = ({ trend, onClick }) => {
  return (
    <Card onClick={onClick} className="overflow-hidden cursor-pointer">
      <div className="relative h-48">
        <img
          src={trend.image}
          alt={trend.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
            {trend.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{trend.title}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {trend.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-600">
            <User className="w-4 h-4 mr-1" />
            <span>{trend.author.name}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span>{trend.date}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary-600" />
        </div>
      </div>
    </Card>
  );
};

export default TrendCard;

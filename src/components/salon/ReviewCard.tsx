import React from 'react';
import { Star, User } from 'lucide-react';
import Card from '../common/Card';

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <User size={20} className="text-neutral-500 mr-2" />
          <span className="font-medium">{review.userName}</span>
        </div>
        <div className="flex items-center">
          <Star size={16} className="text-secondary-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{review.rating}</span>
        </div>
      </div>
      
      <p className="text-neutral-600 text-sm mb-2">{review.comment}</p>
      <p className="text-xs text-neutral-500">{review.date}</p>
    </Card>
  );
};

export default ReviewCard;

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  icon,
  description
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
          {icon}
        </div>
        {typeof change !== 'undefined' && (
          <div className={`flex items-center text-sm ${
            change >= 0 ? 'text-success-600' : 'text-error-600'
          }`}>
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-sm text-neutral-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {description && (
        <p className="text-sm text-neutral-500">{description}</p>
      )}
    </Card>
  );
};

export default AnalyticsCard;

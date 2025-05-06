import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, TrendingUp, Users, Clock } from 'lucide-react';
import Card from '../common/Card';

interface ServicePerformanceProps {
  service: {
    id: string;
    name: string;
    revenue: number;
    growth: number;
    clientCount: number;
    repeatRate: number;
    averageDuration: number;
    popularTimes: string[];
  };
}

const ServicePerformance: React.FC<ServicePerformanceProps> = ({ service }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{service.name}</h3>
        <div className={`flex items-center text-sm ${
          service.growth >= 0 ? 'text-success-600' : 'text-error-600'
        }`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {service.growth}% growth
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-neutral-600 mb-1">Revenue</p>
          <p className="text-xl font-bold">${service.revenue}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1">Clients</p>
          <p className="text-xl font-bold">{service.clientCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-600">Repeat Rate</span>
            <span className="font-medium">{service.repeatRate}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full">
            <motion.div
              className="h-full bg-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${service.repeatRate}%` }}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-neutral-600 mb-2">Popular Times</p>
          <div className="flex flex-wrap gap-2">
            {service.popularTimes.map((time, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center text-sm text-neutral-600">
          <Clock className="w-4 h-4 mr-1" />
          Average duration: {service.averageDuration} min
        </div>
      </div>
    </Card>
  );
};

export default ServicePerformance;

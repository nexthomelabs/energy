import React from 'react';
import { Clock, DollarSign, Wand2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
  };
  onBook?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const navigate = useNavigate();
  const isStyleService = service.name.toLowerCase().includes('cut') || 
                        service.name.toLowerCase().includes('style') ||
                        service.name.toLowerCase().includes('color');

  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-2">{service.name}</h3>
      <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-neutral-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {service.duration} min
          </div>
          <div className="flex items-center">
            <DollarSign size={16} className="mr-1" />
            {service.price}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {onBook && (
          <Button fullWidth onClick={onBook}>
            Book Now
          </Button>
        )}
        
        {isStyleService && (
          <Button
            variant="outline"
            onClick={() => navigate('/style-consultation')}
            className="flex items-center justify-center"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Try AI Style
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ServiceCard;

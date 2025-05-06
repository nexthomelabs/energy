import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, DollarSign, Plus, Minus } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface ServiceSelectorProps {
  services: Service[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services }) => {
  const { selectedServices, addService, removeService } = useBookingStore();

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(service => service.id === serviceId);
  };

  const handleServiceToggle = (service: Service) => {
    if (isServiceSelected(service.id)) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            layout
            className={`p-4 rounded-xl border-2 transition-colors ${
              isServiceSelected(service.id)
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-200'
            }`}
          >
            <button
              className="w-full text-left"
              onClick={() => handleServiceToggle(service)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{service.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {service.price}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {isServiceSelected(service.id) ? (
                    <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                      <Minus className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-neutral-300 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-neutral-500" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-primary-50 rounded-xl p-4"
          >
            <h3 className="font-medium mb-2">Selected Services Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Total Duration:</span>
                <span className="font-medium">{getTotalDuration()} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Total Price:</span>
                <span className="font-medium">${getTotalPrice()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSelector;

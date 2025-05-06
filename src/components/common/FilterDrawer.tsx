import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter, DollarSign, Star, Clock, Wifi, Car } from 'lucide-react';
import Button from './Button';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    priceRange: string[];
    rating: number | null;
    services: string[];
    amenities: string[];
    availability: string | null;
  };
  onFilterChange: (filters: any) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange
}) => {
  const handlePriceRangeToggle = (range: string) => {
    const newPriceRange = filters.priceRange.includes(range)
      ? filters.priceRange.filter(r => r !== range)
      : [...filters.priceRange, range];
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleServiceToggle = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    onFilterChange({ ...filters, services: newServices });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        className={`fixed right-0 top-0 bottom-0 w-[80%] max-w-md bg-white z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-medium">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-60px)]">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="flex gap-2">
              {['$', '$$', '$$$'].map(range => (
                <button
                  key={range}
                  className={`flex-1 py-2 rounded-lg border ${
                    filters.priceRange.includes(range)
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-neutral-200'
                  }`}
                  onClick={() => handlePriceRangeToggle(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium mb-3">Minimum Rating</h3>
            <div className="flex gap-2">
              {[4, 4.5].map(rating => (
                <button
                  key={rating}
                  className={`flex-1 py-2 rounded-lg border ${
                    filters.rating === rating
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-neutral-200'
                  }`}
                  onClick={() => onFilterChange({ ...filters, rating })}
                >
                  <Star className="w-4 h-4 inline mr-1" />
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium mb-3">Services</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Haircut',
                'Coloring',
                'Styling',
                'Treatment',
                'Extensions',
                'Balayage'
              ].map(service => (
                <button
                  key={service}
                  className={`py-2 px-3 rounded-lg border text-sm ${
                    filters.services.includes(service)
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-neutral-200'
                  }`}
                  onClick={() => handleServiceToggle(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-medium mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Parking', icon: <Car className="w-4 h-4" /> },
                { name: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> }
              ].map(amenity => (
                <button
                  key={amenity.name}
                  className={`py-2 px-3 rounded-lg border text-sm flex items-center justify-center ${
                    filters.amenities.includes(amenity.name)
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-neutral-200'
                  }`}
                  onClick={() => handleAmenityToggle(amenity.name)}
                >
                  {amenity.icon}
                  <span className="ml-2">{amenity.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-medium mb-3">Availability</h3>
            <div className="flex gap-2">
              {['Today', 'Tomorrow'].map(day => (
                <button
                  key={day}
                  className={`flex-1 py-2 rounded-lg border ${
                    filters.availability === day
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-neutral-200'
                  }`}
                  onClick={() => onFilterChange({ ...filters, availability: day })}
                >
                  <Clock className="w-4 h-4 inline mr-1" />
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 bg-white">
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => onFilterChange({
                priceRange: [],
                rating: null,
                services: [],
                amenities: [],
                availability: null
              })}
            >
              Reset
            </Button>
            <Button fullWidth onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterDrawer;

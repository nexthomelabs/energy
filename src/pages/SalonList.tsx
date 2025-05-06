import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Filter, ArrowUpDown } from 'lucide-react';
import { useSalonStore } from '../store/salonStore';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import FilterDrawer from '../components/common/FilterDrawer';

const SalonList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { salons, loading, fetchSalons } = useSalonStore();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | null>(null);
  const [filters, setFilters] = useState({
    priceRange: [],
    rating: null,
    services: [],
    amenities: [],
    availability: null
  });

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  const filteredAndSortedSalons = () => {
    let result = [...salons];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(salon =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter(salon => filters.priceRange.includes(salon.priceRange));
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter(salon => salon.rating >= filters.rating);
    }

    // Apply service filter
    if (filters.services.length > 0) {
      result = result.filter(salon =>
        salon.services.some(service =>
          filters.services.includes(service.category)
        )
      );
    }

    // Apply sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      result.sort((a, b) => a.priceRange.length - b.priceRange.length);
    }

    return result;
  };

  const handleSortChange = (value: 'rating' | 'price') => {
    setSortBy(sortBy === value ? null : value);
  };

  return (
    <div className="pb-20 pt-4">
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Find a Salon</h1>
          <button
            className="p-2 rounded-full bg-neutral-100"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            <Filter className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by salon name or location"
          className="mb-4"
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center ${
              sortBy === 'rating'
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
            onClick={() => handleSortChange('rating')}
          >
            <Star className="w-4 h-4 mr-1" />
            Top Rated
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center ${
              sortBy === 'price'
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
            onClick={() => handleSortChange('price')}
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Price
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredAndSortedSalons().length === 0 ? (
          <div className="text-center py-8 text-neutral-600">
            No salons found matching your search.
          </div>
        ) : (
          filteredAndSortedSalons().map((salon, index) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => navigate(`/salons/${salon.id}`)}
                className="overflow-hidden"
              >
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{salon.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {salon.city}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-secondary-500 fill-current mr-1" />
                      <span className="font-medium">{salon.rating}</span>
                      <span className="text-sm text-neutral-600 ml-1">
                        ({salon.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {salon.services.slice(0, 3).map((service) => (
                      <span
                        key={service.id}
                        className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};

export default SalonList;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Clock, DollarSign } from 'lucide-react';
import Button from '../../components/common/Button';

const SalonServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Women\'s Haircut', duration: 60, price: 75, category: 'Haircut' },
    { id: 2, name: 'Men\'s Haircut', duration: 30, price: 45, category: 'Haircut' },
    { id: 3, name: 'Hair Coloring', duration: 120, price: 120, category: 'Color' },
    { id: 4, name: 'Blow Dry', duration: 45, price: 55, category: 'Styling' }
  ]);

  const categories = ['All', 'Haircut', 'Color', 'Styling', 'Treatment'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button
          variant="primary"
          size="small"
          className="flex items-center"
          onClick={() => {/* Add service logic */}}
        >
          <Plus size={18} className="mr-1" />
          Add Service
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
            onClick={() => setSelectedCategory(category)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white p-4 rounded-xl shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{service.name}</h3>
              <div className="flex space-x-2">
                <button className="p-2 text-neutral-600 hover:text-primary-600">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-neutral-600 hover:text-error-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                {service.duration} min
              </div>
              <div className="flex items-center">
                <DollarSign size={16} className="mr-1" />
                {service.price}
              </div>
              <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs">
                {service.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SalonServices;

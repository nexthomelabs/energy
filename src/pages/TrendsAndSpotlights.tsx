import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Users, Filter } from 'lucide-react';
import TrendCard from '../components/trends/TrendCard';
import StylistSpotlight from '../components/trends/StylistSpotlight';
import { useNavigate } from 'react-router-dom';

const TrendsAndSpotlights = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'trends' | 'spotlights'>('trends');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockTrends = [
    {
      id: 't1',
      title: 'The Return of Layered Cuts: Modern Takes on a Classic Style',
      description: 'Discover how the layered haircut is making a comeback with fresh, contemporary interpretations that suit all hair types and face shapes.',
      image: 'https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: 'Mar 15, 2025',
      author: {
        name: 'Sarah Johnson',
        role: 'Senior Stylist'
      },
      category: 'Hair Trends'
    },
    {
      id: 't2',
      title: 'Sustainable Beauty: Eco-Friendly Hair Care Practices',
      description: 'Learn about the latest innovations in sustainable hair care and how salons are adopting environmentally conscious practices.',
      image: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: 'Mar 12, 2025',
      author: {
        name: 'Emma Davis',
        role: 'Beauty Editor'
      },
      category: 'Sustainability'
    }
  ];

  const mockStylists = [
    {
      id: 's1',
      name: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600',
      salonName: 'Modern Cuts Studio',
      specialty: 'Color Transformation Specialist',
      achievements: [
        'International Color Award 2024',
        'Featured in Vogue Hair',
        'Celebrity Stylist'
      ],
      quote: "Every client's hair tells a unique story, and I'm here to help write the next chapter.",
      rating: 4.9,
      reviewCount: 328,
      featured: true
    },
    {
      id: 's2',
      name: 'Isabella Martinez',
      image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1600',
      salonName: 'Elegance Hair Studio',
      specialty: 'Bridal Hair & Special Occasions',
      achievements: [
        'Best Wedding Stylist 2024',
        'Advanced Styling Certification',
        'Published Work in Bridal Magazine'
      ],
      quote: "Creating unforgettable moments through the art of hair styling.",
      rating: 4.8,
      reviewCount: 256,
      featured: true
    }
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trends & Inspiration</h1>
        <button
          className="p-2 rounded-full bg-neutral-100"
          onClick={() => {/* Add filter logic */}}
        >
          <Filter className="w-5 h-5 text-neutral-600" />
        </button>
      </div>

      <div className="flex border-b border-neutral-200 mb-6">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'trends'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('trends')}
        >
          <Newspaper className="w-5 h-5 mx-auto mb-1" />
          Trend Reports
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'spotlights'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('spotlights')}
        >
          <Users className="w-5 h-5 mx-auto mb-1" />
          Stylist Spotlights
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'Hair Trends', 'Color', 'Styling', 'Sustainability'].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'trends' ? (
          mockTrends
            .filter(trend => selectedCategory === 'all' || trend.category === selectedCategory)
            .map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TrendCard
                  trend={trend}
                  onClick={() => navigate(`/trends/${trend.id}`)}
                />
              </motion.div>
            ))
        ) : (
          mockStylists.map((stylist, index) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StylistSpotlight
                stylist={stylist}
                onClick={() => navigate(`/stylists/${stylist.id}`)}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrendsAndSpotlights;

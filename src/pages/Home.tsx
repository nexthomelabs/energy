import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Scissors, Clock, Calendar, Star, MapPin, Wand2 } from 'lucide-react';
import Logo from '../components/common/Logo';
import NearMeSection from '../components/home/NearMeSection';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/salons?search=${encodeURIComponent(searchQuery)}`);
  };

  const categories = [
    {
      icon: '💇‍♀️',
      name: 'Hair Salon',
      route: '/category/hair-salon',
      color: 'bg-primary-100 text-primary-900'
    },
    {
      icon: '💈',
      name: 'Barbershop',
      route: '/category/barbershop',
      color: 'bg-secondary-100 text-secondary-900'
    },
    {
      icon: '💅',
      name: 'Nail Salon',
      route: '/category/nail-salon',
      color: 'bg-accent-100 text-accent-900'
    },
    {
      icon: '🧖‍♀️',
      name: 'Spa',
      route: '/category/spa',
      color: 'bg-success-100 text-success-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white pt-12 pb-16 px-4">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-lg mx-auto relative">
          <Logo color="light" size="medium" />
          <motion.h1 
            className="text-3xl font-heading font-bold mt-8 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Book beauty services near you
          </motion.h1>
          
          <motion.form 
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-6"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search salons, services..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-secondary-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.form>

          <motion.button
            className="mt-4 flex items-center justify-center w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl hover:bg-white/30 transition-colors"
            onClick={() => navigate('/style-consultation')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Get AI Style Recommendations
          </motion.button>
        </div>
      </div>

      {/* Near Me Now Section */}
      <NearMeSection />

      {/* Categories */}
      <div className="px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Popular Services</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={`${category.color} p-4 rounded-xl flex flex-col items-center justify-center space-y-2 shadow-soft hover:shadow-medium transition-shadow cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(category.route)}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-8 bg-gradient-to-b from-white to-primary-50">
        <h2 className="text-xl font-semibold mb-6">How It Works</h2>
        <div className="space-y-4">
          {[
            {
              icon: <Search className="w-6 h-6 text-primary-600" />,
              title: 'Find',
              description: 'Discover top-rated salons near you'
            },
            {
              icon: <Wand2 className="w-6 h-6 text-secondary-600" />,
              title: 'Get Inspired',
              description: 'AI-powered style recommendations'
            },
            {
              icon: <Calendar className="w-6 h-6 text-accent-600" />,
              title: 'Book',
              description: 'Schedule your appointment instantly'
            },
            {
              icon: <Star className="w-6 h-6 text-success-600" />,
              title: 'Enjoy',
              description: 'Experience professional beauty services'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-soft hover:shadow-medium transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-3 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

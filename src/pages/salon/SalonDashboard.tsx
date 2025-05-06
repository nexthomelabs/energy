import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Scissors, Star, TrendingUp, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const SalonDashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Today\'s Bookings', value: '8', icon: <Calendar className="w-6 h-6" />, color: 'bg-primary-50 text-primary-600' },
    { title: 'Total Clients', value: '124', icon: <Users className="w-6 h-6" />, color: 'bg-secondary-50 text-secondary-600' },
    { title: 'Services', value: '15', icon: <Scissors className="w-6 h-6" />, color: 'bg-accent-50 text-accent-600' },
    { title: 'Rating', value: '4.8', icon: <Star className="w-6 h-6" />, color: 'bg-success-50 text-success-600' }
  ];

  const upcomingAppointments = [
    { time: '10:00 AM', client: 'Sarah Johnson', service: 'Haircut & Style' },
    { time: '11:30 AM', client: 'Michael Brown', service: 'Beard Trim' },
    { time: '2:00 PM', client: 'Emma Davis', service: 'Color Treatment' }
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-neutral-600">Here's what's happening at your salon today</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.color} p-4 rounded-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              {stat.icon}
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <Clock className="w-5 h-5 text-neutral-500" />
        </div>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment, index) => (
            <motion.div
              key={index}
              className="flex items-center p-3 bg-neutral-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded mr-4">
                {appointment.time}
              </div>
              <div>
                <p className="font-medium">{appointment.client}</p>
                <p className="text-sm text-neutral-600">{appointment.service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Performance</h2>
          <TrendingUp className="w-5 h-5 text-neutral-500" />
        </div>
        <div className="space-y-3">
          {[
            { label: 'Bookings', value: 85, percentage: '+12%', color: 'bg-primary-100' },
            { label: 'Revenue', value: '$2,450', percentage: '+8%', color: 'bg-secondary-100' },
            { label: 'New Clients', value: 24, percentage: '+15%', color: 'bg-accent-100' }
          ].map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.label}</span>
                <span className="text-success-600">{metric.percentage}</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full">
                <div className={`h-full ${metric.color} rounded-full`} style={{ width: '70%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonDashboard;

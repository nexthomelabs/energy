import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { Clock, User } from 'lucide-react';
import AppointmentCard from '../../components/salon/AppointmentCard';
import 'react-calendar/dist/Calendar.css';

const SalonCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockAppointments = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      serviceName: 'Women\'s Haircut',
      date: '2025-03-15',
      time: '10:00 AM',
      status: 'confirmed' as const
    },
    {
      id: '2',
      clientName: 'Michael Brown',
      serviceName: 'Men\'s Haircut',
      date: '2025-03-15',
      time: '11:30 AM',
      status: 'pending' as const
    },
    {
      id: '3',
      clientName: 'Emma Davis',
      serviceName: 'Hair Coloring',
      date: '2025-03-15',
      time: '2:00 PM',
      status: 'confirmed' as const
    }
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>

      <div className="mb-8">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="w-full rounded-xl border-neutral-200 p-4"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Appointments</h2>
          <div className="flex items-center text-sm text-neutral-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{selectedDate.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AppointmentCard appointment={appointment} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-primary-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Today's Summary</h3>
          <div className="flex items-center text-primary-600">
            <User className="w-4 h-4 mr-1" />
            <span className="text-sm">8 clients</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-neutral-600">Confirmed</p>
            <p className="text-lg font-medium text-primary-600">6</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-neutral-600">Pending</p>
            <p className="text-lg font-medium text-warning-600">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCalendar;

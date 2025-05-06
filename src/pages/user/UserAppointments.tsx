import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../../store/bookingStore';
import AppointmentCard from '../../components/salon/AppointmentCard';

const UserAppointments = () => {
  const { appointments, fetchUserAppointments, loading } = useBookingStore();

  useEffect(() => {
    fetchUserAppointments();
  }, [fetchUserAppointments]);

  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-neutral-600">
          <p>No appointments found.</p>
          <p className="mt-2">Book your first appointment today!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AppointmentCard
                appointment={{
                  id: appointment.id,
                  clientName: 'You',
                  serviceName: appointment.serviceName,
                  date: appointment.date,
                  time: appointment.startTime,
                  status: appointment.status
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;

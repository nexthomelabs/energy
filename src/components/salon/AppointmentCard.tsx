import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import Card from '../common/Card';

interface AppointmentCardProps {
  appointment: {
    id: string;
    clientName: string;
    serviceName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  };
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const statusColors = {
    pending: 'bg-warning-100 text-warning-700',
    confirmed: 'bg-success-100 text-success-700',
    completed: 'bg-neutral-100 text-neutral-700',
    cancelled: 'bg-error-100 text-error-700'
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{appointment.serviceName}</h3>
        <span className={`px-2 py-1 rounded text-xs ${statusColors[appointment.status]}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-neutral-600">
        <div className="flex items-center">
          <User size={16} className="mr-2" />
          {appointment.clientName}
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          {appointment.date}
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          {appointment.time}
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;

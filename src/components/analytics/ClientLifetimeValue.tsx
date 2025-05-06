import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, User } from 'lucide-react';
import Card from '../common/Card';

interface ClientLifetimeValueProps {
  data: {
    clientId: string;
    name: string;
    totalSpent: number;
    visitCount: number;
    averageSpend: number;
    lastVisit: string;
    nextAppointment?: string;
  };
}

const ClientLifetimeValue: React.FC<ClientLifetimeValueProps> = ({ data }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium">{data.name}</h3>
            <p className="text-sm text-neutral-600">Client ID: {data.clientId}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-600">Lifetime Value</p>
          <p className="text-lg font-bold text-primary-600">${data.totalSpent}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-neutral-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-neutral-600 mb-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Avg. Spend
          </div>
          <p className="font-medium">${data.averageSpend}</p>
        </div>
        <div className="bg-neutral-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-neutral-600 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            Total Visits
          </div>
          <p className="font-medium">{data.visitCount}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-neutral-600">Last Visit</p>
            <p className="font-medium">{data.lastVisit}</p>
          </div>
          {data.nextAppointment && (
            <div className="text-right">
              <p className="text-neutral-600">Next Appointment</p>
              <p className="font-medium text-primary-600">{data.nextAppointment}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ClientLifetimeValue;

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Image as ImageIcon } from 'lucide-react';
import { useClientStore } from '../../store/clientStore';
import { format } from 'date-fns';

interface ClientHistoryProps {
  clientId: string;
  salonId: string;
}

const ClientHistory: React.FC<ClientHistoryProps> = ({ clientId, salonId }) => {
  const { history } = useClientStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-primary-600 mr-2" />
        <h2 className="text-lg font-medium">Service History</h2>
      </div>

      <div className="space-y-6">
        {history.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-soft p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium">{entry.serviceName}</h3>
                <div className="flex items-center text-sm text-neutral-500">
                  <User className="w-4 h-4 mr-1" />
                  {entry.stylistName}
                </div>
                <p className="text-sm text-neutral-500">
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            {entry.notes && (
              <div className="bg-neutral-50 rounded p-3 mb-3">
                <p className="text-neutral-700">{entry.notes}</p>
              </div>
            )}

            {entry.colorFormula && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Color Formula</h4>
                <div className="bg-primary-50 text-primary-700 rounded p-3">
                  <p>{entry.colorFormula}</p>
                </div>
              </div>
            )}

            {entry.images && entry.images.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Photos
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {entry.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Service result ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientHistory;

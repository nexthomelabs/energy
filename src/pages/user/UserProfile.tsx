import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, LogOut, Clock, StickyNote } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useClientStore } from '../../store/clientStore';
import Button from '../../components/common/Button';
import ClientNotes from '../../components/client/ClientNotes';
import ClientHistory from '../../components/client/ClientHistory';

const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const { fetchClientNotes, fetchClientHistory } = useClientStore();

  useEffect(() => {
    if (user) {
      fetchClientNotes(user.id, '1'); // Using a mock salon ID
      fetchClientHistory(user.id, '1');
    }
  }, [user, fetchClientNotes, fetchClientHistory]);

  return (
    <div className="pb-20 pt-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-neutral-600">Client</p>
      </motion.div>

      <div className="space-y-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-neutral-500 mr-3" />
            <div>
              <p className="text-sm text-neutral-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-neutral-500 mr-3" />
            <div>
              <p className="text-sm text-neutral-500">Phone</p>
              <p className="font-medium">+1 234 567 8900</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-neutral-500 mr-3" />
            <div>
              <p className="text-sm text-neutral-500">Location</p>
              <p className="font-medium">New York, NY</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-8 mb-8">
        <ClientNotes clientId={user?.id || ''} salonId="1" />
        <ClientHistory clientId={user?.id || ''} salonId="1" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          fullWidth
          onClick={logout}
          className="flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
};

export default UserProfile;

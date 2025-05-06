import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Check className="w-5 h-5 text-success-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'cancellation':
        return <X className="w-5 h-5 text-error-600" />;
      default:
        return <Bell className="w-5 h-5 text-primary-600" />;
    }
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-neutral-100 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6 text-neutral-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg z-50"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-neutral-600">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 border-b cursor-pointer hover:bg-neutral-50 ${
                        !notification.read ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="p-2 bg-white rounded-full shadow-soft mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{notification.title}</p>
                          <p className="text-sm text-neutral-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {formatDistanceToNow(new Date(notification.timestamp), {
                              addSuffix: true
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;

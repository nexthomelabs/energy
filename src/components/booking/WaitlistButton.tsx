import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check } from 'lucide-react';
import Button from '../common/Button';

interface WaitlistButtonProps {
  salonId: string;
  serviceId: string;
  stylistId?: string;
  date?: string;
  timeSlot?: string;
  onSuccess?: () => void;
}

const WaitlistButton: React.FC<WaitlistButtonProps> = ({
  salonId,
  serviceId,
  stylistId,
  date,
  timeSlot,
  onSuccess
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<'email' | 'sms' | 'both'>('both');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleJoinWaitlist = async () => {
    setLoading(true);
    try {
      // Mock API call - would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Error joining waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center"
      >
        <Bell className="w-4 h-4 mr-2" />
        Join Waitlist
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed left-4 right-4 bottom-4 bg-white rounded-xl p-4 z-50 max-w-md mx-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Join Waitlist</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {success ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-success-600" />
                  </div>
                  <p className="text-success-600 font-medium">Successfully joined waitlist!</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    We'll notify you when a spot becomes available.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-neutral-600 mb-4">
                    Get notified when a spot becomes available for your preferred time.
                  </p>

                  <div className="space-y-3 mb-6">
                    <label className="block">
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                        <span>Notify me via:</span>
                        <div className="flex gap-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="notification"
                              checked={notification === 'email'}
                              onChange={() => setNotification('email')}
                              className="mr-2"
                            />
                            Email
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="notification"
                              checked={notification === 'sms'}
                              onChange={() => setNotification('sms')}
                              className="mr-2"
                            />
                            SMS
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="notification"
                              checked={notification === 'both'}
                              onChange={() => setNotification('both')}
                              className="mr-2"
                            />
                            Both
                          </label>
                        </div>
                      </div>
                    </label>
                  </div>

                  <Button
                    fullWidth
                    onClick={handleJoinWaitlist}
                    disabled={loading}
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WaitlistButton;

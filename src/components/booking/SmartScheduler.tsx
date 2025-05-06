import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingDown, DollarSign, Users } from 'lucide-react';
import { format, addMinutes, parseISO } from 'date-fns';
import { useBookingStore } from '../../store/bookingStore';
import Button from '../common/Button';

interface SmartSchedulerProps {
  salonId: string;
  selectedDate: Date;
  duration: number;
  onTimeSelect: (time: string) => void;
}

interface TimeSlot {
  time: string;
  score: number;
  price: number;
  isOptimal: boolean;
  reason?: string;
}

const SmartScheduler: React.FC<SmartSchedulerProps> = ({
  salonId,
  selectedDate,
  duration,
  onTimeSelect
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showOptimalOnly, setShowOptimalOnly] = useState(false);
  const { fetchSmartTimeSlots, loading } = useBookingStore();

  useEffect(() => {
    const loadTimeSlots = async () => {
      const slots = await fetchSmartTimeSlots(salonId, selectedDate, duration);
      setTimeSlots(slots);
    };
    loadTimeSlots();
  }, [salonId, selectedDate, duration, fetchSmartTimeSlots]);

  const getSlotColor = (score: number) => {
    if (score >= 0.8) return 'bg-success-50 text-success-700';
    if (score >= 0.6) return 'bg-primary-50 text-primary-700';
    if (score >= 0.4) return 'bg-warning-50 text-warning-700';
    return 'bg-neutral-50 text-neutral-700';
  };

  const formatTimeRange = (startTime: string) => {
    const start = parseISO(`2000-01-01T${startTime}`);
    const end = addMinutes(start, duration);
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const displayedSlots = showOptimalOnly 
    ? timeSlots.filter(slot => slot.isOptimal)
    : timeSlots;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Available Times</h3>
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={showOptimalOnly}
            onChange={(e) => setShowOptimalOnly(e.target.checked)}
            className="mr-2 h-4 w-4 text-primary-600 rounded"
          />
          Show optimal slots only
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid gap-3">
          {displayedSlots.map((slot, index) => (
            <motion.div
              key={slot.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onTimeSelect(slot.time)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  slot.isOptimal
                    ? 'border-primary-600'
                    : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-neutral-600" />
                    <span className="font-medium">
                      {formatTimeRange(slot.time)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className={slot.price < 0 ? 'text-success-600' : ''}>
                      {slot.price > 0 ? `+${slot.price}` : slot.price}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {slot.isOptimal && (
                    <span className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full">
                      Recommended
                    </span>
                  )}
                  {slot.reason && (
                    <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full">
                      {slot.reason}
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-primary-50 rounded-xl p-4 mt-6">
        <h4 className="font-medium mb-2">Smart Scheduling Tips</h4>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex items-center">
            <TrendingDown className="w-4 h-4 mr-2 text-primary-600" />
            Off-peak hours may offer better rates
          </li>
          <li className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary-600" />
            Recommended slots optimize stylist availability
          </li>
          <li className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary-600" />
            Green slots indicate optimal booking times
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SmartScheduler;

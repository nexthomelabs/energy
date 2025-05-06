import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, RotateCcw } from 'lucide-react';
import { RRule } from 'rrule';

interface RecurringBookingProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const RecurringBookingSelector: React.FC<RecurringBookingProps> = ({ value, onChange }) => {
  const intervals = [
    { value: null, label: 'One-time booking' },
    { value: 'FREQ=WEEKLY;INTERVAL=1', label: 'Every week' },
    { value: 'FREQ=WEEKLY;INTERVAL=2', label: 'Every 2 weeks' },
    { value: 'FREQ=WEEKLY;INTERVAL=4', label: 'Every 4 weeks' },
    { value: 'FREQ=WEEKLY;INTERVAL=6', label: 'Every 6 weeks' },
    { value: 'FREQ=MONTHLY;INTERVAL=2', label: 'Every 2 months' },
    { value: 'FREQ=MONTHLY;INTERVAL=3', label: 'Every 3 months' }
  ];

  const getNextDates = (rruleString: string, count: number = 3): Date[] => {
    if (!rruleString) return [];
    const rule = RRule.fromString(`DTSTART:${new Date().toISOString().slice(0, 10)}T090000Z;${rruleString}`);
    return rule.all((date, i) => i < count);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-medium mb-2">
        <RotateCcw className="w-5 h-5 mr-2 text-primary-600" />
        Recurring Booking
      </div>

      <div className="grid gap-3">
        {intervals.map((interval) => (
          <motion.button
            key={interval.value || 'one-time'}
            className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
              value === interval.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-200'
            }`}
            onClick={() => onChange(interval.value)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{interval.label}</span>
              {interval.value && (
                <Clock className={`w-5 h-5 ${
                  value === interval.value ? 'text-primary-600' : 'text-neutral-400'
                }`} />
              )}
            </div>

            {interval.value && value === interval.value && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-neutral-200"
              >
                <p className="text-sm text-neutral-600 mb-2">Next appointments:</p>
                <div className="space-y-1">
                  {getNextDates(interval.value).map((date, index) => (
                    <div key={index} className="flex items-center text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {date.toLocaleDateString()}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {value && (
        <p className="text-sm text-neutral-600 mt-4">
          You can cancel or modify your recurring booking at any time from your appointments page.
        </p>
      )}
    </div>
  );
};

export default RecurringBookingSelector;

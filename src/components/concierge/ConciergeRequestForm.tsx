import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Star } from 'lucide-react';
import { useConciergeStore, ConciergeRequest } from '../../store/conciergeStore';
import Button from '../common/Button';

interface ConciergeRequestFormProps {
  onSubmit?: () => void;
}

const ConciergeRequestForm: React.FC<ConciergeRequestFormProps> = ({ onSubmit }) => {
  const { createRequest, loading } = useConciergeStore();
  const [formData, setFormData] = useState({
    type: 'appointment' as ConciergeRequest['type'],
    date: '',
    time: '',
    partySize: 1,
    eventType: '',
    preferences: [] as string[],
    specialRequests: ''
  });

  const preferenceOptions = [
    'VIP Treatment',
    'Private Area',
    'Champagne Service',
    'Specific Stylist Request',
    'Flexible Scheduling',
    'Group Coordination',
    'Special Occasion',
    'Premium Products Only'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createRequest({
      userId: 'user1', // This would come from auth context
      type: formData.type,
      details: {
        date: formData.date,
        time: formData.time,
        partySize: formData.partySize,
        eventType: formData.eventType,
        preferences: formData.preferences,
        specialRequests: formData.specialRequests
      }
    });

    if (onSubmit) onSubmit();
  };

  const togglePreference = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Request Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'appointment', label: 'Single Appointment', icon: Calendar },
            { value: 'group', label: 'Group Booking', icon: Users },
            { value: 'special_event', label: 'Special Event', icon: Star }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              className={`p-4 rounded-xl border-2 flex flex-col items-center ${
                formData.type === value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, type: value as ConciergeRequest['type'] }))}
            >
              <Icon className={`w-6 h-6 mb-2 ${
                formData.type === value ? 'text-primary-600' : 'text-neutral-400'
              }`} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </div>

      {(formData.type === 'group' || formData.type === 'special_event') && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Party Size
            </label>
            <input
              type="number"
              min="1"
              value={formData.partySize}
              onChange={(e) => setFormData(prev => ({ ...prev, partySize: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Event Type
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate Event</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-medium mb-4">Preferences</h3>
        <div className="grid grid-cols-2 gap-3">
          {preferenceOptions.map((preference) => (
            <button
              key={preference}
              type="button"
              className={`p-3 rounded-lg border-2 text-left ${
                formData.preferences.includes(preference)
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200'
              }`}
              onClick={() => togglePreference(preference)}
            >
              {preference}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Special Requests
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          placeholder="Any specific requirements or preferences..."
        />
      </div>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  );
};

export default ConciergeRequestForm;

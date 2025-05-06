import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useStaffStore } from '../../store/staffStore';
import { useSalonStore } from '../../store/salonStore';
import Button from '../common/Button';

interface StaffServiceSelectorProps {
  staffId: string;
  selectedServices: string[];
}

const StaffServiceSelector: React.FC<StaffServiceSelectorProps> = ({ staffId, selectedServices }) => {
  const { updateStaffServices } = useStaffStore();
  const { selectedSalon } = useSalonStore();
  const [editedServices, setEditedServices] = React.useState(selectedServices);

  const toggleService = (serviceId: string) => {
    setEditedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSave = async () => {
    await updateStaffServices(staffId, editedServices);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {selectedSalon?.services.map((service) => (
          <motion.button
            key={service.id}
            className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
              editedServices.includes(service.id)
                ? 'border-primary-600 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-200'
            }`}
            onClick={() => toggleService(service.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-neutral-600">{service.description}</p>
                <div className="flex items-center mt-2 text-sm text-neutral-600">
                  <span className="mr-4">${service.price}</span>
                  <span>{service.duration} min</span>
                </div>
              </div>
              {editedServices.includes(service.id) && (
                <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <Button
        fullWidth
        onClick={handleSave}
        className="mt-6"
      >
        Save Services
      </Button>
    </div>
  );
};

export default StaffServiceSelector;

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Briefcase, ShoppingBag, PieChart } from 'lucide-react';
import { useStaffStore, Staff } from '../../store/staffStore';
import Button from '../common/Button';

interface StaffPermissionsEditorProps {
  staffId: string;
  permissions: Staff['permissions'];
}

const StaffPermissionsEditor: React.FC<StaffPermissionsEditorProps> = ({ staffId, permissions }) => {
  const { updateStaffPermissions } = useStaffStore();
  const [editedPermissions, setEditedPermissions] = React.useState(permissions);

  const permissionsList = [
    {
      key: 'canManageBookings',
      label: 'Manage Bookings',
      description: 'Can view and manage all appointments',
      icon: Calendar
    },
    {
      key: 'canManageStaff',
      label: 'Manage Staff',
      description: 'Can add, edit, and manage staff members',
      icon: Users
    },
    {
      key: 'canManageServices',
      label: 'Manage Services',
      description: 'Can add and edit salon services',
      icon: Briefcase
    },
    {
      key: 'canManageProducts',
      label: 'Manage Products',
      description: 'Can manage product inventory and sales',
      icon: ShoppingBag
    },
    {
      key: 'canViewReports',
      label: 'View Reports',
      description: 'Can access salon analytics and reports',
      icon: PieChart
    }
  ] as const;

  const togglePermission = (key: keyof Staff['permissions']) => {
    setEditedPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    await updateStaffPermissions(staffId, editedPermissions);
  };

  return (
    <div className="space-y-4">
      {permissionsList.map(({ key, label, description, icon: Icon }) => (
        <motion.button
          key={key}
          className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
            editedPermissions[key]
              ? 'border-primary-600 bg-primary-50'
              : 'border-neutral-200 hover:border-primary-200'
          }`}
          onClick={() => togglePermission(key)}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-full mr-3 ${
              editedPermissions[key]
                ? 'bg-primary-100 text-primary-600'
                : 'bg-neutral-100 text-neutral-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">{label}</h3>
              <p className="text-sm text-neutral-600">{description}</p>
            </div>
          </div>
        </motion.button>
      ))}

      <Button
        fullWidth
        onClick={handleSave}
        className="mt-6"
      >
        Save Permissions
      </Button>
    </div>
  );
};

export default StaffPermissionsEditor;

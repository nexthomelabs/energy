import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, Calendar, Briefcase, Settings, 
  Check, X, Clock, Star, Phone, Mail
} from 'lucide-react';
import { useStaffStore, Staff } from '../../store/staffStore';
import { useSalonStore } from '../../store/salonStore';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StaffScheduleEditor from '../../components/staff/StaffScheduleEditor';
import StaffServiceSelector from '../../components/staff/StaffServiceSelector';
import StaffPermissionsEditor from '../../components/staff/StaffPermissionsEditor';

const StaffManagement = () => {
  const { staff, loading, fetchStaff, updateStaffMember, setStaffStatus } = useStaffStore();
  const { selectedSalon } = useSalonStore();
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'schedule' | 'services' | 'permissions'>('schedule');

  useEffect(() => {
    if (selectedSalon) {
      fetchStaff(selectedSalon.id);
    }
  }, [selectedSalon, fetchStaff]);

  const selectedStaffMember = staff.find(s => s.id === selectedStaffId);

  const getStatusColor = (status: Staff['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-error-100 text-error-700';
      case 'on_leave':
        return 'bg-warning-100 text-warning-700';
    }
  };

  const handleStatusChange = async (staffId: string, newStatus: Staff['status']) => {
    await setStaffStatus(staffId, newStatus);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-primary-600 mr-2" />
          <h1 className="text-2xl font-bold">Staff Management</h1>
        </div>
        <Button
          variant="primary"
          className="flex items-center"
          onClick={() => {/* Add new staff member */}}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Staff List */}
        <div className="space-y-4">
          {staff.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                onClick={() => setSelectedStaffId(member.id)}
                className={`cursor-pointer transition-all ${
                  selectedStaffId === member.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start p-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-sm text-neutral-600 capitalize">{member.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                        {member.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="mt-2 space-y-1 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-secondary-500" />
                        {member.rating} ({member.reviewCount} reviews)
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {member.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Staff Details */}
        {selectedStaffMember && (
          <div className="bg-white rounded-xl shadow-soft p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Staff Details</h2>
              <div className="flex gap-2">
                <select
                  value={selectedStaffMember.status}
                  onChange={(e) => handleStatusChange(selectedStaffMember.id, e.target.value as Staff['status'])}
                  className="px-2 py-1 rounded border border-neutral-200 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="flex border-b border-neutral-200 mb-4">
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'schedule'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-neutral-600'
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                <Calendar className="w-4 h-4 mx-auto mb-1" />
                Schedule
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'services'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-neutral-600'
                }`}
                onClick={() => setActiveTab('services')}
              >
                <Briefcase className="w-4 h-4 mx-auto mb-1" />
                Services
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'permissions'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-neutral-600'
                }`}
                onClick={() => setActiveTab('permissions')}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" />
                Permissions
              </button>
            </div>

            {activeTab === 'schedule' && (
              <StaffScheduleEditor
                staffId={selectedStaffMember.id}
                schedule={selectedStaffMember.schedule}
              />
            )}

            {activeTab === 'services' && (
              <StaffServiceSelector
                staffId={selectedStaffMember.id}
                selectedServices={selectedStaffMember.services}
              />
            )}

            {activeTab === 'permissions' && (
              <StaffPermissionsEditor
                staffId={selectedStaffMember.id}
                permissions={selectedStaffMember.permissions}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;

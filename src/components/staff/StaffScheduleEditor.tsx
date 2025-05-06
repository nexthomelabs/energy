import React, { useState } from 'react';
import { Clock, Plus, Minus } from 'lucide-react';
import { useStaffStore, Staff } from '../../store/staffStore';
import Button from '../common/Button';

interface StaffScheduleEditorProps {
  staffId: string;
  schedule: Staff['schedule'];
}

const StaffScheduleEditor: React.FC<StaffScheduleEditorProps> = ({ staffId, schedule }) => {
  const { updateStaffSchedule } = useStaffStore();
  const [editedSchedule, setEditedSchedule] = useState(schedule);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleScheduleChange = (
    day: string,
    field: 'start' | 'end' | 'breakStart' | 'breakEnd',
    value: string
  ) => {
    setEditedSchedule(prev => ({
      ...prev,
      [day]: prev[day] ? {
        ...prev[day],
        [field]: value
      } : { start: '', end: '' }
    }));
  };

  const toggleDayOff = (day: string) => {
    setEditedSchedule(prev => ({
      ...prev,
      [day]: prev[day] ? null : { start: '09:00', end: '17:00' }
    }));
  };

  const handleSave = async () => {
    await updateStaffSchedule(staffId, editedSchedule);
  };

  return (
    <div className="space-y-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="p-4 bg-neutral-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">{day}</span>
            <Button
              variant="outline"
              size="small"
              onClick={() => toggleDayOff(day)}
              className="flex items-center"
            >
              {editedSchedule[day] ? (
                <>
                  <Minus className="w-4 h-4 mr-1" />
                  Set as day off
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Add schedule
                </>
              )}
            </Button>
          </div>

          {editedSchedule[day] && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={editedSchedule[day]?.start || ''}
                    onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={editedSchedule[day]?.end || ''}
                    onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-neutral-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Break Start</label>
                  <input
                    type="time"
                    value={editedSchedule[day]?.breakStart || ''}
                    onChange={(e) => handleScheduleChange(day, 'breakStart', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Break End</label>
                  <input
                    type="time"
                    value={editedSchedule[day]?.breakEnd || ''}
                    onChange={(e) => handleScheduleChange(day, 'breakEnd', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-neutral-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button
        fullWidth
        onClick={handleSave}
        className="mt-6"
      >
        Save Schedule
      </Button>
    </div>
  );
};

export default StaffScheduleEditor;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import Calendar from 'react-calendar';
import { useSalonStore } from '../store/salonStore';
import { useBookingStore } from '../store/bookingStore';
import Button from '../components/common/Button';
import WaitlistButton from '../components/booking/WaitlistButton';
import ServiceSelector from '../components/booking/ServiceSelector';
import RecurringBookingSelector from '../components/booking/RecurringBookingSelector';
import SmartScheduler from '../components/booking/SmartScheduler';
import 'react-calendar/dist/Calendar.css';

const BookingPage = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const { selectedSalon, fetchSalonById } = useSalonStore();
  const {
    availableTimeSlots,
    fetchAvailableTimeSlots,
    createBooking,
    selectedServices,
    selectedTimeSlot,
    selectTimeSlot,
    clearSelectedServices
  } = useBookingStore();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [currentStep, setCurrentStep] = useState<'services' | 'datetime' | 'recurring'>('services');
  const [recurringRule, setRecurringRule] = useState<string | null>(null);

  useEffect(() => {
    if (salonId) {
      fetchSalonById(salonId);
    }
    return () => {
      clearSelectedServices();
    };
  }, [salonId, fetchSalonById, clearSelectedServices]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    selectTimeSlot(date, null, null);
  };

  const handleTimeSelect = (time: string) => {
    // Calculate end time based on total duration of selected services
    const totalDuration = selectedServices.reduce((total, service) => total + service.duration, 0);
    const endTime = new Date(new Date(`2000-01-01T${time}`).getTime() + totalDuration * 60000)
      .toTimeString()
      .slice(0, 5);
    
    selectTimeSlot(selectedDate, time, endTime);
  };

  const handleBooking = async () => {
    if (salonId) {
      const success = await createBooking({ 
        salonId,
        recurringRule,
      });
      if (success) {
        navigate('/appointments');
      }
    }
  };

  const handleStepNavigation = (step: 'services' | 'datetime' | 'recurring') => {
    if (step === 'datetime' && selectedServices.length === 0) {
      return;
    }
    if (step === 'recurring' && !selectedTimeSlot.startTime) {
      return;
    }
    setCurrentStep(step);
  };

  useEffect(() => {
    setShowWaitlist(availableTimeSlots.length === 0 && selectedServices.length > 0);
  }, [availableTimeSlots, selectedServices]);

  if (!selectedSalon) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <button
        onClick={() => {
          if (currentStep === 'recurring') handleStepNavigation('datetime');
          else if (currentStep === 'datetime') handleStepNavigation('services');
          else navigate(-1);
        }}
        className="flex items-center text-neutral-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        {currentStep === 'recurring' ? 'Back to Date & Time' : 
         currentStep === 'datetime' ? 'Back to Services' : 'Back'}
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Book Appointment</h1>
        <p className="text-neutral-600">{selectedSalon.name}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {['services', 'datetime', 'recurring'].map((step, index) => (
          <React.Fragment key={step}>
            <div 
              className={`flex-1 h-2 rounded-full ${
                currentStep === step ? 'bg-primary-600' :
                index < ['services', 'datetime', 'recurring'].indexOf(currentStep)
                  ? 'bg-primary-300'
                  : 'bg-neutral-200'
              }`}
            />
            {index < 2 && <div className="w-4" />}
          </React.Fragment>
        ))}
      </div>

      {currentStep === 'services' && (
        <>
          <ServiceSelector services={selectedSalon.services} />
          
          {selectedServices.length > 0 && (
            <Button
              fullWidth
              onClick={() => handleStepNavigation('datetime')}
              className="mt-6"
            >
              Continue to Date & Time
            </Button>
          )}
        </>
      )}

      {currentStep === 'datetime' && (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary-600" />
              Select Date
            </h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              className="w-full rounded-xl border-neutral-200 p-4"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-600" />
              Select Time
            </h2>
            
            {selectedServices.length > 0 ? (
              <SmartScheduler
                salonId={salonId || ''}
                selectedDate={selectedDate}
                duration={getTotalDuration()}
                onTimeSelect={handleTimeSelect}
              />
            ) : (
              <div className="text-center py-6 bg-neutral-50 rounded-xl">
                <p className="text-neutral-600">Please select services first</p>
              </div>
            )}

            {showWaitlist && (
              <div className="mt-4">
                <WaitlistButton
                  salonId={salonId || ''}
                  date={selectedDate.toISOString()}
                />
              </div>
            )}
          </div>

          {selectedTimeSlot.startTime && (
            <Button
              fullWidth
              onClick={() => handleStepNavigation('recurring')}
              className="shadow-harsh"
            >
              Continue to Booking Options
            </Button>
          )}
        </>
      )}

      {currentStep === 'recurring' && (
        <>
          <RecurringBookingSelector
            value={recurringRule}
            onChange={setRecurringRule}
          />

          <Button
            fullWidth
            onClick={handleBooking}
            className="mt-6 shadow-harsh"
          >
            Confirm Booking
          </Button>
        </>
      )}
    </div>
  );
};

export default BookingPage;

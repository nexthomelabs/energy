import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Crown, Calendar, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
  feature?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
}

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const { updateUserPreferences } = useAuthStore();

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to Salonsphere",
      description: "Your personal beauty and wellness companion",
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      feature: {
        icon: <Calendar className="w-6 h-6 text-primary-600" />,
        title: "Smart Booking",
        description: "AI-powered scheduling that adapts to your preferences"
      }
    },
    {
      title: "Premium Experience",
      description: "Discover top-rated salons and exclusive services",
      image: "https://images.pexels.com/photos/3993435/pexels-photo-3993435.jpeg?auto=compress&cs=tinysrgb&w=1600",
      feature: {
        icon: <Crown className="w-6 h-6 text-secondary-600" />,
        title: "VIP Concierge",
        description: "Personal assistance for all your beauty needs"
      }
    },
    {
      title: "Style Consultation",
      description: "Get personalized recommendations from expert stylists",
      image: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1600",
      feature: {
        icon: <Star className="w-6 h-6 text-accent-600" />,
        title: "AI Style Analysis",
        description: "Virtual try-on and style recommendations"
      }
    }
  ];

  const handleComplete = () => {
    if (gender) {
      updateUserPreferences({ gender, onboardingCompleted: true });
    }
  };

  return (
    <div className="fixed inset-0 bg-white">
      <AnimatePresence mode="wait">
        {currentStep === steps.length ? (
          <motion.div
            key="gender-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 p-8">
              <h2 className="text-2xl font-bold mb-8">Personalize Your Experience</h2>
              <div className="grid gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    gender === 'male'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Scissors className="w-6 h-6 mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">Male</h3>
                      <p className="text-neutral-600">Barbershops and men's grooming</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setGender('female')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    gender === 'female'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Scissors className="w-6 h-6 mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">Female</h3>
                      <p className="text-neutral-600">Hair salons and beauty services</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-8 border-t">
              <Button
                fullWidth
                disabled={!gender}
                onClick={handleComplete}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="relative h-1/2">
              <img
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold mb-2"
                >
                  {steps[currentStep].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {steps[currentStep].description}
                </motion.p>
              </div>
            </div>

            <div className="flex-1 p-8">
              {steps[currentStep].feature && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary-50 rounded-xl p-6"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-white rounded-xl shadow-soft">
                      {steps[currentStep].feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg mb-1">
                        {steps[currentStep].feature.title}
                      </h3>
                      <p className="text-neutral-600">
                        {steps[currentStep].feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-8 border-t">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep
                          ? 'bg-primary-600'
                          : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                  )}
                  <Button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                  >
                    {currentStep === steps.length - 1 ? (
                      'Continue'
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingScreen;

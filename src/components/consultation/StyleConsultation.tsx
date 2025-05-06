import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, Camera, Image as ImageIcon, 
  ChevronRight, Star, MapPin, Scissors 
} from 'lucide-react';
import { useStyleConsultationStore, HairProfile } from '../../store/styleConsultationStore';
import Button from '../common/Button';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';
import VirtualTryOn from './VirtualTryOn';

const StyleConsultation: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    userPhoto,
    referencePhotos,
    hairProfile,
    recommendations,
    loading,
    uploadPhoto,
    removePhoto,
    updateHairProfile,
    getRecommendations,
    clearConsultation
  } = useStyleConsultationStore();

  const [step, setStep] = useState<'upload' | 'profile' | 'recommendations'>('upload');
  const [showTryOn, setShowTryOn] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'user' | 'reference') => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadPhoto(file, type);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleHairProfileUpdate = (updates: Partial<HairProfile>) => {
    updateHairProfile({
      ...(hairProfile || {
        type: 'straight',
        texture: 'medium',
        density: 'medium',
        length: 'medium',
        concerns: []
      }),
      ...updates
    } as HairProfile);
  };

  const handleGetRecommendations = async () => {
    await getRecommendations();
    setStep('recommendations');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">AI Style Consultation</h2>
        <p className="text-neutral-600">
          Get personalized hairstyle recommendations based on your features and preferences
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {['upload', 'profile', 'recommendations'].map((s, index) => (
          <React.Fragment key={s}>
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === s 
                  ? 'bg-primary-600 text-white'
                  : index < ['upload', 'profile', 'recommendations'].indexOf(step)
                    ? 'bg-primary-200 text-primary-700'
                    : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              {index + 1}
            </div>
            {index < 2 && (
              <div className={`flex-1 h-1 mx-2 ${
                index < ['upload', 'profile', 'recommendations'].indexOf(step)
                  ? 'bg-primary-200'
                  : 'bg-neutral-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 'upload' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* User Photo Upload */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Your Photo</h3>
            {userPhoto ? (
              <div className="relative">
                <img
                  src={userPhoto}
                  alt="User"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto('user')}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <X className="w-4 h-4 text-neutral-600" />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-300 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">Upload a front-facing photo</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'user')}
                />
              </div>
            )}
          </Card>

          {/* Reference Photos */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Reference Styles (Optional)</h3>
            <div className="grid grid-cols-3 gap-4">
              {referencePhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto('reference', index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                  >
                    <X className="w-3 h-3 text-neutral-600" />
                  </button>
                </div>
              ))}
              {referencePhotos.length < 3 && (
                <div
                  className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary-300 transition-colors flex items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-6 h-6 text-neutral-400" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'reference')}
                  />
                </div>
              )}
            </div>
          </Card>

          <Button
            fullWidth
            disabled={!userPhoto}
            onClick={() => setStep('profile')}
          >
            Continue
          </Button>
        </motion.div>
      )}

      {step === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Virtual Try-On</h3>
              <Button
                variant="outline"
                size="small"
                onClick={() => setShowTryOn(!showTryOn)}
              >
                {showTryOn ? 'Hide' : 'Try On Colors'}
              </Button>
            </div>

            <AnimatePresence>
              {showTryOn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <VirtualTryOn
                    onCapture={(image) => {
                      // Handle the captured image
                      console.log('Captured image:', image);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">Your Hair Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Hair Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['straight', 'wavy', 'curly', 'coily'].map((type) => (
                    <button
                      key={type}
                      className={`p-3 rounded-lg border-2 capitalize ${
                        hairProfile?.type === type
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200'
                      }`}
                      onClick={() => handleHairProfileUpdate({ type: type as HairProfile['type'] })}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Hair Texture
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['fine', 'medium', 'coarse'].map((texture) => (
                    <button
                      key={texture}
                      className={`p-3 rounded-lg border-2 capitalize ${
                        hairProfile?.texture === texture
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200'
                      }`}
                      onClick={() => handleHairProfileUpdate({ texture: texture as HairProfile['texture'] })}
                    >
                      {texture}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Hair Concerns
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Frizz',
                    'Damage',
                    'Split Ends',
                    'Volume',
                    'Thinning',
                    'Color Fade'
                  ].map((concern) => (
                    <button
                      key={concern}
                      className={`p-3 rounded-lg border-2 ${
                        hairProfile?.concerns?.includes(concern)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-200'
                      }`}
                      onClick={() => {
                        const concerns = hairProfile?.concerns || [];
                        handleHairProfileUpdate({
                          concerns: concerns.includes(concern)
                            ? concerns.filter(c => c !== concern)
                            : [...concerns, concern]
                        });
                      }}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Button
            fullWidth
            onClick={handleGetRecommendations}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Recommendations'}
          </Button>
        </motion.div>
      )}

      {step === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg">{recommendation.name}</h3>
                    <div className="flex items-center bg-success-50 text-success-700 px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1" />
                      {recommendation.suitabilityScore}% Match
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">{recommendation.description}</p>
                  
                  {recommendation.salonId && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        Available at nearby salon
                      </div>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => navigate(`/salons/${recommendation.salonId}`)}
                        className="flex items-center"
                      >
                        <Scissors className="w-4 h-4 mr-1" />
                        Book Now
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}

          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              clearConsultation();
              setStep('upload');
            }}
          >
            Start New Consultation
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default StyleConsultation;

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };
  
  return (
    <div className="flex justify-center items-center h-full min-h-[100px]">
      <motion.div
        className={`${sizeMap[size]} border-4 border-neutral-200 border-t-primary-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;

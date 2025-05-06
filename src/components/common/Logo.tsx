import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', color = 'dark' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };
  
  const textColor = color === 'light' ? 'text-white' : 'text-primary-900';
  const accentColor = color === 'light' ? 'text-secondary-300' : 'text-secondary-500';

  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} relative flex items-center`}>
        <img 
          src="https://i.ibb.co/kVHm06mz/image.png" 
          alt="Salonsphere Logo" 
          className={`${sizeClasses[size]} object-contain`}
        />
        <span className={`font-heading font-bold ${textColor} ml-3 text-xl md:text-2xl`}>
          Salon<span className={accentColor}>sphere</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;

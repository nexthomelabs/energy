import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const labelClasses = `block text-sm font-medium ${error ? 'text-error-600' : 'text-neutral-700'} mb-1`;
  
  const inputClasses = `
    w-full px-4 py-2.5 rounded-lg transition-all duration-200
    ${error ? 'border-error-500 focus:ring-error-500' : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'} 
    ${isFocused ? 'border-primary-500 ring-2 ring-primary-100' : ''}
    ${disabled ? 'bg-neutral-100 opacity-75 cursor-not-allowed' : 'bg-white'}
  `;
  
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className={labelClasses}>
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default TextField;

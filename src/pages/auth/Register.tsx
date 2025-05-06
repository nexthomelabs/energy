import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import Logo from '../../components/common/Logo';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'client'
  });
  
  const { register, error, loading, clearError } = useAuthStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };
  
  return (
    <div className="min-h-screen bg-white px-4 pt-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto"
      >
        <div className="text-center mb-8">
          <Logo size="medium" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create account</h1>
        <p className="text-neutral-600 mb-8">Join Salonsphere today</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-error-50 text-error-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              required
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-neutral-700">I want to...</p>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  name="type"
                  value="client"
                  checked={formData.type === 'client'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  formData.type === 'client'
                    ? 'border-primary-600 bg-primary-50 text-primary-900'
                    : 'border-neutral-200 hover:border-primary-200'
                }`}>
                  <span className="text-lg">👤</span>
                  <p className="text-sm font-medium mt-1">Book Services</p>
                </div>
              </label>
              
              <label className="relative">
                <input
                  type="radio"
                  name="type"
                  value="salon"
                  checked={formData.type === 'salon'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  formData.type === 'salon'
                    ? 'border-primary-600 bg-primary-50 text-primary-900'
                    : 'border-neutral-200 hover:border-primary-200'
                }`}>
                  <span className="text-lg">💈</span>
                  <p className="text-sm font-medium mt-1">Offer Services</p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 text-primary-600 border-neutral-300 rounded"
            />
            <label className="ml-2 text-sm text-neutral-600">
              I agree to the{' '}
              <Link to="#" className="text-primary-600">Terms</Link>
              {' '}and{' '}
              <Link to="#" className="text-primary-600">Privacy Policy</Link>
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Creating account...' : (
              <span className="flex items-center justify-center">
                Create account
                <ArrowRight size={18} className="ml-2" />
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

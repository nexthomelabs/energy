import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import Logo from '../../components/common/Logo';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const { login, error, loading, clearError } = useAuthStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 px-4 pt-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto"
      >
        <div className="text-center mb-12">
          <Logo size="medium" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 space-y-2"
          >
            <h1 className="text-3xl font-bold text-amber-900">Welcome back</h1>
            <p className="text-amber-800">Sign in to your account</p>
          </motion.div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 backdrop-blur-sm"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 backdrop-blur-sm"
              required
            />
          </div>
          
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-amber-800">Remember me</span>
            </label>
            
            <Link to="#" className="text-sm text-amber-700 font-medium hover:text-amber-800">
              Forgot password?
            </Link>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"
          >
            {loading ? 'Signing in...' : (
              <span className="flex items-center justify-center">
                Sign in
                <ArrowRight size={18} className="ml-2" />
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-amber-800">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-700 font-medium hover:text-amber-800">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-8 p-4 bg-white/30 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-amber-800 text-center mb-2">Demo accounts:</p>
          <div className="space-y-1 text-sm text-amber-900">
            <p>Client: client@example.com / password</p>
            <p>Salon: salon@example.com / password</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

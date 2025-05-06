import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface MainLayoutProps {
  requireAuth?: boolean;
  userType?: 'client' | 'salon';
}

const MainLayout: React.FC<MainLayoutProps> = ({ userType }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (userType && user?.type !== userType) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default MainLayout;

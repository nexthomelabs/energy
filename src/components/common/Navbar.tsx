import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User, Newspaper } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import NotificationBell from './NotificationBell';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  // Don't render navbar on auth pages
  if (!isAuthenticated || location.pathname.match(/^\/(login|register)$/)) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 ${
            isActive('/') ? 'text-primary-600' : 'text-neutral-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/salons"
          className={`flex flex-col items-center p-2 ${
            isActive('/salons') ? 'text-primary-600' : 'text-neutral-600'
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>

        <Link
          to="/trends"
          className={`flex flex-col items-center p-2 ${
            isActive('/trends') ? 'text-primary-600' : 'text-neutral-600'
          }`}
        >
          <Newspaper size={24} />
          <span className="text-xs mt-1">Trends</span>
        </Link>

        {user?.type === 'salon' ? (
          <Link
            to="/salon-calendar"
            className={`flex flex-col items-center p-2 ${
              isActive('/salon-calendar') ? 'text-primary-600' : 'text-neutral-600'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </Link>
        ) : (
          <Link
            to="/appointments"
            className={`flex flex-col items-center p-2 ${
              isActive('/appointments') ? 'text-primary-600' : 'text-neutral-600'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Bookings</span>
          </Link>
        )}

        <div className="flex flex-col items-center p-2">
          <NotificationBell />
          <span className="text-xs mt-1">Alerts</span>
        </div>

        <Link
          to={user?.type === 'salon' ? '/salon-dashboard' : '/profile'}
          className={`flex flex-col items-center p-2 ${
            isActive(user?.type === 'salon' ? '/salon-dashboard' : '/profile')
              ? 'text-primary-600'
              : 'text-neutral-600'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

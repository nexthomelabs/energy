import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Components
import LoadingScreen from './components/common/LoadingScreen';
import OnboardingScreen from './components/onboarding/OnboardingScreen';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SalonProfile from './pages/SalonProfile';
import SalonList from './pages/SalonList';
import BookingPage from './pages/BookingPage';
import UserProfile from './pages/user/UserProfile';
import UserAppointments from './pages/user/UserAppointments';
import ConciergeService from './pages/user/ConciergeService';
import SalonDashboard from './pages/salon/SalonDashboard';
import SalonCalendar from './pages/salon/SalonCalendar';
import SalonServices from './pages/salon/SalonServices';
import Analytics from './pages/salon/Analytics';
import StaffManagement from './pages/salon/StaffManagement';
import TrendsAndSpotlights from './pages/TrendsAndSpotlights';

// Category Pages
import HairSalon from './pages/categories/HairSalon';
import Barbershop from './pages/categories/Barbershop';
import NailSalon from './pages/categories/NailSalon';
import Spa from './pages/categories/Spa';

// Components
import StyleConsultation from './components/consultation/StyleConsultation';

// Context
import { useAuthStore } from './store/authStore';

function App() {
  const location = useLocation();
  const { isAuthenticated, loading, user } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);
  
  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  // Show onboarding for first-time users
  if (isAuthenticated && user && !user.onboardingCompleted) {
    return <OnboardingScreen />;
  }

  // If not authenticated and not on auth pages, redirect to login
  if (!isAuthenticated && !location.pathname.match(/^\/(login|register)$/)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth routes - accessible only when not authenticated */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        {/* All other routes require authentication */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/salons" element={<SalonList />} />
          <Route path="/salons/:id" element={<SalonProfile />} />
          <Route path="/style-consultation" element={<StyleConsultation />} />
          <Route path="/trends" element={<TrendsAndSpotlights />} />
          
          {/* Category Routes */}
          <Route path="/category/hair-salon" element={<HairSalon />} />
          <Route path="/category/barbershop" element={<Barbershop />} />
          <Route path="/category/nail-salon" element={<NailSalon />} />
          <Route path="/category/spa" element={<Spa />} />
          
          {/* Client-specific routes */}
          {user?.type === 'client' && (
            <>
              <Route path="/booking/:salonId/:serviceId" element={<BookingPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/appointments" element={<UserAppointments />} />
              <Route path="/concierge" element={<ConciergeService />} />
            </>
          )}
          
          {/* Salon-specific routes */}
          {user?.type === 'salon' && (
            <>
              <Route path="/salon-dashboard" element={<SalonDashboard />} />
              <Route path="/salon-calendar" element={<SalonCalendar />} />
              <Route path="/salon-services" element={<SalonServices />} />
              <Route path="/salon-analytics" element={<Analytics />} />
              <Route path="/salon-staff" element={<StaffManagement />} />
            </>
          )}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <Logo color="light" />
            <p className="mt-4 text-neutral-400">
              Connecting you with the best beauty professionals in your area. Book appointments with top salons, spas and barbershops.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-medium mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li><Link to="/salons" className="text-neutral-400 hover:text-white transition-colors">Find Salons</Link></li>
              <li><Link to="/appointments" className="text-neutral-400 hover:text-white transition-colors">My Appointments</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Deals & Offers</Link></li>
            </ul>
          </div>
          
          {/* For businesses */}
          <div>
            <h3 className="text-lg font-medium mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Join as a Partner</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Business Resources</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Partner Support</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-neutral-500 text-center">
          <p>&copy; {new Date().getFullYear()} Salonsphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

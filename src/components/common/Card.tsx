import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow ${className}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;

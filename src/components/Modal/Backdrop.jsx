import React from 'react';
import { motion } from 'framer-motion';

const Backdrop = ({ show, onClick, children }) => {
  return (
    show && (
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  );
};

export default Backdrop;

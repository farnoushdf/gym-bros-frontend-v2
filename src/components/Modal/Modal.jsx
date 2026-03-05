import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

const dropIn = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: '0',
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    opacity: 0,
    y: '100vh'
  }
};

const Modal = ({ show, handleClose, children }) => {
  return (
    
    <Backdrop show={show} onClick={handleClose}>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;

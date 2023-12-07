import React from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#__next');

const Popup = ({ isOpen, onClose, children,friendRequest }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup"
    >
      {children}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default Popup 
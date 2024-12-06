import React from 'react';
import '../styles/modal.css'; // Здесь можно подключить стили для модального окна

const Modal = ({ isOpen, onClose, title, link }) => {
  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <iframe src={link} width="800" height="600" title={title}/>
              <button className="modal-close-button" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>
          </div>
      </div>
  );
};

export default Modal;
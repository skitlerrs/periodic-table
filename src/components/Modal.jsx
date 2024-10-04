import React from 'react';
import '../styles/modal.css'; // Здесь можно подключить стили для модального окна

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null; // Не отображаем модальное окно, если оно закрыто

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

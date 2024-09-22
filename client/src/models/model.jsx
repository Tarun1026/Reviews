// Modal.js
import React from "react";
import "../css/Model.css"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeModal" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

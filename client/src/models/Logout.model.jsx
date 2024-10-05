import React from 'react';
import "../css/LogoutModal.css";

const LogoutModal = ({ isOpen, onClose, onLogoutConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logoutModalOverlay">
      <div className="logoutModalContent">
        <h3>Are you sure you want to logout?</h3>
        <div className="logoutModalButtons">
          <button className="confirmButton" onClick={onLogoutConfirm}>
            Yes, Logout
          </button>
          <button className="cancelButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

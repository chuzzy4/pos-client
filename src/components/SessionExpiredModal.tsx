import React from "react";

interface SessionExpiredModalProps {
  onLoginAgain: () => void;
  onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  onLoginAgain,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Session Expired</h2>
        <p className="modal-message">
          Your session has expired. Please log in again to continue.
        </p>
        <div className="modal-actions">
          <button className="modal-button primary" onClick={onLoginAgain}>
            Log In Again
          </button>
          <button className="modal-button secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;

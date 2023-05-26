import React from 'react';

const SecondaryModal = ({ title, show, handleClose, children }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn bg-light btn-sm" onClick={handleClose} style={{border:"1px solid #46139f"}}>Close</button>
        
          </div>
          <div className="modal-body">

            

            {children}</div>
          
        </div>
      </div>
    </div>
  );
};

export default SecondaryModal;

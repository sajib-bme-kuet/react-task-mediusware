import React from 'react';

const Modal = ({ title, show, handleClose, children, modalSwitcher }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn bg-light btn-sm" onClick={handleClose} style={{border:"1px solid #46139f"}}>Close</button>
          </div>
          <div className="modal-body">

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-md text-light" type="button" onClick={() => modalSwitcher("A")} style={{ backgroundColor: "#46139f" }} >All Contacts</button>
              <button className="btn btn-md text-light" type="button" onClick={() => modalSwitcher("B")} style={{ backgroundColor: "#ff7f50" }}>US Contacts</button>
            </div>

            {children}</div>
          <div className="modal-footer justify-content-start">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="only-even" />
              <label class="form-check-label" for="only-even">
                Only Even
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

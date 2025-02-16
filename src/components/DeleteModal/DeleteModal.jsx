import "./DeleteModal.scss"; 
import ReactModal from "react-modal";
import CloseIcon from "../../assets/icons/close.svg";

ReactModal.setAppElement("#root");

export default function DeleteModal({ isOpen, onClose, onAction, modalTag }) {
    return (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Custom Popup"
          className="modal"
          shouldCloseOnOverlayClick={false}
          overlayClassName="Overlay">
          <button className="modal__button-icon" onClick={onClose}>
            <img className="modal__icon" src={CloseIcon} alt="close icon" />
          </button>
          <div className="modal__container">
            <div className="modal__message-container">
              <h3 className="modal__text">Are you sure you wish to part ways with this delicious {modalTag} recipe?</h3>
              <p className="modal__text">
              Please confirm that you would like to delete this recipe.
              </p>
            </div>
    
            <div className="modal__button-container">
              <button
                className="modal__button modal__button--secondary"
                onClick={onClose}>
                Cancel
              </button>
              <button
                className="modal__button modal__button--delete"
                onClick={() => {
                  onAction();
                }}>
                Delete
              </button>
            </div>
          </div>
        </ReactModal>
         )
}
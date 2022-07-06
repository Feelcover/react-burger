import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalWindow = document.querySelector("#modal");

const Modal = ({ description, open, closeModal, children }) => {
  React.useEffect(() => {
    function handleEscKeydown(evt) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleEscKeydown);
      return () => {
        document.removeEventListener("keydown", handleEscKeydown);
      };
    }
  }, [open]);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.container}>
        <h3
          className={`${modalStyles.description} text text_type_main-large pt-15 pb-1 pl-10`}
        >
          {description}
        </h3>
        <button className={modalStyles.close_button}>
          <CloseIcon onClick={closeModal} />
        </button>
        {children}
      </div>
      <ModalOverlay open={open} closeModal={closeModal} />
    </>,
    modalWindow
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default Modal;

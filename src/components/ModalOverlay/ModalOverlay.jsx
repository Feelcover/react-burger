import React from "react";
import modalOverlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={closeModal}></div>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;

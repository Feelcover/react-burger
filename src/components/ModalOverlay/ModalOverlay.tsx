import { FC } from 'react';
import modalOverlayStyles from "./ModalOverlay.module.css";
import { TModalOverlay } from "../../services/types";

const ModalOverlay: FC<TModalOverlay> = ({ closeModal }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={closeModal}></div>
  );
};


export default ModalOverlay;

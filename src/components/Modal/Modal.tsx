import {useEffect, FC} from "react";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { TModal } from "../../services/types";

const modalWindow = document.querySelector("#modal") as HTMLElement;

const Modal: FC<TModal> = ({ description, closeModal, children }) => {
  useEffect(() => {
    function handleEscKeydown(evt: {key: string}) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.container}>
        <h3
          className={`${modalStyles.description} text text_type_main-large pt-15 pb-1 pl-10`}
        >
          {description}
        </h3>
        <button className={modalStyles.close_button}>
          <CloseIcon onClick={closeModal} type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalWindow
  );
};

export default Modal;

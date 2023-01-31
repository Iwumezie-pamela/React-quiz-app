import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { modalOpen,closeModal, correctQuestions,questions } = useGlobalContext();

  return (
    <div
      className={`${modalOpen ? "modal-container isOpen" : "modal-container"}`}
    >
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>you answered {((correctQuestions/questions.length)* 100).toFixed(0)}% of the questions correctly </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;

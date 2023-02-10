import React from "react";
import { useEffect } from "react";
import styles from "./Modal.module.css";
export const Modal = ({ isVisible = false, title, onClose, component }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal_dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h3 className={styles.modal_title}>{title}</h3>
          <span className={styles.modal_close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles.modal_body}>
          <div className={styles.modal_content}>{component}</div>
        </div>
      </div>
    </div>
  );
};

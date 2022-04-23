import React from "react";
import ReactDom from "react-dom";
import classes from "./modal.module.css";

const Modal = ({ url, onClose }) => {
  return ReactDom.createPortal(
    <div className={classes.modal} onClick={onClose}>
      <a href="!#" onClick={onClose}>
        Close me ;)
      </a>
      <img src={url} />
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;

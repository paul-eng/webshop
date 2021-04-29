import React, { useRef } from "react";
import plusSVG from "../icons/plus.svg";
import "../styles/Modal.css";

const Modal = React.forwardRef((props,ref) => {
  const modal = useRef(null);
  let onClick = () => {
    let display = modal.current.style.display;
    modal.current.style.display = display === "none" ? "flex" : "none";
  };

  return (
    <div className="Modal">
      <article onClick={onClick}>
        <img src={plusSVG} alt="plus" />
      </article>
      <div ref={modal} style={{ display: "none" }}>
        <div className="container">
          <section onClick={onClick}>
            <img src={plusSVG} alt="plus" />
          </section>
          <img ref={ref}
            src={props.slides ? props.slides[props.selected] : ""}
            alt="modal"
          />
        </div>
      </div>
    </div>
  );
});

export default Modal;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearModal } from "../../actions/ItemActions"
import "../../styles/Modal.css";

const Modal = () => {
  const dispatch = useDispatch();
  const {
    itemInfo: { gallery },
    modal,
  } = useSelector((state) => state.products);

  return (
    <div
      style={{ display: typeof modal === "number" ? "block" : "none" }}
      className="Modal"
    >
      {gallery ? <img src={gallery[modal]} alt="Modal" /> : null}
      <aside onClick={() => dispatch(clearModal())}>+</aside>
    </div>
  );
};

export default Modal;

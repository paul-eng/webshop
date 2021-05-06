import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMsg } from "../../actions/NavActions";
import "../../styles/Message.css";
import pluswhiteSVG from "../../icons/pluswhite.svg";

const Message = (props) => {
  const msg = useSelector((state) => state.nav.msg);
  const popup = useRef();
  const dispatch = useDispatch();
  const autoclose = useRef();

  const closePopup = useCallback(() => {
    popup.current.className = "Message";
    setTimeout(() => dispatch(clearMsg()), 500);
  }, [dispatch]);

  const onClick = () => {
    closePopup();
    clearTimeout(autoclose.current);
  };

  useEffect(() => {
    if (msg) {
      autoclose.current = setTimeout(() => {
        closePopup();
      }, 3500);
    }
  }, [msg, closePopup]);

  return (
    <section ref={popup} className={msg ? "Message popup" : "Message"}>
      <h3>{msg}</h3>
      <aside onClick={onClick}>
        <img src={pluswhiteSVG} alt="plus" />
      </aside>
    </section>
  );
};

export default Message;

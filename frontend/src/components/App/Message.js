import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMsg } from "../../actions/NavActions";
import "../../styles/Message.css";
import pluswhiteSVG from "../../icons/pluswhite.svg";

const Message = (props) => {
  const msg = useSelector((state) => state.nav.msg);
  const popup = useRef();
  const dispatch = useDispatch();

  const onClick = () => {
    popup.current.className = "Message";
    setTimeout(() => dispatch(clearMsg()), 1000);
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => (popup.current.className = "Message"), 4000);
      setTimeout(() => dispatch(clearMsg()), 5000);
    }
  }, [msg, dispatch]);

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

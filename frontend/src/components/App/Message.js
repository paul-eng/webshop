import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMsg } from "../../actions/NavActions";
import "../../styles/Message.css";
import pluswhiteSVG from "../../icons/pluswhite.svg";

const Message = (props) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(clearMsg());
  };
  const msg = useSelector((state) => state.nav.msg);
  return (
    <div style={{display: msg ? "flex" : "none"}} className="Message">
      <h3>{msg}</h3>
      <aside onClick={onClick}>
        <img src={pluswhiteSVG} alt="plus" />
      </aside>
    </div>
  );
};

export default Message;

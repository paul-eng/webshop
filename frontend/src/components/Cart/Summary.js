import React from "react";
import "../../styles/Summary.css";
import check from "../../icons/check.svg";
import Order from "../Account/Order"

const Summary = (props) => {
  const shipinfo = props.location.state.shipping;
  // can you do props.history.push insead of usehist?
  const onClick = (e) => {
    e.preventDefault();
    props.history.push("/");
  };

  return (
    <div className="Summary">
      <img src={check} alt="checkmark" />
      <h2>Thanks for your order!</h2>
      <h4>
        You will receive a confirmation email at <span>{shipinfo.email}</span>{" "}
        soon.
      </h4>
      <Order location={props.location} />
      <input onClick={onClick} type="submit" value="CONTINUE SHOPPING" />
    </div>
  );
};

export default Summary;

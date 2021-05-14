import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Summary.css";
import check from "../../icons/check.svg";

const Summary = (props) => {
  const history = useHistory();
  const summary = history.location.state;
  const shipinfo = summary.shipping;

  console.log (summary)
  return (
    <div className="Summary">
      <img src={check} alt="checkmark" />
      <h2>Thanks for your order!</h2>
      <h4>
        You will receive a confirmation email at <span>{shipinfo.email}</span>{" "}
        soon.
      </h4>
      <section>
        <h3>ORDER #{summary.order}</h3>
        <article>
          {/* <h3>Order Number: {summary.order}</h3> */}
          <h3>Date: {summary.date}</h3>
          <h3>Email: {shipinfo.email}</h3>
        </article>
      </section>
      <section>
        <h3>ORDER SUMMARY</h3>
        <article></article>
      </section>
    </div>
  );
};

export default Summary;

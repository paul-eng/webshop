import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStripe } from "../../actions/CartActions";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../styles/Payment.css";

const Payment = (props) => {
  return (
    <div className="Payment">
      <section>
        <h3>Payment method</h3>
      </section>
    </div>
  );
};

export default Payment;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStripe } from "../../actions/CartActions";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../styles/Checkout.css";

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const clientSecret = useRef();
  const didMount = useRef(false);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
    if (!didMount.current) {
      dispatch(fetchStripe()).then((res) => (clientSecret.current = res));
      didMount.current = true;
    }
  });

  const [errors, setErrors] = useState({});
  const [empty, setEmpty] = useState({});

  const handleErrors = (e) => {
    if (e?.error?.message) {
      setErrors((prev) => {
        return { ...prev, [e.elementType]: e.error.message };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [e.elementType]: undefined };
      });
    }

    setEmpty((prev) => {
      return { ...prev, [e.elementType]: e.empty };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let notEmpty =
      Object.values(empty).length === 3 && !Object.values(empty).includes(true);
    let noErrors =
      Object.values(errors).findIndex((el) => el !== undefined) === -1;
    
    if (notEmpty && noErrors) console.log("U R GOOD")

    if (!stripe || !elements) return;

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardNumberElement),
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }
  };

  return (
    <div className="Checkout">
      <section>
        <h3>Payment Method</h3>
        <form onSubmit={onSubmit}>
          <article>
            <h3>Card number</h3>
            <div>
              <CardNumberElement onChange={handleErrors} />
            </div>
            <h3>{errors.cardNumber}</h3>
          </article>
          <article>
            <h3>Expiration date</h3>
            <div>
              <CardExpiryElement onChange={handleErrors} />
            </div>
            <h3>{errors.cardExpiry}</h3>
          </article>
          <article>
            <h3>Security Code</h3>
            <div>
              <CardCvcElement onChange={handleErrors} />
            </div>
            <h3>{errors.cardCvc}</h3>
          </article>
          <input type="submit" value="PLACE ORDER" />
        </form>
      </section>
      <section>
        <h3>Order summary</h3>
        <aside>
          <ul>
            <li>Subtotal:</li>
            <li>Tax:</li>
            <li>Total:</li>
          </ul>
          <ul>
            <li>${total.toFixed(2)}</li>
            <li>${(total * 0.08875).toFixed(2)}</li>
            <li>${(total * 1.08875).toFixed(2)}</li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default Checkout;

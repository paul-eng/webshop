import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchStripe, setMsg, clearCart } from "../../actions/CartActions";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../styles/Payment.css";
import amex from "../../icons/amex.png";
import discover from "../../icons/discover.png";
import jcb from "../../icons/jcb.png";
import master from "../../icons/master.png";
import union from "../../icons/union.png";
import visa from "../../icons/visa.png"
import { fetchCard } from "../../actions/CartActions";
import { genOrderNum } from "../../util/Util";

const Payment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [errors, setErrors] = useState({});
  const [empty, setEmpty] = useState({});
  const [allOK, setOK] = useState(false);

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

  useEffect(() => {
    let notEmpty =
      Object.values(empty).length === 3 && !Object.values(empty).includes(true);
    let noErrors =
      Object.values(errors).findIndex((el) => el !== undefined) === -1;

    noErrors && notEmpty ? setOK(true) : setOK(false);
  }, [errors, empty]);

  const info = props.shipinfo;

  const shippingObj = {
    address: {
      city: info.city,
      country: info.country,
      line1: info.add1,
      line2: info.add2,
      postal_code: info.postcode,
      state: info.state,
    },
    carrier: info.method,
    name: info.firstname.concat(" ", info.lastname),
    phone: info.phone,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (allOK) {
      setOK(false);
      const total = cart.total + props.shipfee;
      const clientSecret = await dispatch(fetchStripe(total));
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: info.firstname.concat(" ", info.lastname),
            email: info.email,
          },
        },
        receipt_email: info.email,
        shipping: shippingObj,
      });
      if (paymentResult.error) {
        dispatch(setMsg(paymentResult.error.message));
        setOK(true);
      } else if (paymentResult.paymentIntent) {
        const { payment_method: paymethod, id: order } =
          paymentResult.paymentIntent;
        const card = await dispatch(fetchCard(paymethod));

        const summary = {
          order: genOrderNum(total),
          subtotal: cart.total,
          items: cart.items,
          shipping: props.shipinfo,
          shipfee: props.shipfee,
          total,
          date: new Date().toLocaleDateString(),
          stripe: { paymethod, order, card },
        };

        dispatch(clearCart());
        history.push({
          pathname: "/checkout/summary",
          state: summary,
        });
      }
    }
  };

  let cardStyle = { style: { base: { fontSize: "1.1em" } } };

  return (
    <div className="Payment">
      <section>
        <h3>Payment Method</h3>
        <form onSubmit={onSubmit}>
          <div>
            <img src={amex} alt="American Express" />
            <img src={union} alt="China UnionPay" />
            <img src={discover} alt="Discover" />
            <img src={jcb} alt="Japan Credit Bureau" />
            <img src={master} alt="Mastercard" />
            <img src={visa} alt="Visa" />
          </div>
          <article>
            <h3>Card number</h3>

            <CardNumberElement options={cardStyle} onChange={handleErrors} />

            <h3>{errors.cardNumber}</h3>
          </article>
          <article>
            <h3>Expiration date</h3>
            <span>
              <CardExpiryElement options={cardStyle} onChange={handleErrors} />
            </span>
            <h3>{errors.cardExpiry}</h3>
          </article>
          <article>
            <h3>Security Code</h3>
            <span>
              <CardCvcElement options={cardStyle} onChange={handleErrors} />
            </span>
            <h3>{errors.cardCvc}</h3>
          </article>
          <input
            style={{
              pointerEvents: allOK ? "auto" : "none",
              opacity: allOK ? "100%" : "50%",
            }}
            type="submit"
            value="PLACE ORDER"
          />
        </form>
      </section>
    </div>
  );
};

export default Payment;

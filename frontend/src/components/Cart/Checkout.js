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
import "../../styles/Checkout.css";

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);

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

  const [ship, setShip] = useState();

  const onChange = (e) => {
    setShip(parseInt(e.target.value));
  };

  let notEmpty =
    Object.values(empty).length === 3 && !Object.values(empty).includes(true);
  let noErrors =
    Object.values(errors).findIndex((el) => el !== undefined) === -1;
  let allOK = noErrors && notEmpty && ship;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (allOK) {
      const clientSecret = await dispatch(fetchStripe(total + ship));

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: "Faruq Yusuff",
          },
        },
      });

      console.log(paymentResult)
    }
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
            <span>
              <div>
                <CardExpiryElement onChange={handleErrors} />
              </div>
            </span>
            <h3>{errors.cardExpiry}</h3>
          </article>
          <article>
            <h3>Security Code</h3>
            <span>
              <div>
                <CardCvcElement onChange={handleErrors} />
              </div>
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
      <section>
        <h3>Shipment Method</h3>
        <aside>
          <ul onChange={onChange}>
            <label>
              <input type="radio" value="5" name="shipmethod" />
              USPS First Class
            </label>

            <br />
            <label>
              <input type="radio" value="10" name="shipmethod" />
              USPS Priority
            </label>
            <br />
            <label>
              <input type="radio" value="20" name="shipmethod" />
              USPS Express
            </label>
            <br />
          </ul>
        </aside>
      </section>
      <section>
        <h3>Order summary</h3>
        <aside>
          <ul>
            <li>Subtotal:</li>
            <li>Shipping: </li>
            <li>Total:</li>
          </ul>
          <ul>
            <li>${total.toFixed(2)}</li>
            <li>{ship ? "$" + ship.toFixed(2) : "Not yet calculated"}</li>
            <li>
              {ship ? `$${(total + ship).toFixed(2)}` : "Not yet calculated"}
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default Checkout;

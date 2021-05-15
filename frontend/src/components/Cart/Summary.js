import React from "react";
import { useHistory } from "react-router-dom";
import { renderAdd, cartList } from "../../util/Util";
import "../../styles/Summary.css";
import amex from "../../icons/amex_xl.png";
import discover from "../../icons/discover_xl.png";
import jcb from "../../icons/jcb_xl.png";
import master from "../../icons/master_xl.png";
import union from "../../icons/union_xl.png";
import visa from "../../icons/visa_xl.png";
import other from "../../icons/other.png";
import check from "../../icons/check.svg";

const Summary = (props) => {
  const history = useHistory();
  const summary = history.location.state;
  const card = summary.stripe.card;
  const shipinfo = summary.shipping;

  const cardicon = (brand) => {
    switch (brand) {
      case "amex":
        return <img src={amex} alt="American Express" />;
      case "discover":
        return <img src={discover} alt="Discover" />;
      case "jcb":
        return <img src={jcb} alt="Japan Credit Bureau" />;
      case "mastercard":
        return <img src={master} alt="Mastercard" />;
      case "unionpay":
        return <img src={union} alt="China UnionPay" />;
      case "visa":
        return <img src={visa} alt="Visa" />;
      default:
        return <img src={other} alt="Credit Card" />;;
    }
  };

  const onClick = (e) => {
      e.preventDefault();
      history.push("/")
  }

  return (
    <div className="Summary">
      <img src={check} alt="checkmark" />
      <h2>Thanks for your order!</h2>
      <h4>
        You will receive a confirmation email at <span>{shipinfo.email}</span>{" "}
        soon.
      </h4>
      <div>

      <section>
        <h3>ORDER #{summary.order}</h3>
        <article>
          <div>
            <span>
              <h3>Details</h3>
            </span>

            <h3>Date: {summary.date}</h3>
            <h3>Email: {shipinfo.email}</h3>
            <aside>
              {cardicon(card.brand)}
              <div>
                <span>Ending in {card.last4}</span><br/>
                <span>{`${card.exp_month}/${card.exp_year}`}</span>
              </div>
            </aside>
          </div>
          <div>
            <span>
              <h3>Delivery address</h3>
            </span>
            {renderAdd(shipinfo)}
          </div>
          <div>
            <span>
              <h3>Delivery option</h3>
            </span>
            <h3>{shipinfo.method}</h3>
          </div>
        </article>
      </section>
      <section>
        <h3>ORDER SUMMARY</h3>
        <article>
            {cartList(summary.items)}

        </article>
        <article>
            <ul>
                <h3>Subtotal:</h3>
                <h3>Shipping:</h3>
                <h3>Total:</h3>
            </ul>
            <ul>
                    <h3>${summary.subtotal.toFixed(2)}</h3>
                <h3>${summary.shipfee.toFixed(2)}</h3>
                <h3>${summary.total.toFixed(2)}</h3>
            </ul>
        </article>
      </section>
      </div>
      <input onClick={onClick} type="submit" value="CONTINUE SHOPPING" />
    </div>
  );
};

export default Summary;

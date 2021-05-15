import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getOrders } from "../../actions/UserActions";
import { logoutService } from "../../util/Util";
import { renderAdd } from "../../util/Util";
import OrderHistory from "./OrderHistory";
import "../../styles/Account.css";
const Account = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [orders, setOrders] = useState();
  const didMount = useRef(false);

  let logOut = (e) => {
    e.preventDefault();
    logoutService(history, dispatch);
  };

  useEffect(() => {
    if (!didMount.current) {
      dispatch(getOrders()).then((res) => setOrders(res));
      didMount.current = true;
    }
  });
  // props.user || {} prevents crash on refresh or between dispatch(logout) and history.push in logoutservice, where props.user is null w no properties
  // set default value {} for address, otherwise crash when user is null while attempting to access nested key 'default'
  let {
    firstname,
    lastname,
    email,
    address: { default: address } = {},
  } = props.user || {};

  return (
    <div className="Account">
      <div>
        <h3>ACCOUNT</h3>
        <section>
          <article>
            <h3>Contact details</h3>
            <h3>{firstname + " " + lastname}</h3>
            <h3>{email}</h3>
          </article>
          <article>
            <div>
              <h3>Address book </h3>
              <Link to="/account/address">
                <span>EDIT</span>
              </Link>
            </div>
            {address ? (
              renderAdd(address)
            ) : (
              <h3>You have not set a default shipping address.</h3>
            )}
          </article>
          <input onClick={logOut} type="submit" value="LOG OUT" />
        </section>
        <section>
          <article>
            <h3>Order History</h3>
            {orders ? <OrderHistory orders={orders}/> : <h3>You have not made any orders.</h3>}
          </article>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Account);

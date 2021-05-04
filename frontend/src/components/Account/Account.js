import { connect } from "react-redux";
import React from "react";
import Nav from "../Nav/Nav";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/UserActions";
import { clearCart } from "../../actions/CartActions";
import "../../styles/Account.css";
const Account = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  let logOut = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => dispatch(clearCart()));
    history.push("/account/logout");
  };

  return (
    <div className="Account">
      <Nav />
      {props.user ? (
        <div>
          <h3>ACCOUNT</h3>
          <section>
            <article>
              <h3>Contact details</h3>
              <h3>{props.user.firstname + " " + props.user.lastname}</h3>
              <h3>{props.user.email}</h3>
            </article>
            <article>
              <h3>Address book</h3>
              <h3>You have not set a default shipping address.</h3>
            </article>
            <input onClick={logOut} type="submit" value="LOG OUT" />
          </section>
          <section>
            <article>
              <h3>Order History</h3>
              <h3>You have not made any orders.</h3>
            </article>
          </section>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Account);

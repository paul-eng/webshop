import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/UserActions";
import { clearCart } from "../../actions/CartActions";

const Dashboard = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let onClick = () => {
    dispatch(logout()).then(() => dispatch(clearCart()));
    history.push("/account/logout");
  };
  return (
    <div
      style={{ display: props.active ? "block" : "none" }}
      ref={ref}
      className="Dashboard"
    >
      <h3>ACCOUNT</h3>
      <section>
        <h3>
          <Link to="/account/">
            <span>Account overview</span>
          </Link>
        </h3>
        <h3>
          <span onClick={onClick}>Log out</span>
        </h3>
      </section>
    </div>
  );
});

export default Dashboard;

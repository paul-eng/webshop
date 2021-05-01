import React from "react";
import { Link } from "react-router-dom";

const Account = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ display: props.active ? "block" : "none" }}
      ref={ref}
      className="Account"
    >
      <h3>LOG IN</h3>
      <form>
        <input type="text" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="SIGN IN" />
      </form>
      <h3>
        <Link to="/account/create">
          <span>{"> Create an account"}</span>
        </Link>
      </h3>
    </div>
  );
});

export default Account;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../actions/UserActions";
import validator from "validator";

const Account = React.forwardRef((props, ref) => {
  let history = useHistory();
  let email = useRef();
  let pass = useRef();
  let didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  let onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (validator.isEmpty(email.value)) {
      setErrors((errors) => {
        return { email: "Required field.", ...errors };
      });
    } else if (!validator.isEmail(email.value)) {
      setErrors((errors) => {
        return { email: "Please enter a valid email address.", ...errors };
      });
    }

    if (validator.isEmpty(pass.value)) {
      setErrors((errors) => {
        return { pass: "Required field.", ...errors };
      });
    }
  };

  useEffect(() => {
    if (didMount.current) {
      if (Object.keys(errors).length === 0) {
        const user = { email: email.value, pass: pass.value };
        dispatch(login(user));
        history.push("/account");
      }
    } else {
      didMount.current = true;
    }
  }, [errors, dispatch, history]);

  return (
    <div
      style={{ display: props.active ? "block" : "none" }}
      ref={ref}
      className="Account"
    >
      <h3>LOG IN</h3>
      <form onSubmit={onSubmit}>
        <article>
          <input
            ref={(input) => (email = input)}
            type="text"
            placeholder="Email address"
            style={{ border: errors.email ? "1px solid red" : "" }}
          />
          <h3>{errors.email}</h3>
        </article>
        <article>
          <input
            ref={(input) => (pass = input)}
            type="password"
            placeholder="Password"
            style={{ border: errors.pass ? "1px solid red" : "" }}
          />
          <h3>{errors.pass}</h3>
        </article>
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

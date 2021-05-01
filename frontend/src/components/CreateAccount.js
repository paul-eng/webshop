import React from "react";
import Nav from "./Nav";
import "../styles/CreateAccount.css";

const CreateAccount = (props) => {
  return (
    <div className="CreateAccount">
      <Nav />
      <section>
        <h3>CREATE AN ACCOUNT</h3>
        <h3>
          Create an account to move through the checkout process faster, store
          your shipping and billing address, and view order
          history.
        </h3>

        <form className="AccountForm">
          <h3>First name</h3>
          <input type="text" />
          <h3>Last name</h3>
          <input type="text" />
          <h3>Email</h3>
          <input type="text" />
          <h3>Password</h3>
          <input type="password" />
          <h3>Confirm password</h3>
          <input type="password" />
          <input type="submit" value="CREATE AN ACCOUNT" />
        </form>
      </section>
    </div>
  );
};

export default CreateAccount;

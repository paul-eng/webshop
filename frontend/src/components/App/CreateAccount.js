import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "../../styles/CreateAccount.css";
import validator from "validator";

window.validator = validator;
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      email: "",
      pass: "",
      pass2: "",
      successful: false,
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
    let { successful, errors, ...fields } = this.state;
    for (let field in fields) {
      this.validate(field);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.ltrim(e.target.value) });
  }

  validate(field) {
    if (validator.isEmpty(this.state[field])) {
      this.setState((state) => {
        return {
          errors: Object.assign({}, state.errors, { [field]: "test" }),
        };
      });
    }
    console.log(this.state.errors)
  }

  render() {
    return (
      <div className="CreateAccount">
        <Nav />
        <section>
          <h3>CREATE AN ACCOUNT</h3>
          <h3>
            Create an account to move through the checkout process faster, store
            your shipping and billing address, and view order history.
          </h3>

          <form onSubmit={this.onSubmit} className="AccountForm">
            <h3>First name</h3>
            <input
              onChange={this.onChange}
              name="first"
              type="text"
              value={this.state.first}
            />
            <h3>Last name</h3>
            <input
              onChange={this.onChange}
              name="last"
              type="text"
              value={this.state.last}
            />
            <h3>Email</h3>
            <input
              onChange={this.onChange}
              name="email"
              type="text"
              value={this.state.email}
            />
            <h3>Password</h3>
            <input
              onChange={this.onChange}
              name="pass"
              type="password"
              value={this.state.pass}
            />
            <h3>Confirm password</h3>
            <input
              onChange={this.onChange}
              name="pass2"
              type="password"
              value={this.state.pass2}
            />
            <input type="submit" value="CREATE AN ACCOUNT" />
          </form>
        </section>
      </div>
    );
  }
}

export default CreateAccount;

import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import "../../styles/CreateAccount.css";
import { addUser } from "../../actions/UserActions";
import validator from "validator";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      email: "",
      pass: "",
      pass2: "",
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let { errors, ...fields } = this.state;
    this.setState({ errors: {} });

    let validations = [];

    for (let field in fields) {
      let val = new Promise((resolve) => {
        resolve(this.validate(field));
      });
      validations.push(val);
    }

    Promise.allSettled(validations).then(async () => {
      if (Object.keys(this.state.errors).length === 0) {
        this.setState(
          { email: validator.normalizeEmail(this.state.email) },
          () => {
            const { errors, pass2, ...user } = this.state;
            this.props.addUser(user)
          }
        );
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.trim(e.target.value) });
  }

  validate(field) {
    let seterror = (msg) => {
      // use callback because validation is async, sync setstate would use stale state that may
      // be missing errors being processed simultaneously
      this.setState((state) => {
        return {
          errors: Object.assign({}, state.errors, {
            [field]: msg,
          }),
        };
      });
    };

    let value = this.state[field];

    if (
      (field === "first" || field === "last") &&
      !validator.isAlpha(value, "en-US", { ignore: "-" })
    ) {
      seterror("Please enter a valid name.");
    }

    if (field === "email" && !validator.isEmail(value)) {
      seterror("Please enter a valid email address (Ex: johndoe@domain.com).");
    }

    if (
      field === "pass" &&
      !validator.isStrongPassword(value, { minLength: 6, minUppercase: 0 })
    ) {
      seterror("Password needs to include at least one number and one symbol.");
    }

    if (field === "pass" && !validator.isLength(value, { min: 6 })) {
      seterror("Password must be at least 6 characters.");
    }

    if (field === "pass2" && !validator.equals(value, this.state.pass)) {
      seterror("Please enter the same value again.");
    }

    if (validator.isEmpty(value)) {
      seterror("This is a required field.");
    }
  }

  render() {
    let errors = this.state.errors;
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
            <article>
              <h3>First name</h3>
              <input
                onChange={this.onChange}
                name="first"
                type="text"
                value={this.state.first}
                style={{ border: errors.first ? "1px solid red" : "" }}
              />
              <h3>{errors.first}</h3>
            </article>
            <article>
              <h3>Last name</h3>
              <input
                onChange={this.onChange}
                name="last"
                type="text"
                value={this.state.last}
                style={{ border: errors.last ? "1px solid red" : "" }}
              />
              <h3>{errors.last}</h3>
            </article>
            <article>
              <h3>Email</h3>
              <input
                onChange={this.onChange}
                name="email"
                type="text"
                value={this.state.email}
                style={{ border: errors.email ? "1px solid red" : "" }}
              />
              <h3>{errors.email}</h3>
            </article>
            <article>
              <h3>Password</h3>
              <input
                onChange={this.onChange}
                name="pass"
                type="password"
                value={this.state.pass}
                style={{ border: errors.pass ? "1px solid red" : "" }}
              />
              <h3>{errors.pass}</h3>
            </article>
            <article>
              <h3>Confirm password</h3>
              <input
                onChange={this.onChange}
                name="pass2"
                type="password"
                value={this.state.pass2}
                style={{ border: errors.pass2 ? "1px solid red" : "" }}
              />
              <h3>{errors.pass2}</h3>
            </article>
            <input type="submit" value="CREATE AN ACCOUNT" />
          </form>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);

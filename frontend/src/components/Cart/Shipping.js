import React, { Component } from "react";
import "../../styles/Shipping.css";
import validator from "validator";
import ShippingForm from "./ShippingForm";

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      company: "",
      phone: "",
      add1: "",
      add2: "",
      city: "",
      state: "",
      postcode: "",
      country: "United States",
      errors: {},
      key: undefined,
      method: undefined,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getCost = this.getCost.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let { errors, key, ...fields } = this.state;
    this.setState({ errors: {} });
    let validations = [];
    for (let field in fields) {
      let val = new Promise((resolve) => {
        resolve(this.validate(field));
      });
      validations.push(val);
    }
    Promise.allSettled(validations).then(() => {
      if (Object.keys(this.state.errors).length === 0) {
        let { key, errors, ...info } = this.state;
        this.props.getshipinfo(info);
      }
    });
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
    if (field === "email" && !validator.isEmail(this.state.email))
      seterror("Invalid email address");
    if (
      field !== "state" &&
      field !== "company" &&
      field !== "add2" &&
      field !== "method" &&
      validator.isEmpty(this.state[field])
    ) {
      seterror("Required field.");
    }
    if (field === "method" && !this.state.method)
      seterror("Please select a shipping method.");
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.ltrim(e.target.value) });
  }

  getCost(e) {
    this.setState({ method: e.target.id });
    this.props.getshipcost(e);
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="Shipping">
        <ShippingForm
          onChange={this.onChange}
          state={this.state}
          onSubmit={this.onSubmit}
        />

        <section>
          <h3>Shipping method</h3>
          <aside>
            <ul onChange={this.getCost}>
              <label>
                <input
                  type="radio"
                  id="USPS First Class"
                  value="5"
                  name="shipmethod"
                />
                USPS First Class
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  id="USPS Priority"
                  value="10"
                  name="shipmethod"
                />
                USPS Priority
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  id="USPS Express"
                  value="20"
                  name="shipmethod"
                />
                USPS Express
              </label>
              <p style={{ color: "red" }}>{errors.method}</p>
            </ul>
          </aside>
          <input onClick={this.onSubmit} type="submit" value="NEXT" />
        </section>
      </div>
    );
  }
}

export default Shipping;

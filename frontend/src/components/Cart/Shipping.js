import React, { Component } from "react";
import "../../styles/Shipping.css";
import Countries from "../../util/Countries.js";
import validator from "validator";

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
      ship: undefined,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getCost = this.getCost.bind(this);
  }

  onSubmit(e) {
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
            let {key, errors, ...info} = this.state
            this.props.getshipinfo(info)
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
    if (
      field !== "state" &&
      field !== "company" &&
      field !== "add2" &&
      field !== "ship" &&
      validator.isEmpty(this.state[field])
    ) {
      seterror("Required field.");
    }

    if (field === "ship" && !this.state[field])
      seterror("Please select a shipping method.");
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.ltrim(e.target.value) });
  }

  getCost(e) {
    this.setState({ ship: e.target.id });
    this.props.getshipcost(e);
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="Shipping">
        <section className="Form">
          <form>
            <input
              onChange={this.onChange}
              name="email"
              type="text"
              value={this.state.email}
              placeholder="Email address"
            />
            <h3>{errors.email}</h3>
            <input
              onChange={this.onChange}
              name="firstname"
              type="text"
              value={this.state.firstname}
              placeholder="First name"
            />
            <h3>{errors.firstname}</h3>
            <input
              onChange={this.onChange}
              name="lastname"
              type="text"
              value={this.state.lastname}
              placeholder="Last name"
            />
            <h3>{errors.lastname}</h3>
            <input
              onChange={this.onChange}
              name="company"
              type="text"
              value={this.state.company}
              placeholder="Company"
            />
            <h3>{errors.company}</h3>
            <input
              onChange={this.onChange}
              name="phone"
              type="text"
              value={this.state.phone}
              placeholder="Phone"
            />
            <h3>{errors.phone}</h3>
            <input
              onChange={this.onChange}
              name="add1"
              type="text"
              value={this.state.add1}
              placeholder="Street address 1"
            />
            <h3>{errors.add1}</h3>
            <input
              onChange={this.onChange}
              name="add2"
              type="text"
              value={this.state.add2}
              placeholder="Street address 2"
            />
            <h3>{errors.add2}</h3>
            <input
              onChange={this.onChange}
              name="city"
              type="text"
              value={this.state.city}
              placeholder="City"
            />
            <h3>{errors.city}</h3>
            <input
              onChange={this.onChange}
              name="state"
              type="text"
              value={this.state.state}
              placeholder="State / Province"
            />
            <h3>{errors.state}</h3>
            <input
              onChange={this.onChange}
              name="postcode"
              type="text"
              value={this.state.postcode}
              placeholder="Postal code"
            />
            <h3>{errors.postcode}</h3>
            <Countries
              defaultValue={this.state.country}
              onChange={this.onChange}
            />
          </form>
        </section>

        <section>
          <h3>Shipping method</h3>
          <aside>
            <ul onChange={this.getCost}>
              <label>
                <input
                  type="radio"
                  id="firstclass"
                  value="5"
                  name="shipmethod"
                />
                USPS First Class
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  id="priority"
                  value="10"
                  name="shipmethod"
                />
                USPS Priority
              </label>
              <br />
              <label>
                <input type="radio" id="express" value="20" name="shipmethod" />
                USPS Express
              </label>
              <p style={{ color: "red" }}>{errors.ship}</p>
            </ul>
          </aside>
          <input onClick={this.onSubmit} type="submit" value="NEXT" />
        </section>
      </div>
    );
  }
}

export default Shipping;

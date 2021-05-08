import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";
import Countries from "../../util/Countries.js";

class Address extends Component {
  constructor(props) {
    super(props);
    let user = this.props.user || {};
    this.state = {
      firstname: user.firstname,
      lastname: user.lastname,
      company: "",
      phone: "",
      add1: "",
      add2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.trim(e.target.value) });
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="Address Form">
        <section>
          <h3>ADD NEW ADDRESS</h3>

          <form onSubmit={this.onSubmit}>
            <article>
              <h3>First name</h3>
              <input
                onChange={this.onChange}
                name="firstname"
                type="text"
                value={this.state.firstname}
              />
              <h3>{errors.firstname}</h3>
            </article>
            <article>
              <h3>Last name</h3>
              <input
                onChange={this.onChange}
                name="lastname"
                type="text"
                value={this.state.lastname}
              />
              <h3>{errors.lastname}</h3>
            </article>
            <article>
              <h3>Company</h3>
              <input
                onChange={this.onChange}
                name="company"
                type="text"
                value={this.state.company}
              />
              <h3>{errors.company}</h3>
            </article>
            <article>
              <h3>Phone</h3>
              <input
                onChange={this.onChange}
                name="phone"
                type="text"
                value={this.state.phone}
              />
              <h3>{errors.phone}</h3>
            </article>
            <article>
              <h3>Street address</h3>
              <input
                onChange={this.onChange}
                name="add1"
                type="text"
                value={this.state.add1}
              />
              <input
                onChange={this.onChange}
                name="add1"
                type="text"
                value={this.state.add2}
              />
              <h3>{errors.address}</h3>
            </article>
            <article>
              <h3>City</h3>
              <input
                onChange={this.onChange}
                name="city"
                type="text"
                value={this.state.city}
              />
              <h3>{errors.city}</h3>
            </article>
            <article>
              <h3>State / Province</h3>
              <input
                onChange={this.onChange}
                name="state"
                type="text"
                value={this.state.state}
              />
              <h3>{errors.state}</h3>
            </article>
            <article>
              <h3>Postal Code</h3>
              <input
                onChange={this.onChange}
                name="postcode"
                type="text"
                value={this.state.postcode}
              />
              <h3>{errors.postcode}</h3>
            </article>
            <article>
              <h3>Countries</h3>
              <Countries onChange={this.onChange} />
              <h3>{errors.country}</h3>
            </article>
            <input type="submit" value="SAVE ADDRESS" />
            <h3>{errors.country}</h3>
          </form>
        </section>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);

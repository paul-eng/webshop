import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import Countries from "../../util/Countries.js";
import { addAddress } from "../../actions/UserActions";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setAddress();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addBook !== this.props.addBook) this.setAddress();
  }

  addressKey() {
    // location state passed by <Link>s in Address.js
    const locationData = this.props.location.state;
    if (locationData) return locationData.addKey;
    return false;
  }

  setAddress() {
    let addKey = this.addressKey();
    let addBook = this.props.addBook;
    if (addBook && addKey) {
      let address = addBook[addKey];
      this.setState({ ...address, ...{ key: addKey } });
    } else if (this.props.user && !addKey) {
      let { firstname, lastname } = this.props.user;
      this.setState({ firstname, lastname });
    }
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

    Promise.allSettled(validations).then(() => {
      if (Object.keys(this.state.errors).length === 0) {
        const { errors, key, ...address } = this.state;
        this.props.addAddress(address, key).then((r) => {
          if (r?.type === "SET_ADDRESS") this.props.history.push("/account/address");
        });
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: validator.ltrim(e.target.value) });
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
      validator.isEmpty(this.state[field])
    ) {
      seterror("This is a required field.");
    }
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="AddressForm Form">
        <section>
          <h3>{this.state.key ? "EDIT" : "ADD"} ADDRESS</h3>

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
              <h3>{errors.add1}</h3>
              <input
                onChange={this.onChange}
                name="add2"
                type="text"
                value={this.state.add2}
              />
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
              <h3>Postal code</h3>
              <input
                onChange={this.onChange}
                name="postcode"
                type="text"
                value={this.state.postcode}
              />
              <h3>{errors.postcode}</h3>
            </article>
            <article>
              <h3>Country</h3>
              <Countries
                defaultValue={this.state.country}
                onChange={this.onChange}
              />
              <h3>{errors.country}</h3>
            </article>
            <span>
              <h3>
                <Link to="/account">Go back</Link>
              </h3>
              <input type="submit" value="SAVE ADDRESS" />
            </span>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    addBook: state.user?.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAddress: (address, key) => dispatch(addAddress(address, key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);

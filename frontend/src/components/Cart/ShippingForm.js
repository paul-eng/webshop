import React from "react";
import Countries from "../../util/Countries.js";

const ShippingForm = (props) => {
  let errors = props.state.errors;
  return (
    <section className="Form">
      <h3>Shipping address</h3>
      <form onSubmit={props.onSubmit}>
        <input
          onChange={props.onChange}
          name="email"
          type="text"
          value={props.state.email}
          placeholder="Email address"
        />
        <h3>{errors.email}</h3>
        <input
          onChange={props.onChange}
          name="firstname"
          type="text"
          value={props.state.firstname}
          placeholder="First name"
        />
        <h3>{errors.firstname}</h3>
        <input
          onChange={props.onChange}
          name="lastname"
          type="text"
          value={props.state.lastname}
          placeholder="Last name"
        />
        <h3>{errors.lastname}</h3>
        <input
          onChange={props.onChange}
          name="company"
          type="text"
          value={props.state.company}
          placeholder="Company"
        />
        <h3>{errors.company}</h3>
        <input
          onChange={props.onChange}
          name="phone"
          type="text"
          value={props.state.phone}
          placeholder="Phone"
        />
        <h3>{errors.phone}</h3>
        <input
          onChange={props.onChange}
          name="add1"
          type="text"
          value={props.state.add1}
          placeholder="Street address 1"
        />
        <h3>{errors.add1}</h3>
        <input
          onChange={props.onChange}
          name="add2"
          type="text"
          value={props.state.add2}
          placeholder="Street address 2"
        />
        <h3>{errors.add2}</h3>
        <input
          onChange={props.onChange}
          name="city"
          type="text"
          value={props.state.city}
          placeholder="City"
        />
        <h3>{errors.city}</h3>
        <input
          onChange={props.onChange}
          name="state"
          type="text"
          value={props.state.state}
          placeholder="State / Province"
        />
        <h3>{errors.state}</h3>
        <input
          onChange={props.onChange}
          name="postcode"
          type="text"
          value={props.state.postcode}
          placeholder="Postal code"
        />
        <h3>{errors.postcode}</h3>
        <Countries
          defaultValue={props.state.country}
          onChange={props.onChange}
        />
        {/* hidden button to allow submitting by pressing enter, since NEXT input cant trigger from outside of form element */}
        <button style={{ display: "none" }} type="submit" />
      </form>
    </section>
  );
};

export default ShippingForm;

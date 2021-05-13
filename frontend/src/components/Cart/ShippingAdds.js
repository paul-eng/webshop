import React, { useState } from "react";
import ShippingForm from "./ShippingForm";
import { renderAdd } from "../../util/Util";
import validator from "validator";
import "../../styles/ShippingAdds.css";

const ShippingAdds = (props) => {
  const [select, setSelect] = useState();
  const [modal, setModal] = useState(false);
  const [formstate, setState] = useState({
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
  });
  const highlight = (key) => {
    return select === key ? "#0c0" : "#828282";
  };

  const addList = Object.entries(props.addbook).map((add) => (
    <div style={{ color: highlight(add[0]) }} key={add[0] + add[1].firstname}>
      <input value={add[0]} type="radio" name="savedAdd" />
      {renderAdd(add[1])}
    </div>
  ));

  const onChange = (e) => {
    let key = e.target.value;
    setSelect(key);
    props.onSelect(key);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const modalChange = (e) => {
    setState({
      ...formstate,
      [e.target.name]: validator.ltrim(e.target.value),
    });
    console.log(formstate);
  };

  return (
    <section className="ShippingAdds">
      <h3>Shipping address</h3>
      <form onChange={onChange}>{addList}</form>
      <input onClick={toggleModal} type="submit" value="ADD ADDRESS" />
      <div
        className="ShippingModal"
        style={{ display: modal ? "flex" : "none" }}
      >
        <div>
          <ShippingForm onChange={modalChange} state={formstate} />
          <span>
            <input onClick={toggleModal} type="submit" value="CANCEL" />
            <input type="submit" value="SAVE ADDRESS" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default ShippingAdds;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingForm from "./ShippingForm";
import { addAddress } from "../../actions/UserActions";
import { renderAdd } from "../../util/Util";
import validator from "validator";
import "../../styles/ShippingAdds.css";

const ShippingAdds = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [select, setSelect] = useState();
  const [modal, setModal] = useState(false);
  let blank = {
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
  };

  if (user.firstname) {
    blank = { ...blank, firstname: user.firstname, lastname: user.lastname };
  }
  const [formstate, setState] = useState(blank);
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let { errors, ...fields } = formstate;
    setState({ ...formstate, errors: {} });
    let validations = [];
    for (let field in fields) {
      let val = new Promise((resolve) => {
        resolve(validate(field));
      });
      validations.push(val);
    }
    Promise.allSettled(validations).then((res) => {
      const err = res.map((prom) => prom.value).includes("ERR");
      if (!err) {
        let { errors, ...info } = formstate;
        dispatch(addAddress(info));
        toggleModal();
        setState(blank);
      }
    });
  };

  const validate = (field) => {
    let seterror = (msg) => {
      setState((formstate) => {
        return {
          ...formstate,
          errors: Object.assign({}, formstate.errors, {
            [field]: msg,
          }),
        };
      });
    };

    if (
      field !== "state" &&
      field !== "company" &&
      field !== "add2" &&
      field !== "method" &&
      validator.isEmpty(formstate[field])
    ) {
      seterror("Required field.");
      return "ERR";
    }
  };

  return (
    <section className="ShippingAdds">
      <h3>Shipping address</h3>
      <form onChange={onChange}>{addList}</form>
      <input onClick={toggleModal} type="submit" value="ADD ADDRESS" />
      <div
        className="ShippingModal"
        style={{ visibility: modal ? "visible" : "hidden" }}
      >
        <div
          style={{ transform: modal ? "translateY(0)" : "translateY(-120%)" }}
        >
          <ShippingForm
            onSubmit={onSubmit}
            onChange={modalChange}
            state={formstate}
          />
          <span>
            <input onClick={toggleModal} type="submit" value="CANCEL" />
            <input onClick={onSubmit} type="submit" value="SAVE ADDRESS" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default ShippingAdds;

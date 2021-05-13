import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { deleteAddress } from "../../actions/UserActions";
import "../../styles/Address.css";

class Address extends Component {
  componentDidMount() {
    // if (!this.props.user?.address?.default) this.props.history.push("/account/address/form");
  }

  delete(key) {
    this.props.deleteAddress(key);
  }

  render() {
    let addBook = this.props.user?.address;
    let addresses;
    if (addBook) {
      addresses = Object.entries(addBook).map(([key, add], i) => {
        return (
          <aside key={key + i}>
            <span>{key === "default" ? "Default address" : null}</span>
            <h3>{add.firstname + " " + add.lastname}</h3>
            <h3>{add.company}</h3>
            <h3>{add.add1}</h3>
            <h3>{add.add2}</h3>
            <h3>
              {[add.city, add.state, add.postcode]
                .filter((x) => x !== "")
                .join(", ")}
            </h3>
            <h3>{add.country}</h3>
            <h3>T: {add.phone}</h3>
            <div>
              <Link
                to={{
                  pathname: "/account/address/form",
                  state: { addKey: key },
                }}
              >
                <h3>Edit</h3>
              </Link>
              <h3 onClick={() => this.delete(key)}>Delete</h3>
            </div>
          </aside>
        );
      });
    }
    return (
      <div className="Address">
        <section>{addresses}</section>
        <Link to="/account/address/form">
          <input type="submit" value="ADD NEW ADDRESS" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAddress: (key) => dispatch(deleteAddress(key)),
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Address));

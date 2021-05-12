import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/AddressBook";
import { Link, withRouter } from "react-router-dom";

class AddressBook extends Component {
  componentDidMount() {
    if (!this.props.addBook?.default) this.props.history.push("/address");
  }
  render() {
    let addBook = this.props.addBook;
    let addresses;
    if (addBook) {
      addresses = Object.entries(addBook).map(([key, add]) => {
        return (
          <aside>
            <Link to={{ pathname: "/account", state: { addKey: key } }}></Link>
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
          </aside>
        );
      });
    }
    return <div className="AddressBook">{addresses}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    addBook: state.user.address,
  };
};
export default withRouter(connect(mapStateToProps)(AddressBook));

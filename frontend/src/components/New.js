import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllItems } from "../actions/ItemActions";
import ShowItems from "./ShowItems";

class New extends Component {
  componentDidMount() {
    this.props.fetchNew();
  }

  render() {
    return (
      <div className="New">
        <ShowItems />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNew: ()=>dispatch(fetchAllItems("-updated_date")),
  };
};

export default connect(null, mapDispatchToProps)(New);

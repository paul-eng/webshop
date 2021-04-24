import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FilterOption from "./FilterOption";
import "../styles/Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.visible = this.visible.bind(this);
  }

  visible() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    let visible = this.state.visible ? "flex" : "none";
    let icon = this.state.active ? "-" : "+";

    return (
      <div className="Filter">
        <h3 onClick={this.visible}>{icon} FILTER</h3>
        <section style={{ display: visible }}>
          <ul>
            <FilterOption text="NEWEST" filter="sort" value="-updated_date" />
            <FilterOption text="PRICE HIGH" filter="sort" value="-price" />
            <FilterOption text="PRICE LOW" filter="sort" value="price" />
            <FilterOption text="A-Z" filter="sort" value="brand name" />
          </ul>
          <ul>
            <FilterOption text="OLYMPUS" filter="brand" value="Olympus" />
            <FilterOption text="NIKON" filter="brand" value="Nikon" />
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.products.itemList,
  };
};

export default withRouter(connect(mapStateToProps)(Filter));

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
    let filters = { ...this.props.filters };
    for (let type in filters) {
      filters[type] = filters[type].map((option) => (
        <FilterOption
          key={type + option}
          text={option.toUpperCase()}
          filter={type}
          value={option.toLowerCase()}
        />
      ));
    }

    let filterList = [];
    for (let type in filters) {
      filterList.push(
        <ul key={type}>
          <h3>{type.toUpperCase()}</h3>
          {filters[type]}
        </ul>
      );
    }

    return (
      <div className="Filter">
        <h3 onClick={this.visible}>{this.state.visible ? "-" : "+"} FILTER</h3>
        <section style={{ display: this.state.visible ? "flex" : "none" }}>
          <ul>
            <h3>SORT BY</h3>
            <FilterOption text="NEWEST" filter="sort" value="-updated_date" />
            <FilterOption text="PRICE LOW" filter="sort" value="price" />
            <FilterOption text="PRICE HIGH" filter="sort" value="-price" />
            <FilterOption text="A-Z" filter="sort" value="brand name" />
          </ul>
          {filterList}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    // connect to itemlist to rerender whenever new items shown
    items: state.products.itemList,
  };
};

export default withRouter(connect(mapStateToProps)(Filter));

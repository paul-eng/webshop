import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.setActive = this.setActive.bind(this);
    this.getFilter = this.getFilter.bind(this);
  }

  getFilter(e, type) {
    let query = queryString.parse(this.props.location.search);

    // if the query is already active (included in the current query), clicking again deactivates it as long as it's not a sort option
    if (type !== "sort" && query[type] === e.target.id) {
      delete query[type];
    } else {
      let add = {};
      add[type] = e.target.id;
      query = { ...query, ...add };
    }
    this.props.history.push({ search: queryString.stringify(query) });
  }

  setActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    let active = this.state.active ? "block" : "none";
    let icon = this.state.active ? "-" : "+";
    return (
      <div className="Filter">
        <h3 onClick={this.setActive}>{icon} SORT BY</h3>
        <ul style={{ display: active }}>
          <li id="-updated_date" onClick={(e) => this.getFilter(e, "sort")}>
            NEWEST
          </li>
          <li id="price" onClick={(e) => this.getFilter(e, "sort")}>
            PRICE LOW
          </li>
          <li id="-price" onClick={(e) => this.getFilter(e, "sort")}>
            PRICE HIGH
          </li>
          <li id="brand name" onClick={(e) => this.getFilter(e, "sort")}>
            A-Z
          </li>
          <li id="Olympus" onClick={(e) => this.getFilter(e, "brand")}>
            Olympus
          </li>
          <li id="Nikon" onClick={(e) => this.getFilter(e, "brand")}>
            Nikon
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Filter);

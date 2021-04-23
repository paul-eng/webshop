import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.getFilter = this.getFilter.bind(this);
  }

  getFilter(e) {
    this.props.history.push({search:`filter=${e.target.id}`})
  }

  render() {
    return (
      <div className="Filter">
        <h3>FILTER</h3>
        <ul>
          <li id="-price" onClick={this.getFilter}>PRICE HIGH</li>
          <li id="price" onClick={this.getFilter}>PRICE LOW</li>
        </ul>
      </div>
    );
  }
}



export default withRouter(Filter);

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearch } from "../../actions/ItemActions";
import { getFilters } from "../../actions/FilterActions";
import ContentArea from "../Explore/ContentArea";
import { queryStr } from "../../util/Util";

class Search extends Component {
  componentDidMount() {
    let query = queryStr(this.props);
    this.props
      .fetchSearch(query.q, undefined, false)
      .then(this.props.getFilters)
      .then(() => this.props.fetchSearch(query.q, query));
  }
  componentDidUpdate(prevProps) {
    let query = queryStr(this.props);
    let oldSearch = queryStr(prevProps).q.join(" ");
    let newSearch = query.q.join(" ");
    if (oldSearch !== newSearch) {
      this.props.fetchSearch(query.q).then(this.props.getFilters);
    } else {
      this.props.fetchSearch(query.q, query);
    }
  }

  render() {
    return (
      <div className="Search">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: (searchTerms, query, paginate) =>
      dispatch(fetchSearch(searchTerms, query, paginate)),
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Search);

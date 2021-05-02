import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBrand } from "../../actions/ItemActions";
import { getFilters } from "../../actions/FilterActions";
import ContentArea from "../Explore/ContentArea";
import { queryStr, paramStr } from "../../util/Util";

class Brand extends Component {
  componentDidMount() {
    let query = queryStr(this.props);
    this.fetchBrand(undefined, false)
      .then(this.props.getFilters)
      .then(() => this.fetchBrand(query));
  }

  componentDidUpdate(prevProps) {
    // trigger update if path changes without unmounting component ex. from /category/:a?somequery to /category/:a?diffquery
    // update filters if component has changed "pages" without unmounting ex. from /category/:a to /category/:b
    let query = queryStr(this.props);
    if (prevProps.match.url !== this.props.match.url) {
      this.fetchBrand(query).then(this.props.getFilters);
    } else {
      this.fetchBrand(query);
    }
  }

  fetchBrand(query, paginate) {
    let parsedParam = paramStr(this).brand;
    return this.props.fetchBrand(parsedParam, query, paginate);
  }

  render() {
    return (
      <div className="Brand">
        <ContentArea />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrand: (brandURI, query, paginate) =>
      dispatch(fetchBrand(brandURI, query, paginate)),
    getFilters: () => dispatch(getFilters()),
  };
};

export default connect(null, mapDispatchToProps)(Brand);

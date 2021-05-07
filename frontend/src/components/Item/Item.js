import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "./Slider";
import ItemControls from "./ItemControls";
import { fetchItem, clearItem } from "../../actions/ItemActions";
import "../../styles/Item.css";

class Item extends Component {
  componentDidMount() {
    let item = this.props.match.params.item;
    this.props.fetchItem(item);
  }

  componentDidUpdate() {
    // redirect from incorrect url since /:item catches all
    if (this.props.itemInfo === null) this.props.history.push("/");
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  render() {
    const itemInfo = this.props.itemInfo;
    return itemInfo ? (
      <div className="Item">
        <Slider gallery={itemInfo.gallery} />
        <section>
          <h2>{`${itemInfo.brand} ${itemInfo.name}`.toUpperCase()}</h2>
          <h3>${itemInfo.price}</h3>
          <h3>
            <p>{itemInfo.description}</p>
          </h3>
          <ItemControls />
        </section>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: (item) => dispatch(fetchItem(item)),
    clearItem: () => dispatch(clearItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

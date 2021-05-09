import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import searchSVG from "../../icons/search.svg";
import { makeQuery } from "../../util/Util";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      visible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.visible = this.visible.bind(this);
    this.textbox = React.createRef();
    this.searchBar = React.createRef();
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }

  onSubmit(form) {
    form.preventDefault();
    this.setState({ search: "", visible: false });
    this.textbox.current.blur();
    makeQuery(form, this.props.history);
  }

  handleClick(e) {
    if (this.searchBar.current && !this.searchBar.current.contains(e.target)) {
      this.setState({ visible: false });
      document.removeEventListener("mousedown", this.handleClick);
    }
  }

  visible() {
    document.addEventListener("mousedown", this.handleClick);
    if (!this.state.visible) {
      this.setState({ visible: true });
      this.textbox.current.focus();
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="SearchBar" ref={this.searchBar}>
        <img
          onClick={this.visible}
          style={{ cursor: this.state.visible ? "default" : "pointer" }}
          alt="search"
          src={searchSVG}
        />
        <form
          style={{
            width: this.state.visible ? "20vw" : 0,
            pointerEvents: this.state.visible ? "auto" : "none",
          }}
          onSubmit={this.onSubmit}
        >
          <input
            ref={this.textbox}
            placeholder="Search item(s)"
            type="text"
            value={this.state.search}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
export default withRouter(SearchBar);

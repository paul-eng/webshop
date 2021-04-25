import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      visible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.visible = this.visible.bind(this);
    this.textbox = React.createRef();
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }

  onSubmit(form) {
    form.preventDefault();
    this.setState({ search: "", visible: false });
    console.log(form.target[0].value);
  }

  visible() {
    this.setState({ visible: !this.state.visible });
    this.textbox.current.focus();
  }
  render() {
    return (
      <div className="Search">
        <h3 onClick={this.visible}>SEARCH</h3>
        <form
          style={{ width: this.state.visible ? "30%" : 0 }}
          onSubmit={this.onSubmit}
        >
          <input
            ref={this.textbox}
            type="text"
            value={this.state.search}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
export default Search;

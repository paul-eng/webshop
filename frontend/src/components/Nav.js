import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        I'm a little nav short and stout
        <ul>
          <li>
            <Link to="/category/slr">SLRS</Link>
          </li>
          <li>
            <Link to="/brand/yashica">Yashis only</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;

import { connect } from "react-redux";
import React from "react";
import Nav from "../Nav/Nav";
import "../../styles/Profile.css";
const Profile = (props) => {
  return (
    <div className="Profile">
      <Nav />
      <div>
        <section>
          <h3>ACCOUNT</h3>
          <article>
            <h3>{props.user?.firstname + " " + props.user?.lastname}</h3>
            <h3>{props.user?.email}</h3>
          </article>
        </section>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);

import React from "react";
import { useDispatch } from "react-redux";
import { toggleNav } from "../../actions/NavActions";
import searchSVG from "../../icons/search.svg";
import { makeQuery } from "../../util/Util";
import { useHistory } from "react-router-dom";

const MobileSearch = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (form) => {
    form.preventDefault();
    makeQuery(form, history);
    dispatch(toggleNav());
  };

  return (
    <div className="MobileSearch">
      <img src={searchSVG} alt="mobile search" />
      <form onSubmit={onSubmit}>
        <input  placeholder="Search item(s)" type="text" />
      </form>
    </div>
  );
};

export default MobileSearch;

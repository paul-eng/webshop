import { combineReducers } from "redux";
import cart from "./CartReducer";
import products from "./ItemReducer";
import nav from "./NavReducer";
import filters from "./FilterReducer";

export default combineReducers({ cart, products, nav, filters });

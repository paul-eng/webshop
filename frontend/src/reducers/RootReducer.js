import { combineReducers } from "redux";
import cart from "./CartReducer";
import products from "./ItemReducer";
import nav from "./NavReducer";
import filters from "./FilterReducer";
import user from "./UserReducer"

export default combineReducers({ user, cart, products, nav, filters });

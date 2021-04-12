import { combineReducers } from "redux";
import cart from "./CartReducer";
import products from "./ItemReducer";
import nav from "./NavReducer";

export default combineReducers({ cart, products, nav });

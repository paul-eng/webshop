import { combineReducers } from "redux";
import cart from "./CartReducer";
import products from "./ItemReducer";

export default combineReducers({ cart, products });

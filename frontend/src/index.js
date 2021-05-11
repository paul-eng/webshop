import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./reducers/RootReducer";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IpjCXLDGBjqGrZi8GOJ6DzAuqzv1JyDiQAo9DUl7i2m9XC3c79PHnAw1jwsOh0oMlOkNiBYUsx2Dm2BkJ2FZCws00dDWucF5k"
);
const store = createStore(rootReducer, applyMiddleware(thunk));
// for dev build only
window.store = store;

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Elements>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

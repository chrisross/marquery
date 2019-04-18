import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./styles.css";
import App from "./components/App";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

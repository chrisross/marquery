import { createStore } from "redux";
import reducers from "./reducers";
import initialState from "./initialState";

const configureStore = initialState => {
  return createStore(reducers, initialState);
};

const store = configureStore(initialState);

export default store;

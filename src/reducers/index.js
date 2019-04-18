import { combineReducers } from "redux";
import { reducer as marqueryFormReducer } from "redux-form";

const rootReducer = combineReducers({
  form: marqueryFormReducer
});

export default rootReducer;

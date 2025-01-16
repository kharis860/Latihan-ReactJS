import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import divisionReducer from "../reducers/divisionReducers";

const store = createStore(
  divisionReducer,
  applyMiddleware(thunk)
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

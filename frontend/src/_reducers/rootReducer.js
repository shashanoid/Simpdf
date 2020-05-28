import { combineReducers } from "redux";
import htmlreducer from "./htmlreducer";

export default combineReducers({
  data: htmlreducer,
});

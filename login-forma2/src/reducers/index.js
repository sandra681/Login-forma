import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  userReducer,
});

export default rootReducer;

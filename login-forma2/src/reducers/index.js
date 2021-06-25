import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({ authReducer, messageReducer });

export default rootReducer;

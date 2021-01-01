import { combineReducers } from "redux";
import BurgerReducer from "./burgerReducer";

const rootReducer = combineReducers({
  //gioHangReducer:gioHangReducer,
  BurgerReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { errorReducer as error } from "./error/reducer";
import { tokenReducer as token } from "./token/reducer";
import { walletReducer as wallet } from "./wallet/reducer";

export const reducer = combineReducers({
  wallet,
  token,
  error,
});

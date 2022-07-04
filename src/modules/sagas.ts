import { all } from "@redux-saga/core/effects";
import { tokenSaga } from "./token/sagas";
import { walletSaga } from "./wallet/sagas";

export function* sagas() {
  yield all([walletSaga(), tokenSaga()]);
}

import { all, call, put, takeEvery } from "redux-saga/effects";
import { getProvider } from "../../web3";
import { setError } from "../error/actions";
import { balanceRequest, symbolRequest } from "../token/actions";
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
} from "./actions";

function* handleConnectWalletRequest() {
  try {
    const provider = getProvider();

    yield call(() => provider.send("eth_requestAccounts", []));

    const signer = provider.getSigner();
    const address: string = yield call(() => signer.getAddress());

    yield put(connectWalletSuccess(address));
    yield all([put(balanceRequest()), put(symbolRequest())]);
  } catch (error: any) {
    console.error(error);
    yield all([
      put(connectWalletFailure()),
      put(setError("Failed to connect wallet")),
    ]);
  }
}

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}

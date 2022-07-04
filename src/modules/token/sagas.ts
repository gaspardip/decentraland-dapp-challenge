import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber } from "ethers";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { getProvider, getTokenContract } from "../../web3";
import { setError } from "../error/actions";
import {
  balanceRequest,
  balanceSuccess,
  BALANCE_REQUEST,
  symbolSuccess,
  SYMBOL_REQUEST,
  transferFailure,
  TransferRequestAction,
  transferSuccess,
  TRANSFER_REQUEST,
} from "./actions";

function* handleBalanceRequest() {
  try {
    const tokenContract = getTokenContract();
    const address: string = yield call(() =>
      getProvider().getSigner().getAddress()
    );

    const balance: BigNumber = yield call(() =>
      tokenContract.balanceOf(address)
    );

    yield put(balanceSuccess(balance));
  } catch (error: any) {
    console.error(error);
    yield put(setError("Failed to fetch token balance"));
  }
}

function* handleSymbolRequest() {
  try {
    const tokenContract = getTokenContract();

    const symbol: string = yield call(() => tokenContract.symbol());

    yield put(symbolSuccess(symbol));
  } catch (error: any) {
    console.error(error);
    yield put(setError("Failed to fetch token symbol"));
  }
}

function* handleTransferRequest({
  payload: { to, amount },
}: TransferRequestAction) {
  try {
    const tokenContract = getTokenContract();
    const signer = getProvider().getSigner();

    const tx: TransactionResponse = yield call(() =>
      tokenContract.connect(signer).transfer(to, amount)
    );

    yield call(() => tx.wait());

    yield all([put(transferSuccess()), put(balanceRequest())]);
  } catch (error: any) {
    console.error(error);
    yield all([
      put(transferFailure()),
      put(setError("Failed to transfer token")),
    ]);
  }
}

export function* tokenSaga() {
  yield takeEvery(BALANCE_REQUEST, handleBalanceRequest);
  yield takeEvery(SYMBOL_REQUEST, handleSymbolRequest);
  yield takeEvery(TRANSFER_REQUEST, handleTransferRequest);
}

import { BigNumber } from "ethers";

export const BALANCE_REQUEST = "BALANCE_REQUEST";
export const BALANCE_SUCCESS = "BALANCE_SUCCESS";

export function balanceRequest() {
  return {
    type: BALANCE_REQUEST,
  };
}

export function balanceSuccess(balance: BigNumber) {
  return {
    type: BALANCE_SUCCESS,
    payload: {
      balance: balance.toString(),
    },
  };
}

export type BalanceSuccessAction = ReturnType<typeof balanceSuccess>;

export const SYMBOL_REQUEST = "SYMBOL_REQUEST";
export const SYMBOL_SUCCESS = "SYMBOL_SUCCESS";

export function symbolRequest() {
  return {
    type: SYMBOL_REQUEST,
    payload: {},
  };
}

export function symbolSuccess(symbol: string) {
  return {
    type: SYMBOL_SUCCESS,
    payload: {
      symbol,
    },
  };
}

export type SymbolRequestAction = ReturnType<typeof symbolRequest>;
export type SymbolSuccessAction = ReturnType<typeof symbolSuccess>;

export const TRANSFER_REQUEST = "TRANSFER_REQUEST";
export const TRANSFER_SUCCESS = "TRANSFER_SUCCESS";
export const TRANSFER_FAILURE = "TRANSFER_FAILURE";

export function transferRequest(to: string, amount: number) {
  return {
    type: TRANSFER_REQUEST,
    payload: {
      to,
      amount,
    },
  };
}

export function transferSuccess() {
  return {
    type: TRANSFER_SUCCESS,
  };
}

export function transferFailure() {
  return {
    type: TRANSFER_FAILURE,
  };
}

export type TransferRequestAction = ReturnType<typeof transferRequest>;
export type TransferSuccessAction = ReturnType<typeof transferSuccess>;
export type TransferFailureAction = ReturnType<typeof transferFailure>;

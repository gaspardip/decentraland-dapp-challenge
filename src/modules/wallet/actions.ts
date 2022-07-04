export const CONNECT_WALLET_REQUEST = "CONNECT_WALLET_REQUEST";
export const CONNECT_WALLET_SUCCESS = "CONNECT_WALLET_SUCCESS";
export const CONNECT_WALLET_FAILURE = "CONNECT_WALLET_FAILURE";

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
  };
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
    },
  };
}

export function connectWalletFailure() {
  return {
    type: CONNECT_WALLET_FAILURE,
  };
}

export type ConnectWalletRequestAction = ReturnType<
  typeof connectWalletRequest
>;
export type ConnectWalletSuccessAction = ReturnType<
  typeof connectWalletSuccess
>;
export type ConnectWalletFailureAction = ReturnType<
  typeof connectWalletFailure
>;

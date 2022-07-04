import { AnyAction } from "redux";
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
} from "./actions";

const INITIAL_STATE = {
  address: null as string | null,
  isConnecting: false,
};

type WalletState = typeof INITIAL_STATE;

export function walletReducer(
  state = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
      };
    }

    case CONNECT_WALLET_SUCCESS: {
      const { address } =
        action.payload as ConnectWalletSuccessAction["payload"];

      return {
        ...state,
        isConnecting: false,
        address,
      };
    }

    case CONNECT_WALLET_FAILURE: {
      return {
        ...state,
        isConnecting: false,
      };
    }

    default:
      return state;
  }
}

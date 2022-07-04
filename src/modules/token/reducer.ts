import { AnyAction } from "redux";
import {
  BalanceSuccessAction,
  BALANCE_SUCCESS,
  SymbolSuccessAction,
  SYMBOL_SUCCESS,
  TRANSFER_FAILURE,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
} from "./actions";

const INITIAL_STATE = {
  balance: "0",
  symbol: "-",
  isTransferring: false,
};

type TokenState = typeof INITIAL_STATE;

export function tokenReducer(
  state = INITIAL_STATE,
  action: AnyAction
): TokenState {
  switch (action.type) {
    case BALANCE_SUCCESS: {
      const { balance } = action.payload as BalanceSuccessAction["payload"];

      return {
        ...state,
        balance,
      };
    }

    case SYMBOL_SUCCESS: {
      const { symbol } = action.payload as SymbolSuccessAction["payload"];

      return {
        ...state,
        symbol,
      };
    }

    case TRANSFER_REQUEST: {
      return {
        ...state,
        isTransferring: true,
      };
    }

    case TRANSFER_SUCCESS: {
      return {
        ...state,
        isTransferring: false,
      };
    }

    case TRANSFER_FAILURE: {
      return {
        ...state,
        isTransferring: false,
      };
    }

    default:
      return state;
  }
}

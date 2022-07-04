import { RootState } from "../types";

export const selectWalletState = (state: RootState) => state.wallet;

export const selectAddress = (state: RootState) =>
  selectWalletState(state).address ?? "";

export const selectIsConnected = (state: RootState) => !!selectAddress(state);

export const selectIsConnecting = (state: RootState) =>
  selectWalletState(state).isConnecting;

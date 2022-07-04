import { RootState } from "../types";

const selectState = (state: RootState) => state.token;

export const selectBalance = (state: RootState) => selectState(state).balance;
export const selectSymbol = (state: RootState) => selectState(state).symbol;
export const selectIsTransferring = (state: RootState) =>
  selectState(state).isTransferring;

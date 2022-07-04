import { ERROR_CLEAR, ERROR_SET } from "./reducer";

export const setError = (error: string) => ({
  type: ERROR_SET,
  payload: error,
});

export const clearError = () => ({
  type: ERROR_CLEAR,
});

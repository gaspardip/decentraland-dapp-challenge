import { AnyAction } from "redux";

export const ERROR_SET = "ERROR_SET";
export const ERROR_CLEAR = "ERROR_CLEAR";

export const errorReducer = (
  state: string | null = null,
  action: AnyAction
) => {
  switch (action.type) {
    case ERROR_SET:
      return action.payload;
    case ERROR_CLEAR:
      return null;
    default:
      return state;
  }
};

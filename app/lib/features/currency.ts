import { createReducer, createAction } from "@reduxjs/toolkit";

const UPDATE_CURRENCY = "UPDATE_CURRENCY";

const currencyReducer = createReducer(
  { abbr: "usd", symbol: "$" },
  (builder) => {
    builder.addCase(UPDATE_CURRENCY, (state, action: any) => {
      state = action.payload;
      return state;
    });
  }
);

export const updateCurrency = createAction(UPDATE_CURRENCY);

export default currencyReducer;

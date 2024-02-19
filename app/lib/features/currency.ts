import { createReducer, createAction } from "@reduxjs/toolkit";

interface Currency {
  abbr: string;
  symbol: string;
}

const UPDATE_CURRENCY = "UPDATE_CURRENCY";
const initial_state = { abbr: "usd", symbol: "$" };

const currencyReducer = createReducer(initial_state, (builder) => {
  builder.addCase(UPDATE_CURRENCY, (state, action: any) => {
    state = action.payload;
    return state;
  });
});

export const updateCurrency = createAction<Currency>(UPDATE_CURRENCY);

export default currencyReducer;

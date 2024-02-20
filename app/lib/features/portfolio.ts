import { createReducer, createAction } from "@reduxjs/toolkit";

interface AssetInfo {
  id: string;
  name: string;
  current_price: number;
  coinAmt: number;
  amtValue: number;
  pirceChangeSincePurchase: number;
  purchaseDate: string;
}

const ADD_ASSET = "ADD_ASSET";
const DELETE_ASSET = "DELETE_ASSET";
const initial_state: AssetInfo[] = [];

const portfolioReducer = createReducer(initial_state, (builder) => {
  builder.addCase(ADD_ASSET, (state, action: any) => {
    // push asset into state
    state = action.payload;
    return state;
  });
  builder.addCase(DELETE_ASSET, (state, action: any) => {
    // filter tokens and return new state
  });
});

export const addAsset = createAction<AssetInfo[]>(ADD_ASSET);
export const deleteAsset = createAction<AssetInfo[]>(DELETE_ASSET);

export default portfolioReducer;

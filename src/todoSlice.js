import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  USDC: null,
  USDCe: null,
};

export const stableCoinSlice = createSlice({
  name: "AllData",
  initialState,
  reducers: {
    updateUSDC: (state, action) => {
      state.USDC = action.payload;
      return state;
    },
    updateUSDCe: (state, action) => {
      state.USDCe = action.payload;
      return state;
    },
  },
});

// this is for dispatch
export const { updateUSDC, updateUSDCe } = stableCoinSlice.actions;

// this is for configureStore
export default stableCoinSlice.reducer;

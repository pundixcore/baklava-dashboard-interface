import { configureStore } from "@reduxjs/toolkit";
import stableCoinReducer from "./todoSlice";

export default configureStore({
  reducer: {
    stableCoin: stableCoinReducer,
  },
});

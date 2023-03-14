import { configureStore } from "@reduxjs/toolkit";
import CalculadoraSlice from "./calculadoraSlice";

export const store = configureStore({
  reducer: {
    calculadora: CalculadoraSlice.reducer,
  },
});

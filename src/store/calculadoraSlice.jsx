import { createSlice } from "@reduxjs/toolkit";

const initial = {
  All: [],
  Message: {
    message: "",
    status: false,
  },
};

export const CalculadoraSlice = createSlice({
  name: "CalculadoraSlice",
  initialState: initial,
  reducers: {
    addValoresENvios: (state, { payload }) => {
      const exist = state.All.find(
        (item) =>
          item.concept === payload.concept &&
          item.originValue === payload.originValue
      );

      if (exist !== undefined) {
        state.Message = {
          message: "Categoria existente",
          status: true,
        };
        return;
      }

      state.All = [...state.All, payload];
      state.Message = {
        message: "",
        status: false,
      };
    },
    reset: (state) => {
      (state.All = []),
        (state.Message = {
          message: "",
          status: false,
        });
    },
    setMessage: (state, payload) => {
      state.Message = {
        message: "Datos incompletos o inválidos.",
        status: true,
      };
    },
  },
});

export const { addValoresENvios, reset, setMessage } = CalculadoraSlice.actions;

export default CalculadoraSlice;

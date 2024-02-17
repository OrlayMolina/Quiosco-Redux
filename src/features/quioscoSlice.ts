import { createSlice } from "@reduxjs/toolkit";
import { categorias } from "../data/categorias";
import { RootState } from "../types/types";
import { CategoriaProps } from "../types/types";
import { ProductoProps } from "../types/types";

const initialState = {
  categorias: categorias,
  categoriaActual: {},
  modal: false,
  producto: {},
  pedido: [],
  total: 0,
};

export const quioscoSlice = createSlice({
  name: "quiosco",
  initialState,
  reducers: {
    setCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    setCategoriaActual: (state, action) => {
      state.categoriaActual = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setProducto: (state, action) => {
      state.producto = action.payload;
    },
    setPedido: (state, action) => {
      state.pedido = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {
  setCategorias,
  setCategoriaActual,
  setModal,
  setProducto,
  setPedido,
  setTotal,
} = quioscoSlice.actions;

export const selectCategorias = (state: RootState): CategoriaProps[] => state.quiosco.categorias;
export const getCategoriaActual = (state: RootState): CategoriaProps => state.quiosco.categoriaActual;
export const selectModal = (state: RootState): boolean => state.quiosco.modal;
export const selectProducto = (state: RootState): ProductoProps => state.quiosco.producto;
export const selectPedido = (state: RootState): ProductoProps[] => state.quiosco.pedido;
export const selectTotal = (state: RootState) => state.quiosco.total;

export default quioscoSlice.reducer;
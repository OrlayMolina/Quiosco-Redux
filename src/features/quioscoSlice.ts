import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { obtenerCategorias } from "./quioscoAPI";
import { RootState } from "../types/types";
import { CategoriaProps } from "../types/types";
import { ProductoProps } from "../types/types";

const initialState = {
  status: "idle",
  categorias: [],
  categoriaActual: {},
  modal: false,
  producto: {},
  pedido: [],
  total: 0,
};

export const getCategoriesAsync = createAsyncThunk(
  'quiosco/getCategories', 
  async () => {
    const response = await obtenerCategorias();
    console.log(response.data);
    return response.data;
  }
);

export const quioscoSlice = createSlice({
  name: "quiosco",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
    .addCase(getCategoriesAsync.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.categorias = action.payload;
    })
  }
});

export const {
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
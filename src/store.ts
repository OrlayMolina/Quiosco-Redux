import { configureStore } from '@reduxjs/toolkit';
import quioscoReducer from './features/quioscoSlice';

export const store = configureStore({
    reducer: {
      quiosco: quioscoReducer
    },
  });
  
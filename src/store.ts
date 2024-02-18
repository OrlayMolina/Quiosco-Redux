import { configureStore } from '@reduxjs/toolkit';
import quioscoReducer from './features/quioscoSlice';

export const store = configureStore({
    reducer: {
      quiosco: quioscoReducer
    },
  }
);

export type RootState = ReturnType<typeof store.getState>

export default store
  
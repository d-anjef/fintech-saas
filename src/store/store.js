// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import financeReducer from './financeSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    ui: uiReducer,
  },
});
import { configureStore } from '@reduxjs/toolkit';
import shipmentReducer from '../features/shipmentsSlice';

export const store = configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
});

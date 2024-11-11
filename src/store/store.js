import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from "@/store/slices/paymentSlice"
// Import your slice reducers here

const store = configureStore({
  reducer: {
    payment: paymentReducer, // Register user slice
  },
});

export default store;

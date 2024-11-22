import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const buySubsciption = createAsyncThunk(
  "payment/buySubscription",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/subscribe", {productId});
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductsList = createAsyncThunk(
  "payment/getProductsList",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/productsDetail");
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const manageSubsciption = createAsyncThunk(
  "payment/manageSubsciption",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.post("/customers");
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: null,
    loading: false,
    plans: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buySubsciption.pending, (state) => {
        state.loading = true;
      })
      .addCase(buySubsciption.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(buySubsciption.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductsList.fulfilled,(state,action)=>{
        state.plans = action.payload;
      })
  },
});

export default paymentSlice.reducer;

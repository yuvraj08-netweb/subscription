import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const buySubsciption = createAsyncThunk(
  "payment/buySubscription",
  async (planData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/subscribe", planData);
      if (response.data) {
        return response;
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
      const response = await axiosInstance.get("/customers");
      if (response.data) {
        return response;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateSubscriptionTime = createAsyncThunk(
  "payment/updateSubscriptionTime",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.post("/updateSubscriptionTime");
      if (response.data) {
        return response;
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
      });
  },
});

export default paymentSlice.reducer;

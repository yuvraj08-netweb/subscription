import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/regester", userData);
      if (response.data) {
        return response;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/Login", userData);
      if (response.data) {
        return response;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

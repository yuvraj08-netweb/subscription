import axiosInstance from "@/lib/axiosInstance";
import { getLocalStorage } from "@/utils";
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
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/showdata");
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const response = await axiosInstance.post("/Logout");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: getLocalStorage("userData") || null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createUser cases
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      })
      // getUserData cases
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })

      // getUserData cases
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

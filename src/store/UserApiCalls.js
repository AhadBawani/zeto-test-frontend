import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const signUp = createAsyncThunk(
  "User/signUp",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`baseURL${products}`,user);
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const Login = createAsyncThunk(
  "User/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`baseURL${products}`);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  isSuccess: false,
  message: "",
  isLoading: false,
};
const apiSlice = createSlice({
  name: "UserApiCalls",
  initialState,
  reducers: {},
  extraReducers: {

     // signUp Cycle

    [signUp.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },


// Login  Cycle


    [Login.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [Login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [Login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  },
});

export default apiSlice;

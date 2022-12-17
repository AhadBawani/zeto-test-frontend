import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getData = createAsyncThunk(
  "apiCalls/getProduct",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`Product`);
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
  name: "apiCalls",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  },
});

export default apiSlice;

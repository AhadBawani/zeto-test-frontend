import { createSlice } from "@reduxjs/toolkit";
const user =
  localStorage.getItem("id") !== null
    ? (localStorage.getItem("id"))
    : null;
const initialState = {
     user :user,   
};
console.log(initialState.user)
const apiSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    userAction: (state,action) => {
     state.user = action.payload     
    },
  },
});
export const { userAction } = apiSlice.actions;
export default apiSlice.reducer;

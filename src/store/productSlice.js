import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    prod_id : 0,
    query :"",
}
const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
     searchQuery:(state,action)=>{
        state.query  = action.payload
     }
    }
})
export const { searchQuery} = productSlice.actions;
export default productSlice.reducer;


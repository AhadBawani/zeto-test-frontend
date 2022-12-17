import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import ApiCalls from "./ApiCalls"
import ToggleSlice from './ToggleSlice'
import USerSlice from './USerSlice'
export default  configureStore({
  reducer: {
    api :ApiCalls.reducer,
    cart:cartReducer,
    product:productReducer,
    toggleReducer:ToggleSlice,
    UserSlice:USerSlice
  },
})

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: false,
    cartToggle:false,
    signIn: false,
    model: false,
    category: false
}

const ToggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        cartToggle: (state) => {
            state.cartToggle = !(state.cartToggle)
        },
        categoryToggle: (state) => {
            state.toggle = !(state.toggle)
        },
        signUpModelToggle: (state,action) => {
            state.signIn = action.payload
        },
        ModelPopUp: (state, action) => {                        
            if (action.payload == "signIn"){
                state.model = true
                state.signIn = true

            }                
            else if (action.payload == "signUp"){
                state.signIn = false
                state.model = true
            }
            else
            state.model = action.payload
            
        }
    }
})

export const { cartToggle, categoryToggle, signUpModelToggle, ModelPopUp } = ToggleSlice.actions;
export default ToggleSlice.reducer;
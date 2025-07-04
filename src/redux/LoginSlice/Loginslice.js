import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"",
    email:"",
    phone:"",
    password:"",
    confirmpassword:"",
    agreePolicy:false,
    agreeToTerm:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signup : (state,action) => {
            const {field,value} = action.payload;
            state[field] = value
        }
    }
})
export const {signup} = userSlice.actions
export default userSlice.reducer
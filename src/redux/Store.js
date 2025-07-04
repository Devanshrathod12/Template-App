import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../redux/LoginSlice/Loginslice"
import productReducer from "../redux/Product/productSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})
export default store
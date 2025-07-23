import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../redux/LoginSlice/Loginslice";
import productReducer from "../redux/Product/productSlice";
import TempReducer from "../redux/Temp/TempSlice";
import AllcategoryReducer from "../redux/Temp/AllCatagorySlice";
import shapesReducer from "../redux/Temp/ShapesSlice"; 
import TrandingReducer from "../redux/Temp/TrandringSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        TempNew:TempReducer,
        categories: AllcategoryReducer,
        Shapes: shapesReducer,
        trending:TrandingReducer

    }
});
export default store;
// store.js (Final Correct Code)

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from "../redux/LoginSlice/Loginslice";
import productReducer from "../redux/Product/productSlice";
import TempReducer from "../redux/Temp/TempSlice";
import AllcategoryReducer from "../redux/Temp/AllCatagorySlice";
import shapesReducer from "../redux/Temp/ShapesSlice";
import TrandingReducer from "../redux/Temp/TrandringSlice";

// productReducer ke liye persist config
const productPersistConfig = {
  key: 'product',
  storage: AsyncStorage,
  // YEH LINE SABSE ZAROORI HAI:
  // Yeh 'orders' aur 'addresses' dono ko save karegi
  whitelist: ['orders', 'addresses'], 
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    user: userReducer,
    product: persistReducer(productPersistConfig, productReducer),
    TempNew: TempReducer,
    categories: AllcategoryReducer,
    Shapes: shapesReducer,
    trending: TrandingReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
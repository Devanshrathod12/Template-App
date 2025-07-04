// src/redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: '1',
      brand: 'Vincent Chase',
      name: 'Classic Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg',
      price: 1199,
      originalPrice: 1999,
      rating: 4.5,
    },
    {
      id: '2',
      brand: 'Ray-Ban',
      name: 'Aviator Pro',
      gender: 'men',
      shape: 'aviator',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg',
      price: 4500,
      originalPrice: 6000,
      rating: 4.8,
    },
    {
      id: '3',
      brand: 'Oakley',
      name: 'Sport Edition',
      gender: 'women',
      shape: 'round',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg',
      price: 2100,
      originalPrice: 3500,
      rating: 4.2,
    },
    {
      id: '4',
      brand: 'John Jacobs',
      name: 'Modern Cateye',
      gender: 'women',
      shape: 'cat-eye',
      image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg',
      price: 3200,
      originalPrice: 5000,
      rating: 4.7,
    },
    {
      id: '5',
      brand: 'Kids Vogue',
      name: 'Square Kids',
      gender: 'kids',
      shape: 'square',
      image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg',
      price: 899,
      originalPrice: 1299,
      rating: 4.0,
    },
    {
      id: '6',
      brand: 'Vincent Chase',
      name: 'Budget Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3915/E20A3915-1-hd.jpg',
      price: 799,
      originalPrice: 999,
      rating: 3.8,
    },
  ],
};


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

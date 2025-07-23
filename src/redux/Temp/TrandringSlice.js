import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trendingFrames: [
    {
      id: 'd1',
      brand: 'EyeMyEye',
      title: 'Glossy Black Cat-Eye',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg',
      price: 1499,
    },
    {
      id: 'd2',
      brand: 'John Jacobs',
      title: 'Classic Gold Round',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg',
      price: 2500,
    },
    {
      id: 'd3',
      brand: 'Vincent Chase',
      title: 'Pastel Pink Cat-Eye',
      image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg',
      price: 1899,
    },
   
  ],
};

const trendingFramesSlice = createSlice({
    name: "trending", 
    initialState,
    reducers:{
        setAllTrending:(state,action) => {
            state.trendingFrames = action.payload
        }
    }
});
export const { setAllTrending } = trendingFramesSlice.actions;

export const selectAllTrendingFrames = (state) => state.trending.trendingFrames;

export default trendingFramesSlice.reducer;
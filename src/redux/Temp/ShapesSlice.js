import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Shapes: [
    {
      id: 's1',
      title: 'Round',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9195_325_02_2022.jpg',
    },
    {
      id: 's2',
      title: 'Rectangle',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-black-grey-full-rim-rectangle-lenskart-blu-lb-e13527-c1_vincent-chase-vc-e13527-c1-eyeglasses_g_840822_02_2022.jpg',
    },
    {
      id: 's3',
      title: 'Cat-Eye',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--rose-gold-peach-full-rim-cat-eye-lenskart-blu-screen-glasses-blu-computer-glasses-lb-e17488-eyeglasses__dsc9724_12_11_2024_12_11_2024.jpg',
    },
    {
      id: 's4',
      title: 'Aviator',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
    },
    {
      id: 's5',
      title: 'Geometric',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17494-c2-eyeglasses__dsc0644_03_12_2024.jpg',
    },
  ],
};

const ShapesSlice = createSlice({
    name:"Shapes",
    initialState,
    reducers:{
        AllShapes:(state,action) => {
            state.Shapes = action.payload
        }
    }
});
export const {AllShapes} = ShapesSlice.actions;

export const selectAllShapes = (state) => state.Shapes.Shapes;

export default  ShapesSlice.reducer;
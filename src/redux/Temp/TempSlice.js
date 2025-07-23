import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  NewArrivel: [
    {
      id: '1',
      title: 'Eyeglasses',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gunmetal-grey-transparent-full-rim-square-lenskart-blu-lb-e13529-c5_vincent-chase-vc-e13529-c5-eyeglasses_g_898022_02_2022.jpg',
    },
    {
      id: '2',
      title: 'Sunglasses',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg',
    },
    {
      id: '3',
      title: 'Power Glasses',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-transparent-full-rim-square-kids-8-12-yrs-hooper-astra-hooper-hp-e10031l-c10_g_1141_09_01_23.jpg',
    },
    {
      id: '4',
      title: 'For Kids',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-black-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e10004l-c2_hooper-hp-e10004l-c2-eyeglasses_g_4296_22_march23.jpg',
    },
    {
      id: '5',
      title: 'Contact Lens',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//a/i/free-aqualens-comfort-contact-lens-solution-120-ml_aqualens-comfort-contct-lens-solution-120-ml-offer__mg_7089__1.png',
    },
    {
      id: '6',
      title: 'Stunning Rounds',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9195_325_02_2022.jpg',
    },
    {
      id: '7',
      title: 'Elegant Cat-Eye',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--rose-gold-peach-full-rim-cat-eye-lenskart-blu-screen-glasses-blu-computer-glasses-lb-e17488-eyeglasses__dsc9724_12_11_2024_12_11_2024.jpg',
    },
    {
      id: '8',
      title: 'Classic Aviators',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
    },
    {
      id: '9',
      title: 'Modern Geometric',
       subtitle: 'Up to 50% off on latest styles',
      image:
        'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17494-c2-eyeglasses__dsc0644_03_12_2024.jpg',
    },
  ],
};
const TempNewArrivel = createSlice({
  name: 'TempNew',
  initialState,
  reducers:{
    setNewArrivel:(state,Action) => {
        state.NewArrivel = Action.payload
    }
  }
});

export const {setNewArrivel} = TempNewArrivel.actions;
export default TempNewArrivel.reducer;

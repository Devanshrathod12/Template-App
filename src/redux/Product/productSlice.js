// src/redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   products: [
//     {
//       id: '1',
//       brand: 'Vincent Chase',
//       name: 'Classic Rectangle',
//       gender: 'men',
//       shape: 'rectangle',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg',
//       price: 1199,
//       originalPrice: 1999,
//       rating: 4.5,
//     },
//     {
//       id: '2',
//       brand: 'Ray-Ban',
//       name: 'Aviator Pro',
//       gender: 'men',
//       shape: 'aviator',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg',
//       price: 4500,
//       originalPrice: 6000,
//       rating: 4.8,
//     },
//     {
//       id: '3',
//       brand: 'Oakley',
//       name: 'Sport Edition',
//       gender: 'women',
//       shape: 'round',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg',
//       price: 2100,
//       originalPrice: 3500,
//       rating: 4.2,
//     },
//     {
//       id: '4',
//       brand: 'John Jacobs',
//       name: 'Modern Cateye',
//       gender: 'women',
//       shape: 'cat-eye',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg',
//       price: 3200,
//       originalPrice: 5000,
//       rating: 4.7,
//     },
//     {
//       id: '5',
//       brand: 'Kids Vogue',
//       name: 'Square Kids',
//       gender: 'kids',
//       shape: 'square',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg',
//       price: 899,
//       originalPrice: 1299,
//       rating: 4.0,
//     },
//     {
//       id: '6',
//       brand: 'Vincent Chase',
//       name: 'Budget Rectangle',
//       gender: 'men',
//       shape: 'rectangle',
//       image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3915/E20A3915-1-hd.jpg',
//       price: 799,
//       originalPrice: 999,
//       rating: 3.8,
//     },
//   ],
// };
const initialState = {
  products: [
    // Products 1-16 use your new links directly
    {
      id: '1',
      brand: 'Ray-Ban',
      name: 'Bold Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e18339-silver--eyeglasses_dsc6325_24_06_2025.jpg',
      price: 349,
      originalPrice: 999,
      rating: 4.1
    },
    {
      id: '2',
      brand: 'Fastrack',
      name: 'Sport Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-grey-full-rim-square-lenskart-blu-lb-e13526-c3_vincent-chase-vc-e13526-c3-eyeglasses_g_841422_02_2022.jpg',
      price: 799,
      originalPrice: 1550,
      rating: 4.3
    },
    {
      id: '3',
      brand: 'Oakley',
      name: 'Elegant Rectangle',
      gender: 'women',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-blue-full-rim-rectangle-lenskart-blu-lb-e13737-c2_lenskart-blu-lb-e13737-c2-eyeglasses_lenskart-blu-lb-e13737-c2-eyeglasses_eyeglasses_g_100923_02_2022.jpg',
      price: 1399,
      originalPrice: 2133,
      rating: 4.4
    },
    {
      id: '4',
      brand: 'Cool Kids',
      name: 'Retro Rectangle',
      gender: 'kids',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3498_14_03_2024.jpg',
      price: 1800,
      originalPrice: 2350,
      rating: 4.8
    },
    {
      id: '5',
      brand: 'Vincent Chase',
      name: 'Classic Round',
      gender: 'men',
      shape: 'round',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16049-c2-eyeglasses_g_8145_11_10_2023.jpg',
      price: 1250,
      originalPrice: 1999,
      rating: 4.0
    },
    {
      id: '6',
      brand: 'LensKart',
      name: 'Metallic Round',
      gender: 'women',
      shape: 'round',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone---computer-glasses:-black-full-rim-aviator-lenskart-blu-lb-e16051-c2_g_9028_10_16_23.jpg',
      price: 1650,
      originalPrice: 2450,
      rating: 4.5
    },
    {
      id: '7',
      brand: 'Ray-Ban',
      name: 'Tiny Round',
      gender: 'kids',
      shape: 'round',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
      price: 999,
      originalPrice: 1399,
      rating: 4.2
    },
    {
      id: '8',
      brand: 'Fossil',
      name: 'Sharp Square',
      gender: 'men',
      shape: 'square',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17373-c1-eyeglasses_dsc3342_19_09_2024.jpg',
      price: 2300,
      originalPrice: 2899,
      rating: 4.4
    },
    {
      id: '9',
      brand: 'Oakley',
      name: 'Rugged Square',
      gender: 'women',
      shape: 'square',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gold-red-full-rim-square-lenskart-blu-lb-e14521-c3_g_8896_23_03_2022.jpg',
      price: 1850,
      originalPrice: 2500,
      rating: 4.6
    },
    {
      id: '10',
      brand: 'Kids Vogue',
      name: 'Square Kids',
      gender: 'kids',
      shape: 'square',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-c1-lb-e16058_g_3048_28_06_2023.jpg',
      price: 799,
      originalPrice: 1299,
      rating: 4.1
    },
    {
      id: '11',
      brand: 'John Jacobs',
      name: 'Trendy Cat-Eye',
      gender: 'women',
      shape: 'cat-eye',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-hustlr-lb-e14058-xw-c54-eyeglasses__dsc7079_20_06_2024.jpg',
      price: 2750,
      originalPrice: 3999,
      rating: 4.7
    },
    {
      id: '12',
      brand: 'Fossil',
      name: 'Glossy Cat-Eye',
      gender: 'women',
      shape: 'cat-eye',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16218-c1-eyeglasses_img_9125_26_12_2023.jpg',
      price: 4700,
      originalPrice: 5800,
      rating: 4.9
    },
    {
      id: '13',
      brand: 'Ray-Ban',
      name: 'Pilot Aviator',
      gender: 'men',
      shape: 'aviator',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-hustlr-lb-e14058-n-c3-eyeglasses_csvfile-1711692230820-dsc_0497.jpg',
      price: 2100,
      originalPrice: 2700,
      rating: 4.8
    },
    {
      id: '14',
      brand: 'Fastrack',
      name: 'Bold Aviator',
      gender: 'men',
      shape: 'aviator',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-ocean-blue-full-rim-wayfarer_img_9860_02march24.jpg',
      price: 1599,
      originalPrice: 2000,
      rating: 4.3
    },
    {
      id: '15',
      brand: 'Vincent Chase',
      name: 'Smart Wayfarer',
      gender: 'men',
      shape: 'wayfarer',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--blue-full-rim-square-lenskart-blu-lb-e16218-c3_csvfile-1712144185265-img_9147.jpg',
      price: 999,
      originalPrice: 1499,
      rating: 4.2
    },
    {
      id: '16',
      brand: 'John Jacobs',
      name: 'Urban Browline',
      gender: 'women',
      shape: 'browline',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-demi-full-rim-square-lenskart-blu-screen-glasses-lb-e17505-zero-power-screen-glasses__dsc9388_07_04_2025.jpg',
      price: 1250,
      originalPrice: 2100,
      rating: 4.5
    },
    // Products 17-40 repeat the new links to ensure all are working
    {
      id: '17',
      brand: 'Vincent Chase',
      name: 'Hex Edge',
      gender: 'men',
      shape: 'hexagonal',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e18339-silver--eyeglasses_dsc6325_24_06_2025.jpg',
      price: 1350,
      originalPrice: 1900,
      rating: 4.0
    },
    {
      id: '18',
      brand: 'LensKart',
      name: 'Bold Geometric',
      gender: 'women',
      shape: 'geometric',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-grey-full-rim-square-lenskart-blu-lb-e13526-c3_vincent-chase-vc-e13526-c3-eyeglasses_g_841422_02_2022.jpg',
      price: 1800,
      originalPrice: 2500,
      rating: 4.6
    },
    {
      id: '19',
      brand: 'Ray-Ban',
      name: 'Oval Trend',
      gender: 'women',
      shape: 'oval',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-blue-full-rim-rectangle-lenskart-blu-lb-e13737-c2_lenskart-blu-lb-e13737-c2-eyeglasses_lenskart-blu-lb-e13737-c2-eyeglasses_eyeglasses_g_100923_02_2022.jpg',
      price: 1450,
      originalPrice: 2199,
      rating: 4.4
    },
    {
      id: '20',
      brand: 'Oakley',
      name: 'Wrap Pro',
      gender: 'men',
      shape: 'wrap-around',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3498_14_03_2024.jpg',
      price: 2599,
      originalPrice: 3100,
      rating: 4.5
    },
    {
      id: '21',
      brand: 'Vincent Chase',
      name: 'Sleek Aviator',
      gender: 'women',
      shape: 'aviator',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16049-c2-eyeglasses_g_8145_11_10_2023.jpg',
      price: 1799,
      originalPrice: 2400,
      rating: 4.4
    },
    {
      id: '22',
      brand: 'Fossil',
      name: 'Minimalist Round',
      gender: 'men',
      shape: 'round',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone---computer-glasses:-black-full-rim-aviator-lenskart-blu-lb-e16051-c2_g_9028_10_16_23.jpg',
      price: 2150,
      originalPrice: 2999,
      rating: 4.6
    },
    {
      id: '23',
      brand: 'Kids Vogue',
      name: 'Playful Rectangle',
      gender: 'kids',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
      price: 850,
      originalPrice: 1400,
      rating: 4.3
    },
    {
      id: '24',
      brand: 'John Jacobs',
      name: 'Chic Square',
      gender: 'women',
      shape: 'square',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17373-c1-eyeglasses_dsc3342_19_09_2024.jpg',
      price: 3200,
      originalPrice: 4500,
      rating: 4.8
    },
    {
      id: '25',
      brand: 'Ray-Ban',
      name: 'Classic Wayfarer',
      gender: 'men',
      shape: 'wayfarer',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gold-red-full-rim-square-lenskart-blu-lb-e14521-c3_g_8896_23_03_2022.jpg',
      price: 2999,
      originalPrice: 3500,
      rating: 4.7
    },
    {
      id: '26',
      brand: 'LensKart',
      name: 'Modern Cat-Eye',
      gender: 'women',
      shape: 'cat-eye',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-c1-lb-e16058_g_3048_28_06_2023.jpg',
      price: 1999,
      originalPrice: 2800,
      rating: 4.5
    },
    {
      id: '27',
      brand: 'Fastrack',
      name: 'Lightweight Geometric',
      gender: 'men',
      shape: 'geometric',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-hustlr-lb-e14058-xw-c54-eyeglasses__dsc7079_20_06_2024.jpg',
      price: 950,
      originalPrice: 1600,
      rating: 4.1
    },
    {
      id: '28',
      brand: 'Oakley',
      name: 'Stealth Aviator',
      gender: 'men',
      shape: 'aviator',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16218-c1-eyeglasses_img_9125_26_12_2023.jpg',
      price: 3500,
      originalPrice: 4200,
      rating: 4.9
    },
    {
      id: '29',
      brand: 'Cool Kids',
      name: 'Funky Round',
      gender: 'kids',
      shape: 'round',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-hustlr-lb-e14058-n-c3-eyeglasses_csvfile-1711692230820-dsc_0497.jpg',
      price: 699,
      originalPrice: 1199,
      rating: 4.0
    },
    {
      id: '30',
      brand: 'Fossil',
      name: 'Vintage Browline',
      gender: 'women',
      shape: 'browline',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-ocean-blue-full-rim-wayfarer_img_9860_02march24.jpg',
      price: 2800,
      originalPrice: 3400,
      rating: 4.6
    },
    {
      id: '31',
      brand: 'Vincent Chase',
      name: 'Urban Hexagonal',
      gender: 'men',
      shape: 'hexagonal',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--blue-full-rim-square-lenskart-blu-lb-e16218-c3_csvfile-1712144185265-img_9147.jpg',
      price: 1550,
      originalPrice: 2250,
      rating: 4.3
    },
    {
      id: '32',
      brand: 'Ray-Ban',
      name: 'Timeless Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-demi-full-rim-square-lenskart-blu-screen-glasses-lb-e17505-zero-power-screen-glasses__dsc9388_07_04_2025.jpg',
      price: 2499,
      originalPrice: 3000,
      rating: 4.5
    },
    {
      id: '33',
      brand: 'John Jacobs',
      name: 'Designer Oval',
      gender: 'women',
      shape: 'oval',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e18339-silver--eyeglasses_dsc6325_24_06_2025.jpg',
      price: 2950,
      originalPrice: 3800,
      rating: 4.7
    },
    {
      id: '34',
      brand: 'Fastrack',
      name: 'Racer Wrap-Around',
      gender: 'men',
      shape: 'wrap-around',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-grey-full-rim-square-lenskart-blu-lb-e13526-c3_vincent-chase-vc-e13526-c3-eyeglasses_g_841422_02_2022.jpg',
      price: 1999,
      originalPrice: 2500,
      rating: 4.2
    },
    {
      id: '35',
      brand: 'LensKart',
      name: 'Professional Square',
      gender: 'women',
      shape: 'square',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-blue-full-rim-rectangle-lenskart-blu-lb-e13737-c2_lenskart-blu-lb-e13737-c2-eyeglasses_lenskart-blu-lb-e13737-c2-eyeglasses_eyeglasses_g_100923_02_2022.jpg',
      price: 1499,
      originalPrice: 2200,
      rating: 4.4
    },
    {
      id: '36',
      brand: 'Cool Kids',
      name: 'Happy Aviator',
      gender: 'kids',
      shape: 'aviator',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3498_14_03_2024.jpg',
      price: 999,
      originalPrice: 1500,
      rating: 4.5
    },
    {
      id: '37',
      brand: 'Oakley',
      name: 'Vertex Geometric',
      gender: 'men',
      shape: 'geometric',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16049-c2-eyeglasses_g_8145_11_10_2023.jpg',
      price: 2899,
      originalPrice: 3600,
      rating: 4.6
    },
    {
      id: '38',
      brand: 'Fossil',
      name: 'Elegant Wayfarer',
      gender: 'women',
      shape: 'wayfarer',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone---computer-glasses:-black-full-rim-aviator-lenskart-blu-lb-e16051-c2_g_9028_10_16_23.jpg',
      price: 2650,
      originalPrice: 3300,
      rating: 4.7
    },
    {
      id: '39',
      brand: 'Vincent Chase',
      name: 'Sharp Rectangle',
      gender: 'men',
      shape: 'rectangle',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
      price: 1100,
      originalPrice: 1800,
      rating: 4.1
    },
    {
      id: '40',
      brand: 'Kids Vogue',
      name: 'Cute Cat-Eye',
      gender: 'kids',
      shape: 'cat-eye',
      image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17373-c1-eyeglasses_dsc3342_19_09_2024.jpg',
      price: 1050,
      originalPrice: 1650,
      rating: 4.3
    }
  ]
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

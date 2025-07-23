import { createSlice } from '@reduxjs/toolkit';

const productsData = [
  {
    id: '1',
    brand: 'Ray-Ban',
    name: 'Bold Rectangle',
    gender: 'men',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e18339-silver--eyeglasses_dsc6325_24_06_2025.jpg',
    price: 349,
    originalPrice: 999,
    rating: 4.1,
    stock: 12,
    modelNo: 'RB-001',
    offer: '65% Off',
    description:
      'A timeless piece of eyewear, the Ray-Ban Bold Rectangle offers a classic look with a modern twist. Perfect for any occasion.',
    specifications: [
      { title: 'Frame Color', value: 'Silver' },
      { title: 'Material', value: 'Metal' },
    ],
  },
  {
    id: '2',
    brand: 'Fastrack',
    name: 'Sport Rectangle',
    gender: 'men',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-grey-full-rim-square-lenskart-blu-lb-e13526-c3_vincent-chase-vc-e13526-c3-eyeglasses_g_841422_02_2022.jpg',
    price: 799,
    originalPrice: 1550,
    rating: 4.3,
    stock: 18,
    modelNo: 'FT-002',
    offer: '48% Off',
    description:
      'Built for an active lifestyle, these frames are both durable and stylish, ensuring comfort and performance.',
    specifications: [
      { title: 'Frame Color', value: 'Matte Grey' },
      { title: 'Frame Type', value: 'Full Rim' },
    ],
  },
  {
    id: '3',
    brand: 'Oakley',
    name: 'Elegant Rectangle',
    gender: 'women',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-blue-full-rim-rectangle-lenskart-blu-lb-e13737-c2_lenskart-blu-lb-e13737-c2-eyeglasses_lenskart-blu-lb-e13737-c2-eyeglasses_eyeglasses_g_100923_02_2022.jpg',
    price: 1399,
    originalPrice: 2133,
    rating: 4.4,
    stock: 8,
    modelNo: 'OK-003',
    offer: '34% Off',
    description:
      'A touch of elegance for the modern woman. These Oakley frames combine sophisticated design with cutting-edge technology.',
    specifications: [
      { title: 'Frame Color', value: 'Blue' },
      { title: 'Lens Technology', value: 'BLUE CUT' },
    ],
  },
  {
    id: '4',
    brand: 'Cool Kids',
    name: 'Retro Rectangle',
    gender: 'kids',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3498_14_03_2024.jpg',
    price: 1800,
    originalPrice: 2350,
    rating: 4.8,
    stock: 25,
    modelNo: 'CK-004',
    offer: '23% Off',
    description:
      "Fun, durable, and stylish! These frames are designed to keep up with your child's active life.",
    specifications: [
      { title: 'Material', value: 'Hypoallergenic Plastic' },
      { title: 'Age Group', value: '6-10 years' },
    ],
  },
  {
    id: '5',
    brand: 'Vincent Chase',
    name: 'Classic Round',
    gender: 'men',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16049-c2-eyeglasses_g_8145_11_10_2023.jpg',
    price: 1250,
    originalPrice: 1999,
    rating: 4.0,
    stock: 14,
    modelNo: 'VC-005',
    offer: '37% Off',
    description:
      'Make a statement with these bold Round glasses. Combining classic style with contemporary details.',
    specifications: [
      { title: 'Frame Color', value: 'Black' },
      { title: 'Material', value: 'Acetate' },
    ],
  },
  {
    id: '6',
    brand: 'LensKart',
    name: 'Metallic Round',
    gender: 'women',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone---computer-glasses:-black-full-rim-aviator-lenskart-blu-lb-e16051-c2_g_9028_10_16_23.jpg',
    price: 1650,
    originalPrice: 2450,
    rating: 4.5,
    stock: 9,
    modelNo: 'LK-006',
    offer: '33% Off',
    description:
      'Elevate your style with these chic Round frames. A perfect blend of modern design and timeless elegance.',
    specifications: [
      { title: 'Frame Color', value: 'Gold' },
      { title: 'Material', value: 'Stainless Steel' },
    ],
  },
  {
    id: '7',
    brand: 'Ray-Ban',
    name: 'Tiny Round',
    gender: 'kids',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
    price: 999,
    originalPrice: 1399,
    rating: 4.2,
    stock: 30,
    modelNo: 'RB-007',
    offer: '29% Off',
    description:
      'Perfect for the little trendsetter. These tiny round frames are as cute as they are tough.',
    specifications: [
      { title: 'Frame Color', value: 'Black' },
      { title: 'Material', value: 'TR90' },
    ],
  },
  {
    id: '8',
    brand: 'Fossil',
    name: 'Sharp Square',
    gender: 'men',
    shape: 'square',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17373-c1-eyeglasses_dsc3342_19_09_2024.jpg',
    price: 2300,
    originalPrice: 2899,
    rating: 4.4,
    stock: 11,
    modelNo: 'FS-008',
    offer: '21% Off',
    description:
      'A sharp, professional look for the modern man. These square frames from Fossil are built to impress.',
    specifications: [
      { title: 'Frame Color', value: 'Gunmetal' },
      { title: 'Material', value: 'Metal' },
    ],
  },
  {
    id: '9',
    brand: 'Oakley',
    name: 'Rugged Square',
    gender: 'women',
    shape: 'square',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gold-red-full-rim-square-lenskart-blu-lb-e14521-c3_g_8896_23_03_2022.jpg',
    price: 1850,
    originalPrice: 2500,
    rating: 4.6,
    stock: 13,
    modelNo: 'OK-009',
    offer: '26% Off',
    description:
      'Bold and beautiful, these square frames for women are perfect for making a fashion statement.',
    specifications: [
      { title: 'Frame Color', value: 'Gold/Red' },
      { title: 'Frame Type', value: 'Full Rim' },
    ],
  },
  {
    id: '10',
    brand: 'Kids Vogue',
    name: 'Square Kids',
    gender: 'kids',
    shape: 'square',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-c1-lb-e16058_g_3048_28_06_2023.jpg',
    price: 799,
    originalPrice: 1299,
    rating: 4.1,
    stock: 22,
    modelNo: 'KV-010',
    offer: '38% Off',
    description:
      'Classic square frames for kids that are both stylish and sturdy for everyday adventures.',
    specifications: [
      { title: 'Frame Color', value: 'Black' },
      { title: 'Material', value: 'TR90 Flexible Plastic' },
    ],
    
  },

  {
    id: '11',
    brand: 'Ray-Ban',
    name: 'Sleek Rectangle',
    gender: 'men',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e18339-silver--eyeglasses_dsc6325_24_06_2025.jpg',
    price: 449,
    originalPrice: 1099,
    rating: 4.2,
    stock: 15,
    modelNo: 'RB-011',
    offer: '59% Off',
    description:
      'A timeless piece of eyewear, the Ray-Ban Bold Rectangle offers a classic look with a modern twist. Perfect for any occasion.',
    specifications: [
      { title: 'Frame Color', value: 'Silver' },
      { title: 'Material', value: 'Metal' },
    ],
  },
  {
    id: '12',
    brand: 'Fastrack',
    name: 'Urban Rectangle',
    gender: 'men',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-grey-full-rim-square-lenskart-blu-lb-e13526-c3_vincent-chase-vc-e13526-c3-eyeglasses_g_841422_02_2022.jpg',
    price: 899,
    originalPrice: 1650,
    rating: 4.1,
    stock: 20,
    modelNo: 'FT-012',
    offer: '45% Off',
    description:
      'Built for an active lifestyle, these frames are both durable and stylish, ensuring comfort and performance.',
    specifications: [
      { title: 'Frame Color', value: 'Matte Grey' },
      { title: 'Frame Type', value: 'Full Rim' },
    ],
  },
  {
    id: '13',
    brand: 'Oakley',
    name: 'Chic Rectangle',
    gender: 'women',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-blue-full-rim-rectangle-lenskart-blu-lb-e13737-c2_lenskart-blu-lb-e13737-c2-eyeglasses_lenskart-blu-lb-e13737-c2-eyeglasses_eyeglasses_g_100923_02_2022.jpg',
    price: 1499,
    originalPrice: 2233,
    rating: 4.5,
    stock: 10,
    modelNo: 'OK-013',
    offer: '33% Off',
    description:
      'A touch of elegance for the modern woman. These Oakley frames combine sophisticated design with cutting-edge technology.',
    specifications: [
      { title: 'Frame Color', value: 'Blue' },
      { title: 'Lens Technology', value: 'BLUE CUT' },
    ],
  },
  {
    id: '14',
    brand: 'Cool Kids',
    name: 'Playful Rectangle',
    gender: 'kids',
    shape: 'rectangle',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3498_14_03_2024.jpg',
    price: 1900,
    originalPrice: 2450,
    rating: 4.7,
    stock: 28,
    modelNo: 'CK-014',
    offer: '22% Off',
    description:
      "Fun, durable, and stylish! These frames are designed to keep up with your child's active life.",
    specifications: [
      { title: 'Material', value: 'Hypoallergenic Plastic' },
      { title: 'Age Group', value: '6-10 years' },
    ],
  },
  {
    id: '15',
    brand: 'Vincent Chase',
    name: 'Vintage Round',
    gender: 'men',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16049-c2-eyeglasses_g_8145_11_10_2023.jpg',
    price: 1350,
    originalPrice: 2099,
    rating: 4.2,
    stock: 16,
    modelNo: 'VC-015',
    offer: '36% Off',
    description:
      'Make a statement with these bold Round glasses. Combining classic style with contemporary details.',
    specifications: [
      { title: 'Frame Color', value: 'Black' },
      { title: 'Material', value: 'Acetate' },
    ],
  },
  {
    id: '16',
    brand: 'LensKart',
    name: 'Golden Round',
    gender: 'women',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone---computer-glasses:-black-full-rim-aviator-lenskart-blu-lb-e16051-c2_g_9028_10_16_23.jpg',
    price: 1750,
    originalPrice: 2550,
    rating: 4.6,
    stock: 11,
    modelNo: 'LK-016',
    offer: '31% Off',
    description:
      'Elevate your style with these chic Round frames. A perfect blend of modern design and timeless elegance.',
    specifications: [
      { title: 'Frame Color', value: 'Gold' },
      { title: 'Material', value: 'Stainless Steel' },
    ],
  },
  {
    id: '17',
    brand: 'Ray-Ban',
    name: 'Junior Round',
    gender: 'kids',
    shape: 'round',
    image:
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg',
    price: 1099,
    originalPrice: 1499,
    rating: 4.3,
    stock: 32,
    modelNo: 'RB-017',
    offer: '27% Off',
    description:
      'Perfect for the little trendsetter. These tiny round frames are as cute as they are tough.',
    specifications: [
      { title: 'Frame Color', value: 'Black' },
      { title: 'Material', value: 'TR90' },
    ],
  },
];

const formattedProducts = productsData.map(p => ({
  ...p,
  images: [p.image, p.image, p.image],
  reviewCount: Math.floor(Math.random() * 200) + 50,
}));

const initialState = {
  products: formattedProducts,
  cart: {},
  liked: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.cart[product.id] = { ...product, quantity: product.quantity || 1 };
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      delete state.cart[productId];
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        const productInCart = state.cart[productId];
        const originalProduct = state.products.find(p => p.id === productId);
        if (originalProduct && productInCart.quantity < originalProduct.stock) {
          productInCart.quantity += 1;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId] && state.cart[productId].quantity > 1) {
        state.cart[productId].quantity -= 1;
      }
    },
    toggleLike: (state, action) => {
      const productId = action.payload;
      if (state.liked[productId]) {
        delete state.liked[productId];
      } else {
        state.liked[productId] = true;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  toggleLike,
} = productSlice.actions;

export const selectAllProducts = state => state.product.products;
export const selectCartMap = state => state.product.cart;
export const selectLikedItems = state => state.product.liked;

export default productSlice.reducer;

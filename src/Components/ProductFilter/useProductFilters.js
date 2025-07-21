import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../Context/ApiContext';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const BASE_URL = 'https://accounts-3.onrender.com';
const shapeFilters = [
  { id: 'rectangle', title: 'Rectangle' },
  { id: 'round', title: 'Round' },
  { id: 'square', title: 'Square' },
];

export const useProductFilters = () => {
  // 1. Naya FilterProducts function yahan import karein
  const {
    getProductsData,
    AddToCart,
    Removefromcart,
    GetCartData,
    GetFavourites,
    AddToFavourites,
    RemoveFromFavourites,
    FilterProducts,
  } = useApi();

  const isFocused = useIsFocused();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMap, setCartMap] = useState({});
  const [likedItems, setLikedItems] = useState({});

  // Filter states - Yeh waise hi rahenge
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // 2. Ek naya fetchData function banaya gaya hai jo smart hai
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Frontend filters ko backend API parameters mein badlein
    const apiFilters = {};
    if (selectedGender) apiFilters.gender = selectedGender;
    if (selectedShape) apiFilters.shape = selectedShape;
    if (selectedPrice) {
      if (selectedPrice === 'p1') apiFilters.max_price = 499;
      if (selectedPrice === 'p2') {
        apiFilters.min_price = 500;
        apiFilters.max_price = 999;
      }
      if (selectedPrice === 'p3') {
        apiFilters.min_price = 1000;
      }
    }

    try {
      // Agar koi filter nahi laga hai, to saare products fetch karo
      // Warna naye FilterProducts function ko call karo
      const productsRes =
        Object.keys(apiFilters).length > 0
          ? await FilterProducts(apiFilters)
          : await getProductsData();

      // Cart aur Favourites ka data bhi fetch kar lo
      const [cartRes, favsRes] = await Promise.all([
        GetCartData(),
        GetFavourites(),
      ]);

      // Products ko format karna (aapka purana logic)
      if (productsRes && Array.isArray(productsRes)) {
        const formatted = productsRes.map((p, index) => ({
          id: p.id,
          brand: p.brand_name.replace(/['"]/g, ''),
          name: p.product_name.replace(/['"]/g, ''),
          image: p.images?.[0]?.image
            ? `${BASE_URL}${p.images[0].image}`
            : 'https://via.placeholder.com/150',
          price: parseFloat(p.price),
          originalPrice: parseFloat(p.originalPrice || p.price * 1.4),
          rating: p.rating || 4.5,
          gender: index % 3 === 0 ? 'men' : index % 3 === 1 ? 'women' : 'kids',
          shape: shapeFilters[index % shapeFilters.length].id,
        }));
        setAllProducts(formatted);
      } else {
        setAllProducts([]); // Filter mein kuch na mile to list khali karo
        setError('No products found for these filters.');
      }

      // Cart aur Favourites state update karna (aapka purana logic)
      if (cartRes && !cartRes.error) {
        const newCartMap = (cartRes || []).reduce((acc, item) => {
          const pId = item.product?.id || item.product_id;
          if (pId) acc[pId] = item.id;
          return acc;
        }, {});
        setCartMap(newCartMap);
      }
      if (favsRes && !favsRes.error) {
        const newLikedMap = (favsRes || []).reduce((acc, fav) => {
          if (fav.product?.id) acc[fav.product.id] = true;
          return acc;
        }, {});
        setLikedItems(newLikedMap);
      }
    } catch (err) {
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [
    getProductsData,
    FilterProducts,
    GetCartData,
    GetFavourites,
    selectedGender,
    selectedShape,
    selectedPrice,
  ]);

  // 3. Ek hi useEffect ab saara kaam karega
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, fetchData]);

  // Baaki ke functions (cart, like etc.) jaise the waise hi hain
  const handleAddToCart = async product => {
    try {
      const res = await AddToCart({ product_id: product.id, quantity: 1 });
      setCartMap(prev => ({ ...prev, [res.product_id]: res.id }));
      showMessage({ message: 'Added to Cart', type: 'success' });
    } catch (err) {
      showMessage({ message: 'Error adding item', type: 'danger' });
      if (err.response?.status === 400) fetchData();
    }
  };

  const handleRemoveFromCart = async product => {
    const cartItemId = cartMap[product.id];
    if (!cartItemId) return;
    try {
      await Removefromcart(cartItemId);
      setCartMap(prev => {
        const newMap = { ...prev };
        delete newMap[product.id];
        return newMap;
      });
      showMessage({ message: 'Removed From Cart', type: 'success' });
    } catch (err) {
      showMessage({ message: 'Error removing item', type: 'danger' });
    }
  };

  const toggleLike = async (productId, shouldBeLiked) => {
    const originalLikedItems = { ...likedItems };
    setLikedItems(prev => ({ ...prev, [productId]: shouldBeLiked }));
    try {
      const response = shouldBeLiked
        ? await AddToFavourites(productId)
        : await RemoveFromFavourites(productId);
      if (response && response.error) throw new Error(response.message);
      showMessage({
        message: shouldBeLiked
          ? 'Added to Favourites'
          : 'Removed from Favourites',
        type: shouldBeLiked ? 'success' : 'info',
      });
    } catch (err) {
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'danger',
      });
      setLikedItems(originalLikedItems);
    }
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedShape(null);
    setSelectedPrice(null);
    // Clear filter karne par useEffect apne aap initial data fetch kar lega
  };

  // 4. Client-side filtering ki ab zaroorat nahi hai. Hum seedha allProducts return karenge
  // Kyunki allProducts ab hamesha server se mila hua correct data hai
  return {
    loading,
    error,
    filteredProducts: allProducts,
    cartMap,
    likedItems,
    filters: { selectedGender, selectedShape, selectedPrice },
    actions: {
      handleAddToCart,
      handleRemoveFromCart,
      toggleLike,
      clearFilters,
      setSelectedGender,
      setSelectedShape,
      setSelectedPrice,
    },
  };
};

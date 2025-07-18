import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

const BASE_URL = 'https://accounts-1.onrender.com';

const useProductDetails = (productId) => {
  const { getProductsData, AddToCart, Removefromcart, UpdateCartQuantity, GetCartData } = useApi();
  const isFocused = useIsFocused();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMap, setCartMap] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [like, setLike] = useState(false);

  const debounceTimeout = useRef(null);

  const initializePageState = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, cartRes] = await Promise.all([getProductsData(), GetCartData()]);
      const apiProduct = productsRes?.find(p => p.id == productId);
      if (!apiProduct) throw new Error('Product not found.');

      const formattedProduct = {
        id: apiProduct.id,
        brand: apiProduct.brand_name.replace(/['"]/g, ''),
        name: apiProduct.product_name.replace(/['"]/g, ''),
        modelNo: apiProduct.product_id,
        images: apiProduct.images.map(img => `${BASE_URL}${img.image}`),
        price: parseFloat(apiProduct.price),
        originalPrice: parseFloat(apiProduct.originalPrice || apiProduct.price * 1.4),
        stock: parseInt(apiProduct.quantity, 10),
        rating: apiProduct.rating || 4.5,
        reviewCount: apiProduct.reviewCount || 152,
        offer: apiProduct.offer || '30% Off',
        description: apiProduct.description,
        specifications: Object.entries(apiProduct.specification || {}).map(([key, value]) => ({
          title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: value,
        })),
      };
      setProductData(formattedProduct);

      const cartItems = Array.isArray(cartRes) ? cartRes : cartRes?.items || [];
      const newCartMap = {};
      cartItems.forEach(item => {
        const pId = item.product?.id || item.product_id || item.product;
        if (pId) newCartMap[pId] = item.id;
      });
      setCartMap(newCartMap);

      if (newCartMap[apiProduct.id]) {
        const cartItem = cartItems.find(item => item.id === newCartMap[apiProduct.id]);
        if (cartItem) setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    } catch (err) {
      console.error('Failed to initialize page:', err);
      setProductData(null);
    } finally {
      setLoading(false);
    }
  }, [productId, getProductsData, GetCartData]);

  useEffect(() => {
    if (isFocused && productId) {
      initializePageState();
    }
  }, [isFocused, productId, initializePageState]);

  // --- Action Handlers ---
  const handleAddToCart = async () => {
    if (!productData || isUpdatingCart) return;
    setIsUpdatingCart(true);
    try {
      const payload = { product_id: productData.id, quantity };
      const res = await AddToCart(payload);
      if (!res || res.error) throw new Error(res.message || 'Failed to add to cart');
      setCartMap(prev => ({ ...prev, [productData.id]: res.id }));
      showMessage({ message: 'Added to Cart!', type: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      if (/already in cart|exists/i.test(errorMessage)) {
        showMessage({ message: "Already in cart. Syncing...", type: "info" });
        initializePageState();
      } else {
        showMessage({ message: errorMessage, type: 'danger' });
      }
    } finally {
      setIsUpdatingCart(false);
    }
  };

  const handleRemoveFromCart = async () => {
    const cartItemId = cartMap[productData.id];
    if (!cartItemId || isUpdatingCart) return;
    setIsUpdatingCart(true);
    try {
      await Removefromcart(cartItemId);
      setCartMap(prev => {
        const newMap = { ...prev };
        delete newMap[productData.id];
        return newMap;
      });
      setQuantity(1);
      showMessage({ message: 'Removed from Cart', type: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      showMessage({ message: `Could not remove: ${errorMessage}`, type: 'danger' });
      initializePageState();
    } finally {
      setIsUpdatingCart(false);
    }
  };

  const handleUpdateQuantity = (newQuantity) => {
    const cartItemId = cartMap[productData.id];
    if (!cartItemId) return;
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        await UpdateCartQuantity(cartItemId, newQuantity);
      } catch (error) {
        showMessage({ message: 'Could not update quantity.', type: 'danger' });
        initializePageState();
      }
    }, 500);
  };

  const incrementQuantity = () => {
    if (quantity >= (productData?.stock || 0)) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (cartMap[productData.id]) handleUpdateQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (cartMap[productData.id]) handleUpdateQuantity(newQuantity);
  };

  const toggleLike = () => setLike(prev => !prev);

  const isInCart = !!cartMap[productData?.id];
  const isOutOfStock = productData?.stock <= 0;

  return {
    loading,
    productData,
    isUpdatingCart,
    isInCart,
    isOutOfStock,
    quantity,
    like,
    actions: {
      handleAddToCart,
      handleRemoveFromCart,
      incrementQuantity,
      decrementQuantity,
      toggleLike,
    },
  };
};

export default useProductDetails;
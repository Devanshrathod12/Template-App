import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts,
  selectCartMap,
  selectLikedItems,
  addToCart,
  removeFromCart,
  toggleLike,
} from '../../redux/Product/productSlice';

export const useProductFilters = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const cartMap = useSelector(selectCartMap);
  const likedItems = useSelector(selectLikedItems);
  
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const priceRanges = {
    p1: { min: 0, max: 499.99 },
    p2: { min: 500, max: 999.99 },
    p3: { min: 1000, max: 1499.99 },
  };

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let products = [...allProducts];

    if (selectedGender) {
      products = products.filter(p => p.gender === selectedGender);
    }
    if (selectedShape) {
      products = products.filter(p => p.shape.toLowerCase() === selectedShape);
    }
    if (selectedPrice) {
      const { min, max } = priceRanges[selectedPrice];
      products = products.filter(p => p.price >= min && p.price <= max);
    }
    return products;
  }, [allProducts, selectedGender, selectedShape, selectedPrice]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const handleToggleLike = (productId) => {
    dispatch(toggleLike(productId));
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedShape(null);
    setSelectedPrice(null);
  };
  
  return {
    loading: false,
    error: null,
    filteredProducts,
    cartMap,
    likedItems,
    filters: {
      selectedGender,
      selectedShape,
      selectedPrice,
    },
    actions: {
      setSelectedGender,
      setSelectedShape,
      setSelectedPrice,
      handleAddToCart,
      handleRemoveFromCart,
      toggleLike: handleToggleLike,
      clearFilters,
    },
  };
};
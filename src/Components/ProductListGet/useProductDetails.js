import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts,
  selectCartMap,
  selectLikedItems,
  addToCart,
  removeFromCart,
  toggleLike,
} from '../../redux/Product/productSlice';

export const useProductDetails = (productId) => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const cartMap = useSelector(selectCartMap);
  const likedMap = useSelector(selectLikedItems); 

  const productData = useMemo(
    () => allProducts.find(p => p.id === productId),
    [allProducts, productId]
  );
  const cartItem = cartMap[productId];

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (cartItem && cartItem.quantity) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (productData) {
      dispatch(addToCart({ ...productData, quantity }));
    }
  };

  const handleRemoveFromCart = () => {
    if (productData) {
      dispatch(removeFromCart(productData.id));
    }
  };

  const increment = () => {
    if (productData && quantity < productData.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleToggleLike = () => {
    if (productId) {
      dispatch(toggleLike(productId));
    }
  };

  const isInCart = !!cartItem;
  const isLiked = !!likedMap[productId];
  const isOutOfStock = productData?.stock <= 0;

  return {
    loading: false,
    productData,
    isUpdatingCart: false,
    isInCart,
    isOutOfStock,
    quantity,
    isLiked,
    actions: {
      handleAddToCart,
      handleRemoveFromCart,
      incrementQuantity: increment,
      decrementQuantity: decrement,
      toggleLike: handleToggleLike,
    },
  };
};

export default useProductDetails;
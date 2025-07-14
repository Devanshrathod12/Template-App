import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

const BASE_URL = 'https://accounts-1.onrender.com';
const { width } = Dimensions.get('window');

const ProductList = ({ route, navigation }) => {
  const { productId } = route.params;
  const { getProductsData, AddToCart, Removefromcart, UpdateCartQuantity, GetCartData } = useApi();
  const isFocused = useIsFocused();
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  // FILTER.JSP style cart tracking
  const [cartMap, setCartMap] = useState({}); // { 'productId': 'cartItemId' }

  // Other states
  const [quantity, setQuantity] = useState(1);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [like, setLike] = useState(false);

  const debounceTimeout = useRef(null);

  const initializePageState = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, cartRes] = await Promise.all([getProductsData(), GetCartData()]);

      // Process product data
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

      // Build cartMap (FILTER.JSP style)
      const cartItems = Array.isArray(cartRes) ? cartRes : cartRes?.items || [];
      const newCartMap = {};
      cartItems.forEach(item => {
        const pId = item.product?.id || item.product_id || item.product;
        if (pId) {
          newCartMap[pId] = item.id; // Map product ID to cart item ID
        }
      });
      setCartMap(newCartMap);

      // Set initial quantity if in cart
      if (newCartMap[apiProduct.id]) {
        const cartItem = cartItems.find(item => item.id === newCartMap[apiProduct.id]);
        if (cartItem) setQuantity(cartItem.quantity);
      }

    } catch (err) {
      console.error('Failed to initialize page:', err);
      Alert.alert('Error', 'Could not load data.');
    } finally {
      setLoading(false);
    }
  }, [productId, getProductsData, GetCartData]);

  useEffect(() => {
    if (isFocused && productId) {
      initializePageState();
    }
  }, [isFocused, productId, initializePageState]);

  // ADD TO CART with instant UI update
  const handleAddToCart = async () => {
    if (!productData || isUpdatingCart) return;
    setIsUpdatingCart(true);
    try {
      const payload = { product_id: productData.id, quantity: quantity };
      const res = await AddToCart(payload);
      
      if (!res || res.error) {
        throw new Error(res.message || 'Failed to add to cart');
      }

      // INSTANT UI UPDATE
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

  // REMOVE FROM CART with instant UI update
  const handleRemoveFromCart = async () => {
    const cartItemId = cartMap[productData.id];
    if (!cartItemId || isUpdatingCart) return; 
    
    setIsUpdatingCart(true);
    try {
      await Removefromcart(cartItemId);
      
      // INSTANT UI UPDATE
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
  
  if (loading) {
    return <SafeAreaView style={styles.loaderContainer}><ActivityIndicator size="large" color={colors.ProductDetailsButton} /></SafeAreaView>;
  }
  if (!productData) {
    return <SafeAreaView style={styles.loaderContainer}><Text>Product not found.</Text></SafeAreaView>;
  }
  
  // Derive cart status from cartMap
  const isInCart = !!cartMap[productData.id];
  const isOutOfStock = productData.stock <= 0;
  const cartButtonDisabled = isOutOfStock || isUpdatingCart;

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={scale(24)} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{productData.brand}</Text>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => setLike(!like)}>
                    <AntIcon name={like ? 'heart' : 'hearto'} size={scale(24)} color={like ? 'red' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: scale(15) }} onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-bag" size={scale(24)} color="#333" />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView>
            <View style={styles.sliderContainer}>
                <FlatList
                    data={productData.images}
                    keyExtractor={(_, index) => `slide-${index}`}
                    renderItem={({ item }) => <Image source={{ uri: item }} style={styles.sliderImage} />}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.productBrand}>{productData.brand}</Text>
                <Text style={styles.productName}>{productData.name}</Text>
                <View style={styles.productSubline}>
                    <Text style={styles.productModel}>{productData.modelNo}</Text>
                    {isOutOfStock ? (
                    <View style={[styles.stockBadge, styles.outOfStockBadge]}><Text style={[styles.stockText, styles.outOfStockText]}>Out of Stock</Text></View>
                    ) : (
                    <View style={[styles.stockBadge, styles.inStockBadge]}><Text style={styles.stockText}>In Stock: {productData.stock}</Text></View>
                    )}
                </View>
                 <View style={styles.ratingContainer}>
                    <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map(star => <Icon key={star} name="star" size={scale(16)} color={productData.rating >= star ? '#FFC107' : '#E0E0E0'} />)}
                    </View>
                    <Text style={styles.ratingText}>{productData.rating} ({productData.reviewCount} Reviews)</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{productData.price?.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>₹{productData.originalPrice?.toFixed(2)}</Text>
                    <Text style={styles.offerText}>{productData.offer}</Text>
                </View>
                <View style={styles.quantitySelectorContainer}>
                    <Text style={styles.quantityLabel}>Quantity</Text>
                    <View style={styles.quantityControls}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity} disabled={isOutOfStock || quantity <= 1}>
                        <Icon name="minus" size={scale(20)} color={(isOutOfStock || quantity <= 1) ? '#ccc' : '#007BFF'} />
                    </TouchableOpacity>
                    <Text style={styles.quantityDisplay}>{isOutOfStock ? 0 : quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity} disabled={isOutOfStock || quantity >= productData.stock}>
                        <Icon name="plus" size={scale(20)} color={(isOutOfStock || quantity >= productData.stock) ? '#ccc' : '#007BFF'} />
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{productData.description}</Text>
                <View style={styles.specsContainer}>
                    <Text style={styles.specsHeader}>Technical Information</Text>
                    {productData.specifications.map((spec, index) => (
                    <View key={index} style={styles.specRow}>
                        <Text style={styles.specTitle}>{spec.title}</Text>
                        <Text style={styles.specValue}>{spec.value}</Text>
                    </View>
                    ))}
                </View>
            </View>
        </ScrollView>

        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.addToCartButton, isInCart && styles.removeButton, cartButtonDisabled && { opacity: 0.6 }]}
                onPress={isInCart ? handleRemoveFromCart : handleAddToCart}
                disabled={cartButtonDisabled}
            >
            {isUpdatingCart ? (
                <ActivityIndicator color={isInCart ? '#E53935' : colors.ProductDetailsButton} size="small" />
            ) : (
                <Text style={[styles.addToCartButtonText, isInCart && styles.removeButtonText]}>
                {isInCart ? 'Remove To Cart' : 'Add to Cart'}
                </Text>
            )}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.selectLensesButton, isOutOfStock && { backgroundColor: '#ccc' }]}
                 onPress={() => navigation.navigate('Cart', { product: productData })}
                disabled={isOutOfStock}
            >
                <Text style={styles.selectLensesButtonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  sliderContainer: { width: '100%', height: verticalScale(250), backgroundColor: colors.WhiteBackgroudcolor },
  sliderImage: { width: width, height: '100%', resizeMode: 'contain' },
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(20), paddingVertical: verticalScale(15), borderBottomWidth: 1, borderBottomColor: '#F0F0F0', backgroundColor: '#FFF' },
  headerTitle: { fontSize: moderateScale(18), fontWeight: '600', color: '#333' },
  headerIcons: { flexDirection: 'row' },
  infoContainer: { paddingHorizontal: scale(20), paddingBottom: verticalScale(20), backgroundColor: '#FFF', borderTopLeftRadius: scale(20), borderTopRightRadius: scale(20), marginTop: verticalScale(-20) },
  productBrand: { fontSize: moderateScale(16), color: '#007BFF', fontWeight: '500', marginBottom: verticalScale(4), paddingTop: verticalScale(20) },
  productName: { fontSize: moderateScale(24), fontWeight: 'bold', color: '#212529', marginBottom: verticalScale(4) },
  productSubline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(15) },
  productModel: { fontSize: moderateScale(14), color: '#6c757d' },
  stockBadge: { paddingHorizontal: scale(10), paddingVertical: verticalScale(4), borderRadius: scale(6) },
  inStockBadge: { backgroundColor: '#e9f7ec' },
  outOfStockBadge: { backgroundColor: '#fbe9e7' },
  stockText: { fontSize: moderateScale(13), fontWeight: '600', color: '#28a745' },
  outOfStockText: { color: '#d32f2f' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(15) },
  starContainer: { flexDirection: 'row' },
  ratingText: { marginLeft: scale(10), fontSize: moderateScale(14), color: '#495057' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(20) },
  price: { fontSize: moderateScale(28), fontWeight: 'bold', color: '#212529' },
  originalPrice: { fontSize: moderateScale(16), color: '#6c757d', textDecorationLine: 'line-through', marginLeft: scale(10) },
  offerText: { fontSize: moderateScale(14), fontWeight: '600', color: '#28a745', backgroundColor: '#e9f7ec', paddingHorizontal: scale(8), paddingVertical: verticalScale(4), borderRadius: scale(6), marginLeft: scale(15), overflow: 'hidden' },
  quantitySelectorContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', paddingVertical: verticalScale(8), paddingHorizontal: scale(12), borderRadius: scale(10), marginBottom: verticalScale(25) },
  quantityLabel: { fontSize: moderateScale(16), fontWeight: '600', color: '#333' },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: scale(18), borderWidth: 1, borderColor: '#DEE2E6', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  quantityDisplay: { fontSize: moderateScale(18), fontWeight: 'bold', color: '#212529', marginHorizontal: scale(20), minWidth: scale(30), textAlign: 'center' },
  descriptionTitle: { fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: verticalScale(8), color: '#333' },
  descriptionText: { fontSize: moderateScale(15), color: '#495057', lineHeight: verticalScale(24) },
  specsContainer: { marginTop: verticalScale(25), borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: verticalScale(15) },
  specsHeader: { fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: verticalScale(15), color: '#333' },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: verticalScale(10), borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  specTitle: { fontSize: moderateScale(15), color: '#6c757d' },
  specValue: { fontSize: moderateScale(15), color: '#212529', fontWeight: '600' },
  footer: { flexDirection: 'row', padding: scale(15), borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
  addToCartButton: { flex: 1, borderWidth: 1, borderColor: colors.ProductDetailsButton, backgroundColor: '#E7F2FF', paddingVertical: verticalScale(15), borderRadius: scale(12), alignItems: 'center', justifyContent: 'center', marginRight: scale(10) },
  addToCartButtonText: { color: colors.ProductDetailsButton, fontSize: moderateScale(16), fontWeight: 'bold' },
  removeButton: { borderColor: '#E53935', backgroundColor: '#FFEBEE' },
  removeButtonText: { color: '#E53935' },
  selectLensesButton: { flex: 1.5, backgroundColor: colors.ProductDetailsButton, paddingVertical: verticalScale(15), borderRadius: scale(12), alignItems: 'center', marginLeft: scale(10) },
  selectLensesButtonText: { color: '#FFF', fontSize: moderateScale(16), fontWeight: 'bold' },
});

export default ProductList;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView, // Still needed for the main screen scroll
  SafeAreaView,
  Alert,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  FlatList, // ✅ FlatList ko import karein
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';

const BASE_URL = 'https://accounts-1.onrender.com';
const { width } = Dimensions.get('window');

const ProductList = ({ route, navigation }) => {
  const { productId } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { getProductsData } = useApi();

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setProductData(null);
    try {
      const res = await getProductsData();

      if (res && Array.isArray(res)) {
        const apiProduct = res.find(p => p.id === productId);

        if (apiProduct) {
          const formattedProduct = {
            id: apiProduct.id,
            brand: apiProduct.brand_name.replace(/['"]/g, ''),
            name: apiProduct.product_name.replace(/['"]/g, ''),
            modelNo: apiProduct.product_id,
            image: `${BASE_URL}${apiProduct.images[0].image}`,
            images: apiProduct.images.map(img => `${BASE_URL}${img.image}`),
            price: parseFloat(apiProduct.price),
            originalPrice: parseFloat(
              apiProduct.originalPrice || apiProduct.price * 1.4,
            ),
            rating: apiProduct.rating || 4.5,
            reviewCount: apiProduct.reviewCount || 152,
            offer: apiProduct.offer || '30% Off',
            description: apiProduct.description,
            stock: parseInt(apiProduct.quantity, 10),
            specifications: Object.keys(apiProduct.specification).map(key => ({
              title: key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase()),
              value: apiProduct.specification[key],
            })),
          };

          setProductData(formattedProduct);
        } else {
          console.error('Product with ID not found:', productId);
          Alert.alert('Error', 'Product details could not be found.');
        }
      } else {
        console.log('No products received from API.');
        Alert.alert('Error', 'Could not load product details.');
      }
    } catch (err) {
      console.log('Failed to fetch or format product:', err);
      Alert.alert('Error', 'Could not load product details.');
    } finally {
      setLoading(false);
    }
  };
  
  // onScroll event handler ko update karein FlatList ke liye
  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handlelike = () => setLike(!like);

  const incrementQuantity = () => {
    if (quantity >= productData.stock) {
      showMessage({
        message: 'Stock Limit Reached',
        description: `Oops! You can only select up to ${productData.stock} items available in stock.`,
        type: 'danger',
        icon: 'auto',
        duration: 3000,
      });
      return;
    }
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAddToCart = () => {
    if (productData.stock <= 0) {
      Alert.alert('Out of Stock', 'This item is currently not available.');
      return;
    }
    Alert.alert(
      'Added to Cart!',
      `${quantity} x ${productData.name} added to your cart.`,
    );
  };

  const handleSelectLenses = () => {
    if (productData.stock <= 0) {
      Alert.alert('Out of Stock', 'This item is currently not available.');
      return;
    }
    Alert.alert('Next Step', 'Proceeding to lens selection for your new frames!');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </SafeAreaView>
    );
  }

  if (!productData) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>Could not load product. Please go back and try again.</Text>
      </SafeAreaView>
    );
  }

  const isOutOfStock = productData.stock <= 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={scale(24)} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eyeglasses</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handlelike}>
            <AntIcon
              name={like ? 'heart' : 'hearto'}
              size={scale(24)}
              color={like ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: scale(15) }}>
            <Icon name="shopping-bag" size={scale(24)} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* ✅✅✅ UPDATED IMAGE SLIDER USING FLATLIST ✅✅✅ */}
        <View style={styles.sliderContainer}>
          <FlatList
            data={productData.images}
            keyExtractor={(item, index) => `slide-${index}-${item}`}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.sliderImage} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.pagination}>
            {productData.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.productBrand}>{productData.brand}</Text>
          <Text style={styles.productName}>{productData.name}</Text>
          <View style={styles.productSubline}>
            <Text style={styles.productModel}>{productData.modelNo}</Text>
            {isOutOfStock ? (
              <View style={[styles.stockBadge, styles.outOfStockBadge]}>
                <Text style={styles.stockText}>Out of Stock</Text>
              </View>
            ) : (
              <View style={[styles.stockBadge, styles.inStockBadge]}>
                <Text style={styles.stockText}>In Stock: {productData.stock}</Text>
              </View>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  key={star}
                  name="star"
                  size={scale(16)}
                  color={productData.rating >= star ? '#FFC107' : '#E0E0E0'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {productData.rating} ({productData.reviewCount} Reviews)
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{productData.price?.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>
              ₹{productData.originalPrice?.toFixed(2)}
            </Text>
            <Text style={styles.offerText}>{productData.offer}</Text>
          </View>
          <View style={styles.quantitySelectorContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
                disabled={isOutOfStock}
              >
                <Icon
                  name="minus"
                  size={scale(20)}
                  color={isOutOfStock ? '#ccc' : '#007BFF'}
                />
              </TouchableOpacity>
              <Text style={styles.quantityDisplay}>
                {isOutOfStock ? 0 : quantity}
              </Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
                disabled={isOutOfStock}
              >
                <Icon
                  name="plus"
                  size={scale(20)}
                  color={isOutOfStock ? '#ccc' : '#007BFF'}
                />
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
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={isOutOfStock}
        >
          <Text
            style={[
              styles.addToCartButtonText,
              isOutOfStock && { color: '#aaa' },
            ]}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectLensesButton,
            isOutOfStock && { backgroundColor: '#ccc' },
          ]}
          onPress={handleSelectLenses}
          disabled={isOutOfStock}
        >
          <Text style={styles.selectLensesButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: verticalScale(250),
    backgroundColor: colors.WhiteBackgroudcolor,
  },
  sliderImage: {
    width: width, 
    height: '100%',
    resizeMode: 'contain',
  },
  pagination: {
    position: 'absolute',
    bottom: verticalScale(12),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: scale(8),
    width: scale(8),
    borderRadius: scale(4),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: colors.ProductDetailsButton,
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
  },
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF'
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: { flexDirection: 'row' },
  infoContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    backgroundColor: '#FFF',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginTop: verticalScale(-20),
  },
  productBrand: {
    fontSize: moderateScale(16),
    color: '#007BFF',
    fontWeight: '500',
    marginBottom: verticalScale(4),
    paddingTop: verticalScale(20),
  },
  productName: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: verticalScale(4),
  },
  productSubline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  productModel: { fontSize: moderateScale(14), color: '#6c757d' },
  stockBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(6),
  },
  inStockBadge: { backgroundColor: '#e9f7ec' },
  outOfStockBadge: { backgroundColor: '#fbe9e7' },
  stockText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#28a745',
  },
  outOfStockText: { color: '#d32f2f' },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  starContainer: { flexDirection: 'row' },
  ratingText: {
    marginLeft: scale(10),
    fontSize: moderateScale(14),
    color: '#495057',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  price: { fontSize: moderateScale(28), fontWeight: 'bold', color: '#212529' },
  originalPrice: {
    fontSize: moderateScale(16),
    color: '#6c757d',
    textDecorationLine: 'line-through',
    marginLeft: scale(10),
  },
  offerText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#28a745',
    backgroundColor: '#e9f7ec',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(6),
    marginLeft: scale(15),
    overflow: 'hidden'
  },
  quantitySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
    marginBottom: verticalScale(25),
  },
  quantityLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: '#DEE2E6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityDisplay: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#212529',
    marginHorizontal: scale(20),
    minWidth: scale(30),
    textAlign: 'center',
  },
  descriptionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: '#333',
  },
  descriptionText: {
    fontSize: moderateScale(15),
    color: '#495057',
    lineHeight: verticalScale(24),
  },
  specsContainer: {
    marginTop: verticalScale(25),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: verticalScale(15),
  },
  specsHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    color: '#333',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  specTitle: { fontSize: moderateScale(15), color: '#6c757d' },
  specValue: {
    fontSize: moderateScale(15),
    color: '#212529',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: scale(15),
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  addToCartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007BFF',
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: 'center',
    marginRight: scale(10),
  },
  addToCartButtonText: {
    color: colors.ProductDetailsButton,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  selectLensesButton: {
    flex: 1.5,
    backgroundColor: colors.ProductDetailsButton,
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: 'center',
    marginLeft: scale(10),
  },
  selectLensesButtonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default ProductList;
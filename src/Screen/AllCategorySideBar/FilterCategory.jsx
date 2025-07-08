import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Easing,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';

import { useApi } from '../../Context/ApiContext';
import colors from '../../styles/colors';

const BASE_URL = 'https://accounts-1.onrender.com';

const genderFilters = [
  { id: 'men', title: 'Men' },
  { id: 'women', title: 'Women' },
  { id: 'kids', title: 'Kids' },
];
const shapeFilters = [
  { id: 'rectangle', title: 'Rectangle' },
  { id: 'round', title: 'Round' },
  { id: 'square', title: 'Square' },
];
const priceFilters = [
  { id: 'p1', title: 'Under ₹500' },
  { id: 'p2', title: '₹500 – ₹999' },
  { id: 'p3', title: '₹1000 – ₹1499' },
];

const FilterCategory = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartMap, setCartMap] = useState({});
  const [likedItems, setLikedItems] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const { getProductsData, AddToCart, Removefromcart, GetCartData } = useApi();
  const isFocused = useIsFocused();

  const fetchCartState = async () => {
    try {
      const cartRes = await GetCartData();
      if (cartRes && !cartRes.error && Array.isArray(cartRes)) {
        const newCartMap = cartRes.reduce((acc, cartItem) => {
          const productId = cartItem.product?.id || cartItem.product_id;
          if (productId) {
            acc[productId] = cartItem.id;
          }
          return acc;
        }, {});
        setCartMap(newCartMap);
      }
    } catch (e) {
      console.error("Failed to refresh cart state:", e);
    }
  };
  
  const fetchPageData = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsRes = await getProductsData();
      if (productsRes && Array.isArray(productsRes)) {
        const formattedProducts = productsRes.map((p, index) => ({
          id: p.id,
          brand: p.brand_name.replace(/['"]/g, ''),
          name: p.product_name.replace(/['"]/g, ''),
          
          image: (p.images && p.images.length > 0 && p.images[0] && p.images[0].image)
            ? `${BASE_URL}${p.images[0].image}`
            : 'https://via.placeholder.com/150',

          price: parseFloat(p.price),
          originalPrice: parseFloat(p.originalPrice || p.price * 1.4),
          rating: p.rating || 4.5,
          gender:
            index % 3 === 0 ? 'men' : index % 3 === 1 ? 'women' : 'kids',
          shape: shapeFilters[index % shapeFilters.length].id,
        }));
        setAllProducts(formattedProducts);
      } else {
        setError('No products found or invalid data format.');
      }
      await fetchCartState();
    } catch (err) {
      console.error('Failed to fetch or format initial data:', err); 
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isFocused) {
      fetchPageData();
    }
  }, [isFocused]);

  const handleAddToCart = async (product) => {
    try {
      const payload = { product_id: product.id, quantity: 1 };
      const response = await AddToCart(payload);
      
      const updatedMap = { ...cartMap, [response.product_id]: response.id };
      setCartMap(updatedMap);
      
      showMessage({
        message: 'Added to Cart',
        description: `${product.name} has been added.`,
        type: 'success',
        icon: 'success',
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showMessage({
          message: 'Already in Cart',
          description: `${product.name} is already in your cart.`,
          type: 'info',
        });
        await fetchCartState(); 
      } else {
        console.error('Error adding to cart:', error);
        showMessage({
          message: 'Error',
          description: 'Could not add item. Please try again.',
          type: 'danger',
        });
      }
    }
  };

  const handleRemoveFromCart = async (product) => {
    const cartItemId = cartMap[product.id];
    if (!cartItemId) {
      await fetchCartState();
      return;
    }

    try {
      await Removefromcart(cartItemId);
      const updatedMap = { ...cartMap };
      delete updatedMap[product.id];
      setCartMap(updatedMap);
      showMessage({
        message: 'Removed From Cart',
        description: `${product.name} has been removed.`,
        type: 'success',
        icon: 'success',
      });
    } catch (err) {
      console.error('Error removing from cart:', err);
      showMessage({
        message: 'Error Removing Item',
        description: 'Could not remove the item.',
        type: 'danger',
      });
    }
  };

  const getFilteredProducts = () => {
    if (loading || error) return [];
    return allProducts.filter(product => {
      const genderMatch = !selectedGender || product.gender === selectedGender;
      const shapeMatch = !selectedShape || product.shape === selectedShape;
      const priceMatch =
        !selectedPrice ||
        (selectedPrice === 'p1' && product.price < 500) ||
        (selectedPrice === 'p2' &&
          product.price >= 500 &&
          product.price <= 999) ||
        (selectedPrice === 'p3' &&
          product.price >= 1000 &&
          product.price <= 1499);
      return genderMatch && shapeMatch && priceMatch;
    });
  };

  const filteredProducts = getFilteredProducts();

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -300 : 0;
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
    setSidebarVisible(!sidebarVisible);
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedShape(null);
    setSelectedPrice(null);
  };

  const applyFilters = () => {
    toggleSidebar();
  };

  const toggleLike = itemId => {
    setLikedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.ProductDetailsButton} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eyeglasses</Text>
        <View style={styles.headerIcons}>
          <Icon name="search" size={22} color="#333" />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Icon
              name="shopping-bag"
              size={22}
              color="#333"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.errorText}>No products match your filters.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const isAddedToCart = !!cartMap[item.id];
            const isLiked = likedItems[item.id];
            return (
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductList', { productId: item.id })
                  }
                  activeOpacity={0.9}
                >
                  <Image source={ {uri: item.image }} style={styles.image} />
                  <TouchableOpacity
                    onPress={() => toggleLike(item.id)}
                    style={styles.wishlistButton}
                  >
                    <AntIcon
                      name={isLiked ? 'heart' : 'hearto'}
                      size={20}
                      color={isLiked ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                  <Text style={styles.brandText}>{item.brand}</Text>
                  <Text style={styles.nameText} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.ratingRow}>
                    <View style={styles.starContainer}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Icon
                          key={star}
                          name="star"
                          size={14}
                          color={item.rating >= star ? '#FFC107' : '#E0E0E0'}
                          style={{
                            fill: item.rating >= star ? '#FFC107' : '#FFFFFF',
                          }}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>
                      ₹{item.price.toFixed(2)}
                    </Text>
                    {item.originalPrice && (
                      <Text style={styles.originalPriceText}>
                        ₹{item.originalPrice.toFixed(2)}
                      </Text>
                    )}
                  </View>

                  {isAddedToCart ? (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveFromCart(item)}
                    >
                      <Text style={styles.removeButtonText}>
                        Remove from Cart
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnim }] },
        ]}
      >
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Filters</Text>
          <TouchableOpacity onPress={toggleSidebar}>
            <Icon name="x" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Gender</Text>
            <View style={styles.optionsContainer}>
              {genderFilters.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.filterOption,
                    selectedGender === item.id && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedGender(prev =>
                      prev === item.id ? null : item.id
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedGender === item.id && styles.selectedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Frame Shape</Text>
            <View style={styles.optionsContainer}>
              {shapeFilters.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.filterOption,
                    selectedShape === item.id && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedShape(prev =>
                      prev === item.id ? null : item.id
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedShape === item.id && styles.selectedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Price</Text>
            <View style={styles.optionsContainer}>
              {priceFilters.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.filterOption,
                    selectedPrice === item.id && styles.selectedOption,
                  ]}
                  onPress={() => {
                    setSelectedPrice(prev =>
                      prev === item.id ? null : item.id
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedPrice === item.id && styles.selectedText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <View style={styles.sidebarFooter}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

// Styles are unchanged
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WhiteBackgroudcolor,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    backgroundColor: colors.WhiteBackgroudcolor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 6,
    borderRadius: 20,
  },
  infoContainer: { padding: 12 },
  brandText: { fontSize: 13, color: '#666' },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  starContainer: { flexDirection: 'row' },
  ratingText: { marginLeft: 5, fontSize: 13, color: '#555' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  originalPriceText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#E7F2FF',
    borderColor: '#007BFF',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 14 },
  removeButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E53935',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  removeButtonText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'white',
    zIndex: 2,
    elevation: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarTitle: { fontSize: 20, fontWeight: 'bold' },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    margin: 5,
  },
  selectedOption: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  filterText: { fontSize: 14, color: '#333' },
  selectedText: { color: '#fff', fontWeight: '500' },
  sidebarFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  clearButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
  },
  clearButtonText: { color: '#333', fontWeight: 'bold' },
  applyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    marginLeft: 5,
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default FilterCategory;
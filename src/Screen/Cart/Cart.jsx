import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useApi } from '../../Context/ApiContext';
import colors from '../../styles/colors';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';

const BASE_URL = 'https://accounts-1.onrender.com';

const Cart = ({ navigation }) => {
  // Add GetAddresses and UpdateCartQuantity to the context hook
  const { GetCartData, Removefromcart, GetAddresses, UpdateCartQuantity } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const isFocused = useIsFocused();
  
  // State for the main checkout button loading indicator
  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  // State to track which item's quantity is being updated
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (parseFloat(item.product?.price || 0) * item.quantity);
    }, 0);
    setTotalPrice(total);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetCartData();
      if (response && !response.error && Array.isArray(response)) {
        setCartItems(response);
        calculateTotal(response);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleRemoveItem = async (cartItemId) => {
    const originalItems = [...cartItems];
    const newItems = cartItems.filter(item => item.id !== cartItemId);
    setCartItems(newItems);
    calculateTotal(newItems);
    
    try {
      const response = await Removefromcart(cartItemId);
      if (response && response.error) throw new Error(response.message);
      showMessage({ message: 'Item Removed', type: 'success' });
    } catch (error) {
      showMessage({ message: 'Could not remove item', type: 'danger' });
      setCartItems(originalItems); // Revert on error
      calculateTotal(originalItems);
    }
  };
  
  // --- Smart Checkout Handler ---
  const handleSmartCheckout = async () => {
    setIsCheckingAddress(true);
    try {
      const addresses = await GetAddresses();
      if (addresses && Array.isArray(addresses) && addresses.length > 0) {
        navigation.navigate('Checkout', { cartItems, totalPrice });
      } else {
        showMessage({ message: "Please add an address to continue.", type: "info" });
        navigation.navigate('DeliveryAddress', { cartItems, totalPrice });
      }
    } catch (error) {
      showMessage({ message: "Error proceeding to checkout", type: "danger" });
    } finally {
      setIsCheckingAddress(false);
    }
  };
  
  // --- Quantity Update Handler ---
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(cartItemId);
      return;
    }

    setUpdatingItemId(cartItemId);
    const originalItems = [...cartItems];
    const updatedItems = cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);

    try {
        await UpdateCartQuantity(cartItemId, newQuantity);
    } catch (error) {
        showMessage({ message: "Could not update quantity", type: 'danger' });
        setCartItems(originalItems); // Revert on error
        calculateTotal(originalItems);
    } finally {
        setUpdatingItemId(null);
    }
  };

  // --- Render Function for each Cart Item ---
  const renderItem = ({ item }) => {
    const { product } = item;
    if (!product || !product.images || product.images.length === 0) return null;
    
    const price = parseFloat(product.price || 0);
    const isUpdating = updatingItemId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList', { productId: product.id })}>
          <Image source={{ uri: `${BASE_URL}${product.images[0].image}` }} style={styles.image} />
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList', { productId: product.id })} style={styles.nameContainer}>
                <Text style={styles.brandText}>{product.brand_name.replace(/['"]/g, '')}</Text>
                <Text style={styles.nameText} numberOfLines={2}>{product.product_name.replace(/['"]/g, '')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
              <Icon name="trash-2" size={20} color="#E53935" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{price.toFixed(2)}</Text>
            
            {/* --- Quantity Controls --- */}
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={isUpdating}>
                <Icon name="minus" size={18} color={item.quantity <= 1 ? '#ccc' : '#007BFF'} />
              </TouchableOpacity>
              
              {isUpdating ? <ActivityIndicator size="small" style={styles.quantityDisplay} /> : <Text style={styles.quantityText}>{item.quantity}</Text>}

              <TouchableOpacity style={styles.quantityButton} onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)} disabled={isUpdating}>
                <Icon name="plus" size={18} color="#007BFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // --- Loading and Empty State UI ---
  if (loading) {
    return <SafeAreaView style={styles.loaderContainer}><ActivityIndicator size="large" color={colors.ProductDetailsButton} /></SafeAreaView>;
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-left" size={24} color="#333" /></TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.headerIconPlaceholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('SeeOrder')}><Text style={styles.shopButtonText}>Continue Shopping</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-left" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping</Text><Text style={styles.summaryValue}>Free</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Taxes</Text><Text style={styles.summaryValue}>₹{(totalPrice * 0.18).toFixed(2)}</Text></View>
            <View style={styles.divider} />
            <View style={[styles.summaryRow, { marginTop: 10 }]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₹{(totalPrice * 1.18).toFixed(2)}</Text></View>
          </View>
        }
      />

      <View style={styles.footer}>
        <View style={styles.priceFooter}>
          <Text style={styles.totalFooter}>Total: ₹{(totalPrice * 1.18).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.checkoutButton, isCheckingAddress && { backgroundColor: '#A5C9FF' }]}
          onPress={handleSmartCheckout}
          disabled={isCheckingAddress}
        >
          {isCheckingAddress ? <ActivityIndicator color="#FFF" /> : <Text style={styles.checkoutButtonText}>Checkout</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


// --- Full Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WhiteBackgroudcolor,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WhiteBackgroudcolor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerIconPlaceholder: {
    width: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  shopButton: {
    backgroundColor: colors.ProductDetailsButton,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    marginRight: 8,
  },
  brandText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  removeButton: {
    padding: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    minWidth: 30,
    textAlign: 'center',
  },
  quantityDisplay: {
      minWidth: 30,
      paddingHorizontal: 12,
  },
  summaryContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6c757d',
  },
  summaryValue: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  priceFooter: {
    flex: 1,
  },
  totalFooter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  shippingText: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 4,
  },
  checkoutButton: {
    backgroundColor: colors.ProductDetailsButton,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 16,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Cart;
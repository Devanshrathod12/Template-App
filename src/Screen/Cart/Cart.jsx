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
  Animated,
  Dimensions
} from 'react-native';
import { useApi } from '../../Context/ApiContext';
import colors from '../../styles/colors';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const BASE_URL = 'https://accounts-1.onrender.com';

const Cart = ({ navigation }) => {
  const { GetCartData, Removefromcart } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetCartData();
      if (response && !response.error && Array.isArray(response)) {
        setCartItems(response);
        
        // Calculate total price
        const total = response.reduce((sum, item) => {
          return sum + (parseFloat(item.product?.price || 0) * item.quantity);
        }, 0);
        setTotalPrice(total);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setCartItems([]);
      setTotalPrice(0);
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
    try {
      const response = await Removefromcart(cartItemId);
      if (response && response.error) {
        throw new Error(response.message || 'Failed to remove item from API');
      }

      setCartItems(prevItems =>
        prevItems.filter(item => item.id !== cartItemId)
      );

      showMessage({
        message: 'Item Removed',
        description: 'The item has been removed from your cart.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      showMessage({
        message: 'Error',
        description: 'Could not remove the item. Please try again.',
        type: 'danger',
      });
    }
  };

  const renderItem = ({ item }) => {
    const { product } = item;
    if (!product) return null;
    
    const price = parseFloat(product.price || 0);
    const itemTotal = (price * item.quantity).toFixed(2);

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}${product.image}` }}
          style={styles.image}
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <Text style={styles.brandText}>
              {product.brand_name.replace(/['"]/g, '')}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Icon name="trash-2" size={20} color="#E53935" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.nameText} numberOfLines={2}>
            {product.product_name.replace(/['"]/g, '')}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Qty:</Text>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Item Total:</Text>
            <Text style={styles.totalPrice}>₹{itemTotal}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.ProductDetailsButton} />
      </SafeAreaView>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.headerIconPlaceholder} />
        </View>
        
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color="#ddd" />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes</Text>
              <Text style={styles.summaryValue}>₹{(totalPrice * 0.18).toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.summaryRow, { marginTop: 10 }]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{(totalPrice * 1.18).toFixed(2)}</Text>
            </View>
          </View>
        }
      />

      {/* Checkout Footer */}
      <View style={styles.footer}>
        <View style={styles.priceFooter}>
          <Text style={styles.totalFooter}>Total: ₹{(totalPrice * 1.18).toFixed(2)}</Text>
          <Text style={styles.shippingText}>Free Shipping • Free Returns</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

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
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
    marginBottom: 4,
    maxWidth: '80%',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginRight: 6,
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  removeButton: {
    padding: 4,
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
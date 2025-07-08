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
} from 'react-native';
import { useApi } from '../../Context/ApiContext';
import colors from '../../styles/colors';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';

const BASE_URL = 'https://accounts-1.onrender.com';

const Cart = () => {
  const { GetCartData, Removefromcart } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetCartData();
      console.log(response)
      if (response && !response.error && Array.isArray(response)) {
        setCartItems(response);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setCartItems([]);
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
        icon: 'success',
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

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.ProductDetailsButton} />
      </SafeAreaView>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const { product } = item;
          if (!product) return null;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: `${BASE_URL}${product.image}` }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.brandText}>
                  {product.brand_name.replace(/['"]/g, '')}
                </Text>
                <Text style={styles.nameText} numberOfLines={1}>
                  {product.product_name.replace(/['"]/g, '')}
                </Text>
                <Text style={styles.descriptionText}>
                  {product.description}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>
                    ₹{parseFloat(product.price).toFixed(2)}
                  </Text>
                  <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.removeButton}
              >
                <Icon name="trash-2" size={20} color="#E53935" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
  listContainer: {
    paddingVertical: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-around',
  },
  brandText: {
    fontSize: 13,
    color: '#666',
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },
  descriptionText: {
    fontSize: 12,
    color: '#444',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
});
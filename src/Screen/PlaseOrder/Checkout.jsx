import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useApi } from '../../Context/ApiContext'; // Adjust path
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors'; // Adjust path
import { useIsFocused } from '@react-navigation/native';

const Checkout = ({ route, navigation }) => {
  const { GetAddresses, PlaceOrder } = useApi();
  const { totalPrice } = route.params || {};
  const isFocused = useIsFocused();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMode, setPaymentMode] = useState('COD');

  // This function fetches all saved addresses
  const fetchUserAddresses = async () => {
    setLoading(true);
    try {
      const response = await GetAddresses();
      if (response && !response.error) {
        setAddresses(response);
        if (response.length > 0) {
          setSelectedAddressId(response[response.length - 1].id);
        }
      } else {
        setAddresses([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserAddresses();
    }
  }, [isFocused]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      showMessage({
        message: 'Please select a delivery address.',
        type: 'warning',
      });
      return;
    }
    setPlacingOrder(true);
    try {
      const orderData = {
        address_id: selectedAddressId,
        payment_mode: paymentMode,
      };
      const response = await PlaceOrder(orderData);
      if (response.error) {
        throw new Error(response.message);
      }
      showMessage({
        message: 'Order Placed!',
        description: `Status: ${response.status}`,
        type: 'success',
      });
      setTimeout(() => navigation.navigate("SeeOrder"), 2000); 

    } catch (error) {
      showMessage({
        message: 'Order Failed',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const renderAddressItem = ({ item }) => {
    const isSelected = item.id === selectedAddressId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedAddressId(item.id)}
        style={[styles.addressCard, isSelected && styles.selectedCard]}
      >
        <Icon
          name={isSelected ? 'check-circle' : 'circle'}
          size={22}
          color={isSelected ? colors.ProductDetailsButton : '#ccc'}
          style={styles.radioIcon}
        />
        <View style={styles.addressDetails}>
          <Text style={styles.addressName}>{item.full_name}</Text>
          <Text
            style={styles.addressText}
          >{`${item.house}, ${item.area}, ${item.city}, ${item.state} - ${item.pincode}`}</Text>
          <Text style={styles.addressPhone}>Phone: {item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPaymentOption = (mode, title, icon) => {
    const isSelected = paymentMode === mode;
    return (
      <TouchableOpacity
        onPress={() => setPaymentMode(mode)}
        style={[styles.paymentOption, isSelected && styles.selectedCard]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={isSelected ? colors.ProductDetailsButton : '#555'}
        />
        <Text style={styles.paymentTitle}>{title}</Text>
        <Icon
          name={isSelected ? 'check-circle' : 'circle'}
          size={22}
          color={isSelected ? colors.ProductDetailsButton : '#ccc'}
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.ProductDetailsButton} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Final Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select Delivery Address</Text>
          {addresses.length > 0 ? (
            <FlatList
              data={addresses}
              keyExtractor={item => item.id.toString()}
              renderItem={renderAddressItem}
            />
          ) : (
            <Text style={styles.noAddressText}>No saved addresses found.</Text>
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('DeliveryAddress', { totalPrice })
            }
          >
            <Icon name="plus" size={20} color={colors.ProductDetailsButton} />
            <Text style={styles.addButtonText}>Add Another Address</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Choose Payment Method</Text>
          {renderPaymentOption('COD', 'Cash on Delivery', 'cash-multiple')}
          {renderPaymentOption(
            'ONLINE',
            'Pay Online (Card, UPI, NetBanking)',
            'credit-card-multiple-outline',
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Order Total: ₹{(totalPrice * 1.18).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            placingOrder && { backgroundColor: '#ccc' },
          ]}
          onPress={handlePlaceOrder}
          disabled={placingOrder}
        >
          {placingOrder ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles for Checkout ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  addressCard: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: colors.ProductDetailsButton,
    borderWidth: 2,
    backgroundColor: '#E7F2FF',
  },
  radioIcon: { marginRight: 15 },
  addressDetails: { flex: 1 },
  addressName: { fontSize: 15, fontWeight: 'bold', color: '#212529' },
  addressText: { fontSize: 14, color: '#6c757d', lineHeight: 20 },
  addressPhone: { fontSize: 14, color: '#6c757d', marginTop: 4 },
  noAddressText: { textAlign: 'center', marginVertical: 20, color: '#666' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.ProductDetailsButton,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: colors.ProductDetailsButton,
    marginLeft: 8,
    fontWeight: '600',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: colors.ProductDetailsButton,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Checkout;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import { addAddress } from '../../redux/Product/productSlice';

const OrderSummary = ({ product, cartItems, totalPrice }) => {
  if (product) {
    return (
      <View style={styles.summaryCard}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.summaryImage}
        />
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryProductName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.summaryBrand}>{product.brand}</Text>
          <Text style={styles.summaryPrice}>
            Price: ₹{product.price.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  }
  if (cartItems) {
    const finalTotal = (totalPrice * 1.18).toFixed(2);
    return (
      <View style={styles.summaryCard}>
        <View style={[styles.summaryInfo, { flex: 1 }]}>
          <Text style={styles.summaryCartTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Items:</Text>
            <Text style={styles.summaryValue}>{cartItems.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>
              ₹{finalTotal}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return null;
};

const DeliveryAddress = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { product, cartItems, totalPrice } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const validateForm = () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !pincode.trim() ||
      !house.trim() ||
      !area.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      showMessage({ message: 'All fields are required', type: 'warning' });
      return false;
    }
    return true;
  };

  const handleSaveAndContinue = () => {
    if (!validateForm()) return;

    const addressData = {
      full_name: fullName,
      phone,
      pincode,
      house,
      area,
      city,
      state,
    };

    dispatch(addAddress(addressData));

    showMessage({
      message: 'Address Saved!',
      type: 'success',
    });

    navigation.navigate('Checkout', {
      product,
      cartItems,
      totalPrice,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderSummary
          product={product}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
        <Text style={styles.formLabel}>Enter Your Delivery Address</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="10-Digit Phone Number"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="map-pin"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="6-Digit Pincode"
            style={styles.input}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="home" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="House No., Building Name"
            style={styles.input}
            value={house}
            onChangeText={setHouse}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="map" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="Area, Colony, Street"
            style={styles.input}
            value={area}
            onChangeText={setArea}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.rowItem]}>
            <TextInput
              placeholder="City"
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={[styles.inputContainer, styles.rowItem]}>
            <TextInput
              placeholder="State"
              style={styles.input}
              value={state}
              onChangeText={setState}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleSaveAndContinue}
        >
          <Text style={styles.checkoutButtonText}>
            Save & Continue to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
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
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  headerIconPlaceholder: { width: 40 },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  summaryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 12,
  },
  summaryInfo: { justifyContent: 'center' },
  summaryProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: 200,
  },
  summaryBrand: { fontSize: 14, color: '#666', marginBottom: 4 },
  summaryPrice: { fontSize: 15, color: '#007BFF', fontWeight: '600' },
  summaryCartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  summaryLabel: { fontSize: 15, color: '#6c757d' },
  summaryValue: { fontSize: 15, color: '#212529' },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },
  inputIcon: { padding: 12 },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowItem: { flex: 1, marginLeft: 5, marginRight: 5 },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  checkoutButton: {
    backgroundColor: colors.ProductDetailsButton,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#A5C9FF' },
  checkoutButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default DeliveryAddress;
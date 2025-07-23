import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartMap,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../redux/Product/productSlice'; 
import colors from '../../styles/colors';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartMap = useSelector(selectCartMap);
  const cartItems = useMemo(() => Object.values(cartMap), [cartMap]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price || 0) * item.quantity);
    }, 0);
  }, [cartItems]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    showMessage({ message: 'Item Removed', type: 'success' });
  };

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    const currentItem = cartMap[productId];
    if (currentItem && currentItem.quantity <= 1) {
      handleRemoveItem(productId);
    } else {
      dispatch(decrementQuantity(productId));
    }
  };
  
  const handleCheckout = () => {
    navigation.navigate('Checkout', { cartItems, totalPrice });
  };
  
  const renderItem = ({ item }) => {
    if (!item) return null;
    const price = parseFloat(item.price || 0);
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList', { productId: item.id })}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList', { productId: item.id })} style={styles.nameContainer}>
              <Text style={styles.brandText}>{item.brand}</Text>
              <Text style={styles.nameText} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
              <Icon name="trash-2" size={scale(20)} color="#E53935" />
            </TouchableOpacity>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{price.toFixed(2)}</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(item.id)}>
                <Icon name="minus" size={scale(18)} color={item.quantity <= 1 ? '#ccc' : '#007BFF'} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(item.id)}>
                <Icon name="plus" size={scale(18)} color="#007BFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-left" size={scale(24)} color="#333" /></TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.headerIconPlaceholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={scale(80)} color="#ddd" />
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-left" size={scale(24)} color="#333" /></TouchableOpacity>
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
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Taxes</Text><Text style={styles.summaryValue}>₹{(totalPrice * 0.01).toFixed(2)}</Text></View>
            <View style={styles.divider} />
            <View style={[styles.summaryRow, { marginTop: verticalScale(10) }]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₹{(totalPrice * 1.01).toFixed(2)}</Text></View>
          </View>
        }
      />
      <View style={styles.footer}>
        <View style={styles.priceFooter}>
          <Text style={styles.totalFooter}>Total: ₹{(totalPrice * 1.18).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(16), paddingVertical: verticalScale(12), borderBottomWidth: 1, borderBottomColor: '#F0F0F0', backgroundColor: '#FFF' },
  backButton: { padding: scale(8) },
  headerTitle: { fontSize: moderateScale(18), fontWeight: '600', color: '#333' },
  headerIconPlaceholder: { width: scale(40) },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(40) },
  emptyTitle: { fontSize: moderateScale(22), fontWeight: '600', color: '#333', marginTop: verticalScale(20), marginBottom: verticalScale(8) },
  shopButton: { backgroundColor: colors.ProductDetailsButton, paddingVertical: verticalScale(14), paddingHorizontal: scale(32), borderRadius: scale(8) },
  shopButtonText: { color: '#FFF', fontSize: moderateScale(16), fontWeight: '600' },
  listContainer: { paddingBottom: verticalScale(100) },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: scale(12), marginVertical: verticalScale(8), marginHorizontal: scale(16), elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: scale(4), padding: scale(16) },
  image: { width: scale(100), height: verticalScale(100), resizeMode: 'contain', borderRadius: scale(8), marginRight: scale(16) },
  infoContainer: { flex: 1, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  nameContainer: { flex: 1, marginRight: scale(8) },
  brandText: { fontSize: moderateScale(14), color: '#007BFF', fontWeight: '500', marginBottom: verticalScale(4) },
  nameText: { fontSize: moderateScale(16), fontWeight: '600', color: '#333', lineHeight: verticalScale(22) },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: verticalScale(8) },
  priceText: { fontSize: moderateScale(18), fontWeight: 'bold', color: '#212529' },
  removeButton: { padding: scale(4) },
  quantityControls: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: scale(8) },
  quantityButton: { paddingHorizontal: scale(12), paddingVertical: verticalScale(8) },
  quantityText: { fontSize: moderateScale(16), fontWeight: '600', color: '#212529', minWidth: scale(30), textAlign: 'center' },
  summaryContainer: { backgroundColor: '#FFF', borderRadius: scale(12), margin: scale(16), padding: scale(20), elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: scale(4) },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: verticalScale(10) },
  summaryLabel: { fontSize: moderateScale(15), color: '#6c757d' },
  summaryValue: { fontSize: moderateScale(15), color: '#212529', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: verticalScale(8) },
  totalLabel: { fontSize: moderateScale(16), fontWeight: '600', color: '#333' },
  totalValue: { fontSize: moderateScale(18), fontWeight: 'bold', color: '#212529' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: scale(16), backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F0F0F0', position: 'absolute', bottom: 0, left: 0, right: 0 },
  priceFooter: { flex: 1 },
  totalFooter: { fontSize: moderateScale(16), fontWeight: 'bold', color: '#212529' },
  checkoutButton: { backgroundColor: colors.ProductDetailsButton, paddingVertical: verticalScale(14), paddingHorizontal: scale(24), borderRadius: scale(8), marginLeft: scale(16) },
  checkoutButtonText: { color: '#FFF', fontSize: moderateScale(16), fontWeight: '600' },
});

export default Cart;
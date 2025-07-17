import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApi } from '../../Context/ApiContext';


const API_BASE_URL = 'https://accounts-1.onrender.com';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'cancelled':
      return '#E74C3C'; 
    case 'delivered':
      return '#2ECC71';
    case 'pending':
      return '#F39C12'; 
    case 'placed':
    default:
      return '#3498DB';
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

const calculateTotalPrice = (items) => {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);
    return sum + (price * quantity);
  }, 0);

  return total.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
};

const SeeOrder = () => {
  const { GetOrders, CancelOrder } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GetOrders();
      if (response.error) {
        setError(response.message);
      } else {
        const sortedOrders = response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setOrders(sortedOrders);
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          onPress: async () => {
            setCancellingId(orderId);
            const result = await CancelOrder(orderId);
            if (result && !result.error) {
              Alert.alert('Success', 'Order has been cancelled successfully.');
              // Update the UI immediately without a full refresh
              setOrders((currentOrders) =>
                currentOrders.map((order) =>
                  order.id === orderId
                    ? { ...order, status: 'Cancelled' }
                    : order,
                ),
              );
            } else {
              Alert.alert(
                'Error',
                result.message || 'Could not cancel the order.',
              );
            }
            setCancellingId(null);
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Renders a single product item within an order
  const renderProductItem = ({ item }) => {
    const imageUrl = item.product.images[0]?.image
      ? `${API_BASE_URL}${item.product.images[0].image}`
      : null;

    return (
      <View style={styles.productItem}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
        ) : (
          <View style={[styles.productImage, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.product.product_name}
          </Text>
          <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
        </View>
      </View>
    );
  };

  // Renders a complete order card
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.totalPriceText}>
          Total Amount: {calculateTotalPrice(item.items)}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Date:</Text>{' '}
          {formatDate(item.created_at)}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Payment:</Text> {item.payment_mode}
        </Text>

        <View style={styles.separator} />

        <Text style={styles.productsTitle}>Products in this Order</Text>
        <FlatList
          data={item.items}
          renderItem={renderProductItem}
          keyExtractor={(product) => product.product.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <View style={styles.separator} />

        <Text style={styles.addressTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>{item.address.full_name}</Text>
        <Text style={styles.addressText}>
          {item.address.house}, {item.address.area}
        </Text>
        <Text style={styles.addressText}>
          {item.address.city}, {item.address.state} - {item.address.pincode}
        </Text>
        <Text style={styles.addressText}>Phone: {item.address.phone}</Text>
      </View>

      {/*-- Cancel Button --*/}
      {item.status?.toLowerCase() === 'placed' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelOrder(item.id)}
          disabled={cancellingId === item.id}>
          {cancellingId === item.id ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498DB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>My Orders</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchOrders}
          refreshing={loading}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            You haven't placed any orders yet.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// All Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {},
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productItem: {
    marginRight: 10,
    width: 90,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePlaceholderText: {
    fontSize: 10,
    color: '#999',
  },
  productDetails: {
    marginTop: 5,
    alignItems: 'center',
  },
  productName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    height: 30,
  },
  productQuantity: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default SeeOrder;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useApi } from '../../Context/ApiContext'; 

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'cancelled':
      return '#E74C3C'; // Red
    case 'delivered':
      return '#2ECC71'; // Green
    case 'pending':
      return '#F39C12'; // Orange
    default:
      return '#3498DB'; // Blue
  }
};

// Date ko format karne ke liye helper function
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const SeeOrder = () => {
  const { GetOrders } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GetOrders();
        if (response.error) {
          setError(response.message);
        } else {
          setOrders(response);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Date:</Text> {formatDate(item.created_at)}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Payment:</Text> {item.payment_mode}</Text>
        
        <View style={styles.separator} />
        
        <Text style={styles.addressTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>{item.address.full_name}</Text>
        <Text style={styles.addressText}>{item.address.house}, {item.address.area}</Text>
        <Text style={styles.addressText}>{item.address.city}, {item.address.state} - {item.address.pincode}</Text>
        <Text style={styles.addressText}>Phone: {item.address.phone}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
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
        />
      ) : (
        <View style={styles.centered}>
            <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
      fontSize: 16,
      color: '#888'
  }
});

export default SeeOrder;
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import OrderProductItem from './OrderProductItem';
import colors from '../../styles/colors'; // Optional: if you use the global status colors

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'cancelled': return colors.statusCancelled || '#E74C3C';
        case 'delivered': return colors.statusDelivered || '#2ECC71';
        case 'pending': return colors.statusPending || '#F39C12';
        case 'placed': default: return colors.statusPlaced || '#3498DB';
    }
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
const calculateTotalPrice = (items) => items.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity, 10)), 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const OrderCard = ({ order, onCancel, isCancelling }) => (
    <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{order.status}</Text>
            </View>
        </View>

        <View style={styles.cardBody}>
            <Text style={styles.totalPriceText}>Total Amount: {calculateTotalPrice(order.items)}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Date:</Text> {formatDate(order.created_at)}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Payment:</Text> {order.payment_mode}</Text>
            
            <View style={styles.separator} />

            <Text style={styles.productsTitle}>Products in this Order</Text>
            <FlatList
                data={order.items}
                renderItem={({ item }) => <OrderProductItem item={item} />}
                keyExtractor={(product) => product.product.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
            
            <View style={styles.separator} />
            
            <Text style={styles.addressTitle}>Shipping Address</Text>
            <Text style={styles.addressText}>{order.address.full_name}</Text>
            <Text style={styles.addressText}>{order.address.house}, {order.address.area}</Text>
            <Text style={styles.addressText}>{order.address.city}, {order.address.state} - {order.address.pincode}</Text>
            <Text style={styles.addressText}>Phone: {order.address.phone}</Text>
        </View>

        {order.status?.toLowerCase() === 'placed' && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(order.id)} disabled={isCancelling}>
                {isCancelling ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.cancelButtonText}>Cancel Order</Text>}
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
    orderCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 18, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 12, marginBottom: 12 },
    orderId: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
    statusText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    cardBody: {},
    totalPriceText: { fontSize: 18, fontWeight: 'bold', color: '#27ae60', marginBottom: 10 },
    detailText: { fontSize: 15, color: '#555', marginBottom: 5 },
    detailLabel: { fontWeight: '600', color: '#333' },
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
    addressTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    addressText: { fontSize: 14, color: '#666', lineHeight: 20 },
    productsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    cancelButton: { marginTop: 15, backgroundColor: colors.statusCancelled || '#E74C3C', paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default OrderCard;
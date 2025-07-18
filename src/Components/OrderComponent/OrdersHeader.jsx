import React from 'react';
import { Text, StyleSheet } from 'react-native';

const OrdersHeader = () => <Text style={styles.headerTitle}>My Orders</Text>;

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
});

export default OrdersHeader;
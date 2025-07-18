import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrdersEmpty = () => (
    <View style={styles.centered}>
        <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
    </View>
);

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#888', textAlign: 'center' },
});

export default OrdersEmpty;
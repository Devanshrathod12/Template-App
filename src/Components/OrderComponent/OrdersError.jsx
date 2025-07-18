import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const OrdersError = ({ message }) => (
    <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {message}</Text>
    </View>
);

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { textAlign: 'center', color: colors.statusCancelled, fontSize: 16 },
});

export default OrdersError;
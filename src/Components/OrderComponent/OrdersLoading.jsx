import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const OrdersLoading = () => (
    <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.statusPlaced} />
    </View>
);

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OrdersLoading;
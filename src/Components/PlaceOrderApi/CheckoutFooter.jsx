import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const CheckoutFooter = ({ totalPrice, isPlacingOrder, onPlaceOrder }) => (
    <View style={styles.footer}>
        <Text style={styles.totalText}>
            Order Total (incl. GST): ₹{(totalPrice * 0.50).toFixed(2)}
        </Text>
        <TouchableOpacity
            style={[styles.placeOrderButton, isPlacingOrder && { backgroundColor: '#ccc' }]}
            onPress={onPlaceOrder}
            disabled={isPlacingOrder}
        >
            {isPlacingOrder ? (
                <ActivityIndicator color={colors.textLight} />
            ) : (
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
            )}
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    footer: { backgroundColor: colors.background, padding: 16, borderTopWidth: 1, borderTopColor: colors.borderLight, elevation: 5 },
    totalText: { fontSize: 14, color: colors.textFaded, marginBottom: 8, textAlign: 'center' },
    placeOrderButton: { backgroundColor: colors.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
    placeOrderButtonText: { color: colors.textLight, fontSize: 16, fontWeight: 'bold' },
});

export default CheckoutFooter;
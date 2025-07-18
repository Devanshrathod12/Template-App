import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

const CheckoutHeader = ({ onGoBack }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
            <Icon name="arrow-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Final Checkout</Text>
        <View style={{ width: 24 }} />
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    headerTitle: { fontSize: 18, fontWeight: '600', color: colors.textDark },
});

export default CheckoutHeader;
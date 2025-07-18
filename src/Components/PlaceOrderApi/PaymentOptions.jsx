import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

const PaymentOptionItem = ({ mode, title, icon, isSelected, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(mode)} style={[styles.paymentOption, isSelected && styles.selectedCard]}>
        <MaterialCommunityIcons name={icon} size={24} color={isSelected ? colors.primary : '#555'} />
        <Text style={styles.paymentTitle}>{title}</Text>
        <Icon name={isSelected ? 'check-circle' : 'circle'} size={22} color={isSelected ? colors.primary : '#ccc'} />
    </TouchableOpacity>
);

const PaymentOptions = ({ selectedPaymentMode, onSelectPaymentMode }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Choose Payment Method</Text>
        <PaymentOptionItem
            mode="COD"
            title="Cash on Delivery"
            icon="cash-multiple"
            isSelected={selectedPaymentMode === 'COD'}
            onSelect={onSelectPaymentMode}
        />
        <PaymentOptionItem
            mode="ONLINE"
            title="Pay Online (Card, UPI, NetBanking)"
            icon="credit-card-multiple-outline"
            isSelected={selectedPaymentMode === 'ONLINE'}
            onSelect={onSelectPaymentMode}
        />
    </View>
);

const styles = StyleSheet.create({
    section: { backgroundColor: colors.background, margin: 10, borderRadius: 12, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: colors.textDark },
    paymentOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 10, marginBottom: 10 },
    selectedCard: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.backgroundPrimaryLight },
    paymentTitle: { flex: 1, marginLeft: 16, fontSize: 15, fontWeight: '500', color: colors.textDark },
});

export default PaymentOptions;
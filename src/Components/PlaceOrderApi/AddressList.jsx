import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

const AddressItem = ({ item, isSelected, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(item.id)} style={[styles.addressCard, isSelected && styles.selectedCard]}>
        <Icon
            name={isSelected ? 'check-circle' : 'circle'}
            size={22}
            color={isSelected ? colors.primary : '#ccc'}
            style={styles.radioIcon}
        />
        <View style={styles.addressDetails}>
            <Text style={styles.addressName}>{item.full_name}</Text>
            <Text style={styles.addressText}>{`${item.house}, ${item.area}, ${item.city}, ${item.state} - ${item.pincode}`}</Text>
            <Text style={styles.addressPhone}>Phone: {item.phone}</Text>
        </View>
    </TouchableOpacity>
);

const AddressList = ({ addresses, selectedAddressId, onSelectAddress, onAddAddress }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Select Delivery Address</Text>
        {addresses.length > 0 ? (
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AddressItem item={item} isSelected={item.id === selectedAddressId} onSelect={onSelectAddress} />
                )}
            />
        ) : (
            <Text style={styles.noAddressText}>No saved addresses found.</Text>
        )}
        <TouchableOpacity style={styles.addButton} onPress={onAddAddress}>
            <Icon name="plus" size={20} color={colors.primary} />
            <Text style={styles.addButtonText}>Add Another Address</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    section: { backgroundColor: colors.background, margin: 10, borderRadius: 12, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: colors.textDark },
    addressCard: { flexDirection: 'row', padding: 15, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
    selectedCard: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.backgroundPrimaryLight },
    radioIcon: { marginRight: 15 },
    addressDetails: { flex: 1 },
    addressName: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary },
    addressText: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
    addressPhone: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
    noAddressText: { textAlign: 'center', marginVertical: 20, color: colors.textFaded },
    addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, marginTop: 10, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, borderStyle: 'dashed' },
    addButtonText: { color: colors.primary, marginLeft: 8, fontWeight: '600' },
});

export default AddressList;
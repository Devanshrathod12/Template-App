import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

const FilterCategoryHeader = ({ onToggleSidebar, onGoToCart }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={onToggleSidebar}>
            <Icon name="menu" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eyeglasses</Text>
        <View style={styles.headerIcons}>
            <Icon name="search" size={22} color={colors.textDark} />
            <TouchableOpacity onPress={onGoToCart}>
                <Icon name="shopping-bag" size={22} color={colors.textDark} style={{ marginLeft: 20 }} />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
    headerTitle: { fontSize: 18, fontWeight: '600', color: colors.textDark },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
});

export default FilterCategoryHeader;
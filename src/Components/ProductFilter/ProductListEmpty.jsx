import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const ProductListEmpty = () => (
    <View style={styles.container}>
        <Text style={styles.text}>No products match your filters.</Text>
    </View>
);
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 16, color: colors.textFaded }
});
export default ProductListEmpty;
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const ProductListError = ({ message }) => (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{message}</Text>
    </SafeAreaView>
);
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    text: { fontSize: 16, color: colors.textFaded }
});
export default ProductListError;
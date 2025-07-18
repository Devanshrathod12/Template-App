import React from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const ProductListLoading = () => (
    <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
);
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }
});
export default ProductListLoading;
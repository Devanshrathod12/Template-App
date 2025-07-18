import React from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const CheckoutLoading = () => (
    <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
});

export default CheckoutLoading;
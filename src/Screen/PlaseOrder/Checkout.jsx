 
 import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { useCheckout } from '../../Components/PlaceOrderApi/useCheckout';
import colors from '../../styles/colors';

// Import Modular Components
import CheckoutLoading from '../../Components/PlaceOrderApi/CheckoutLoading';
import CheckoutHeader from '../../Components/PlaceOrderApi/CheckoutHeader';
import AddressList from '../../Components/PlaceOrderApi/AddressList';
import PaymentOptions from '../../Components/PlaceOrderApi/PaymentOptions';
import CheckoutFooter from '../../Components/PlaceOrderApi/CheckoutFooter';

const Checkout = ({ route, navigation }) => {
    const { totalPrice } = route.params || {};

    const { loading, placingOrder, addresses, selectedAddressId, paymentMode, actions } = useCheckout();

    if (loading) {
        return <CheckoutLoading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
            <CheckoutHeader onGoBack={() => navigation.goBack()} />

            <ScrollView>
                <AddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={actions.setSelectedAddressId}
                    onAddAddress={() => navigation.navigate('DeliveryAddress', { totalPrice })}
                />
                <PaymentOptions
                    selectedPaymentMode={paymentMode}
                    onSelectPaymentMode={actions.setPaymentMode}
                />
            </ScrollView>

            <CheckoutFooter
                totalPrice={totalPrice || 0}
                isPlacingOrder={placingOrder}
                onPlaceOrder={actions.handlePlaceOrder}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
});

export default Checkout;

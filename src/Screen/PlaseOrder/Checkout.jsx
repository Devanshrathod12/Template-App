// Checkout.js (Final Version)

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import colors from '../../styles/colors';

// Redux se actions aur selectors import karein
import {
    setSelectedAddress,
    setPaymentMode,
    placeOrder,
    resetOrderStatus,
    selectAddresses,
    selectSelectedAddressId,
    selectPaymentMode,
    selectOrderStatus,
    selectCheckoutError,
} from '../../redux/Product/productSlice'; // Path apen hisaab se set karein

// Aapke UI components
import CheckoutHeader from '../../Components/PlaceOrderApi/CheckoutHeader';
import AddressList from '../../Components/PlaceOrderApi/AddressList';
import PaymentOptions from '../../Components/PlaceOrderApi/PaymentOptions';
import CheckoutFooter from '../../Components/PlaceOrderApi/CheckoutFooter';

const Checkout = ({ route, navigation }) => {
    const { totalPrice } = route.params || {};
    const dispatch = useDispatch();

    // Redux store se saara state lein
    const addresses = useSelector(selectAddresses);
    const selectedAddressId = useSelector(selectSelectedAddressId);
    const paymentMode = useSelector(selectPaymentMode);
    const orderStatus = useSelector(selectOrderStatus);
    const error = useSelector(selectCheckoutError);

    // orderStatus change hone par message dikhayein aur navigate karein
    useEffect(() => {
        if (orderStatus === 'succeeded') {
            showMessage({ message: 'Order Placed Successfully!', type: 'success' });
            setTimeout(() => {
                navigation.navigate("SeeOrder"); // Ya 'Home'
                dispatch(resetOrderStatus());
            }, 1500);
        } else if (orderStatus === 'failed') {
            showMessage({ message: 'Order Failed', description: error, type: 'danger' });
            dispatch(resetOrderStatus());
        }
    }, [orderStatus, navigation, dispatch, error]);

    const handlePlaceOrder = () => {
        dispatch(placeOrder());
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
            <CheckoutHeader onGoBack={() => navigation.goBack()} />

            <ScrollView>
                <AddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={(id) => dispatch(setSelectedAddress(id))}
                    onAddAddress={() => navigation.navigate('DeliveryAddress', { totalPrice })}
                />
                <PaymentOptions
                    selectedPaymentMode={paymentMode}
                    onSelectPaymentMode={(mode) => dispatch(setPaymentMode(mode))}
                />
            </ScrollView>

            <CheckoutFooter
                totalPrice={totalPrice || 0}
                isPlacingOrder={false} // Abhi iski zaroorat nahi
                onPlaceOrder={handlePlaceOrder}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
});

export default Checkout;
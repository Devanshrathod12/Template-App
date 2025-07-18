import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../Context/ApiContext'; // Adjust path
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export const useCheckout = () => {
    const { GetAddresses, PlaceOrder } = useApi();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [paymentMode, setPaymentMode] = useState('COD');

    const fetchUserAddresses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await GetAddresses();
            if (response && !response.error) {
                setAddresses(response);
                // Automatically select the last (most recent) address by default
                if (response.length > 0) {
                    setSelectedAddressId(response[response.length - 1].id);
                }
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    }, [GetAddresses]);

    useEffect(() => {
        if (isFocused) {
            fetchUserAddresses();
        }
    }, [isFocused, fetchUserAddresses]);

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            showMessage({ message: 'Please select a delivery address.', type: 'warning' });
            return;
        }
        setPlacingOrder(true);
        try {
            const orderData = { address_id: selectedAddressId, payment_mode: paymentMode };
            const response = await PlaceOrder(orderData);
            if (response.error) {
                throw new Error(response.message || 'Unknown error occurred.');
            }
            showMessage({
                message: 'Order Placed!',
                description: `Status: ${response.status}`,
                type: 'success',
            });
            setTimeout(() => navigation.navigate("SeeOrder"), 2000);
        } catch (error) {
            showMessage({
                message: 'Order Failed',
                description: error.message,
                type: 'danger',
            });
        } finally {
            setPlacingOrder(false);
        }
    };

    return {
        loading,
        placingOrder,
        addresses,
        selectedAddressId,
        paymentMode,
        actions: {
            setSelectedAddressId,
            setPaymentMode,
            handlePlaceOrder,
        },
    };
};
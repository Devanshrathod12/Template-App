import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useApi } from '../../Context/ApiContext';
import { useIsFocused } from '@react-navigation/native';

export const useOrders = () => {
    const { GetOrders, CancelOrder } = useApi();
    const isFocused = useIsFocused();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchOrders = useCallback(async () => {
        console.log('[FETCH] Starting to fetch orders...');
        setLoading(true);
        setError(null);
        try {
            const response = await GetOrders();
            console.log('[FETCH] API response received:', response);

            if (response && !response.error) {
                const sortedOrders = response.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setOrders(sortedOrders);
                console.log(`[FETCH] Successfully fetched and set ${sortedOrders.length} orders.`);
            } else {
                const errorMessage = response.message || 'Failed to fetch orders.';
                setError(errorMessage);
                console.error('[FETCH] API returned an error:', errorMessage);
            }
        } catch (err) {
            const errorMessage = 'An unexpected error occurred while fetching orders.';
            setError(errorMessage);
            console.error('[FETCH] A catch-block error occurred:', err);
        } finally {
            setLoading(false);
            console.log('[FETCH] Fetch process finished.');
        }
    }, [GetOrders]);

    useEffect(() => {
        if (isFocused) {
            console.log('Screen is focused, calling fetchOrders...');
            fetchOrders();
        } else {
            console.log('Screen is not focused.');
        }
    }, [isFocused, fetchOrders]);

    const handleCancelOrder = (orderId) => {
        console.log(`[CANCEL] Clicked on cancel for Order ID: ${orderId}`);
        Alert.alert(
            'Confirm Cancellation',
            'Are you sure you want to cancel this order?',
            [
                { text: 'No', style: 'cancel', onPress: () => console.log('[CANCEL] User chose "No".') },
                {
                    text: 'Yes, Cancel',
                    onPress: async () => {
                        console.log(`[CANCEL-STEP 1] User confirmed. Starting cancellation for Order ID: ${orderId}`);
                        setCancellingId(orderId); 

                        try {
                            console.log('[CANCEL-STEP 2] Calling CancelOrder API...');
                            const result = await CancelOrder(orderId);
                            console.log('[CANCEL-STEP 3] API Response Received:', result);

                            if (result && !result.error) {
                                console.log('[CANCEL-STEP 4] Cancellation successful. Showing success alert and updating UI.');
                                Alert.alert('Success', 'Order has been cancelled successfully.');

                                setOrders((currentOrders) =>
                                    currentOrders.map((order) =>
                                        order.id === orderId
                                            ? { ...order, status: 'Cancelled' }
                                            : order,
                                    ),
                                );
                            } else {
                                const errorMessage = result.message || 'Could not cancel the order.';
                                console.error('[CANCEL-STEP 4] API returned a known error:', errorMessage);
                                Alert.alert('Error', errorMessage);
                            }
                        } catch (e) {
                            console.error('[CANCEL-CATCH] An unexpected error occurred during cancellation:', e);
                            Alert.alert('Error', 'An unexpected network error occurred.');
                        } finally {
                            console.log('[CANCEL-STEP 5] Resetting cancelling state.');
                            setCancellingId(null);
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return {
        loading,
        error,
        orders,
        cancellingId,
        actions: {
            fetchOrders,
            handleCancelOrder,
        },
    };
};
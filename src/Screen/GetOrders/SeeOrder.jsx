import React, { useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../styles/colors';

// Redux se actions aur selectors import karein
import { selectAllOrders, cancelOrder } from '../../redux/Product/productSlice'; // Path apen hisaab se set karein

// Aapke UI components (inmein koi change nahi karna hai)
import OrdersHeader from '../../Components/OrderComponent/OrdersHeader';
import OrderCard from '../../Components/OrderComponent/OrderCard';
import OrdersEmpty from '../../Components/OrderComponent/OrdersEmpty';

const SeeOrder = () => {
    const dispatch = useDispatch();
    
    // YEH LINE SABSE ZAROORI HAI: Hum seedha Redux store se orders le rahe hain.
    const orders = useSelector(selectAllOrders);
    
    // Cancel button ke liye local loading state
    const [cancellingId, setCancellingId] = useState(null);

    const handleCancelOrder = (orderId) => {
        Alert.alert(
            'Confirm Cancellation',
            'Are you sure you want to cancel this order?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes, Cancel',
                    onPress: () => {
                        setCancellingId(orderId);
                        setTimeout(() => {
                            // Redux action ko dispatch karein
                            dispatch(cancelOrder(orderId));
                            setCancellingId(null);
                        }, 500);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const renderContent = () => {
        // Kyunki data local hai, humein sirf yeh check karna hai ki orders hain ya nahi.
        if (!orders || orders.length === 0) {
            return <OrdersEmpty />;
        }
        return (
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                        onCancel={handleCancelOrder}
                        isCancelling={cancellingId === item.id}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundFaded || '#f5f5f5'} />
            <OrdersHeader />
            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundFaded || '#f5f5f5',
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
});

export default SeeOrder;
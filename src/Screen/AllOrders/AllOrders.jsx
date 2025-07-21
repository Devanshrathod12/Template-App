 
 
 import React from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet } from 'react-native';
import { useOrders } from '../../Components/OrderComponent/useOrders';
import colors from '../../styles/colors'; 

import OrdersHeader from '../../Components/OrderComponent/OrdersHeader';
import OrderCard from '../../Components/OrderComponent/OrderCard';
import OrdersLoading from '../../Components/OrderComponent/OrdersLoading';
import OrdersError from '../../Components/OrderComponent/OrdersError';
import OrdersEmpty from '../../Components/OrderComponent/OrdersEmpty';

const AllOrders = () => {
    const { loading, error, orders, cancellingId, actions } = useOrders();

    const renderContent = () => {
        if (loading && orders.length === 0) {
            return <OrdersLoading />;
        }
        if (error) {
            return <OrdersError message={error} />;
        }
        if (!loading && orders.length === 0) {
            return <OrdersEmpty />;
        }
        return (
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                        onCancel={actions.handleCancelOrder}
                        isCancelling={cancellingId === item.id}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                onRefresh={actions.fetchOrders} 
                refreshing={loading} 
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

export default AllOrders;
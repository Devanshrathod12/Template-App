import React, { useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, StyleSheet } from 'react-native';
import { useProductFilters } from '../../Components/ProductFilter/useProductFilters';
import colors from '../../styles/colors';

import FilterCategoryHeader from '../../Components/ProductFilter/FilterCategoryHeader';
import ProductCard from '../../Components/ProductFilter/ProductCard';
import FilterSidebar from '../../Components/ProductFilter/FilterSidebar';
import ProductListLoading from '../../Components/ProductFilter/ProductListLoading';
import ProductListError from '../../Components/ProductFilter/ProductListError';
import ProductListEmpty from '../../Components/ProductFilter/ProductListEmpty';

const FilterCategory = ({ navigation }) => {
    const { loading, error, filteredProducts, cartMap, likedItems, filters, actions } = useProductFilters();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    const renderContent = () => {
        if (loading) {
            return <ProductListLoading />;
        }
        if (error) {
            return <ProductListError message={error} />;
        }
        if (!filteredProducts || filteredProducts.length === 0) {
            return <ProductListEmpty />;
        }
        return (
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isAddedToCart={!!cartMap[item.id]}
                        isLiked={!!likedItems[item.id]}
                        onAddToCart={actions.handleAddToCart}
                        onRemoveFromCart={actions.handleRemoveFromCart}
                        onToggleLike={() => actions.toggleLike(item.id)}
                        onPress={() => navigation.navigate('ProductList', { productId: item.id })}
                    />
                )}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <FilterCategoryHeader
                onToggleSidebar={toggleSidebar}
                onGoToCart={() => navigation.navigate('AllOrders')}
            />
            {renderContent()}
            <FilterSidebar
                isVisible={sidebarVisible}
                onClose={toggleSidebar}
                filters={filters}
                actions={actions}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    listContainer: { padding: 8 },
});

export default FilterCategory;
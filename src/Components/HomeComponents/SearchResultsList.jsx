import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';

const BASE_URL = 'https://accounts-3.onrender.com';

const SearchResultItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <Image 
            source={{ uri: (item.images?.[0]?.image) ? `${BASE_URL}${item.images[0].image}` : 'https://via.placeholder.com/150' }} 
            style={styles.itemImage} 
        />
        <View style={styles.itemInfo}>
            <Text style={styles.itemBrand}>{item.brand_name?.replace(/['"]/g, '')}</Text>
            <Text style={styles.itemName} numberOfLines={1}>{item.product_name}</Text>
        </View>
    </TouchableOpacity>
);

const SearchResultsList = ({ results, loading, error, onResultPress }) => {
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator style={{ padding: 20 }} size="small" color={colors.primary} />
            ) : error ? (
                <Text style={styles.messageText}>{error}</Text>
            ) : results.length === 0 ? (
                <Text style={styles.messageText}>No results found.</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <SearchResultItem 
                            item={item} 
                            onPress={() => onResultPress(item)} 
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 105, // Header ke height ke hisaab se adjust karein
        left: 16,
        right: 16,
        maxHeight: 300,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        zIndex: 10, // Yeh zaroori hai taaki yeh upar dikhe
    },
    messageText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 10,
        resizeMode: 'contain'
    },
    itemInfo: {
        flex: 1,
    },
    itemBrand: {
        fontSize: 12,
        color: '#888'
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333'
    }
});

export default SearchResultsList;
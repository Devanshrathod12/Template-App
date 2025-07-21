import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const API_BASE_URL = 'https://accounts-3.onrender.com';

const OrderProductItem = ({ item }) => {
    const imageUrl = item.product.images?.[0]?.image ? `${API_BASE_URL}${item.product.images[0].image}` : null;

    return (
        <View style={styles.productItem}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
            ) : (
                <View style={[styles.productImage, styles.imagePlaceholder]}>
                    <Text style={styles.imagePlaceholderText}>No Image</Text>
                </View>
            )}
            <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={2}>{item.product.product_name}</Text>
                <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productItem: { marginRight: 10, width: 90 },
    productImage: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#f0f0f0', alignSelf: 'center' },
    imagePlaceholder: { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
    imagePlaceholderText: { fontSize: 10, color: '#999' },
    productDetails: { marginTop: 5, alignItems: 'center' },
    productName: { fontSize: 12, color: '#333', textAlign: 'center', height: 30 },
    productQuantity: { fontSize: 12, color: '#777', marginTop: 2 },
});

export default OrderProductItem;
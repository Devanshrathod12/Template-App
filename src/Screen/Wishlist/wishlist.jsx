import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useApi } from "../../Context/ApiContext";
import colors from '../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const placeholderColors = [
  '#a2d2ff', '#bde0fe', '#ffafcc', '#ffc8dd', 
  '#cdb4db', '#fcf6bd', '#d0f4de', '#a9def9'
];

const Wishlist = ({ navigation }) => {
  const { GetFavourites, RemoveFromFavourites } = useApi();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchWishlist = useCallback(async () => {
    if (!loading) setLoading(true);
    setError(null);
    const response = await GetFavourites();
    if (isMounted.current) {
      if (response && Array.isArray(response)) {
        const validFavourites = response.filter(fav => fav && fav.product);
        setFavourites(validFavourites);
      } else {
        setError(response?.message || 'Failed to load wishlist.');
        setFavourites([]);
      }
      setLoading(false);
    }
  }, [GetFavourites]);

  useFocusEffect(useCallback(() => { fetchWishlist(); }, [fetchWishlist]));

  const handleRemoveFavourite = (itemToRemove) => {
    const productId = itemToRemove.product.id;
    Alert.alert(
      "Remove from Wishlist",
      `Are you sure you want to remove "${itemToRemove.product.product_name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const response = await RemoveFromFavourites(productId);
            if (isMounted.current) {
              if (response && !response.error) {
                setFavourites(currentFavourites =>
                  currentFavourites.filter(item => item.id !== itemToRemove.id)
                );
              } else {
                Alert.alert("Error", response?.message || "Failed to remove item.");
              }
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderWishlistItem = ({ item }) => {
    const product = item.product;
    if (!product) return null;

    const colorIndex = product.id % placeholderColors.length;
    const backgroundColor = placeholderColors[colorIndex];

    const initial = product.product_name ? product.product_name[0].toUpperCase() : '?';
    const brandName = product.brand_name ? product.brand_name.replace(/"/g, '') : '';
    
    return (
      <TouchableOpacity 
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
        activeOpacity={0.8}
      >
        <View style={[styles.imagePlaceholder, { backgroundColor }]}>
          <Text style={styles.placeholderText}>{initial}</Text>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{brandName}</Text>
          <Text style={styles.productName} numberOfLines={2}>{product.product_name}</Text>
          <Text style={styles.productPrice}>₹{parseFloat(product.price).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
            style={styles.removeButtonDirect}
            onPress={() => handleRemoveFavourite(item)}
        >
            <MaterialIcons name="delete-outline" size={24} color={colors.danger || 'red'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {favourites.length === 0 && !loading ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
          <Text style={styles.emptySubText}>Tap the heart on any product to save it here.</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        padding: 16,
    },
    errorText: { 
        fontSize: 16, 
        color: 'red', 
        textAlign: 'center' 
    },
    emptyText: { 
        fontSize: 18, 
        fontWeight: '600', 
        color: '#333' 
    },
    emptySubText: { 
        fontSize: 14, 
        color: '#666', 
        marginTop: 8, 
        textAlign: 'center' 
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        overflow: 'hidden',
        height: 110,
    },
    imagePlaceholder: {
        width: 110,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    productInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    brandText: {
        fontSize: 13,
        color: colors.textFaded,
        marginBottom: 4,
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    removeButtonDirect: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
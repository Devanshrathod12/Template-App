import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';

const ProductGridScreen = ({ navigation }) => {
  const [cartMap, setCartMap] = useState({});
  const [likedItems, setLikedItems] = useState({}); // बदला हुआ state

  const products = [
    { id: '1', brand: 'Vincent Chase', name: 'Classic Rectangle', image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg', price: 1199, originalPrice: 1999, rating: 4.5 },
    { id: '2', brand: 'Ray-Ban', name: 'Aviator Pro', image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg', price: 4500, originalPrice: 6000, rating: 4.8 },
    { id: '3', brand: 'Oakley', name: 'Sport Edition', image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg', price: 2100, originalPrice: 3500, rating: 4.2 },
    { id: '4', brand: 'John Jacobs', name: 'Modern Cateye', image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg', price: 3200, originalPrice: 5000, rating: 4.7 },
    { id: '5', brand: 'Vincent Chase', name: 'Round Metal', image: 'https://cdn.eyemyeye.com/shared/images/products/E10A3828/E10A3828-1-hd.jpg', price: 1499, originalPrice: 2499, rating: 4.4 },
    { id: '6', brand: 'Carrera', name: 'Urban Navigator', image: 'https://cdn.eyemyeye.com/shared/images/products/E13A3745/E13A3745-1-hd.jpg', price: 3800, originalPrice: 5500, rating: 4.6 },
  ];


  const toggleLike = (itemId) => {
    setLikedItems(prev => {
      const updatedLikes = { ...prev };
      updatedLikes[itemId] = !updatedLikes[itemId]; // उस ID के लिए वैल्यू को टॉगल करें
      return updatedLikes;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#333" />
        <Text style={styles.headerTitle}>Eyeglasses</Text>
        <View style={styles.headerIcons}>
          <Icon name="search" size={22} color="#333" />
          <Icon name="shopping-bag" size={22} color="#333" style={{ marginLeft: 20 }} />
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isAddedToCart = cartMap[item.id];
          const isLiked = likedItems[item.id]; // हर आइटम का अपना isLiked स्टेटस

          return (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductList')}
                activeOpacity={0.9}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.wishlistButton}>
                  <AntIcon
                    name={isLiked ? "heart" : "hearto"}
                    size={20}
                    color={isLiked ? "red" : "black"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={styles.infoContainer}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.nameText} numberOfLines={1}>
                  {item.name}
                </Text>

                <View style={styles.ratingRow}>
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="star"
                        size={14}
                        color={item.rating >= star ? '#FFC107' : '#E0E0E0'}
                        style={{ fill: item.rating >= star ? '#FFC107' : 'none' }}
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>₹{item.price.toFixed(2)}</Text>
                  <Text style={styles.originalPriceText}>
                    ₹{item.originalPrice.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      const updatedMap = { ...cartMap, [item.id]: !isAddedToCart };
                      setCartMap(updatedMap);
                      showMessage({
                        message: !isAddedToCart ? 'Added to Cart' : 'Removed from Cart',
                        description: !isAddedToCart
                          ? `${item.name} added successfully!`
                          : `${item.name} removed from your cart.`,
                        type: !isAddedToCart ? 'success' : 'danger',
                        icon: !isAddedToCart ? 'success' : 'danger',
                        duration: 2000,
                      });
                    }}
                  >
                    <Text style={styles.addButtonText}>
                      {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ProductGridScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  headerIcons: { flexDirection: 'row' },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    backgroundColor: '#F7F7F7',
  },
  wishlistButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 6,
    borderRadius: 15,
  },
  infoContainer: { padding: 12 },
  brandText: { fontSize: 13, color: '#666', fontWeight: '500' },
  nameText: { fontSize: 15, fontWeight: 'bold', color: '#333', marginVertical: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  starContainer: { flexDirection: 'row' },
  ratingText: { marginLeft: 5, fontSize: 13, color: '#555' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  originalPriceText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  buttonContainer: { alignItems: 'center' },
  addButton: {
    backgroundColor: '#E7F2FF',
    borderColor: '#007BFF',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 14 },
});
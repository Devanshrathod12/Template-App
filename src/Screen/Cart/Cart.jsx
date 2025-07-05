// import React, { useState, useEffect } from 'react'; // ✅ useEffect जोड़ा गया
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator, // ✅ ActivityIndicator जोड़ा गया
// } from 'react-native';
// import { showMessage } from 'react-native-flash-message';
// import Icon from 'react-native-vector-icons/Feather';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import colors from '../../styles/colors';
// import { useApi } from '../../Context/ApiContext'; // ✅ useApi इम्पोर्ट किया गया

// // ✅ BASE_URL को इमेज पाथ के लिए डिफाइन किया गया
// const BASE_URL = 'https://accounts-1.onrender.com';

// const ProductGridScreen = ({ navigation }) => {
//   // ✅ बदला हुआ State: हार्डकोडेड ऐरे की जगह API डेटा के लिए state
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cartMap, setCartMap] = useState({});
//   const [likedItems, setLikedItems] = useState({});

//   // ✅ नया: API से डेटा लाने के लिए हुक
//   const { getProductsData } = useApi();

//   // ✅ नया: कंपोनेंट माउंट होने पर डेटा फेच करने के लिए useEffect
//   useEffect(() => {
//     fetchProducts();
//   }, []);

// // ProductGridScreen.js

// const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching products from API...'); // 1. चेक करें कि फंक्शन कॉल हो रहा है या नहीं
//       const res = await getProductsData();

//       // 2. देखें कि API से असल में क्या रिस्पॉन्स आ रहा है
//       console.log('Raw API Response:', JSON.stringify(res, null, 2));

//       if (res && Array.isArray(res) && res.length > 0) { // ✅ res.length > 0 भी चेक करें
//         console.log(`Received ${res.length} products. Formatting...`);

//         const formattedProducts = res.map(apiProduct => {
//           // मैपिंग के दौरान किसी एक प्रोडक्ट में एरर तो नहीं, यह देखने के लिए लॉग करें
//           // console.log('Mapping product:', apiProduct.product_name); 
//           return {
//             id: apiProduct.id,
//             brand: apiProduct.brand_name ? apiProduct.brand_name.replace(/['"]/g, '') : 'N/A',
//             name: apiProduct.product_name ? apiProduct.product_name.replace(/['"]/g, '') : 'Unknown Product',
//             image: `${BASE_URL}${apiProduct.image}`,
//             price: parseFloat(apiProduct.price) || 0,
//             originalPrice: parseFloat(apiProduct.originalPrice || (apiProduct.price * 1.4)) || 0,
//             rating: apiProduct.rating || 4.5,
//           };
//         });

//         setProducts(formattedProducts);
//         console.log('Products formatted and set to state.');

//       } else {
//         // 3. यह लॉग बताएगा कि API से डेटा सही फॉर्मेट में नहीं आया या खाली था
//         console.log('API did not return a valid array of products or the array was empty.');
//         setProducts([]); // सुनिश्चित करें कि प्रोडक्ट्स खाली ऐरे है
//       }
//     } catch (err) {
//       // 4. अगर कोई भी एरर आती है, तो उसे यहाँ कंसोल में देखें
//       console.error('❌ Failed to fetch or format products:', err);
//       showMessage({
//         message: 'Error',
//         description: 'Could not load products. Please check your connection.',
//         type: 'danger',
//       });
//     } finally {
//       setLoading(false);
//     }
// };


//   const toggleLike = (itemId) => {
//     setLikedItems(prev => ({
//       ...prev,
//       [itemId]: !prev[itemId], // उस ID के लिए वैल्यू को टॉगल करें
//     }));
//   };

//   // ✅ नया: लोडिंग स्टेट को हैंडल करने के लिए UI
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={colors.ProductDetailsButton} />
//       </SafeAreaView>
//     );
//   }

//   // ✅ नया: अगर कोई प्रोडक्ट न मिले तो मैसेज दिखाएं
//   if (!loading && products.length === 0) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <Text style={styles.infoText}>No products found.</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
//       <View style={styles.header}>
//         <Icon name="menu" size={24} color="#333" />
//         <Text style={styles.headerTitle}>Eyeglasses</Text>
//         <View style={styles.headerIcons}>
//           <Icon name="search" size={22} color="#333" />
//           <Icon name="shopping-bag" size={22} color="#333" style={{ marginLeft: 20 }} />
//         </View>
//       </View>

//       <FlatList
//         data={products} // ✅ अब यह state से आ रहा है
//         keyExtractor={(item) => item.id.toString()} // key को string में बदलें
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//         renderItem={({ item }) => {
//           const isAddedToCart = cartMap[item.id];
//           const isLiked = likedItems[item.id];

//           return (
//             <View style={styles.card}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ProductList')} // यहाँ आप चाहें तो प्रोडक्ट आईडी पास कर सकते हैं
//                 activeOpacity={0.9}
//               >
//                 <Image source={{ uri: item.image }} style={styles.image} />
//                 <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.wishlistButton}>
//                   <AntIcon
//                     name={isLiked ? "heart" : "hearto"}
//                     size={20}
//                     color={isLiked ? "red" : "black"}
//                   />
//                 </TouchableOpacity>
//               </TouchableOpacity>

//               <View style={styles.infoContainer}>
//                 <Text style={styles.brandText}>{item.brand}</Text>
//                 <Text style={styles.nameText} numberOfLines={1}>
//                   {item.name}
//                 </Text>

//                 <View style={styles.ratingRow}>
//                   <View style={styles.starContainer}>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Icon
//                         key={star}
//                         name="star"
//                         size={14}
//                         color={item.rating >= star ? '#FFC107' : '#E0E0E0'}
//                         style={{ fill: item.rating >= star ? '#FFC107' : 'none' }}
//                       />
//                     ))}
//                   </View>
//                   <Text style={styles.ratingText}>{item.rating}</Text>
//                 </View>

//                 <View style={styles.priceRow}>
//                   <Text style={styles.priceText}>₹{item.price.toFixed(2)}</Text>
//                   <Text style={styles.originalPriceText}>
//                     ₹{item.originalPrice.toFixed(2)}
//                   </Text>
//                 </View>

//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => {
//                       const updatedMap = { ...cartMap, [item.id]: !isAddedToCart };
//                       setCartMap(updatedMap);
//                       showMessage({
//                         message: !isAddedToCart ? 'Added to Cart' : 'Removed from Cart',
//                         description: !isAddedToCart
//                           ? `${item.name} added successfully!`
//                           : `${item.name} removed from your cart.`,
//                         type: !isAddedToCart ? 'success' : 'danger',
//                         icon: !isAddedToCart ? 'success' : 'danger',
//                         duration: 2000,
//                       });
//                     }}
//                   >
//                     <Text style={styles.addButtonText}>
//                       {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// // मूल `ProductList` से केवल `ProductGridScreen` के लिए styles रखें
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
//   // ✅ नया स्टाइल लोडर के लिए
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.WhiteBackgroudcolor,
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
//   headerIcons: { flexDirection: 'row' },
//   listContainer: { padding: 8 },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     margin: 8,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'contain',
//     backgroundColor: '#F7F7F7',
//   },
//   wishlistButton: {
//     position: 'absolute',
//     top: 5,
//     right: 10,
//     padding: 6,
//     borderRadius: 15,
//   },
//   infoContainer: { padding: 12 },
//   brandText: { fontSize: 13, color: '#666', fontWeight: '500' },
//   nameText: { fontSize: 15, fontWeight: 'bold', color: '#333', marginVertical: 4 },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   starContainer: { flexDirection: 'row' },
//   ratingText: { marginLeft: 5, fontSize: 13, color: '#555' },
//   priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   priceText: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
//   originalPriceText: {
//     fontSize: 12,
//     color: '#999',
//     textDecorationLine: 'line-through',
//     marginLeft: 8,
//   },
//   buttonContainer: { alignItems: 'center' },
//   addButton: {
//     backgroundColor: '#E7F2FF',
//     borderColor: '#007BFF',
//     borderWidth: 1,
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//   },
//   addButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 14 },
// });


// export default ProductGridScreen;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cart = () => {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})
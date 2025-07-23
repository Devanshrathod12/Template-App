import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAllTrendingFrames } from "../../redux/Temp/TrandringSlice"

const TrendingFramesSection = () => {
  const navigation = useNavigation();
  const trending = useSelector(selectAllTrendingFrames);

  if (!trending || trending.length === 0) {
    return (
      <View style={{ height: verticalScale(200), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.title}>Trending Frames</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        {trending.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('Template')}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default TrendingFramesSection;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: scale(16),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(8),
  },
  list: { 
    paddingHorizontal: scale(16), 
    paddingVertical: verticalScale(10) 
  },
  card: {
    width: scale(160),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: scale(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: verticalScale(100),
    resizeMode: 'contain',
    backgroundColor: '#F3F4F6',
  },
  info: { 
    padding: scale(12) 
  },
  brand: { 
    fontSize: moderateScale(11), 
    color: '#666' 
  },
  name: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#333',
    marginVertical: verticalScale(2),
  },
  price: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: verticalScale(4),
  },
});
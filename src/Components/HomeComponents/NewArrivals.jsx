

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';

const { width } = Dimensions.get('window');

const slides = [
  { id: 's1', title: 'Stunning Rounds', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9195_325_02_2022.jpg' },
  { id: 's3', title: 'Elegant Cat-Eye', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--rose-gold-peach-full-rim-cat-eye-lenskart-blu-screen-glasses-blu-computer-glasses-lb-e17488-eyeglasses__dsc9724_12_11_2024_12_11_2024.jpg' },
  { id: 's4', title: 'Classic Aviators', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg' },
  { id: 's5', title: 'Modern Geometric', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17494-c2-eyeglasses__dsc0644_03_12_2024.jpg' },
  { 
    id: 'c1', 
    title: 'Eyeglasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gunmetal-grey-transparent-full-rim-square-lenskart-blu-lb-e13529-c5_vincent-chase-vc-e13529-c5-eyeglasses_g_898022_02_2022.jpg' 
  },
  { 
    id: 'c2', 
    title: 'Sunglasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg' 
  },
  { 
    id: 'c3', 
    title: 'Power Glasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-transparent-full-rim-square-kids-8-12-yrs-hooper-astra-hooper-hp-e10031l-c10_g_1141_09_01_23.jpg' 
  },
  { 
    id: 'c4', 
    title: 'For Kids', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-black-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e10004l-c2_hooper-hp-e10004l-c2-eyeglasses_g_4296_22_march23.jpg' 
  },
  { 
    id: 'c5', 
    title: 'Contact Lens', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//a/i/free-aqualens-comfort-contact-lens-solution-120-ml_aqualens-comfort-contct-lens-solution-120-ml-offer__mg_7089__1.png' 
  },
];

const NewArrivals = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((item, index) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.slide}
              imageStyle={{ borderRadius: scale(16) }}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>Up to 50% off on latest styles</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { opacity }, currentIndex === index && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default NewArrivals;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(180),
    marginVertical: verticalScale(10),
  },
  slide: {
    width: width,
    height: verticalScale(160),
    justifyContent: 'center',
    marginHorizontal: scale(0),
    paddingHorizontal: scale(16),
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: scale(16),
    flex: 1,
    padding: scale(20),
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#FFF',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(12),
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(20),
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(4),
    alignSelf: 'center',
  },
  dot: {
    height: scale(8),
    width: scale(8),
    backgroundColor: '#FFF',
    margin: scale(4),
    borderRadius: scale(4),
    opacity: 0.5,
  },
  activeDot: {
    width: scale(12),
  },
});

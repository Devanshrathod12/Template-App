import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';

const { width } = Dimensions.get('window');

const NewArrivals = () => {
  const slides = useSelector((state) => state.TempNew.NewArrivel);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, slides]);
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  if (!slides || slides.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={16}
      >
        {slides.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.slide}
              imageStyle={{ borderRadius: scale(16) }}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default NewArrivals;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(180),
    marginVertical: verticalScale(10),
        backgroundColor: '#FFF', 

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
});
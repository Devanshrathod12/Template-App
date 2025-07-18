import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images }) => (
  <View style={styles.sliderContainer}>
    <FlatList
      data={images}
      keyExtractor={(_, index) => `slide-${index}`}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.sliderImage} />
      )}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: verticalScale(250),
    backgroundColor: colors.WhiteBackgroudcolor,
  },
  sliderImage: {
    width: width,
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ImageSlider;

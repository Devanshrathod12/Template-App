 
 import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';

const shapes = [
  { id: 's1', title: 'Round', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9195_325_02_2022.jpg' },
  { id: 's2', title: 'Rectangle', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-black-grey-full-rim-rectangle-lenskart-blu-lb-e13527-c1_vincent-chase-vc-e13527-c1-eyeglasses_g_840822_02_2022.jpg' },
  { id: 's3', title: 'Cat-Eye', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:--rose-gold-peach-full-rim-cat-eye-lenskart-blu-screen-glasses-blu-computer-glasses-lb-e17488-eyeglasses__dsc9724_12_11_2024_12_11_2024.jpg' },
  { id: 's4', title: 'Aviator', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-black-full-rim-aviator-lenskart-blu-e17370-c3_dsc5644_16_10_2024.jpg' },
  { id: 's5', title: 'Geometric', image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17494-c2-eyeglasses__dsc0644_03_12_2024.jpg' },
];

const FramesShapes = () => {
  return (
    <>
      <Text style={styles.title}>Shop by Shape</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {shapes.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default FramesShapes;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: scale(16),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(8),
  },
  list: { paddingHorizontal: scale(16), paddingVertical: verticalScale(10) },
  item: { alignItems: 'center', marginRight: scale(12), width: scale(80) },
  image: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    marginBottom: verticalScale(8),
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: { fontSize: moderateScale(12), color: '#444', textAlign: 'center' },
});

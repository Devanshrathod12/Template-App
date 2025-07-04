
 import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
const AllCategories = () => {
  const [activeSelection,SetActiveSelection] = useState(null)
  const navigation = useNavigation()
  const categories = [
  { 
    id: '1', 
    title: 'Eyeglasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-gunmetal-grey-transparent-full-rim-square-lenskart-blu-lb-e13529-c5_vincent-chase-vc-e13529-c5-eyeglasses_g_898022_02_2022.jpg' 
  },
  { 
    id: '2', 
    title: 'Sunglasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg' 
  },
  { 
    id: '3', 
    title: 'Power Glasses', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-transparent-full-rim-square-kids-8-12-yrs-hooper-astra-hooper-hp-e10031l-c10_g_1141_09_01_23.jpg' 
  },
  { 
    id: '4', 
    title: 'For Kids', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-black-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e10004l-c2_hooper-hp-e10004l-c2-eyeglasses_g_4296_22_march23.jpg.jpg' 
  },
  { 
    id: '5', 
    title: 'Contact Lens', 
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//a/i/free-aqualens-comfort-contact-lens-solution-120-ml_aqualens-comfort-contct-lens-solution-120-ml-offer__mg_7089__1.png' 
  },
  { 
    id: '6', 
    title: 'Accessories', 
    image: 'https://cdn.eyemyeye.com/shared/images/products/A10A2004/A10A2004-1-hd.jpg' 
  },
];
const HandleActiveBar = (id) => {
       if (activeSelection === id) {
      SetActiveSelection(null);
    } else {
      SetActiveSelection(id);
    }

    navigation.navigate("FilterCategory")
}

  return (
    <>
      <Text style={styles.title}>All Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {categories.map((item) => {
          const isActive = item.id === activeSelection;
          return (
            <TouchableOpacity key={item.id} style={styles.item} onPress={() => HandleActiveBar(item.id)}>
              <Image
                source={{ uri: item.image }}
                style={[styles.image, isActive ? styles.activebar : styles.inactive]}
              />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default AllCategories;

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
    borderColor: '#E5E7EB'
  },
  text: { fontSize: moderateScale(12), color: '#444', textAlign: 'center' },
  activebar:{
    borderWidth:scale(1.5),
    borderColor:colors.ProductDetailsButton
  }
});

 
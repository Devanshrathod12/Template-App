import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAllCategories } from '../../redux/Temp/AllCatagorySlice';

const TempAllCategories = () => {
  const [activeSelection, SetActiveSelection] = useState(null);
  const navigation = useNavigation();

  const categories = useSelector(selectAllCategories);

  const HandleActiveBar = (id) => {
    if (activeSelection === id) {
      SetActiveSelection(null);
    } else {
      SetActiveSelection(id);
    }
    navigation.navigate("FilterCategory");
  };

  if (!categories || categories.length === 0) {
    return (
      <View style={{ height: verticalScale(150), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.ProductDetailsButton} />
      </View>
    );
  }

  return (
    <>
    <View styles={styles.maincontainer}>
      <Text style={styles.title}>All Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {categories.map((item) => {
          const isActive = item.id === activeSelection;
          return (
            <TouchableOpacity key={item.id} style={styles.item} onPress={() => HandleActiveBar(item.id)}>
              <Image
                source={{ uri: item.image }}
                style={[styles.image, isActive ? styles.activebar : null]}
              />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
    </>
  );
};

export default TempAllCategories;

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
  item: { 
    alignItems: 'center', 
    marginRight: scale(12), 
    width: scale(80) 
  },
  image: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    marginBottom: verticalScale(8),
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB'
  },
  text: { 
    fontSize: moderateScale(12), 
    color: '#444', 
    textAlign: 'center' 
  },
  activebar:{
    borderColor: colors.ProductDetailsButton
  },
  maincontainer:{
    backgroundColor:"green"
  }
});
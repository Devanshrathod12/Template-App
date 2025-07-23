import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import { useSelector } from 'react-redux';
import { selectAllShapes } from '../../redux/Temp/ShapesSlice';

const TempFramesShapes = () => {
  const shapes = useSelector(selectAllShapes);

  if (!shapes || shapes.length === 0) {
    return (
      <View style={{ height: verticalScale(150), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

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

export default TempFramesShapes;

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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: { 
    fontSize: moderateScale(12), 
    color: '#444', 
    textAlign: 'center' 
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const ProductDetailsHeader = ({ brand, like, onToggleLike, onGoBack, onGoToCart }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onGoBack}>
      <Icon name="arrow-left" size={scale(24)} color="#333" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{brand}</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity onPress={onToggleLike}>
        <AntIcon name={like ? 'heart' : 'hearto'} size={scale(24)} color={like ? 'red' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: scale(15) }} onPress={onGoToCart}>
        <Icon name="shopping-bag" size={scale(24)} color="#333" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333', // or colors.textPrimary
  },
  headerIcons: {
    flexDirection: 'row',
  },
});

export default ProductDetailsHeader;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';

const ProductDetailsHeader = ({
  brand,
  productId,
  initialIsFavourite = false,
  onGoBack,
  onGoToCart
}) => {
  console.log('[ProductDetailsHeader] Received Product ID Prop:', productId);

  const { AddToFavourites } = useApi();
  const [isLiked, setIsLiked] = useState(initialIsFavourite);

  const handleToggleLike = async () => {
    if (!isLiked) {
      const response = await AddToFavourites(productId);
      if (response && !response.error) {
        setIsLiked(true);
        showMessage({
          message: "Added to Favourites",
          type: "success",
          icon: "success",
        });
      } else {
        showMessage({
          message: "Error",
          description: response.message || 'Could not add to favourites.',
          type: "danger",
          icon: "danger",
        });
      }
    } else {
      showMessage({
        message: "Already in Favourites",
        type: "info",
        icon: "info",
      });
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onGoBack}>
        <Icon name="arrow-left" size={scale(24)} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{brand}</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={handleToggleLike}>
          <AntIcon name={isLiked ? 'heart' : 'hearto'} size={scale(24)} color={isLiked ? 'red' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: scale(15) }} onPress={onGoToCart}>
          <Icon name="shopping-bag" size={scale(24)} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
});

export default ProductDetailsHeader;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const ProductActions = ({ isInCart, isUpdatingCart, onAddToCart, onRemoveFromCart, onBuyNow, isOutOfStock }) => {
  const cartButtonDisabled = isOutOfStock || isUpdatingCart;

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[ styles.addToCartButton, isInCart && styles.removeButton, cartButtonDisabled && { opacity: 0.6 } ]}
        onPress={isInCart ? onRemoveFromCart : onAddToCart}
        disabled={cartButtonDisabled}
      >
        {isUpdatingCart ? (
          <ActivityIndicator color={isInCart ? colors.danger : colors.primary} size="small" />
        )
         : (
          <Text style={[ styles.addToCartButtonText, isInCart && styles.removeButtonText ]}>
            {isInCart ? 'Remove To Cart' : 'Add to Cart'}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[ styles.selectLensesButton, isOutOfStock && { backgroundColor: '#ccc' } ]}
        onPress={onBuyNow}
        disabled={isOutOfStock}
      >
        <Text style={styles.selectLensesButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: scale(15),
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: colors.background,
  },
  addToCartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#E7F2FF', // This can also be a global color if you want
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  addToCartButtonText: {
    color: colors.primary,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  removeButton: { 
    borderColor: colors.danger, 
    backgroundColor: colors.backgroundDanger 
  },
  removeButtonText: { 
    color: colors.danger 
  },
  selectLensesButton: {
    flex: 1.5,
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: 'center',
    marginLeft: scale(10),
  },
  selectLensesButtonText: {
    color: colors.textLight,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default ProductActions;
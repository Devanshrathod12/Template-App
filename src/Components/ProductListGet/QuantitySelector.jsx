import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const QuantitySelector = ({ quantity, stock, onIncrement, onDecrement }) => {
  const isOutOfStock = stock <= 0;
  const isDecrementDisabled = isOutOfStock || quantity <= 1;
  const isIncrementDisabled = isOutOfStock || quantity >= stock;

  return (
    <View style={styles.quantitySelectorContainer}>
      <Text style={styles.quantityLabel}>Quantity</Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={styles.quantityButton} onPress={onDecrement} disabled={isDecrementDisabled}>
          <Icon name="minus" size={scale(20)} color={isDecrementDisabled ? '#ccc' : colors.primary} />
        </TouchableOpacity>
        <Text style={styles.quantityDisplay}>{isOutOfStock ? 0 : quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={onIncrement} disabled={isIncrementDisabled}>
          <Icon name="plus" size={scale(20)} color={isIncrementDisabled ? '#ccc' : colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantitySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
    marginBottom: verticalScale(25),
  },
  quantityLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333', // or colors.textPrimary
  },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityDisplay: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: scale(20),
    minWidth: scale(30),
    textAlign: 'center',
  },
});

export default QuantitySelector;
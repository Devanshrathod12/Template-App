import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const ProductInfo = ({ product }) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.productSubline}>
        <Text style={styles.productModel}>{product.modelNo}</Text>
        {isOutOfStock ? (
          <View style={[styles.stockBadge, styles.outOfStockBadge]}>
            <Text style={[styles.stockText, styles.outOfStockText]}>Out of Stock</Text>
          </View>
        ) : (
          <View style={[styles.stockBadge, styles.inStockBadge]}>
            <Text style={styles.stockText}>In Stock: {product.stock}</Text>
          </View>
        )}
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <Icon key={star} name="star" size={scale(16)} color={product.rating >= star ? colors.warning : '#E0E0E0'} />
          ))}
        </View>
        <Text style={styles.ratingText}>{product.rating} ({product.reviewCount} Reviews)</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{product.price?.toFixed(2)}</Text>
        <Text style={styles.originalPrice}>₹{product.originalPrice?.toFixed(2)}</Text>
        <Text style={styles.offerText}>{product.offer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { paddingTop: verticalScale(20) },
  productBrand: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontWeight: '500',
    marginBottom: verticalScale(4),
  },
  productName: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: verticalScale(4),
  },
  productSubline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(15) },
  productModel: { fontSize: moderateScale(14), color: colors.textMuted },
  stockBadge: { paddingHorizontal: scale(10), paddingVertical: verticalScale(4), borderRadius: scale(6) },
  inStockBadge: { backgroundColor: colors.backgroundSuccess },
  outOfStockBadge: { backgroundColor: '#fbe9e7' }, // Can be added to colors.js as backgroundWarning/Danger
  stockText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: colors.success,
  },
  outOfStockText: { color: colors.textDanger },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(15) },
  starContainer: { flexDirection: 'row' },
  ratingText: {
    marginLeft: scale(10),
    fontSize: moderateScale(14),
    color: colors.textSecondary,
  },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(20) },
  price: { fontSize: moderateScale(28), fontWeight: 'bold', color: colors.textPrimary },
  originalPrice: {
    fontSize: moderateScale(16),
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: scale(10),
  },
  offerText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.success,
    backgroundColor: colors.backgroundSuccess,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(6),
    marginLeft: scale(15),
    overflow: 'hidden',
  },
});

export default ProductInfo;
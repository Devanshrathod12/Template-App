import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';

const ProductCard = ({
  product,
  isAddedToCart,
  isLiked,
  onAddToCart,
  onRemoveFromCart,
  onToggleLike,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity
          onPress={() => onToggleLike(product.id, !isLiked)}
          style={styles.wishlistButton}
        >
          <AntIcon
            name={isLiked ? 'heart' : 'hearto'}
            size={20}
            color={isLiked ? colors.danger : colors.textDark}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.brandText}>{product.brand}</Text>
        <Text style={styles.nameText} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name="star"
                size={14}
                color={product.rating >= star ? colors.warning : '#E0E0E0'}
                style={{
                  fill:
                    product.rating >= star ? colors.warning : colors.background,
                }}
              />
            ))}
          </View>
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>₹{product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPriceText}>
              ₹{product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        {isAddedToCart ? (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemoveFromCart(product)}
          >
            <Text style={styles.removeButtonText}>Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    backgroundColor: colors.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 6,
    borderRadius: 20,
  },
  infoContainer: { padding: 12 },
  brandText: { fontSize: 13, color: colors.textFaded },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textDark,
    marginVertical: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  starContainer: { flexDirection: 'row' },
  ratingText: { marginLeft: 5, fontSize: 13, color: '#555' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  priceText: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  originalPriceText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: colors.backgroundPrimaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: { color: colors.primary, fontWeight: 'bold', fontSize: 14 },
  removeButton: {
    backgroundColor: colors.backgroundDanger,
    borderColor: colors.danger,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  removeButtonText: { color: colors.danger, fontWeight: 'bold', fontSize: 14 },
});

export default ProductCard;
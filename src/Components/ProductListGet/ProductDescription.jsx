import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const ProductDescription = ({ description, specifications }) => (
  <View>
    <Text style={styles.descriptionTitle}>Description</Text>
    <Text style={styles.descriptionText}>{description}</Text>
    <View style={styles.specsContainer}>
      <Text style={styles.specsHeader}>Technical Information</Text>
      {specifications.map((spec, index) => (
        <View key={index} style={styles.specRow}>
          <Text style={styles.specTitle}>{spec.title}</Text>
          <Text style={styles.specValue}>{spec.value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  descriptionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: '#333', // or colors.textPrimary
  },
  descriptionText: {
    fontSize: moderateScale(15),
    color: colors.textSecondary,
    lineHeight: verticalScale(24),
  },
  specsContainer: {
    marginTop: verticalScale(25),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: verticalScale(15),
  },
  specsHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    color: '#333', // or colors.textPrimary
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderFaded,
  },
  specTitle: { fontSize: moderateScale(15), color: colors.textMuted },
  specValue: {
    fontSize: moderateScale(15),
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default ProductDescription;
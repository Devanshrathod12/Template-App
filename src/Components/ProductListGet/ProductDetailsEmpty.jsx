import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../styles/styleconfig';
import colors from '../../styles/colors';

const ProductDetailsEmpty = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Product not found.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: moderateScale(16),
    color: '#333', // or colors.textPrimary
  },
});

export default ProductDetailsEmpty;
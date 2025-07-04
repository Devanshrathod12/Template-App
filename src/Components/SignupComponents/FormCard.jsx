import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale, moderateScaleVertical} from '../../styles/styleconfig';

const FormCard = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

export default FormCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: moderateScale(25),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
});
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {fontScale, moderateScale, moderateScaleVertical} from '../../styles/styleconfig';

const InputField = ({placeholder, value, onChangeText, keyboardType = 'default'}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888888"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f7f7f7',
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: 10,
    fontSize: fontScale(14),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: moderateScaleVertical(15),
    color: '#333333',
  },
});
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fontScale, moderateScale, scale, verticalScale} from '../../styles/styleconfig';

const CheckboxWithLabel = ({checked, onToggle, label}) => {
  return (
    <Pressable style={styles.row} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Icon name="check" size={14} color="#fff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default CheckboxWithLabel;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  checkbox: {
    width: scale(20),
    height: verticalScale(20),
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  checked: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  label: {
    fontSize: fontScale(13),
    color: '#888888',
    flex: 1,
  },
});

import React from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fontScale, moderateScale, moderateScaleVertical} from '../../styles/styleconfig';

const PasswordField = ({placeholder, value, onChangeText, visible, toggleVisibility}) => {
  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={toggleVisibility} style={styles.icon}>
        <Icon name={visible ? 'visibility-off' : 'visibility'} size={22} color="#888888" />
      </TouchableOpacity>
    </View>
    </>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: moderateScaleVertical(15),
  },
  input: {
    flex: 1,
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
    fontSize: fontScale(14),
    color: '#333333',
  },
  icon: {
    paddingHorizontal: moderateScale(12),
  },
});
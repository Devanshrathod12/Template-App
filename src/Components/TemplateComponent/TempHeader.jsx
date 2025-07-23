
import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import { useNavigation } from '@react-navigation/native';
import useLogoutHandler from '../../Components/useLogoutHandler/useLogoutHandler';

const TempHeader = ({ searchQuery, onSearchQueryChange }) => {
  const navigation = useNavigation();
  const logout = useLogoutHandler(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="menu" size={scale(26)} color="#333" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={logout}>
            <Icon name="log-out" size={scale(24)} color="#e63946" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AllOrders")}>
            <Icon
              name="shopping-bag"
              size={scale(24)}
              color="#333"
              style={{ marginLeft: scale(20) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={scale(20)} color="#888" />
        <TextInput
          placeholder="Search for frames, brands & more"
          placeholderTextColor="#888"
          style={styles.textInput}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(16), 
        paddingTop: verticalScale(10), 
        marginBottom: verticalScale(18),
        backgroundColor: '#FFF', 
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },
    iconGroup: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: scale(12),
        paddingHorizontal: scale(16),
        height: verticalScale(45),
    },
    textInput: {
        flex: 1,
        marginLeft: scale(10),
        fontSize: moderateScale(14),
        color: '#333',
    }
});

export default TempHeader;
import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
import { useNavigation } from '@react-navigation/native';
import useLogoutHandler from '../../Components/useLogoutHandler/useLogoutHandler'; // 👈 import

const Header = () => {
  const navigation = useNavigation();
  const logout = useLogoutHandler(navigation); // 👈 use logout handler

  return (
    <View style={{ paddingHorizontal: scale(16), paddingTop: verticalScale(10), marginBottom: verticalScale(18) }}>
      {/* Top Icon Row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(12),
      }}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="menu" size={scale(26)} color="#333" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={logout}> {/* 👈 this will trigger logout */}
            <Icon name="log-out" size={scale(24)} color="#e63946" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SeeOrder")}>
            <Icon
              name="shopping-bag"
              size={scale(24)}
              color="#333"
              style={{ marginLeft: scale(20) }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: scale(12),
        paddingHorizontal: scale(16),
        height: verticalScale(45),
      }}>
        <Icon name="search" size={scale(20)} color="#888" />
        <TextInput
          placeholder="Search for frames, brands & more"
          placeholderTextColor="#888"
          style={{
            flex: 1,
            marginLeft: scale(10),
            fontSize: moderateScale(14),
            color: '#333',
          }}
        />
      </View>
    </View>
  );
};

export default Header;

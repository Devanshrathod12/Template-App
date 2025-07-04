import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cart } from '../Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationString from './NavigationString';

import HomeStack from './HomeStack'; 


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tab.Screen
        name="HomeTab" 
        component={HomeStack} 
        options={{
          title: 'Home', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationString.Cart}
        component={Cart} 
         options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabs;
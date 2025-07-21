import React from 'react';
import { createStackNavigator ,CardStyleInterpolators} from '@react-navigation/stack';
import HomeScreen from '../Screen/Home/HomeScreen';
import NavigationString from './NavigationString';
import * as Screen from "../Screen"


const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator 
      // screenOptions={{
      //                gestureEnabled:true,
      //                gestureDirection:"horizontal",
      //                cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      //            }}
    >
      <Stack.Screen 
        name={NavigationString.HomeScreen}
        component={Screen.HomeScreen}
        options={{headerShown:false}}
      />
    
      <Stack.Screen 
        name={NavigationString.ProductList} 
        component={Screen.ProductList} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name={NavigationString.FilterCategory} 
        component={Screen.FilterCategory} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name={NavigationString.AllOrders} 
        component={Screen.AllOrders} 
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
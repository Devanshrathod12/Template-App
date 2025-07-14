import React from 'react';
import { createStackNavigator ,CardStyleInterpolators} from '@react-navigation/stack';
import Cart from "../Screen/Cart/Cart"
import NavigationString from './NavigationString';
import * as Screen from "../Screen"


const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator 
      // screenOptions={{
      //                gestureEnabled:true,
      //                gestureDirection:"horizontal",
      //                cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      //            }}
    >
          <Stack.Screen 
            name={NavigationString.Cart} 
            component={Screen.Cart} 
            options={{headerShown:false}}
          />

      <Stack.Screen 
        name={NavigationString.DeliveryAddress} 
        component={Screen.Delivery} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name={NavigationString.Checkout} 
        component={Screen.Plaseorder} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name={NavigationString.SeeOrder} 
        component={Screen.SeeOrders} 
        options={{headerShown:false}}
      />
      
    </Stack.Navigator>
  );
};

export default CartStack;
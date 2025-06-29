import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from "./MainScreen"
const Stack = createStackNavigator()
const Route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {MainScreen(Stack)}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route

const styles = StyleSheet.create({})
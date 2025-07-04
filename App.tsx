import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Route from './src/Navigations/Route'
import store from './src/redux/Store'
import { Provider } from 'react-redux'
import { ApiProvider } from './src/Context/ApiContext'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  return (
    <Provider store={store}>
      <ApiProvider>
      <Route />
      <FlashMessage position={"top"} />
      </ApiProvider>
    </Provider>
  )
  
}

export default App

const styles = StyleSheet.create({})
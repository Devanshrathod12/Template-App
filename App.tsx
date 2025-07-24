import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';
import Route from './src/Navigations/Route';
import { Provider } from 'react-redux';
import { ApiProvider } from './src/Context/ApiContext';
import FlashMessage from 'react-native-flash-message';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <ApiProvider>
          <Route />
          <FlashMessage position={"top"} />
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
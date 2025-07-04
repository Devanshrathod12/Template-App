// Components/LogoutHandler/useLogoutHandler.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const useLogoutHandler = (navigation) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userData');

      showMessage({
        message: 'Logged out successfully',
        type: 'success',
        icon: 'success',
      });

      navigation.replace('AuthGate'); // Send back to login flow
    } catch (error) {
      showMessage({
        message: 'Logout failed',
        description: error.message || 'Something went wrong',
        type: 'danger',
      });
    }
  };

  return logout;
};

export default useLogoutHandler;

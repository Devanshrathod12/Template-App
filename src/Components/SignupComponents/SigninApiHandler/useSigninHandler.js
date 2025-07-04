import { useState } from 'react';
import { useApi } from '../../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSigninHandler = (navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  const { Login } = useApi();

  const handleLogin = async (formdata) => {
    setIsLoading(true);

    try {
      const result = await Login(formdata);

      // ✅ Store token and user info separately
      await AsyncStorage.setItem('authToken', result.access); 
      await AsyncStorage.setItem('refreshToken', result.refresh);  
      await AsyncStorage.setItem('userData', JSON.stringify(result.user));
      showMessage({
        message: result.message || 'Login successful',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });

      navigation.replace('HomeScreen'); 
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      showMessage({
        message: 'Login Failed',
        description: errorMsg,
        type: 'danger',
        icon: 'danger',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};

export default useSigninHandler;

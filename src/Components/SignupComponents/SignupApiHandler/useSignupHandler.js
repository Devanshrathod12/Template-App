import { Alert } from 'react-native';
import { useApi } from '../../../Context/ApiContext';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSignupHandler = (navigation) => {
  const { SignupUser } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      const result = await SignupUser(formData);

      // ✅ Token & user store (same as Signin)
      await AsyncStorage.setItem('authToken', result.access);       // access token
      await AsyncStorage.setItem('refreshToken', result.refresh);   // refresh token
      await AsyncStorage.setItem('userData', JSON.stringify(result.user)); // user info

      showMessage({
        message: result.message || "User created successfully",
        type: "success",
        icon: "success",
        duration: 3000,
      });

      navigation.replace('HomeScreen'); // redirect
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed';
      showMessage({
        message: "Signup Failed",
        description: errorMsg || "Unable to signup. Please try again.",
        type: "danger",
        icon: "danger",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignup, isLoading };
};

export default useSignupHandler;

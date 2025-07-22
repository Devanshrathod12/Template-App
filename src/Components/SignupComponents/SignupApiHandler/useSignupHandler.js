// import { Alert } from 'react-native';
// import { useApi } from '../../../Context/ApiContext';
// import React, { useState } from 'react';
// import { showMessage } from 'react-native-flash-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useSignupHandler = (navigation) => {
//   const { SignupUser } = useApi();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSignup = async (formData) => {
//     setIsLoading(true);
//     try {
//       const result = await SignupUser(formData);

//       await AsyncStorage.setItem('authToken', result.access);      
//       await AsyncStorage.setItem('refreshToken', result.refresh);  
//       await AsyncStorage.setItem('userData', JSON.stringify(result.user));
//       showMessage({
//         message: result.message || "User created successfully",
//         type: "success",
//         icon: "success",
//         duration: 3000,
//       });
//        navigation.replace('HomeScreen');
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Signup failed';
//       showMessage({
//         message: "Signup Failed",
//         description: errorMsg || "Unable to signup. Please try again.",
//         type: "danger",
//         icon: "danger",
//         duration: 4000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return { handleSignup, isLoading };
// };

// export default useSignupHandler;
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
      console.log('Signup Success Response:', result);

      // ✅ Correct key names from API response
      if (!result?.access_token || !result?.refresh_token) {
        throw new Error('Incomplete signup response from server');
      }

      await AsyncStorage.setItem('authToken', result.access_token);
      await AsyncStorage.setItem('refreshToken', result.refresh_token);
      if (result.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));
      }

      showMessage({
        message: result.message || "User created successfully",
        type: "success",
        icon: "success",
        duration: 3000,
      });

      navigation.replace('HomeScreen');

    } catch (error) {
      console.log('Signup Error:', error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Signup failed. Please try again.';
      showMessage({
        message: "Signup Failed",
        description: errorMsg,
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

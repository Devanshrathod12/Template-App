import React, { createContext, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const URL = 'https://accounts-1.onrender.com/';

  // Signup function
  const SignupUser = async (userdata) => {
    try {
      const response = await axios.post(`${URL}signup/`, userdata);
      console.log('Sign-up Success:', response.data.message);
      return response.data;
    } catch (error) {
      console.log(' Error during signup:', error.response?.data || error.message);
      throw error;
    }
  };
  /// user login
  // const Login = async (user) => {
  //   try {
  //       const responce = await axios.post(`${URL}login/`,user)
  //       console.log("user Login",responce.data.message);
  //       return responce.data;
  //   } catch (error) {
  //        console.log(' Error during Login:', error.response?.data || error.message);
  //     throw error;
  //   }
  // }
  const Login = async (user) => {
  try {
    const responce = await axios.post(`${URL}login/`, user);
    console.log("✅ Login response:", responce.data); // ✅ See full structure

    return responce.data;
  } catch (error) {
    console.log('❌ Login error:', error.response?.data || error.message);
    throw error;
  }
};

  // send otp 
  const SendOtp = async (RestEmailPass) => {
       try {
            const responce = await axios.post(`${URL}send-otp/`,RestEmailPass)
            console.log("send-otp on Register Email",responce.data.message)
            return responce.data
       } catch (error) {
           console.log(' Error during send Email otp:', error.response?.data || error.message);
      throw error;
       }
  }
  // resend otp ke liye 
  // const ReSendOtp = async (Resendotp) => {
  //      try {
  //           const responce = await axios.post(`${URL}resend-otp/`,Resendotp)
  //           console.log("resend-otp on Register Email",responce.data.message)
  //           return responce.data
  //      } catch (error) {
  //          console.log(' Error during resend Email otp:', error.response?.data || error.message);
  //     throw error;
  //      }
  // }

  const ReSendOtp = async (Resendotp) => {
  try {
    console.log("📡 ReSendOtp payload:", Resendotp);
    const response = await axios.post(`${URL}resend-otp/`, Resendotp);
    console.log("✅ ReSendOtp success:", response.data.message);
    return response.data;
  } catch (error) {
    console.log('❌ ReSendOtp error:', error.response?.data || error.message);
    throw error;
  }
};

  // otp verify
  const VerifyOtp = async (verifyotp) => {
      try {
          const responce = await axios.post(`${URL}verify-otp/`,verifyotp)
          console.log("otp verify",responce.data.message);
        return responce.data;
      } catch (error) {
           console.log(' Error during  otp not verifyd:', error.response?.data || error.message);
           
      throw error;
       }
  }

  // resetpassword
  const ResetPassword = async (RestPassword) => {
      try {
        const responce = await axios.post(`${URL}set-password/`,RestPassword)
        console.log("password rest successfull",responce.data.message)
       return responce.data
      } catch (error) {
           console.log(' Error during  rest password:', error.response?.data || error.message);
      }
  }   

  //get product data 
  const getProductsData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken'); // ⬅️ token fetch

    const response = await axios.get(`${URL}product/`, {
      headers: {
        Authorization: `Bearer ${token}`, // ⬅️ token set
      },
    });

    console.log('get data successfully', response.data);
    return response.data;
  } catch (error) {
    console.log('Error during get data from backend:', error.response?.data || error.message);
  }
};


  return (
    <ApiContext.Provider value={{ SignupUser , Login , SendOtp  , VerifyOtp , ResetPassword , ReSendOtp , getProductsData}}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
export default ApiContext;

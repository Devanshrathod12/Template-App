import React, { createContext, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const URL = 'https://accounts-1.onrender.com/';

  // Signup function
  const SignupUser = async userdata => {
    try {
      const response = await axios.post(`${URL}signup/`, userdata);
      console.log('Sign-up Success:', response.data.message);
      return response.data;
    } catch (error) {
      console.log(
        ' Error during signup:',
        error.response?.data || error.message,
      );
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
  const Login = async user => {
    try {
      const responce = await axios.post(`${URL}login/`, user);
      console.log('✅ Login response:', responce.data); // ✅ See full structure

      return responce.data;
    } catch (error) {
      console.log('❌ Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  // send otp
  const SendOtp = async RestEmailPass => {
    try {
      const responce = await axios.post(`${URL}send-otp/`, RestEmailPass);
      console.log('send-otp on Register Email', responce.data.message);
      return responce.data;
    } catch (error) {
      console.log(
        ' Error during send Email otp:',
        error.response?.data || error.message,
      );
      throw error;
    }
  };
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

  const ReSendOtp = async Resendotp => {
    try {
      console.log('📡 ReSendOtp payload:', Resendotp);
      const response = await axios.post(`${URL}resend-otp/`, Resendotp);
      console.log('✅ ReSendOtp success:', response.data.message);
      return response.data;
    } catch (error) {
      console.log('ReSendOtp error:', error.response?.data || error.message);
      throw error;
    }
  };

  // otp verify
  const VerifyOtp = async verifyotp => {
    try {
      const responce = await axios.post(`${URL}verify-otp/`, verifyotp);
      console.log('otp verify', responce.data.message);
      return responce.data;
    } catch (error) {
      console.log(
        ' Error during  otp not verifyd:',
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // resetpassword
  const ResetPassword = async RestPassword => {
    try {
      const responce = await axios.post(`${URL}set-password/`, RestPassword);
      console.log('password rest successfull', responce.data.message);
      return responce.data;
    } catch (error) {
      console.log(
        ' Error during  rest password:',
        error.response?.data || error.message,
      );
    }
  };

  //get product data
  const getProductsData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await axios.get(`${URL}product/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('get data successfully', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Error during get data from backend:',
        error.response?.data || error.message,
      );
    }
  };

  // add to cart
  const AddToCart = async addcart => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(`${URL}cart/add/`, addcart, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response?.data;
    } catch (error) {
      console.log(
        'Error during Add to cart backend:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message:
          error.response?.data?.detail || error.message || 'Unexpected error',
      };
    }
  };

  // remove cart wali api hai
  const Removefromcart = async (productId, quantity) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.delete(`${URL}cart/delete/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          quantity: quantity,
        },
      });

      console.log('item Remove', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Error removing from cart:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message:
          error.response?.data?.detail || error.message || 'Unexpected error',
      };
    }
  };

  // get data frome
  const GetCartData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`${URL}cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(
        'Error fetching cart data:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message:
          error.response?.data?.detail || error.message || 'Unexpected error',
      };
    }
  };

  // update cart quntity
  // Update Cart Quantity
  const UpdateCartQuantity = async (productId, quantity) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.put(
        `${URL}cart/update/${productId}/`,
        {
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Cart Quantity Updated:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Error updating cart quantity:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message:
          error.response?.data?.detail || error.message || 'Unexpected error',
      };
    }
  };

  const AddAddress = async (addressData) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(`${URL}address/`, addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Address Saved:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error saving address:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message:
          error.response?.data?.detail || error.message || 'Failed to save address',
      };
    }
  };

  const GetAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`${URL}address/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching addresses:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message: error.response?.data?.detail || 'Failed to fetch addresses',
      };
    }
  };

   const PlaceOrder = async (orderData) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(`${URL}order/`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Order Placed Successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error placing order:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message: error.response?.data?.detail || 'Failed to place order',
      };
    }
  };

   const GetOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`${URL}orders/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Orders fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching orders:',
        error.response?.data || error.message,
      );
      return {
        error: true,
        message: error.response?.data?.detail || 'Failed to fetch orders',
      };
    }
  };

  return (
    <ApiContext.Provider
      value={{
        SignupUser,
        Login,
        SendOtp,
        VerifyOtp,
        ResetPassword,
        ReSendOtp,
        getProductsData,
        AddToCart,
        GetCartData,
        Removefromcart,
        UpdateCartQuantity,
        AddAddress,
        GetAddresses,
        PlaceOrder,
        GetOrders
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
export default ApiContext;

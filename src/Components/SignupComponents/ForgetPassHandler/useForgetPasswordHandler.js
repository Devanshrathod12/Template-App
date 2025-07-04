import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useApi } from '../../../Context/ApiContext';

const useForgetPasswordHandler = (navigation) => {
  const { SendOtp } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = async (email) => {
    if (!email) {
      showMessage({
        message: 'Email is required',
        type: 'danger',
        icon: 'danger',
      });
      return;
    }

    const formData = { email };
    try {
      setIsLoading(true);
      const result = await SendOtp(formData);
      console.log('OTP Sent:', result);
      showMessage({
        message: result.message || 'OTP Sent Successfully',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
      navigation.navigate('OtpVerify', { email });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      showMessage({
        message: 'Failed to Send OTP',
        description: errorMsg,
        type: 'danger',
        icon: 'danger',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSendLink, isLoading };
};

export default useForgetPasswordHandler;
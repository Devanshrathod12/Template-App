import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import colors from '../../styles/colors';

import {
  fontScale,
  moderateScale,
  moderateScaleVertical,
  scale,
  verticalScale,
} from '../../styles/styleconfig';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';
const OtpVerify = ({ navigation, route  }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- NEW: State for the countdown timer ---
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef([]);
  const { VerifyOtp, ReSendOtp  } = useApi(); 
 const { email } = route.params || {};


  useEffect(() => {
    if (countdown === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);


  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputs.current[index + 1].focus();
    }
    
    if (text.length === 1 && index === 5) {
        const finalOtp = [...newOtp].join('');
        HandleSubmitotp(finalOtp);
    }
  };

  const handleBackspace = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  const HandleSubmitotp = async (finalOtp = null) => {
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);

    // If finalOtp is not provided (manual button press), construct it.
    const otpString = finalOtp || otp.join('');

    if (otpString.length !== 6) {
        Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
        setIsLoading(false);
        return;
    }

    try {
      const result = await VerifyOtp({ otp: otpString });
      console.log('OTP verified', );
     showMessage({
  message: result.message || "OTP Verified",
  type: "success",
  icon: "success",
  duration: 3000,
});
      navigation.navigate('ResetPassword');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'OTP verification failed. Please try again.';
     showMessage({
  message: "OTP Verification Failed",
  description: errorMsg || "Invalid or expired OTP. Please try again.",
  type: "danger",
  icon: "danger",
  duration: 4000,
});

    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: Function to handle resending the OTP ---
  const handleResend = async () => {
    if (!canResend) return;

//     if (!email) {
//         showMessage({
//   message: "OTP Verified",
//   type: "success",
//   icon: "success",
//   duration: 3000,
// });
//   Alert.alert("Email is missing in route params");
//   console.log("❌ route.params.email is undefined");
//   return;
// }


     try {
        console.log("resendotp ....")
        console.log("📨 Resending OTP for:", email);
        const result = await ReSendOtp({email})
          showMessage({
  message: result.message || "A new OTP has been sent to your email.",
  type: "success",
  icon: "success",
  duration: 3000,
});
    setOtp(['', '', '', '', '', '']);
    setCountdown(30);
        setCanResend(false);
     } catch (error) {
      const errorMsg = error.response?.data?.message || "Could not resend OTP.";
    showMessage({
  message: result.message ||"OTP Invalid",
  description: errorMsg || "OTP Invalid. Please try again.",
  type: "danger",
  icon: "danger",
  duration: 4000,
});

     }
     
  };


  // Bouncing dot animation component (no changes needed here)
  const Dot = ({ delay }) => {
    const bounce = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(bounce, { toValue: -8, duration: 300, useNativeDriver: true }),
          Animated.timing(bounce, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ).start();
    }, [bounce]);
    return <Animated.View style={[styles.dot, { transform: [{ translateY: bounce }] }]} />;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.verticalCard}>
        <Text style={styles.cardTitle}>Verify Your Email</Text>
        <Text style={styles.cardSubtitle}>
          Please enter the 6-digit code sent to your email.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputs.current[index] = el)}
              style={[styles.otpInput, isLoading && { backgroundColor: '#e0e0e0' }]} // visual cue
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleInputChange(text, index)}
              onKeyPress={e => handleBackspace(e, index)}
              value={digit}
              editable={!isLoading} 
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => HandleSubmitotp()}
          style={[styles.greenButton, isLoading && styles.loadingButton]}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.dotsContainer}>
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
            </View>
          ) : (
      
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>
        <View style={styles.resendContainer}>
          {canResend ? (
            <>
              <Text style={styles.resendText}>Didn't receive code? </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.resendText}>
              Resend code in <Text style={{fontWeight: 'bold'}}>{countdown}s</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    padding: moderateScale(20),
  },
  verticalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: moderateScale(25),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    color: '#333333',
  },
  cardSubtitle: {
    fontSize: fontScale(14),
    color: '#888888',
    textAlign: 'center',
    marginTop: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(30),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: moderateScaleVertical(30),
  },
  otpInput: {
    width: scale(45),
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#f7f7f7',
  },
  greenButton: {
    backgroundColor:colors.button,
    paddingVertical: moderateScaleVertical(14),
    borderRadius: 10,
    width: '100%',
    height: verticalScale(50), // Fixed height for consistency
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(25),
  },
  resendText: {
    fontSize: fontScale(14),
    color: '#888888',
  },
  resendLink: {
    fontSize: fontScale(14),
    color: '#007bff',
    fontWeight: 'bold',
  },
  loadingButton: {
    backgroundColor: '#228b3a', // Darker green for loading
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
});
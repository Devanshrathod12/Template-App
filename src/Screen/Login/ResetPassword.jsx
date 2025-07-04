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
import React, {useState, useEffect, useRef} from 'react';
import {
  fontScale,
  moderateScale,
  moderateScaleVertical,
  scale,
  verticalScale,
} from '../../styles/styleconfig';
import colors from '../../styles/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useApi } from '../../Context/ApiContext';
import { showMessage } from 'react-native-flash-message';

const ResetPassword = ({ navigation }) => {
  // Dono password fields ke liye state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dono eye icons ke liye alag-alag state
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
const {ResetPassword} = useApi()

  // const handleResetPassword =  async () => {
  //   setIsLoading(true)
    
  //   const formData = {
  //     new_password:newPassword,
  //     confirm_password:confirmPassword,

  //   }
  //   const result = await ResetPassword(formData)
  //     console.log("rest pass",result)
         
  //         navigation.navigate("HomeScreen")
    
  // };
  const handleResetPassword = async () => {
  setIsLoading(true);

  const formData = {
    new_password: newPassword,
    confirm_password: confirmPassword,
  };

  try {
    const result = await ResetPassword(formData);
    console.log('reset pass', result);

    showMessage({
      message: result.message || "Password reset successfully",
      type: "success",
      icon: "success",
      duration: 3000,
    });

    navigation.navigate("SignIn");
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Password reset failed";

    showMessage({
      message: "Reset Failed",
      description: errorMsg,
      type: "danger",
      icon: "danger",
      duration: 4000,
    });

    console.log("Reset password error:", errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  
     const Dot = ({delay}) => {
        const bounce = useRef(new Animated.Value(0)).current;
      
        useEffect(() => {
          Animated.loop(
            Animated.sequence([
              Animated.delay(delay),
              Animated.timing(bounce, {
                toValue: -8,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(bounce, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ).start();
        }, [bounce]);
      
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                transform: [{translateY: bounce}],
              },
            ]}
          />
        );
      };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.verticalCard}>
          <Text style={styles.cardTitle}>Reset Password</Text>
          <Text style={styles.cardSubtitle}>
            Create a new, secure password for your account.
          </Text>

          {/* New Password Input */}
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New Password"
              placeholderTextColor="#888888"
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
              style={styles.eyeIcon}>
              <Icon
                name={isNewPasswordVisible ? 'visibility-off' : 'visibility'}
                size={22}
                color="#888888"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm New Password Input */}
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm New Password"
              placeholderTextColor="#888888"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              style={styles.eyeIcon}>
              <Icon
                name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'}
                size={22}
                color="#888888"
              />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.greenButton}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity> */}

           <TouchableOpacity
                                         onPress={handleResetPassword}
                                         // 1. Style ko ek array me daal diya hai
                                         style={[styles.greenButton, isLoading && styles.loadingButton]}
                                         disabled={isLoading}>
                                         {isLoading ? (
                                           <View style={styles.dotsContainer}>
                                             <Dot delay={0} />
                                             <Dot delay={150} />
                                             <Dot delay={300} />
                                           </View>
                                         ) : (
                                           <Text style={styles.buttonText}>Reset Password</Text>
                                         )}
                                       </TouchableOpacity>

          <View style={styles.bottomLinkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

// Styles bilkul aapke flow ke hisab se hain
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    flexGrow: 1,
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
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: moderateScaleVertical(20),
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
    fontSize: fontScale(14),
    color: '#333333',
  },
  eyeIcon: {
    paddingHorizontal: moderateScale(12),
  },
  greenButton: {
    backgroundColor:colors.button,
    paddingVertical: moderateScaleVertical(14),
    borderRadius: 10,
    width: '100%',
     backgroundColor: '#28a745',
    paddingVertical: moderateScaleVertical(14),
    borderRadius: 10,
    elevation: 2,
    marginTop: moderateScaleVertical(10),
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomLinkContainer: {
    marginTop: verticalScale(25),
  },
  linkText: {
    fontSize: fontScale(14),
    color: '#007bff',
    fontWeight: 'bold',
  },
   loadingButton: {
    opacity: 0.7, 
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
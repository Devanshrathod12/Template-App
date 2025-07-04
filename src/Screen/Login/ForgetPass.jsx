// components/Auth/ForgetPassword/ForgetPass.jsx

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import colors from '../../styles/colors';
import {
  fontScale,
  moderateScale,
  moderateScaleVertical,
  verticalScale,
} from '../../styles/styleconfig';

import useForgetPasswordHandler from '../../Components/SignupComponents/ForgetPassHandler/useForgetPasswordHandler';

const ForgetPass = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { handleSendLink, isLoading } = useForgetPasswordHandler(navigation);

  const Dot = ({ delay }) => {
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
        ])
      ).start();
    }, [bounce]);

    return (
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{ translateY: bounce }],
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
          <Text style={styles.cardTitle}>Forgot Password?</Text>
          <Text style={styles.cardSubtitle}>
            Enter your email and we'll send you a link to reset your password.
          </Text>

          <TextInput
            style={styles.inputField}
            placeholder="Enter your Email"
            placeholderTextColor="#888888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            onPress={() => handleSendLink(email)}
            style={[styles.greenButton, isLoading && styles.loadingButton]}
            disabled={isLoading}>
            {isLoading ? (
              <View style={styles.dotsContainer}>
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
              </View>
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomLinkContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPass;

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
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardTitle: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  cardSubtitle: {
    fontSize: fontScale(14),
    textAlign: 'center',
    color: '#888888',
    marginBottom: moderateScaleVertical(30),
    marginTop: moderateScaleVertical(10),
  },
  inputField: {
    backgroundColor: '#f7f7f7',
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: 10,
    fontSize: fontScale(14),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: moderateScaleVertical(20),
    color: '#333333',
  },
  greenButton: {
    backgroundColor: colors.button,
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
    alignItems: 'center',
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

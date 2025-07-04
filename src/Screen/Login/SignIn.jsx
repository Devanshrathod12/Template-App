import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FormCard from '../../Components/SignupComponents/FormCard';
import InputField from '../../Components/SignupComponents/InputField';
 import PasswordField from '../../Components/SignupComponents/PasswordField';
 import CheckboxWithLabel from '../../Components/SignupComponents/CheckboxWithLabel';
import LoadingButton from '../../Components/SignupComponents/LoadingButton';
import useSigninHandler from '../../Components/SignupComponents/SigninApiHandler/useSigninHandler';
import colors from '../../styles/colors';
import { fontScale, moderateScale, moderateScaleVertical, verticalScale } from '../../styles/styleconfig';

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { handleLogin, isLoading } = useSigninHandler(navigation);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.cardTitle}>Welcome Back!</Text>
          <Text style={styles.cardSubtitle}>Sign in to continue</Text>

          <InputField
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
          />

          <PasswordField
            placeholder="Password"
            value={formData.password}
            onChangeText={text => updateField('password', text)}
            visible={isPasswordVisible}
            toggleVisibility={() => setPasswordVisible(prev => !prev)}
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
            <View style={styles.forgetContainer}>
              <Text style={styles.forgetText}>Forget Password?</Text>
            </View>
          </TouchableOpacity>

          <CheckboxWithLabel
            checked={rememberMe}
            onToggle={() => setRememberMe(prev => !prev)}
            label="Remember me"
          />

          <LoadingButton
            text="Sign In"
            onPress={() => handleLogin(formData)}
            isLoading={isLoading}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.accountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </FormCard>
      </ScrollView>
    </View>
  );
};

export default SignIn;

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
    marginBottom: moderateScaleVertical(25),
    marginTop: moderateScaleVertical(5),
  },
  forgetContainer: {
    alignItems: 'flex-end',
    marginVertical: moderateScaleVertical(10),
  },
  forgetText: {
    color: '#007bff',
    fontSize: fontScale(14),
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  accountText: {
    fontSize: fontScale(14),
    color: '#888888',
  },
  signupLink: {
    fontSize: fontScale(14),
    color: '#007bff',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import {
  fontScale,
  moderateScale,
  moderateScaleVertical,
  verticalScale,
} from '../../styles/styleconfig';
import colors from '../../styles/colors';


import FormCard from '../../Components/SignupComponents/FormCard';
import InputField from '../../Components/SignupComponents/InputField';
 import PasswordField from '../../Components/SignupComponents/PasswordField';
 import CheckboxWithLabel from '../../Components/SignupComponents/CheckboxWithLabel';
import LoadingButton from '../../Components/SignupComponents/LoadingButton';

import useSignupHandler from '../../Components/SignupComponents/SignupApiHandler/useSignupHandler';
import { showMessage } from 'react-native-flash-message';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { handleSignup, isLoading } = useSignupHandler(navigation);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = () => {
    if (!agreePolicy || !agreeTerms) {
     showMessage({
  message: "You must agree to all terms and policies",
  type: "danger",
  icon: "danger",
  duration: 4000,
});

      return;
    }
    handleSignup(formData);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <FormCard>
          <Text style={styles.cardTitle}>Create Account</Text>

          <InputField
            placeholder="Enter Your Name"
            value={formData.name}
            onChangeText={text => updateField('name', text)}
          />
          <InputField
            placeholder="Enter Your Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
          />
          <InputField
            placeholder="Enter Your Phone"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => updateField('phone', text)}
          />

          <PasswordField
            placeholder="Create Password"
            value={formData.password}
            onChangeText={text => updateField('password', text)}
            visible={isPasswordVisible}
            toggleVisibility={() => setIsPasswordVisible(prev => !prev)}
          />
          <PasswordField
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChangeText={text => updateField('confirm_password', text)}
            visible={isConfirmPasswordVisible}
            toggleVisibility={()=> setIsConfirmPasswordVisible(prev => !prev)}
          />

          <CheckboxWithLabel
            checked={agreePolicy}
            onToggle={() => setAgreePolicy(prev => !prev)}
            label="By signing up, you agree to our Terms & Privacy Policy."
          />
          <CheckboxWithLabel
            checked={agreeTerms}
            onToggle={() => setAgreeTerms(prev => !prev)}
            label="I agree to terms & conditions"
          />

         <LoadingButton text="Sign Up" onPress={onSubmit} isLoading={isLoading} />


          <View style={styles.haveAccountContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </FormCard>
      </ScrollView>
    </View>
  );
};

export default Signup;

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
    marginBottom: verticalScale(10),
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  accountText: {
    fontSize: fontScale(14),
    color: '#888888',
  },
  loginText: {
    fontSize: fontScale(14),
    color: '#007bff',
    fontWeight: 'bold',
  },
});

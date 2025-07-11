// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import {
//   fontScale,
//   moderateScale,
//   moderateScaleVertical,
// } from '../../styles/styleconfig';

// const { width, height } = Dimensions.get('window');

// const NUM_STARS = 30;

// const Signup = () => {
//   const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
//     left: Math.random() * width,
//     top: Math.random() * height,
//     size: Math.random() * 3 + 1,
//     opacity: useRef(new Animated.Value(Math.random())).current,
//   }));

//   useEffect(() => {
//     stars.forEach((star) => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(star.opacity, {
//             toValue: 0.2,
//             duration: 1000 + Math.random() * 2000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(star.opacity, {
//             toValue: 1,
//             duration: 1000 + Math.random() * 2000,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     });
//   }, []);

//   return (
//     <View style={styles.mainContainer}>
//       {/* Star Background */}
//       {stars.map((star, index) => (
//         <Animated.View
//           key={index}
//           style={[
//             styles.star,
//             {
//               left: star.left,
//               top: star.top,
//               width: star.size,
//               height: star.size,
//               borderRadius: star.size / 2,
//               opacity: star.opacity,
//             },
//           ]}
//         />
//       ))}

//       <View style={styles.innerContainer}>
//         <View style={styles.verticalCard}>
//           <Text style={styles.cardTitle}>Create Account</Text>

//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Name"
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Email"
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Phone"
//             placeholderTextColor="#888"
//           />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Password"
//             placeholderTextColor="#888"
//           />

//           <TouchableOpacity style={styles.greenButton}>
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Signup;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//     padding: moderateScale(16),
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     gap: moderateScaleVertical(8),
//     zIndex: 2,
//   },
//   verticalCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: moderateScale(16),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   cardTitle: {
//     fontSize: fontScale(20),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   inputField: {
//     backgroundColor: '#fff',
//     paddingVertical: moderateScaleVertical(10),
//     paddingHorizontal: moderateScale(16),
//     borderRadius: moderateScale(6),
//     fontSize: fontScale(14),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginTop: moderateScaleVertical(8),
//     marginBottom: moderateScaleVertical(6),
//   },
//   greenButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(24),
//     borderRadius: moderateScale(8),
//     elevation: 3,
//     marginTop: moderateScaleVertical(10),
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: fontScale(16),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   star: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     zIndex: 0,
//   },
// });

// upper wala night sart 

// niche wala eye password
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { fontScale, moderateScale, moderateScaleVertical, scale, verticalScale } from '../../styles/styleconfig';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// // Ek central jagah par colors define karna achhi practice hai
// const COLORS = {
//   background: '#f0f2f5', // Soft gray background, black se behtar
//   white: '#FFFFFF',
//   textPrimary: '#333333',
//   textSecondary: '#888888',
//   primary: '#007bff',      // Ek naya, modern primary color (blue)
//   green: '#28a745',        // Aapka original green
//   lightGreen: '#e9f5ea',    // Green ka light version, shayad future me kaam aaye
//   lightGrey: '#DDDDDD',
//   error: '#dc3545',       // Error messages ke liye red color
// };

// const Signup = ({ navigation }) => {
//   // 1. Har input ke liye state manage karna
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // 2. Checkboxes ke liye state
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [agreePolicy, setAgreePolicy] = useState(false);
  
//   // 3. Password visibility ke liye state
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

//   // 4. Validation errors ke liye state
//   const [errors, setErrors] = useState({});

//   // Form validation logic
//   const validateForm = () => {
//     let newErrors = {};
//     if (!name) newErrors.name = 'Name is required.';
//     if (!email) newErrors.email = 'Email is required.';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
//     if (!phone) newErrors.phone = 'Phone number is required.';
//     if (!password) newErrors.password = 'Password is required.';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
//     if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
//     if (!agreeTerms) newErrors.terms = 'You must agree to the terms and conditions.';
//     if (!agreePolicy) newErrors.policy = 'You must agree to the privacy policy.';
    
//     setErrors(newErrors);
//     // Agar newErrors object khali hai, to form valid hai
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = () => {
//     if (validateForm()) {
//       // Yahan par aap API call ya aage ki logic likh sakte hain
//       console.log('Form Data:', { name, email, phone, password });
//       Alert.alert('Success', 'Account created successfully!');
//       navigation.navigate("SignIn");
//     } else {
//       console.log("Validation Failed", errors);
//     }
//   };
  
//   // Check karte hain ki form valid hai ya nahi, taaki button disable kar sakein
//   const isFormValid = name && email && phone && password && confirmPassword && password === confirmPassword && agreeTerms && agreePolicy;


//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.innerContainer}>
//         <View style={styles.verticalCard}>
//           <Text style={styles.cardTitle}>Create Account</Text>
//           <Text style={styles.cardSubtitle}>Join us and start your journey!</Text>

//           {/* Name Input */}
//           <TextInput
//             style={[styles.inputField, errors.name && styles.inputError]}
//             placeholder="Enter Your Name"
//             placeholderTextColor={COLORS.textSecondary}
//             value={name}
//             onChangeText={setName}
//           />
//           {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//           {/* Email Input */}
//           <TextInput
//             style={[styles.inputField, errors.email && styles.inputError]}
//             placeholder="Enter Your Email"
//             placeholderTextColor={COLORS.textSecondary}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//           {/* Phone Input */}
//           <TextInput
//             style={[styles.inputField, errors.phone && styles.inputError]}
//             placeholder="Enter Your Phone"
//             placeholderTextColor={COLORS.textSecondary}
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//           {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//           {/* Password Input with a show/hide icon */}
//           <View style={[styles.inputContainer, errors.password && styles.inputError]}>
//             <TextInput
//               style={styles.inputFieldInContainer}
//               placeholder="Create Password"
//               placeholderTextColor={COLORS.textSecondary}
//               secureTextEntry={!isPasswordVisible}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
//               <Icon name={isPasswordVisible ? "visibility-off" : "visibility"} size={22} color={COLORS.textSecondary} />
//             </TouchableOpacity>
//           </View>
//           {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

//           {/* Confirm Password Input */}
//           <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
//             <TextInput
//               style={styles.inputFieldInContainer}
//               placeholder="Confirm Password"
//               placeholderTextColor={COLORS.textSecondary}
//               secureTextEntry={!isConfirmPasswordVisible}
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//             />
//             <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
//               <Icon name={isConfirmPasswordVisible ? "visibility-off" : "visibility"} size={22} color={COLORS.textSecondary} />
//             </TouchableOpacity>
//           </View>
//           {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

//           {/* Checkboxes */}
//           <Pressable style={styles.checkboxRow} onPress={() => setAgreePolicy(!agreePolicy)}>
//             <View style={[styles.checkbox, agreePolicy && styles.checkboxChecked]}>
//               {agreePolicy && <Icon name="check" size={14} color={COLORS.white} />}
//             </View>
//             <Text style={styles.checkboxLabel}>By signing up, you agree to our Terms & Privacy Policy.</Text>
//           </Pressable>
//            {errors.policy && <Text style={styles.errorText}>{errors.policy}</Text>}


//           <Pressable style={styles.checkboxRow} onPress={() => setAgreeTerms(!agreeTerms)}>
//             <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
//               {agreeTerms && <Icon name="check" size={14} color={COLORS.white} />}
//             </View>
//             <Text style={styles.checkboxLabel}>I agree to terms & conditions.</Text>
//           </Pressable>
//           {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}


//           {/* Sign Up Button (Disabled state ke saath) */}
//           <TouchableOpacity 
//             onPress={handleSignUp} 
//             style={[styles.greenButton, !isFormValid && styles.disabledButton]}
//             disabled={!isFormValid}
//           >
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Signup;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background, // New background color
//     padding: moderateScale(16),
//     justifyContent: "center"
//   },
//   innerContainer: {
//     gap: moderateScaleVertical(8),
//   },
//   verticalCard: {
//     backgroundColor: COLORS.white,
//     borderRadius: 16, // Thoda zyada rounded
//     padding: moderateScale(20), // Thodi zyada padding
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   cardTitle: {
//     fontSize: fontScale(24), // Thoda bada font
//     fontWeight: 'bold',
//     textAlign: "center",
//     color: COLORS.textPrimary,
//   },
//   cardSubtitle: {
//     fontSize: fontScale(14),
//     textAlign: 'center',
//     color: COLORS.textSecondary,
//     marginBottom: moderateScaleVertical(20), // Title ke neeche space
//   },
//   inputField: {
//     backgroundColor: '#f9f9f9', // Input field ka halka color
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(16),
//     borderRadius: moderateScale(8),
//     fontSize: fontScale(14),
//     borderWidth: 1,
//     borderColor: COLORS.lightGrey,
//     marginTop: moderateScaleVertical(8),
//     color: COLORS.textPrimary,
//   },
//   // Password jaise inputs ke liye container
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: moderateScale(8),
//     borderWidth: 1,
//     borderColor: COLORS.lightGrey,
//     marginTop: moderateScaleVertical(8),
//     paddingHorizontal: moderateScale(16),
//   },
//   inputFieldInContainer: {
//     flex: 1,
//     paddingVertical: moderateScaleVertical(12),
//     fontSize: fontScale(14),
//     color: COLORS.textPrimary,
//   },
//   // Jab input me error ho
//   inputError: {
//     borderColor: COLORS.error,
//   },
//   errorText: {
//     color: COLORS.error,
//     fontSize: fontScale(12),
//     marginLeft: moderateScale(4),
//     marginBottom: moderateScaleVertical(4),
//   },
//   greenButton: {
//     backgroundColor: COLORS.green, // New green color
//     paddingVertical: moderateScaleVertical(14), // Thoda bada button
//     borderRadius: moderateScale(8),
//     elevation: 3,
//     marginTop: moderateScaleVertical(15),
//   },
//   disabledButton: {
//     backgroundColor: '#a5d6a7', // Green ka halka shade jab disabled ho
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: fontScale(16),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: moderateScaleVertical(10),
//   },
//   checkbox: {
//     width: scale(20),
//     height: verticalScale(20),
//     borderWidth: 1.5,
//     borderColor: COLORS.lightGrey,
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: moderateScale(10),
//   },
//   checkboxChecked: {
//     backgroundColor: COLORS.green, // Jab check ho to green
//     borderColor: COLORS.green,
//   },
//   checkboxLabel: {
//     fontSize: fontScale(13),
//     color: COLORS.textSecondary,
//     flex: 1, // Text ko wrap hone me help karta hai
//   },
// });



// ////////////// ye loder code hai 
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Button, Animated, StyleSheet } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';

// // Dot animation component
// const Dot = ({ delay }) => {
//   const bounce = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.delay(delay),
//         Animated.timing(bounce, {
//           toValue: -10,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounce, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [bounce]);

//   return (
//     <Animated.View
//       style={[
//         styles.dot,
//         {
//           transform: [{ translateY: bounce }],
//         },
//       ]}
//     />
//   );
// };

// // Main loader component
// const Loader = () => {
//   const [loading, setLoading] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Spinner
//         visible={loading}
//         customIndicator={
//           <View style={styles.dotsContainer}>
//             <Dot delay={0} />
//             <Dot delay={150} />
//             <Dot delay={300} />
//           </View>
//         }
//         overlayColor="rgba(0,0,0,0.6)"
//       />
//       <Button title="Show Loader" onPress={() => setLoading(true)} />
//       <Button title="Hide Loader" onPress={() => setLoading(false)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',/
//     paddingHorizontal: 20,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     gap: 10,
//     alignItems: 'center',
//   },
//   dot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#00ffcc',
//     marginHorizontal: 4,
//   },
// });

// export default Loader;







///////////////////////////////////////////////////////////////////  old sign up page without dynamic   //////////////////////
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   ScrollView,
//   Animated,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import {
//   fontScale,
//   moderateScale,
//   moderateScaleVertical,
//   scale,
//   verticalScale,
// } from '../../styles/styleconfig';
// import colors from '../../styles/colors';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useDispatch} from 'react-redux';
// import {signup} from '../../redux/LoginSlice/Loginslice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useApi } from '../../Context/ApiContext';
// // Dot component (waisa hi hai)
// const Dot = ({delay}) => {
//   const bounce = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.delay(delay),
//         Animated.timing(bounce, {
//           toValue: -8,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounce, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   }, [bounce]);

//   return (
//     <Animated.View
//       style={[
//         styles.dot,
//         {
//           transform: [{translateY: bounce}],
//         },
//       ]}
//     />
//   );
// };
// const Signup = ({navigation}) => {
//   const [agreeToPolicy, setAgreeToPolicy] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   // ye data ko async storage me save kr rha hai 
//   // const HandleSignup = async () => {
//   //   setIsLoading(true);
//   //   setTimeout(async () => {
//   //     try {
//   //       const finalFormData = { name, email, phone, password, confirmpassword, agreePolicy: agreeToPolicy, agreeToTerm: agreeToTerms, };
//   //       await AsyncStorage.setItem('userData', JSON.stringify(finalFormData));
//   //       console.log('Data saved:', finalFormData);

//   //       setIsLoading(false);
//   //       navigation.navigate('SignIn');

//   //     } catch (error) {
//   //       console.log(error);
//   //       setIsLoading(false);
//   //       Alert.alert('Error', 'Could not save data.');
//   //     }
//   //   }, 3000);
//   // };

//   const {SignupUser} = useApi()

//   const HandleSignup = async () => {
//   setIsLoading(true);

//   const formData = {
//     name,
//     email,
//     phone,
//     password,
//     confirm_password: confirmpassword,
//   };

//   try {
//     const result = await SignupUser(formData);
//     console.log('User Signup');
//     Alert.alert('Success', result.message || 'User created successfully');
//     navigation.navigate('HomeScreen');
//   } catch (error) {
//     const errorMsg = error.response?.data?.message || 'Signup failed';
//     Alert.alert('Error', errorMsg);
//   } finally {
//     setIsLoading(false);
//   }
// };



  
//   // ... (useEffect)
//   // useEffect(() => { /* ... */ }, []);

//   return (
//     <View style={styles.mainContainer}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.verticalCard}>
//           <Text style={styles.cardTitle}>Create Account</Text>
          
//           {/* Saare Inputs waise hi rahenge */}
//           {/* ... */}
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Name"
//             placeholderTextColor="#888888"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Email"
//             placeholderTextColor="#888888"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter Your Phone"
//             placeholderTextColor="#888888"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
          
//           <View style={styles.passwordWrapper}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Create Password"
//               placeholderTextColor="#888888"
//               secureTextEntry={!isPasswordVisible}
//               value={password}
//             onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//               style={styles.eyeIcon}>
//               <Icon
//                 name={isPasswordVisible ? 'visibility-off' : 'visibility'}
//                 size={22}
//                 color="#888888"
//               />
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.passwordWrapper}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Confirm Password"
//               placeholderTextColor="#888888"
//               secureTextEntry={!isConfirmPasswordVisible}
//               value={confirmpassword}
//             onChangeText={setConfirmPassword}
//             />
//             <TouchableOpacity
//               onPress={() =>
//                 setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
//               }
//               style={styles.eyeIcon}>
//               <Icon
//                 name={
//                   isConfirmPasswordVisible ? 'visibility-off' : 'visibility'
//                 }
//                 size={22}
//                 color="#888888"
//               />
//             </TouchableOpacity>
//           </View>
          
//           <Pressable
//             style={styles.checkboxRow}
//             onPress={() => setAgreeToPolicy(!agreeToPolicy)}>
//             <View
//               style={[
//                 styles.checkbox,
//                 agreeToPolicy && styles.checkboxChecked,
//               ]}>
//               {agreeToPolicy && <Icon name="check" size={14} color="#FFFFFF" />}
//             </View>
//             <Text style={styles.checkboxLabel}>
//               By signing up, you agree to our Terms & Privacy Policy.
//             </Text>
//           </Pressable>

//           <Pressable
//             style={styles.checkboxRow}
//             onPress={() => setAgreeToTerms(!agreeToTerms)}>
//             <View
//               style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
//               {agreeToTerms && <Icon name="check" size={14} color="#FFFFFF" />}
//             </View>
//             <Text style={styles.checkboxLabel}>
//               I agree to terms & conditions
//             </Text>
//           </Pressable>


//           {/* YAHAN HAI ASLI BADLAAV */}
//           <TouchableOpacity
//             onPress={HandleSignup}
//             // 1. Style ko ek array me daal diya hai
//             style={[styles.greenButton, isLoading && styles.loadingButton]}
//             disabled={isLoading}>
//             {isLoading ? (
//               <View style={styles.dotsContainer}>
//                 <Dot delay={0} />
//                 <Dot delay={150} />
//                 <Dot delay={300} />
//               </View>
//             ) : (
//               <Text style={styles.buttonText}>Sign Up</Text>
//             )}
//           </TouchableOpacity>
          
//           <View style={styles.haveAccountContainer}>
//             <Text style={styles.accountText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//               <Text style={styles.loginText}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Signup;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#f0f2f5',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: moderateScale(20),
//   },
//   verticalCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: moderateScale(25),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: {width: 0, height: 5},
//   },
//   cardTitle: {
//     fontSize: fontScale(24),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: verticalScale(10),
//   },
//   greenButton: {
//     backgroundColor:colors.button,
//     paddingVertical: moderateScaleVertical(14),
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: moderateScaleVertical(20),
//     minHeight: 50,
//     justifyContent: 'center',
//   },
//   loadingButton: {
//     opacity: 0.7, 
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: fontScale(16),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 4,
//   },
//     inputField: {
//     backgroundColor: '#f7f7f7',
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(16),
//     borderRadius: 10,
//     fontSize: fontScale(14),
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     marginBottom: moderateScaleVertical(15),
//     color: '#333333',
//   },
//   passwordWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     marginBottom: moderateScaleVertical(15),
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(16),
//     fontSize: fontScale(14),
//     color: '#333333',
//   },
//   eyeIcon: {
//     paddingHorizontal: moderateScale(12),
//   },
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: moderateScaleVertical(8),
//   },
//   checkbox: {
//     width: scale(20),
//     height: verticalScale(20),
//     borderWidth: 1.5,
//     borderColor: '#aaa',
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: moderateScale(12),
//   },
//   checkboxChecked: {
//     backgroundColor: '#28a745',
//     borderColor: '#28a745',
//   },
//   checkboxLabel: {
//     fontSize: fontScale(13),
//     color: '#888888',
//     flex: 1,
//   },
//   haveAccountContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: verticalScale(20),
//   },
//   accountText: {
//     fontSize: fontScale(14),
//     color: '#888888',
//   },
//   loginText: {
//     fontSize: fontScale(14),
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
// });


////////////////////////////////////////////////////////   sign in //////////////////////////////////////////////////

// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   ScrollView,
//   Animated,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import colors from '../../styles/colors';
// import {
//   fontScale,
//   moderateScale,
//   moderateScaleVertical,
//   scale,
//   verticalScale,
// } from '../../styles/styleconfig';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useApi } from '../../Context/ApiContext';
// import { showMessage } from 'react-native-flash-message';
// const SignIn = ({ navigation }) => {
//   // State ko zaroori cheezon ke liye use kiya hai
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [Email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
   
//    const {Login} = useApi()

//   const HandleLogin = async () => {
//     setIsLoading(true)
//     const formdata = {email: Email,password}
//     try {
//       const result = await Login(formdata)
//       console.log("loged in ",result)
//       showMessage({
//         message: result.message || "Login successfully",
//         type: "success",
//         icon: "success",
//         duration: 3000,
//       });
//       navigation.navigate('HomeScreen');
      
      
//     } catch (error) {
//         const errorMsg = error.response?.data?.message || 'Login failed';
//        showMessage({
//         message: "Login Failed",
//         description: errorMsg,
//         type: "danger",
//         icon: "danger",
//         duration: 4000,
//       });
//       } finally {
//         setIsLoading(false);
//       }
//   }

//   const Dot = ({delay}) => {
//     const bounce = useRef(new Animated.Value(0)).current;
  
//     useEffect(() => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.delay(delay),
//           Animated.timing(bounce, {
//             toValue: -8,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.timing(bounce, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//         ]),
//       ).start();
//     }, [bounce]);
  
//     return (
//       <Animated.View
//         style={[
//           styles.dot,
//           {
//             transform: [{translateY: bounce}],
//           },
//         ]}
//       />
//     );
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.verticalCard}>
//           <Text style={styles.cardTitle}>Welcome Back!</Text>
//           <Text style={styles.cardSubtitle}>Sign in to continue</Text>

//           <TextInput
//             style={styles.inputField}
//             placeholder="Email"
//             placeholderTextColor="#888888"
//             keyboardType="email-address"
//             value={Email}
//             onChangeText={setEmail}
//           />

//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Password"
//               placeholderTextColor="#888888"
//               secureTextEntry={!isPasswordVisible}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setPasswordVisible(!isPasswordVisible)}
//               style={styles.eyeIcon}>
//               <Icon
//                 name={isPasswordVisible ? 'visibility-off' : 'visibility'}
//                 size={22}
//                 color="#888888"
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
//             <View style={styles.forgetContainer}>
//               <Text style={styles.forgetText}>Forget Password?</Text>
//             </View>
//           </TouchableOpacity>

//           <Pressable
//             style={styles.checkboxRow}
//             onPress={() => setRememberMe(!rememberMe)}>
//             <View
//               style={[
//                 styles.checkbox,
//                 rememberMe && styles.checkboxChecked,
//               ]}>
//               {rememberMe && <Icon name="check" size={14} color="#FFFFFF" />}
//             </View>
//             <Text style={styles.checkboxLabel}>Remember me</Text>
//           </Pressable>

//          <TouchableOpacity
//                      onPress={HandleLogin}
//                      // 1. Style ko ek array me daal diya hai
//                      style={[styles.greenButton, isLoading && styles.loadingButton]}
//                      disabled={isLoading}>
//                      {isLoading ? (
//                        <View style={styles.dotsContainer}>
//                          <Dot delay={0} />
//                          <Dot delay={150} />
//                          <Dot delay={300} />
//                        </View>
//                      ) : (
//                        <Text style={styles.buttonText}>Sign Up</Text>
//                      )}
//                    </TouchableOpacity>

//           <View style={styles.signupContainer}>
//             <Text style={styles.accountText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('signup')}>
//               <Text style={styles.signupLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SignIn;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#f0f2f5', // Soft gray background
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: moderateScale(20),
//   },
//   verticalCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: moderateScale(25),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//   },
//   cardTitle: {
//     fontSize: fontScale(24),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333333',
//   },
//   cardSubtitle: {
//     fontSize: fontScale(14),
//     textAlign: 'center',
//     color: '#888888',
//     marginBottom: moderateScaleVertical(25),
//     marginTop: moderateScaleVertical(5),
//   },
//   inputField: {
//     backgroundColor: '#f7f7f7',
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(16),
//     borderRadius: 10,
//     fontSize: fontScale(14),
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     marginBottom: moderateScaleVertical(15),
//     color: '#333333',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: moderateScaleVertical(12),
//     paddingHorizontal: moderateScale(16),
//     fontSize: fontScale(14),
//     color: '#333333',
//   },
//   eyeIcon: {
//     paddingHorizontal: moderateScale(12),
//   },
//   greenButton: {
//     backgroundColor:colors.button,
//     paddingVertical: moderateScaleVertical(14),
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: moderateScaleVertical(20),
//     minHeight: 50,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: fontScale(16),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: moderateScaleVertical(5),
//     marginBottom: moderateScaleVertical(10),
//   },
//   checkbox: {
//     width: scale(20),
//     height: verticalScale(20),
//     borderWidth: 1.5,
//     borderColor: '#aaa',
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: moderateScale(12),
//   },
//   checkboxChecked: {
//     backgroundColor: '#28a745',
//     borderColor: '#28a745',
//   },
//   checkboxLabel: {
//     fontSize: fontScale(13),
//     color: '#888888',
//   },
//   forgetContainer: {
//     alignItems: 'flex-end',
//     marginVertical: moderateScaleVertical(10),
//   },
//   forgetText: {
//     color: '#007bff',
//     fontSize: fontScale(14),
//     fontWeight: '500',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: verticalScale(20),
//   },
//   accountText: {
//     fontSize: fontScale(14),
//     color: '#888888',
//   },
//   signupLink: {
//     fontSize: fontScale(14),
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//    loadingButton: {
//     opacity: 0.7, 
//   },
//    dotsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 4,
//   },
// });




////////////////////////////////////////////// homescreen old code////////////////////////////////////////////////
// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   TextInput, // Use the standard TextInput
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // Using Feather for consistency
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // Importing your responsive styling functions
// import { scale, verticalScale, moderateScale } from '../../styles/styleconfig'; // Make sure this path is correct

// const HomeScreen = ({ navigation }) => {
//   // --- Data remains the same ---
//   const categories = [
//     { id: '1', title: 'Eyeglasses', image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg' },
//     { id: '2', title: 'Sunglasses', image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2411/S20A2411-1-hd.jpg' },
//     { id: '3', title: 'Power Glasses', image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3061/E12A3061-1-hd.jpg' },
//     { id: '4', title: 'For Kids', image: 'https://cdn.eyemyeye.com/shared/images/products/E18A3756/E18A3756-1-hd.jpg' },
//     { id: '5', title: 'Contact Lens', image: 'https://i.ibb.co/L8yPdBH/contact-lens.png' },
//     { id: '6', title: 'Accessories', image: 'https://i.ibb.co/N2wT9d5/accessories.png' },
//   ];

//   const shapes = [
//     { id: 's1', title: 'Round', image: 'https://i.ibb.co/yQz4k1J/round.png' },
//     { id: 's2', title: 'Rectangle', image: 'https://i.ibb.co/gDHj4j4/rectangle.png' },
//     { id: 's3', title: 'Wayfarer', image: 'https://i.ibb.co/hLqgHqG/wayfarer.png' },
//     { id: 's4', title: 'Cat-Eye', image: 'https://i.ibb.co/fnyNfNq/cateye.png' },
//     { id: 's5', title: 'Aviator', image: 'https://i.ibb.co/dMZ3wXJ/aviator.png' },
//   ];

//   const trending =[
//   {
//     id: 'd1',
//     brand: 'EyeMyEye',
//     title: 'Glossy Black Cat-Eye',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg',
//     price: 1499,
//   },
//   {
//     id: 'd2',
//     brand: 'John Jacobs',
//     title: 'Classic Gold Round',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg',
//     price: 2500,
//   },
//   {
//     id: 'd3',
//     brand: 'Vincent Chase',
//     title: 'Pastel Pink Cat-Eye',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg',
//     price: 1899,
//   },
//   {
//     id: 'd4',
//     brand: 'EyeMyEye',
//     title: 'Glossy Black Cat-Eye',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg',
//     price: 1499,
//   },
//   {
//     id: 'd5',
//     brand: 'John Jacobs',
//     title: 'Classic Gold Round',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg',
//     price: 2500,
//   },
//   {
//     id: 'd6',
//     brand: 'Vincent Chase',
//     title: 'Pastel Pink Cat-Eye',
//     image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg',
//     price: 1899,
//   },
 
// ];
  

//   // The logout function remains the same
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.clear();
//       navigation.replace('AuthGate');
//     } catch (e) {
//       console.log("Logout error", e);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* --- Header --- */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => { /* Open Drawer */ }}>
//             <Icon name="menu" size={scale(26)} color="#333" />
//           </TouchableOpacity>
//           <View style={styles.headerIcons}>
//             <TouchableOpacity onPress={() => { /* Navigate to Profile/Logout */ }}>
//               <Icon name="user" size={scale(24)} color="#333" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
//               <Icon name="shopping-bag" size={scale(24)} color="#333" style={{ marginLeft: scale(20) }} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --- Search Bar --- */}
//         <View style={styles.searchContainer}>
//           <Icon name="search" size={scale(20)} color="#888" />
//           <TextInput
//             placeholder="Search for frames, brands & more"
//             placeholderTextColor="#888"
//             style={styles.searchInput}
//           />
//         </View>
        
//         {/* --- Hero Banner --- */}
//         <TouchableOpacity style={styles.heroBannerContainer}>
//           <ImageBackground
//             source={{ uri: "https://i.ibb.co/V94z106/lenskart-banner.png" }}
//             style={styles.heroBannerImage}
//             imageStyle={{ borderRadius: scale(16) }}>
//             <View style={styles.heroBannerOverlay}>
//               <Text style={styles.heroBannerTitle}>New Arrivals</Text>
//               <Text style={styles.heroBannerSubtitle}>Up to 50% off on latest styles</Text>
//               <TouchableOpacity style={styles.heroButton}>
//                 <Text style={styles.heroButtonText}>Shop Now</Text>
//               </TouchableOpacity>
//             </View>
//           </ImageBackground>
//         </TouchableOpacity>

//         {/* --- Categories Section (Inlined) --- */}
//         <Text style={styles.sectionTitle}>All Categories</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
//           {categories.map((item) => (
//             <TouchableOpacity key={item.id} style={styles.categoryItem} onPress={() => { /* Navigate */ }}>
//               <Image source={{ uri: item.image }} style={styles.categoryImage} />
//               <Text style={styles.categoryText}>{item.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* --- Trending Section (Inlined) --- */}
//         <Text style={styles.sectionTitle}>Trending Frames</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
//           {trending.map((item) => (
//              <TouchableOpacity key={item.id} style={styles.trendingCard} onPress={() => navigation.navigate('ProductList')}>
//               <Image source={{ uri: item.image }} style={styles.trendingCardImage} />
//               <View style={styles.trendingCardInfo}>
//                 <Text style={styles.trendingCardBrand}>{item.brand}</Text>
//                 <Text style={styles.trendingCardTitle}>{item.title}</Text>
//                 <Text style={styles.trendingCardPrice}>₹{item.price.toFixed(2)}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* --- Shop by Shape Section (Inlined) --- */}
//         <Text style={styles.sectionTitle}>Shop by Shape</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
//           {shapes.map((item) => (
//             <TouchableOpacity key={item.id} style={styles.categoryItem} onPress={() => { /* Navigate */ }}>
//               <Image source={{ uri: item.image }} style={styles.categoryImage} />
//               <Text style={styles.categoryText}>{item.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <View style={{height: verticalScale(20)}} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// // Styles are now using scale, verticalScale, and moderateScale
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(10),
//   },
//   headerIcons: { flexDirection: 'row', alignItems: 'center' },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     borderRadius: scale(12),
//     paddingHorizontal: scale(16),
//     margin: scale(16),
//     height: verticalScale(45),
//   },
//   searchInput: { flex: 1, marginLeft: scale(10), fontSize: moderateScale(14), color: '#333' },
//   heroBannerContainer: {
//     height: verticalScale(160),
//     marginHorizontal: scale(16),
//     borderRadius: scale(16),
//     elevation: 8,
//     shadowColor: '#0057FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   heroBannerImage: { flex: 1, justifyContent: 'center' },
//   heroBannerOverlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     borderRadius: scale(16),
//     flex: 1,
//     padding: scale(20),
//     justifyContent: 'center',
//   },
//   heroBannerTitle: { fontSize: moderateScale(26), fontWeight: 'bold', color: '#FFF' },
//   heroBannerSubtitle: { fontSize: moderateScale(14), color: '#FFF', marginTop: verticalScale(4), marginBottom: verticalScale(12) },
//   heroButton: {
//     backgroundColor: '#FFF',
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(10),
//     borderRadius: scale(20),
//     alignSelf: 'flex-start',
//   },
//   heroButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: moderateScale(14) },
//   sectionTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: scale(16),
//     marginTop: verticalScale(24),
//     marginBottom: verticalScale(8),
//   },
//   horizontalList: { paddingHorizontal: scale(16), paddingVertical: verticalScale(10) },
//   categoryItem: { alignItems: 'center', marginRight: scale(12), width: scale(80) },
//   categoryImage: {
//     width: scale(64),
//     height: scale(64),
//     borderRadius: scale(32),
//     marginBottom: verticalScale(8),
//     backgroundColor: '#F3F4F6',
//     borderWidth: 1,
//     borderColor: '#E5E7EB'
//   },
//   categoryText: { fontSize: moderateScale(12), color: '#444', textAlign: 'center' },
  
//   trendingCard: {
//     width: scale(160),
//     backgroundColor: '#fff',
//     borderRadius: scale(12),
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     marginRight: scale(16),
//     overflow: 'hidden',
//   },
//   trendingCardImage: {
//     width: '100%',
//     height: verticalScale(100),
//     resizeMode: 'contain',
//     backgroundColor: '#F3F4F6'
//   },
//   trendingCardInfo: { padding: scale(12) },
//   trendingCardBrand: { fontSize: moderateScale(11), color: '#666' },
//   trendingCardTitle: { fontSize: moderateScale(13), fontWeight: '600', color: '#333', marginVertical: verticalScale(2) },
//   trendingCardPrice: { fontSize: moderateScale(14), fontWeight: 'bold', color: '#007BFF', marginTop: verticalScale(4) },
// });







///////////////////////////////////////// old cart ////////////////////////
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   StatusBar
// } from 'react-native';
// import { showMessage } from 'react-native-flash-message';
// import Icon from 'react-native-vector-icons/Feather';
// import colors from '../../styles/colors';
// import AntIcon from 'react-native-vector-icons/AntDesign';

// const ProductGridScreen = ({ navigation }) => {
//   const [cartMap, setCartMap] = useState({});
//   const [likedItems, setLikedItems] = useState({}); // बदला हुआ state

//   const products = [
//     { id: '1', brand: 'Vincent Chase', name: 'Classic Rectangle', image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg', price: 1199, originalPrice: 1999, rating: 4.5 },
//     { id: '2', brand: 'Ray-Ban', name: 'Aviator Pro', image: 'https://cdn.eyemyeye.com/shared/images/products/E12A3928/E12A3928-1-hd.jpg', price: 4500, originalPrice: 6000, rating: 4.8 },
//     { id: '3', brand: 'Oakley', name: 'Sport Edition', image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3910/E20A3910-1-hd.jpg', price: 2100, originalPrice: 3500, rating: 4.2 },
//     { id: '4', brand: 'John Jacobs', name: 'Modern Cateye', image: 'https://cdn.eyemyeye.com/shared/images/products/S20A2353/S20A2353-1-hd.jpg', price: 3200, originalPrice: 5000, rating: 4.7 },
//     { id: '5', brand: 'Vincent Chase', name: 'Round Metal', image: 'https://cdn.eyemyeye.com/shared/images/products/E10A3828/E10A3828-1-hd.jpg', price: 1499, originalPrice: 2499, rating: 4.4 },
//     { id: '6', brand: 'Carrera', name: 'Urban Navigator', image: 'https://cdn.eyemyeye.com/shared/images/products/E13A3745/E13A3745-1-hd.jpg', price: 3800, originalPrice: 5500, rating: 4.6 },
//   ];


//   const toggleLike = (itemId) => {
//     setLikedItems(prev => {
//       const updatedLikes = { ...prev };
//       updatedLikes[itemId] = !updatedLikes[itemId]; // उस ID के लिए वैल्यू को टॉगल करें
//       return updatedLikes;
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
//       <View style={styles.header}>
//         <Icon name="menu" size={24} color="#333" />
//         <Text style={styles.headerTitle}>Eyeglasses</Text>
//         <View style={styles.headerIcons}>
//           <Icon name="search" size={22} color="#333" />
//           <Icon name="shopping-bag" size={22} color="#333" style={{ marginLeft: 20 }} />
//         </View>
//       </View>

//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//         renderItem={({ item }) => {
//           const isAddedToCart = cartMap[item.id];
//           const isLiked = likedItems[item.id]; // हर आइटम का अपना isLiked स्टेटस

//           return (
//             <View style={styles.card}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ProductList')}
//                 activeOpacity={0.9}
//               >
//                 <Image source={{ uri: item.image }} style={styles.image} />
//                 <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.wishlistButton}>
//                   <AntIcon
//                     name={isLiked ? "heart" : "hearto"}
//                     size={20}
//                     color={isLiked ? "red" : "black"}
//                   />
//                 </TouchableOpacity>
//               </TouchableOpacity>

//               <View style={styles.infoContainer}>
//                 <Text style={styles.brandText}>{item.brand}</Text>
//                 <Text style={styles.nameText} numberOfLines={1}>
//                   {item.name}
//                 </Text>

//                 <View style={styles.ratingRow}>
//                   <View style={styles.starContainer}>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Icon
//                         key={star}
//                         name="star"
//                         size={14}
//                         color={item.rating >= star ? '#FFC107' : '#E0E0E0'}
//                         style={{ fill: item.rating >= star ? '#FFC107' : 'none' }}
//                       />
//                     ))}
//                   </View>
//                   <Text style={styles.ratingText}>{item.rating}</Text>
//                 </View>

//                 <View style={styles.priceRow}>
//                   <Text style={styles.priceText}>₹{item.price.toFixed(2)}</Text>
//                   <Text style={styles.originalPriceText}>
//                     ₹{item.originalPrice.toFixed(2)}
//                   </Text>
//                 </View>

//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => {
//                       const updatedMap = { ...cartMap, [item.id]: !isAddedToCart };
//                       setCartMap(updatedMap);
//                       showMessage({
//                         message: !isAddedToCart ? 'Added to Cart' : 'Removed from Cart',
//                         description: !isAddedToCart
//                           ? `${item.name} added successfully!`
//                           : `${item.name} removed from your cart.`,
//                         type: !isAddedToCart ? 'success' : 'danger',
//                         icon: !isAddedToCart ? 'success' : 'danger',
//                         duration: 2000,
//                       });
//                     }}
//                   >
//                     <Text style={styles.addButtonText}>
//                       {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default ProductGridScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
//   headerIcons: { flexDirection: 'row' },
//   listContainer: { padding: 8 },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     margin: 8,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'contain',
//     backgroundColor: '#F7F7F7',
//   },
//   wishlistButton: {
//     position: 'absolute',
//     top: 5,
//     right: 10,
//     padding: 6,
//     borderRadius: 15,
//   },
//   infoContainer: { padding: 12 },
//   brandText: { fontSize: 13, color: '#666', fontWeight: '500' },
//   nameText: { fontSize: 15, fontWeight: 'bold', color: '#333', marginVertical: 4 },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   starContainer: { flexDirection: 'row' },
//   ratingText: { marginLeft: 5, fontSize: 13, color: '#555' },
//   priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   priceText: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
//   originalPriceText: {
//     fontSize: 12,
//     color: '#999',
//     textDecorationLine: 'line-through',
//     marginLeft: 8,
//   },
//   buttonContainer: { alignItems: 'center' },
//   addButton: {
//     backgroundColor: '#E7F2FF',
//     borderColor: '#007BFF',
//     borderWidth: 1,
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//   },
//   addButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 14 },
// });





/////////////////////////////////////////////////////////  product list code ///////////////////////////////////////////////////
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// // Importing your responsive styling functions
// import { scale, verticalScale, moderateScale } from '../../styles/styleconfig'; // Make sure this path is correct

// // --- Product Data is hardcoded as before ---
// const productData = {
//   brand: 'Vincent Chase',
//   name: 'Airlight Reading Eyeglasses',
//   modelNo: 'VC E14245',
//   rating: 4.7,
//   reviewCount: 382,
//   price: 1500.00,
//   originalPrice: 2500.00,
//   offer: '40% Off',
//   image: 'https://cdn.eyemyeye.com/shared/images/products/E20A3815/E20A3815-1-hd.jpg',
//   description: 'Experience unparalleled comfort and style with the Vincent Chase Airlight collection. These lightweight frames are crafted for all-day wear, ensuring you look sharp without any of the bulk.',
//   specifications: [
//     { title: 'Frame Width', value: '140 mm' },
//     { title: 'Frame Size', value: 'Medium' },
//     { title: 'Frame Material', value: 'TR90' },
//     { title: 'Frame Shape', value: 'Rectangle' },
//     { title: 'Weight', value: '12 gms' },
//   ],
// };

// const FrameDetailScreen = ({ navigation }) => {

//   const handleAddToCart = () => {
//     Alert.alert('Added to Cart!', `${productData.name} has been added to your cart.`);
//   };

//   const handleSelectLenses = () => {
//     Alert.alert('Next Step', 'Proceeding to lens selection for your new frames!');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
//       {/* --- Custom Header --- */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>  
//           <Icon name="arrow-left" size={scale(24)} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Eyeglasses</Text>
//         <View style={styles.headerIcons}>
//           <TouchableOpacity>
//             <Icon name="heart" size={scale(24)} color="#333" />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginLeft: scale(15) }}>
//             <Icon name="shopping-bag" size={scale(24)} color="#333" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: productData.image }}
//             style={styles.productImage}
//           />
//         </View>

//         <View style={styles.infoContainer}>
//           <Text style={styles.productBrand}>{productData.brand}</Text>
//           <Text style={styles.productName}>{productData.name}</Text>
//           <Text style={styles.productModel}>{productData.modelNo}</Text>
          
//           {/* --- Rating Section (Inlined) --- */}
//           <View style={styles.ratingContainer}>
//             <View style={styles.starContainer}>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Icon
//                   key={star}
//                   name="star"
//                   size={scale(16)}
//                   color={productData.rating >= star ? '#FFC107' : '#E0E0E0'}
//                   style={{ fill: productData.rating >= star ? '#FFC107' : 'none' }}
//                 />
//               ))}
//             </View>
//             <Text style={styles.ratingText}>{productData.rating} ({productData.reviewCount} Reviews)</Text>
//           </View>
          
//           {/* --- Price Section --- */}
//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>₹{productData.price.toFixed(2)}</Text>
//             <Text style={styles.originalPrice}>₹{productData.originalPrice.toFixed(2)}</Text>
//             <Text style={styles.offerText}>{productData.offer}</Text>
//           </View>

//           {/* --- Description --- */}
//           <Text style={styles.descriptionTitle}>Description</Text>
//           <Text style={styles.descriptionText}>{productData.description}</Text>

//           {/* --- Technical Information --- */}
//           <View style={styles.specsContainer}>
//              <Text style={styles.specsHeader}>Technical Information</Text>
//              {productData.specifications.map((spec, index) => (
//                 <View key={index} style={styles.specRow}>
//                     <Text style={styles.specTitle}>{spec.title}</Text>
//                     <Text style={styles.specValue}>{spec.value}</Text>
//                 </View>
//              ))}
//           </View>
//         </View>
//       </ScrollView>

//       {/* --- Footer with CTAs --- */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
//           <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.selectLensesButton} onPress={handleSelectLenses}>
//           <Text style={styles.selectLensesButtonText}>Select Lenses</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Styles now use scale, verticalScale, and moderateScale
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   headerTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//     color: '#333',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   imageContainer: {
//     alignItems: 'center',
//     padding: scale(10),
//   },
//   productImage: {
//     width: '95%',
//     height: verticalScale(220), 
//     resizeMode: 'contain',
//   },
//   infoContainer: {
//     paddingHorizontal: scale(20),
//     paddingBottom: verticalScale(20),
//   },
//   productBrand: {
//     fontSize: moderateScale(16),
//     color: '#007BFF',
//     fontWeight: '500',
//     marginBottom: verticalScale(4),
//   },
//   productName: {
//     fontSize: moderateScale(24),
//     fontWeight: 'bold',
//     color: '#212529',
//     marginBottom: verticalScale(4),
//   },
//   productModel: {
//     fontSize: moderateScale(14),
//     color: '#6c757d',
//     marginBottom: verticalScale(15),
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   starContainer: {
//     flexDirection: 'row',
//   },
//   ratingText: {
//     marginLeft: scale(10),
//     fontSize: moderateScale(14),
//     color: '#495057',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },
//   price: {
//     fontSize: moderateScale(28),
//     fontWeight: 'bold',
//     color: '#212529',
//   },
//   originalPrice: {
//     fontSize: moderateScale(16),
//     color: '#6c757d',
//     textDecorationLine: 'line-through',
//     marginLeft: scale(10),
//   },
//   offerText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#28a745',
//     backgroundColor: '#e9f7ec',
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(4),
//     borderRadius: scale(6),
//     marginLeft: scale(15),
//   },
//   descriptionTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(8),
//     color: '#333',
//   },
//   descriptionText: {
//     fontSize: moderateScale(15),
//     color: '#495057',
//     lineHeight: verticalScale(24),
//   },
//   specsContainer: {
//     marginTop: verticalScale(25),
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: verticalScale(15),
//   },
//   specsHeader: {
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     marginBottom: verticalScale(15),
//     color: '#333',
//   },
//   specRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: verticalScale(10),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F5F5F5',
//   },
//   specTitle: {
//     fontSize: moderateScale(15),
//     color: '#6c757d',
//   },
//   specValue: {
//     fontSize: moderateScale(15),
//     color: '#212529',
//     fontWeight: '600',
//   },
//   footer: {
//     flexDirection: 'row',
//     padding: scale(15),
//     borderTopWidth: 1,
//     borderTopColor: '#EEE',
//     backgroundColor: '#FFF',
//   },
//   addToCartButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#007BFF',
//     paddingVertical: verticalScale(15),
//     borderRadius: scale(12),
//     alignItems: 'center',
//     marginRight: scale(10),
//   },
//   addToCartButtonText: {
//     color: '#007BFF',
//     fontSize: moderateScale(16),
//     fontWeight: 'bold',
//   },
//   selectLensesButton: {
//     flex: 1.5,
//     backgroundColor: '#007BFF',
//     paddingVertical: verticalScale(15),
//     borderRadius: scale(12),
//     alignItems: 'center',
//     marginLeft: scale(10),
//   },
//   selectLensesButtonText: {
//     color: '#FFF',
//     fontSize: moderateScale(16),
//     fontWeight: 'bold',
//   },
// });

// export default FrameDetailScreen;



/////////////////// esm toogle ho ha hai product list ka /////////////////////////////////////////////  
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   StatusBar,
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import { scale, verticalScale, moderateScale } from '../../styles/styleconfig';
// import colors from '../../styles/colors';
// import { useApi } from '../../Context/ApiContext';
// import { showMessage } from 'react-native-flash-message';
// import { useIsFocused } from '@react-navigation/native';

// const BASE_URL = 'https://accounts-1.onrender.com';
// const { width } = Dimensions.get('window');

// const ProductList = ({ route, navigation }) => {
//   const { productId } = route.params;
//   const { getProductsData, AddToCart, Removefromcart, UpdateCartQuantity, GetCartData } = useApi();
//   const isFocused = useIsFocused();
  
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // **FILTER.JSP Jaisa Smart State**
//   const [cartMap, setCartMap] = useState({}); // { 'productId': 'cartItemId' }

//   // Normal states
//   const [quantity, setQuantity] = useState(1);
//   const [isUpdatingCart, setIsUpdatingCart] = useState(false);
//   const [like, setLike] = useState(false);

//   // Yeh function page load hone par sab kuch set karega
//   const initializePage = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [productsRes, cartData] = await Promise.all([getProductsData(), GetCartData()]);

//       // Product ka data set karo
//       const apiProduct = productsRes?.find(p => p.id == productId);
//       if (!apiProduct) throw new Error('Product not found.');
//       setProductData({
//         id: apiProduct.id,
//         brand: apiProduct.brand_name.replace(/['"]/g, ''),
//         name: apiProduct.product_name.replace(/['"]/g, ''),
//         modelNo: apiProduct.product_id,
//         images: apiProduct.images.map(img => `${BASE_URL}${img.image}`),
//         price: parseFloat(apiProduct.price),
//         originalPrice: parseFloat(apiProduct.originalPrice || apiProduct.price * 1.4),
//         stock: parseInt(apiProduct.quantity, 10),
//         rating: apiProduct.rating || 4.5,
//         reviewCount: apiProduct.reviewCount || 152,
//         offer: apiProduct.offer || '30% Off',
//         description: apiProduct.description,
//         specifications: Object.entries(apiProduct.specification || {}).map(([key, value]) => ({
//           title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
//           value: value,
//         })),
//       });

//       // **FILTER.JSP Jaisa CartMap Banao**
//       // Ho sakta hai GetCartData ek object {items: []} de ya seedha array [], dono ko handle karo
//       const cartItems = Array.isArray(cartData) ? cartData : cartData?.items || [];
//       const newCartMap = cartItems.reduce((map, item) => {
//         const pId = item.product?.id || item.product_id || item.product;
//         if (pId) {
//           map[pId] = item.id; // Key = product ID, Value = cart item ID
//         }
//         return map;
//       }, {});
//       setCartMap(newCartMap);
      
//       // Quantity set karo agar product cart mein hai
//       const cartItemId = newCartMap[apiProduct.id];
//       if(cartItemId) {
//           const cartItemDetails = cartItems.find(item => item.id === cartItemId);
//           if (cartItemDetails) {
//             setQuantity(cartItemDetails.quantity);
//           }
//       }

//     } catch (err) {
//       console.error('Failed to initialize page:', err);
//       Alert.alert('Error', 'Could not load data.');
//     } finally {
//       setLoading(false);
//     }
//   }, [productId, getProductsData, GetCartData]);

//   useEffect(() => {
//     if (isFocused && productId) {
//       initializePage();
//     }
//   }, [isFocused, productId, initializePage]);


//   // **ADD TO CART (INSTANT UPDATE)**
//   const handleAddToCart = async () => {
//     if (!productData || isUpdatingCart) return;
//     setIsUpdatingCart(true);
//     try {
//       const payload = { product_id: productData.id, quantity: 1 };
//       const response = await AddToCart(payload);

//       // **TURANT UI UPDATE KARO**
//       const productIdInResponse = response.product?.id || response.product_id || response.product;
//       setCartMap(prevMap => ({ ...prevMap, [productIdInResponse]: response.id }));
//       showMessage({ message: 'Added to Cart!', type: 'success' });
      
//     } catch (error) {
//         showMessage({ message: error.message || 'Could not add item', type: 'danger' });
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // **REMOVE FROM CART (INSTANT UPDATE)**
//   const handleRemoveFromCart = async () => {
//     if (!productData || isUpdatingCart) return;

//     const cartItemId = cartMap[productData.id];
//     if (!cartItemId) {
//         // Agar kisi wajah se cartMap mein ID nahi hai, toh ek baar sync karlo
//         showMessage({ message: 'Item not in cart. Syncing...', type: 'info'});
//         initializePage();
//         return;
//     }

//     setIsUpdatingCart(true);
//     try {
//       await Removefromcart(cartItemId);
      
//       // **TURANT UI UPDATE KARO**
//       setCartMap(prevMap => {
//         const newMap = { ...prevMap };
//         delete newMap[productData.id];
//         return newMap;
//       });
//       setQuantity(1); // Quantity ko reset karo
//       showMessage({ message: 'Removed from Cart', type: 'success' });

//     } catch (error) {
//       showMessage({ message: error.message || 'Could not remove item', type: 'danger' });
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };
  
//   // -- Update Quantity Logic --
//   // ... (yeh pehle se theek hai, isko change karne ki zaroorat nahi)

//   if (loading) {
//     return <SafeAreaView style={styles.loaderContainer}><ActivityIndicator size="large" color={colors.ProductDetailsButton} /></SafeAreaView>;
//   }
//   if (!productData) {
//     return <SafeAreaView style={styles.loaderContainer}><Text>Product not found.</Text></SafeAreaView>;
//   }
  
//   // Faisla ab `cartMap` se hoga
//   const isAddedToCart = !!cartMap[productData.id];
//   const isOutOfStock = productData.stock <= 0;
//   const cartButtonDisabled = isOutOfStock || isUpdatingCart;

//   return (
//     <SafeAreaView style={styles.container}>
//         {/* ... (Header aur baaki JSX same rahega, koi change nahi) ... */}
//         {/* ... (ScrollView aur baaki JSX same rahega, koi change nahi) ... */}
        
//         <View style={styles.footer}>
//             <TouchableOpacity
//                 style={[styles.addToCartButton, isAddedToCart && styles.removeButton, cartButtonDisabled && { opacity: 0.6 }]}
//                 // Faisla ab `isAddedToCart` se hoga
//                 onPress={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
//                 disabled={cartButtonDisabled}
//             >
//             {isUpdatingCart ? (
//                 <ActivityIndicator color={isAddedToCart ? '#E53935' : colors.ProductDetailsButton} size="small" />
//             ) : (
//                 <Text style={[styles.addToCartButtonText, isAddedToCart && styles.removeButtonText]}>
//                 {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
//                 </Text>
//             )}
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[styles.selectLensesButton, isOutOfStock && { backgroundColor: '#ccc' }]}
//                 onPress={() => Alert.alert('Next Step', 'Proceed to lens selection!')}
//                 disabled={isOutOfStock}
//             >
//                 <Text style={styles.selectLensesButtonText}>Buy Now</Text>
//             </TouchableOpacity>
//         </View>
//     </SafeAreaView>
//   );
// };


// // Baaki sab kuch (styles, etc.) same rahega.
// // Neeche complete JSX de raha hoon just in case.
// const TheRestOfTheComponent = ({ productData, navigation, like, setLike, isOutOfStock, quantity, decrementQuantity, incrementQuantity }) => (
//     <>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
//         <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Icon name="arrow-left" size={scale(24)} color="#333" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>{productData.brand}</Text>
//             <View style={styles.headerIcons}>
//                 <TouchableOpacity onPress={() => setLike(!like)}>
//                     <AntIcon name={like ? 'heart' : 'hearto'} size={scale(24)} color={like ? 'red' : 'black'} />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ marginLeft: scale(15) }} onPress={() => navigation.navigate('Cart')}>
//                     <Icon name="shopping-bag" size={scale(24)} color="#333" />
//                 </TouchableOpacity>
//             </View>
//         </View>

//         <ScrollView>
//             <View style={styles.sliderContainer}>
//                 <FlatList
//                     data={productData.images}
//                     keyExtractor={(_, index) => `slide-${index}`}
//                     renderItem={({ item }) => <Image source={{ uri: item }} style={styles.sliderImage} />}
//                     horizontal
//                     pagingEnabled
//                     showsHorizontalScrollIndicator={false}
//                 />
//             </View>

//             <View style={styles.infoContainer}>
//                 <Text style={styles.productBrand}>{productData.brand}</Text>
//                 <Text style={styles.productName}>{productData.name}</Text>
//                 <View style={styles.productSubline}>
//                     <Text style={styles.productModel}>{productData.modelNo}</Text>
//                     {isOutOfStock ? (
//                     <View style={[styles.stockBadge, styles.outOfStockBadge]}><Text style={[styles.stockText, styles.outOfStockText]}>Out of Stock</Text></View>
//                     ) : (
//                     <View style={[styles.stockBadge, styles.inStockBadge]}><Text style={styles.stockText}>In Stock: {productData.stock}</Text></View>
//                     )}
//                 </View>
//                  <View style={styles.ratingContainer}>
//                     <View style={styles.starContainer}>
//                     {[1, 2, 3, 4, 5].map(star => <Icon key={star} name="star" size={scale(16)} color={productData.rating >= star ? '#FFC107' : '#E0E0E0'} />)}
//                     </View>
//                     <Text style={styles.ratingText}>{productData.rating} ({productData.reviewCount} Reviews)</Text>
//                 </View>
//                 <View style={styles.priceContainer}>
//                     <Text style={styles.price}>₹{productData.price?.toFixed(2)}</Text>
//                     <Text style={styles.originalPrice}>₹{productData.originalPrice?.toFixed(2)}</Text>
//                     <Text style={styles.offerText}>{productData.offer}</Text>
//                 </View>
//                 <View style={styles.quantitySelectorContainer}>
//                     <Text style={styles.quantityLabel}>Quantity</Text>
//                     <View style={styles.quantityControls}>
//                     <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity} disabled={isOutOfStock || quantity <= 1}>
//                         <Icon name="minus" size={scale(20)} color={(isOutOfStock || quantity <= 1) ? '#ccc' : '#007BFF'} />
//                     </TouchableOpacity>
//                     <Text style={styles.quantityDisplay}>{isOutOfStock ? 0 : quantity}</Text>
//                     <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity} disabled={isOutOfStock || quantity >= productData.stock}>
//                         <Icon name="plus" size={scale(20)} color={(isOutOfStock || quantity >= productData.stock) ? '#ccc' : '#007BFF'} />
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//                 <Text style={styles.descriptionTitle}>Description</Text>
//                 <Text style={styles.descriptionText}>{productData.description}</Text>
//                 <View style={styles.specsContainer}>
//                     <Text style={styles.specsHeader}>Technical Information</Text>
//                     {productData.specifications.map((spec, index) => (
//                     <View key={index} style={styles.specRow}>
//                         <Text style={styles.specTitle}>{spec.title}</Text>
//                         <Text style={styles.specValue}>{spec.value}</Text>
//                     </View>
//                     ))}
//                 </View>
//             </View>
//         </ScrollView>
//     </>
// );

// const styles = StyleSheet.create({
//   sliderContainer: { width: '100%', height: verticalScale(250), backgroundColor: colors.WhiteBackgroudcolor },
//   sliderImage: { width: width, height: '100%', resizeMode: 'contain' },
//   container: { flex: 1, backgroundColor: colors.WhiteBackgroudcolor },
//   loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(20), paddingVertical: verticalScale(15), borderBottomWidth: 1, borderBottomColor: '#F0F0F0', backgroundColor: '#FFF' },
//   headerTitle: { fontSize: moderateScale(18), fontWeight: '600', color: '#333' },
//   headerIcons: { flexDirection: 'row' },
//   infoContainer: { paddingHorizontal: scale(20), paddingBottom: verticalScale(20), backgroundColor: '#FFF', borderTopLeftRadius: scale(20), borderTopRightRadius: scale(20), marginTop: verticalScale(-20) },
//   productBrand: { fontSize: moderateScale(16), color: '#007BFF', fontWeight: '500', marginBottom: verticalScale(4), paddingTop: verticalScale(20) },
//   productName: { fontSize: moderateScale(24), fontWeight: 'bold', color: '#212529', marginBottom: verticalScale(4) },
//   productSubline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(15) },
//   productModel: { fontSize: moderateScale(14), color: '#6c757d' },
//   stockBadge: { paddingHorizontal: scale(10), paddingVertical: verticalScale(4), borderRadius: scale(6) },
//   inStockBadge: { backgroundColor: '#e9f7ec' },
//   outOfStockBadge: { backgroundColor: '#fbe9e7' },
//   stockText: { fontSize: moderateScale(13), fontWeight: '600', color: '#28a745' },
//   outOfStockText: { color: '#d32f2f' },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(15) },
//   starContainer: { flexDirection: 'row' },
//   ratingText: { marginLeft: scale(10), fontSize: moderateScale(14), color: '#495057' },
//   priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(20) },
//   price: { fontSize: moderateScale(28), fontWeight: 'bold', color: '#212529' },
//   originalPrice: { fontSize: moderateScale(16), color: '#6c757d', textDecorationLine: 'line-through', marginLeft: scale(10) },
//   offerText: { fontSize: moderateScale(14), fontWeight: '600', color: '#28a745', backgroundColor: '#e9f7ec', paddingHorizontal: scale(8), paddingVertical: verticalScale(4), borderRadius: scale(6), marginLeft: scale(15), overflow: 'hidden' },
//   quantitySelectorContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', paddingVertical: verticalScale(8), paddingHorizontal: scale(12), borderRadius: scale(10), marginBottom: verticalScale(25) },
//   quantityLabel: { fontSize: moderateScale(16), fontWeight: '600', color: '#333' },
//   quantityControls: { flexDirection: 'row', alignItems: 'center' },
//   quantityButton: { width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: scale(18), borderWidth: 1, borderColor: '#DEE2E6', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
//   quantityDisplay: { fontSize: moderateScale(18), fontWeight: 'bold', color: '#212529', marginHorizontal: scale(20), minWidth: scale(30), textAlign: 'center' },
//   descriptionTitle: { fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: verticalScale(8), color: '#333' },
//   descriptionText: { fontSize: moderateScale(15), color: '#495057', lineHeight: verticalScale(24) },
//   specsContainer: { marginTop: verticalScale(25), borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: verticalScale(15) },
//   specsHeader: { fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: verticalScale(15), color: '#333' },
//   specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: verticalScale(10), borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
//   specTitle: { fontSize: moderateScale(15), color: '#6c757d' },
//   specValue: { fontSize: moderateScale(15), color: '#212529', fontWeight: '600' },
//   footer: { flexDirection: 'row', padding: scale(15), borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
//   addToCartButton: { flex: 1, borderWidth: 1, borderColor: colors.ProductDetailsButton, backgroundColor: '#E7F2FF', paddingVertical: verticalScale(15), borderRadius: scale(12), alignItems: 'center', justifyContent: 'center', marginRight: scale(10) },
//   addToCartButtonText: { color: colors.ProductDetailsButton, fontSize: moderateScale(16), fontWeight: 'bold' },
//   removeButton: { borderColor: '#E53935', backgroundColor: '#FFEBEE' },
//   removeButtonText: { color: '#E53935' },
//   selectLensesButton: { flex: 1.5, backgroundColor: colors.ProductDetailsButton, paddingVertical: verticalScale(15), borderRadius: scale(12), alignItems: 'center', marginLeft: scale(10) },
//   selectLensesButtonText: { color: '#FFF', fontSize: moderateScale(16), fontWeight: 'bold' },
// });

// export default ProductList;
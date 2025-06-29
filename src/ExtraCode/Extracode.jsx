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

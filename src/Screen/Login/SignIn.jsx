import { StyleSheet, Text, View, TextInput, TouchableOpacity , Pressable } from 'react-native';
import React ,{useState}from 'react';
import { fontScale, moderateScale, moderateScaleVertical, scale, verticalScale } from '../../styles/styleconfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SignIn = () => {
 const [click,setclick] = useState(false)
   const [secondclick,setsecondclick] = useState(false)
   return (
     <View style={styles.mainContainer}>
       <View style={styles.innerContainer}>
         <View style={styles.verticalCard}>
           <Text style={styles.cardTitle}>Create Account</Text>
           <TextInput
             style={styles.inputField}
             placeholder="Email | Phone"
             placeholderTextColor="#888"
           />
           <TextInput
             style={styles.inputField}
             placeholder="Password"
             placeholderTextColor="#888"
           />
          
          <TouchableOpacity>
            <View style={styles.ForgetContainer}>
            <Text style={styles.text}>Forget Password?</Text>
          </View>
          </TouchableOpacity>
          <Pressable style={styles.checkboxRow} onPress={() => setsecondclick(!secondclick)}>
   <View style={styles.checkbox}>
     {secondclick && <Icon name="check" size={12} color="green" />}
   </View>
   <Text style={styles.checkboxLabel}>I agree to terms & conditions</Text>
 </Pressable>
           <TouchableOpacity onPress={()=> navigation.navigate("SignIn")}  style={styles.greenButton}>
             <Text style={styles.buttonText}>Sign Up</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   );
 };

export default SignIn

const styles = StyleSheet.create({
     mainContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: moderateScale(16),
    justifyContent: "center"
  },
  innerContainer: {
    gap: moderateScaleVertical(8),
  },
  verticalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: moderateScale(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    textAlign: "center",
  },
  inputField: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
    fontSize: fontScale(14),
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(6),
  },
  greenButton: {
    backgroundColor: '#28a745',
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(8),
    elevation: 3,
    marginTop: moderateScaleVertical(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: moderateScaleVertical(10),
  marginBottom: moderateScaleVertical(6),
},
checkbox: {
  width: scale(18),
  height: verticalScale(18),
  borderWidth: 1.5,
  borderColor: '#999',
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: moderateScale(8),
},
checkboxLabel: {
  fontSize: fontScale(13),
  color: '#333',
},
ForgetContainer:{
    paddingHorizontal:scale(10),
    paddingVertical:verticalScale(5)
},
text:{
    color:"#5f50c2fa",

}
})
import NavigationString from "./NavigationString";
import * as Screen from "../Screen"
import BottomTabs from "./BottomTabs";
export default function(Stack){
    return (
        <>
        <Stack.Screen
        name={NavigationString.AuthGate}
        component={Screen.AuthGate}
        options={{ headerShown: false }}
      />
        <Stack.Screen   
        name={NavigationString.Signup}
        component={Screen.Signup}
        options={{headerShown:false}}
        />
        <Stack.Screen   
        name={NavigationString.SignIn}
        component={Screen.SignIn}
        options={{headerShown:false}}
        />
        <Stack.Screen   
        name={NavigationString.ForgetPass}
        component={Screen.ForgetPass}
        options={{headerShown:false}}
        />
        <Stack.Screen   
        name={NavigationString.OtpVerify}
        component={Screen.OtpVerify}
        options={{headerShown:false}}
        />
        <Stack.Screen   
        name={NavigationString.ResetPassword}
        component={Screen.ResetPassword}
        options={{headerShown:false}}
        />
        <Stack.Screen   
        name={NavigationString.HomeScreen}
        component={BottomTabs}
        options={{headerShown:false}}
        />
        
        
        </>
    )
}

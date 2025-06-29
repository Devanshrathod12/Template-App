import NavigationString from "./NavigationString";
import * as Screen from "../Screen"

export default function(Stack){
    return (
        <>
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
        </>
    )
}

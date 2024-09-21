import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../components/LoginScreen"
import SignUpScreen from "../components/SignUpScreen"
const Stack = createStackNavigator()
const screenOptions = {
    headerShown : false
}
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack

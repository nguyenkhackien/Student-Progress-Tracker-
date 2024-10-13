import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "react-native"
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native"
import AccountScreen from "./src/components/AccountScreen"
import MyScheduleScreen from "./src/components/MyScheduleScreen"
import store from "./src/store/Store"
import { NavigationContainer } from "@react-navigation/native"
import { primaryColor } from "./src/Constants/Color"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "./src/components/LoginScreen"
import { useState } from "react"
import SearchScreen from "./src/components/SearchSreen"
import { Provider } from "react-redux"
import SignUpScreen from "./src/components/SignUpScreen"
import ForgotPassWordScreen from "./src/components/ForgotPasswordScreen"
import VerificationScreen from "./src/components/VerificationScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: primaryColor,
}

const HomeTab = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({color}) => {
                        return (
                            <Ionicons
                                name={"search"}
                                size={28}
                                color={color}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="MySchedule"
                component={LoginScreen} // Kiểm tra trạng thái login
                options={{
                    tabBarIcon: ({color}) => {
                        return (
                            <Ionicons
                                name={"calendar"}
                                size={28}
                                color={color}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={LoginScreen} // Kiểm tra trạng thái login
                options={{
                    tabBarIcon: ({color}) => {
                        return (
                            <Ionicons
                                name={"person"}
                                size={28}
                                color={color}
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}
const HomeTab2 = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return (
                            <Ionicons name={"search"} size={28} color={color} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="MySchedule"
                component={MyScheduleScreen} // Kiểm tra trạng thái login
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return (
                            <Ionicons
                                name={"calendar"}
                                size={28}
                                color={color}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen} // Kiểm tra trạng thái login
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return (
                            <Ionicons name={"person"} size={28} color={color} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.root}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <>
                            <Stack.Screen name="HomeTab" component={HomeTab} />
                            <Stack.Screen
                                name="HomeTab2"
                                component={HomeTab2}
                            />
                            <Stack.Screen
                                name="LoginScreen"
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name="SignUp"
                                component={SignUpScreen}
                            />
                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPassWordScreen}
                            />
                            <Stack.Screen
                                name="Verification"
                                component={VerificationScreen}
                            />
                        </>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})

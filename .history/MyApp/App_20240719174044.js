import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "react-native"
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native"
import AccountScreen from "./src/components/AccountScreen"
import MyScheduleScreen from "./src/components/MyScheduleScreen"
import SearchScreen from "./src/components/SearchSreen"
import { NavigationContainer } from "@react-navigation/native"
import { primaryColor } from "./src/Constants/Color"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()
const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: primaryColor,
}
export default function App() {
    return (
        <SafeAreaView style={styles.root}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={screenOptions}>
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            tabBarIcon: ({ focus, color, size }) => {
                                return (
                                    <Ionicons
                                        name={"search"}
                                        size={size}
                                        color={color}
                                    />
                                )
                            },
                        }}
                    />
                    <Tab.Screen
                        name="MyShedule"
                        component={MyScheduleScreen}
                        options={{
                            tabBarIcon: ({ focus, color, size }) => {
                                return (
                                    <Ionicons
                                        name={"calendar"}
                                        size={size}
                                        color={color}
                                    />
                                )
                            },
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={AccountScreen}
                        options={{
                            tabBarIcon: ({ focus, color, size }) => {
                                return (
                                    <Ionicons
                                        name={"person"}
                                        size={size}
                                        color={color}
                                    />
                                )
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 1,
    },
    re: {
        flex:1
    }
})

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AccountScreen from "../components/AccountScreen"
import MyScheduleScreen from "../components/MyScheduleScreen"
import SearchScreen from "../components/SearchSreen"
import { primaryColor } from "../Constants/Color"
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import AuthStack from "./AuthStack"

const Tab = createBottomTabNavigator()
const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: primaryColor,
}

function HomeTab() {
    const isLogin = useSelector((state) => state.auth.isLoggedIn)
    // console.log(isLogin)
    return (
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
                component={!isLogin ? AuthStack : MyScheduleScreen}
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
                component={!isLogin?AuthStack:AccountScreen}
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
    )
}

export default HomeTab

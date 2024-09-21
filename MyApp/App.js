import { StatusBar } from "react-native"
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import HomeTab from "./src/Navigators/HomeTab"
import { Provider } from "react-redux"
import store from "./src/store/Store"
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.root}>
                <NavigationContainer>
                    <HomeTab />
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})

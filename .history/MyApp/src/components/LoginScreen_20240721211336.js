import React, { useState } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <View style={styles.container}>
            <ImageBackground>

            <Text style={styles.title}>Welcome</Text>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logoIcon}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                />
                <Ionicons
                    name="call-outline"
                    size={24}
                    color="grey"
                    style={styles.phoneIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={
                            passwordVisible ? "eye-outline" : "eye-off-outline"
                        }
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>
            {/* Add your login button and other components here */}
        </View>
            </ImageBackground>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        ImageBackground: 
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    logoIcon: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    phoneIcon: {
        position: "absolute",
        right: 12,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
    },
}

export default LoginScreen

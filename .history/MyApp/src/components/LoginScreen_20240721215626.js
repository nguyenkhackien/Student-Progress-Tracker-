import React, { useState } from "react"
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { primaryColor } from "../Constants/Color"

const LoginScreen = () => {
    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <View>
            <ImageBackground
                source={require("../../assets/bgc.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logoIcon}
                    />
                    <Text style={styles.title}>TRA CỨU UET</Text>
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}><Login</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={Email}
                                placeholder="Email"
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
                                        passwordVisible
                                            ? "eye-outline"
                                            : "eye-off-outline"
                                    }
                                    size={24}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems:'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        color:primaryColor,
    },
    logoIcon: {
        width: 150,
        height: 150,
        marginVertical:20,
    },
    loginContainer: {
        width: '95%',
        height:'65%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius:30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 50,
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

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

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <View>
            <ImageBackground
                source={require("../../assets/bgc2.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logoIcon}
                    />
                    <Text style={styles.title}>TRA CỨU UET</Text>
                    <View>
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
            {/* Add your login button and other components here */}
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems:'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color:'blue',
    },
    logoIcon: {
        width: 150,
        height: 150,
        marginVertical:20,
    },
    loginContainer: {
        width: '100%',
        height: '60%',
        
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

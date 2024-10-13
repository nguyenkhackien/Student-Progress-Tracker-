import React, { useState } from "react"
import {
    Keyboard,
    TouchableWithoutFeedback,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
    Button,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { primaryColor } from "../Constants/Color"

const SignUpScreen = ({ navigation }) => {
    const [Account, setAccount] = useState("")
    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPass] = useState("")
    const [PasswordAgain, setPassAgain] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }
    const [passwordAgainVisible, setPasswordAgainVisible] = useState(false)
    const togglePasswordAgainVisibility = () => {
        setPasswordAgainVisible(!passwordAgainVisible)
    }

    const [isLoading, setLoading] = useState(false)
    const handleRegister = async () => {
        if (!UserName || !Password || !Account || !Email) {
            Alert.alert("Error", "Hãy nhập đầy đủ thông tin")
            return
        }

        setLoading(true)
        try {
            console.log("test")
            const response = await fetch(
                "http://192.168.0.103:3000/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        UserName,
                        Account,
                        Password,
                        Email,
                    }),
                }
            )
            console.log(response.status)
            const data = await response.json()

            if (response.status === 201) {
                Alert.alert("Success", "User registered successfully")
                setLoading(false)
                navigation.navigate("LoginScreen")
            } else if (response.status === 400) {
                Alert.alert("Error", data.message)
                setLoading(false)
            } else {
                Alert.alert("Error", "Something went wrong")
                setLoading(false)
            }
        } catch (error) {
            Alert.alert(`${error}`, `Failed to register user `)
            setLoading(false)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <ImageBackground
                    source={require("../../assets/bgc.png")}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>TRA CỨU UET</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Sign Up</Text>
                        <Text style={{ fontSize: 15, marginBottom: 15 }}>
                            Vui lòng nhập thông tin đăng ký!
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUserName}
                                value={UserName}
                                placeholder="Họ và tên"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setAccount}
                                value={Account}
                                placeholder="Tên đăng nhập"
                                keyboardType="numeric"
                            />
                        </View>
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
                                onChangeText={setPass}
                                value={Password}
                                placeholder="mật khẩu"
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
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassAgain}
                                value={PasswordAgain}
                                placeholder="nhập lại mật khẩu"
                                secureTextEntry={!passwordAgainVisible}
                            />
                            <TouchableOpacity
                                onPress={togglePasswordAgainVisibility}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={
                                        passwordAgainVisible
                                            ? "eye-outline"
                                            : "eye-off-outline"
                                    }
                                    size={24}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                marginVertical: 20,
                            }}
                        >
                            {!isLoading ? (
                                <TouchableOpacity
                                    style={{
                                        width: "90%",
                                        height: 60,
                                        backgroundColor: "blue",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 30,
                                        marginBottom: 20,
                                    }}
                                    onPress={handleRegister}
                                >
                                    <Text
                                        style={{ color: "white", fontSize: 20 }}
                                    >
                                        Đăng Ký
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <ActivityIndicator
                                    size={"large"}
                                    color={primaryColor}
                                ></ActivityIndicator>
                            )}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Bạn đã có tài khoản? </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: primaryColor,
                                        }}
                                    >
                                        Đăng nhập
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = {
    container: {
        width: "90%",
        height: "83%",
        backgroundColor: "white",
        margin: "auto",
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: primaryColor,
        marginVertical: 30,
        marginHorizotal: "auto",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
    },
}
export default SignUpScreen

import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Button,
    TouchableHighlight,
    Pressable,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { primaryColor } from "../Constants/Color"
import { useDispatch } from "react-redux"
import { login } from "../reducers/AuthSlice"
import { useSelector } from "react-redux"

const LoginScreen = ({ navigation }) => {
    const [Account, setAccount] = useState("")
    const [Password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const dispatch = useDispatch()
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const [isLoading, setLoading] = useState(false)
    const handleLogin = async () => {
        if (!Password || !Account) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("http://10.0.2.2:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Account,
                    Password,
                }),
            })
            const data = await response.json()
            if (response.status === 201) {
                dispatch(login(data.user))
                navigation.replace("HomeTab2")
                Alert.alert("Success", "login successfully")
            } else if (response.status === 400) {
                Alert.alert("Error", data.message)
            } else {
                Alert.alert("Error", "Something went wrong")
            }
        } catch (error) {
            Alert.alert(`${error}`, `Failed to login `)
        } finally {
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
                    <View style={styles.container}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.logoIcon}
                        />
                        <Text style={styles.title}>TRA CỨU UET</Text>
                        <View style={styles.loginContainer}>
                            <Text
                                style={{
                                    fontSize: 40,
                                    color: "black",
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                }}
                            >
                                Login
                            </Text>
                            <Text style={{ marginBottom: 50 }}>
                                Vui lòng nhập thông tin đăng nhập!
                            </Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setAccount}
                                    value={Account}
                                    placeholder="Tên đăng nhập"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPassword}
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
                            <TouchableOpacity
                                style={{
                                    justifyContent: "flex-end",
                                    flexDirection: "row",
                                    marginRight: 8,
                                }}
                                onPress={() => {
                                    navigation.navigate("ForgotPassword")
                                }}
                            >
                                <Text style={{ color: primaryColor }}>
                                    Quên mật khẩu?
                                </Text>
                            </TouchableOpacity>
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
                                        onPress={handleLogin}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 20,
                                            }}
                                        >
                                            Đăng Nhập
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
                                    <Text>Chưa có tài khoản? </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("SignUp")
                                        }
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                color: primaryColor,
                                            }}
                                        >
                                            Đăng Ký
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        color: primaryColor,
    },
    logoIcon: {
        width: 150,
        height: 150,
        marginVertical: 20,
    },
    loginContainer: {
        width: "95%",
        height: 500,
        padding: 20,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 30,
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

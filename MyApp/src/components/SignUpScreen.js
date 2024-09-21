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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { primaryColor } from "../Constants/Color"

const SignUpScreen = ({ navigation }) => {
    const [Account, setAccount] = useState("")
    const [UserName, setUserName] = useState("")
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
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <ImageBackground
                    source={require("../../assets/bgc.png")}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View style={{alignItems:"center"}}>
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
                                onPress={() => {}}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    Đăng Ký
                                </Text>
                            </TouchableOpacity>
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
        height: "85%",
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

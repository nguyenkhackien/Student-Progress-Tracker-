import React, { useState } from "react"
import {
    TextInput,
    View,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Text,
    ImageBackground,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ChangePasswordScreen = ({ navigation, route }) => {
    const { Account } = route.params
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible1, setPasswordVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible1)
    }
    const [passwordVisible2, setPasswordVisible2] = useState(false)
    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2)
    }
    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Hãy nhập đầy đủ thông tin")
            return
        }
        if (newPassword.length < 6 || confirmPassword.length < 6) {
            Alert.alert("Error", "Mật khẩu phải có ít nhất 6 ký tự")
            return
        }
        if (newPassword !== confirmPassword)
            Alert.alert("failed", "mật khẩu không trùng khớp")
        else {
            try {
                const response = await fetch(
                    "http://10.0.2.2:3000/changePassword",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            Account,
                            newPassword,
                        }),
                    }
                )
                const data = await response.json()
                if (response.status === 200) {
                    Alert.alert("Success", "đổi mật khẩu thành công")
                    navigation.navigate("LoginScreen")
                } else {
                    Alert.alert("Error", data.message)
                }
            } catch (error) {
                Alert.alert("Error", error)
            }
        }
    }
    return (
        <ImageBackground
            source={require("../../assets/bgc.png")}
            style={{ width: "100%", height: "100%" }}
        >
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 15 }}>
                    nhập mật khẩu mới
                </Text>
                <Text>Mật khẩu</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewPassword}
                        value={newPassword}
                        placeholder="mật khẩu"
                        secureTextEntry={!passwordVisible1}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={
                                passwordVisible1
                                    ? "eye-outline"
                                    : "eye-off-outline"
                            }
                            size={24}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>
                <Text>Nhập lại mật khẩu</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="nhập lại mật khẩu"
                        secureTextEntry={!passwordVisible2}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility2}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={
                                passwordVisible2
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
                        width: "90%",
                        height: 60,
                        backgroundColor: "blue",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                        marginBottom: 20,
                        marginHorizontal: "auto",
                    }}
                    onPress={handleChangePassword}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    container: {
        width: "90%",
        height: 400,
        backgroundColor: "white",
        margin: "auto",
        borderRadius: 10,
        padding: 20,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
    },
})
export default ChangePasswordScreen

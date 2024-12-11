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
import AntDesign from "@expo/vector-icons/AntDesign"
import { Ionicons } from "@expo/vector-icons"

const EditInfo = ({ navigation, route }) => {
    const { Account } = route.params
    const [Password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible1, setPasswordVisible1] = useState(false)
    const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1)
    }
    const [passwordVisible2, setPasswordVisible2] = useState(false)
    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2)
    }
    const [passwordVisible3, setPasswordVisible3] = useState(false)
    const togglePasswordVisibility3 = () => {
        setPasswordVisible3(!passwordVisible3)
    }
    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword || !Password) {
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
                            Password,
                            newPassword,
                        }),
                    }
                )
                const data = await response.json()
                if (response.status === 200) {
                    Alert.alert("Success", "đổi mật khẩu thành công")
                    navigation.navigate("Account")
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
            <View style={styles.containerTitle}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>

            <View style={styles.container}>
                <Text style={{ fontSize: 25, marginBottom: 15 }}>
                    Đổi mật khẩu
                </Text>
                <Text>Mật khẩu hiện tại</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={Password}
                        placeholder="mật khẩu hiện tại"
                        secureTextEntry={!passwordVisible1}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility1}
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
                <Text>Mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewPassword}
                        value={newPassword}
                        placeholder="mật khẩu mới"
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
                <Text>Nhập lại mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="nhập lại mật khẩu mới"
                        secureTextEntry={!passwordVisible3}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility3}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={
                                passwordVisible3
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
        height: 450,
        backgroundColor: "white",
        margin: "auto",
        borderRadius: 10,
        padding: 20,
    },
    containerTitle: {
        flexDirection: "row",
        padding: 24,
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        flex: 1,
        fontWeight: "500",
        fontSize: 17,
        color: "black",
        textAlign: "center",
        paddingRight: 24,
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
    },
})
export default EditInfo

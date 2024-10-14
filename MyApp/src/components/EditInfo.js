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

const EditInfo = ({ navigation, route }) => {
    const { Account } = route.params
    const [Password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword)
            Alert.alert("failed", "mật khẩu không trùng khớp")
        else {
            try {
                const response = await fetch(
                    "http://192.168.0.102:3000/changePassword",
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
                        placeholder="Nhập mật hiện tại"
                    />
                </View>
                <Text>Mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewPassword}
                        value={newPassword}
                        placeholder="Nhập mật khẩu mới"
                    />
                </View>
                <Text>Nhập lại mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Nhập lại mật khẩu mới"
                    />
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
})
export default EditInfo

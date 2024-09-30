import React, { useState } from "react"
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Modal,
} from "react-native"
import { primaryColor } from "../Constants/Color"

const ForgotPassWordScreen = ({ navigation }) => {
    const [Account, setAccount] = useState("")
    const [Email, setEmail] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handlerSendOTP = async () => {
        if (!Account || !Email) {
            Alert.alert("Error", "Hãy nhập đầy đủ thông tin")
            return
        }
        try {
            const response = await fetch("http://192.168.0.108:3000/sendOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email,
                    Account,
                }),
            })
            const data = await response.json()

            console.log(Email)
            console.log(response.status)
            if (response.status === 200) {
                // Alert.alert("Success", "gửi mã thành công")
                setLoading(false)
                setModalVisible(true)
            } else if (response.status === 400) {
                Alert.alert("Error", data.message)
                setLoading(false)
            } else {
                Alert.alert("Error", data.message)
                setLoading(false)
            }
        } catch (error) {
            Alert.alert(`${error}`, `Failed to register user `)
            setLoading(false)
        }
    }
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/bgc.png")}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View style={styles.forgotpassContainer}>
                        <Text
                            style={{
                                fontSize: 40,
                                color: "black",
                                fontWeight: "bold",
                                marginBottom: 10,
                            }}
                        >
                            Quên mật khẩu
                        </Text>
                        <Text style={{ fontSize: 17, marginBottom: 30 }}>
                            {" "}
                            Vui lòng nhập thông tin
                        </Text>
                        <Text style={{ marginBottom: 10 }}>Tên đăng nhập</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setAccount}
                                value={Account}
                                placeholder="Tên đăng nhập"
                                keyboardType="numeric"
                            />
                        </View>
                        <Text style={{ marginBottom: 10 }}>Email</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={Email}
                                placeholder="Email"
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                marginRight: 8,
                            }}
                            onPress={() => {
                                navigation.navigate("LoginScreen")
                            }}
                        >
                            <Text
                                style={{
                                    color: primaryColor,
                                    fontSize: 17,
                                    marginBottom: 30,
                                }}
                            >
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Gửi mã xác nhận"
                            onPress={handlerSendOTP}
                        />
                    </View>
                </ImageBackground>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        padding: 20,
                        flex: 1,
                    }}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                        verification
                    </Text>
                    <Text>
                        nhập mã xác minh đã được gửi qua email:
                        {Email.replace(/(.{6})/, "******")}
                    </Text>
                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    forgotpassContainer: {
        padding: 16,
        width: "95%",
        height: 470,
        backgroundColor: "white",
        margin: "auto",
        borderRadius: 10,
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
})

export default ForgotPassWordScreen

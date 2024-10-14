import React, { useRef, useState } from "react"
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

const ForgotPassWordScreen = ( { navigation }) => {
    const [Account, setAccount] = useState("")
    const [isLoading, setLoading] = useState(false)
    
    const handlerSendOTP = async () => {
        if (!Account ) {
            Alert.alert("Error", "Hãy nhập đầy đủ thông tin")
            return
        }
        try {
            const response = await fetch("http://192.168.0.102:3000/sendOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Account,
                }),
            })
            const data = await response.json()
            if (response.status === 200) {
                // Alert.alert("Success", "gửi mã thành công")
                setLoading(false)
                navigation.navigate("Verification", {email:data.Email.Email,token: data.token, Account:Account})
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
                        {/* <Text style={{ marginBottom: 10 }}>Email</Text> */}
                        {/* <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={Email}
                                placeholder="Email"
                            />
                        </View> */}
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
            {/* <Modal
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
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                        verification
                    </Text>
                    <Text style={{fontSize:20}}>
                        nhập mã xác minh đã được gửi qua email:
                        {Email.replace(/(.{6})/, "******")}
                    </Text>
                    <View style={styles.OTPcontainer}>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref1}
                            maxLength={1}
                            onChange={(val) => {
                                val && ref2.current.focus()
                            }}
                        ></TextInput>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref2}
                            maxLength={1}
                            onChange={(val) => {
                                val && ref3.current.focus()
                            }}
                        ></TextInput>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref3}
                            maxLength={1}
                            onChange={(val) => {
                                val && ref4.current.focus()
                            }}
                        ></TextInput>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref4}
                            maxLength={1}
                            onChange={(val) => {
                                val && ref5.current.focus()
                            }}
                        ></TextInput>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref5}
                            maxLength={1}
                            onChange={(val) => {
                                val && ref6.current.focus()
                            }}
                        ></TextInput>
                        <TextInput
                            style={styles.inputOTP}
                            keyboardType="numeric"
                            ref={ref6}
                            maxLength={1}
                        ></TextInput>
                    </View>
                    <Button title="countinue" ></Button>
                </View>
            </Modal> */}
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

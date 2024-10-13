import React, { useEffect, useRef, useState } from "react"
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native"
import { OtpInput } from "react-native-otp-entry"
import AntDesign from "@expo/vector-icons/AntDesign"
const VerificationScreen = ({ navigation, route }) => {
    const { email, token,Account } = route.params
    const [Token, setToken] = useState(token)
    return (
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
            <Text style={{ fontSize: 20 }}>
                nhập mã xác minh đã được gửi qua email:
                {email.replace(/(.{6})/, "******")}
            </Text>
            <OtpInput
                numberOfDigits={6}
                focusColor="#004580"
                type="numeric"
                focusStickBlinkingDuration={500}
                onFilled={async (otp) => {
                    try {
                        const response = await fetch(
                            "http://192.168.0.109:3000/verify",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    Token,
                                    otp,
                                }),
                            }
                        )
                        const data = await response.json()
                        console.log(data)
                        if (response.status === 200) {
                            Alert.alert("Success", "OTP verified!")
                            navigation.navigate("ChangePasswordScreen",{Account:Account})
                        } else {
                            Alert.alert("Error", data.message) // Thông báo OTP hết hạn hoặc sai
                        }
                    } catch (error) {
                        Alert.alert("Error", error)
                    }
                }}
                textInputProps={{
                    accessibilityLabel: "One-Time Password",
                }}
                theme={{
                    containerStyle: {
                        marginVertical: 20,
                    },
                    pinCodeContainerStyle: {
                        backgroundColor: "white",
                        width: 58,
                        height: 58,
                        borderRadius: 12,
                    },
                    // pinCodeTextStyle: styles.pinCodeText,
                    // focusStickStyle: styles.focusStick,
                    // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
            ></OtpInput>
            <View style={styles.Container}>
                <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                    <Text style={{ marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Text style={{ marginRight: 10 }}>Countinue</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputOTP: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
    OTPcontainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-around",
        marginBottom: 30,
    },
    Container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})
export default VerificationScreen

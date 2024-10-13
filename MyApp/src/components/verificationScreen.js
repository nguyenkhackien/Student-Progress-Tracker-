import React, { useRef, useState } from "react"
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
const VerificationScreen = ({ navigation, route }) => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()
    const ref6 = useRef()
    const { email } = route.params
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

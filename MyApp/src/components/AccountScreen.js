import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Feather from "@expo/vector-icons/Feather"
import { logout } from "../reducers/AuthSlice"

const AccountScreeen = ({ navigation }) => {
    const Account = useSelector((data) => data.auth.Account)
    const [info, setInfo] = useState(null)
    const dispatch = useDispatch()
    const isLogin = useSelector( ( data ) => data.auth.Account )
    console.log(isLogin);
    useEffect(() => {
        const getinfo = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.109:3000/getInfo?account=${Account}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                const data = await response.json()
                if (response.status === 200) {
                    setInfo(data.info)
                } else {
                    Alert.alert("Error", data.message)
                }
            } catch (error) {
                Alert.alert(`${error}`)
            }
        }
        getinfo()
    }, [])
    return (
        <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require("../../assets/user.png")}
                ></Image>

                <Text style={{ fontSize: 20, alignItems: "center" }}>
                    {info?.user_name.toUpperCase()}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Họ và Tên:
                    </Text>
                    <TextInput
                        value={info?.user_name}
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Email:
                    </Text>
                    <TextInput
                        value={info?.Email}
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Mã sinh viên:
                    </Text>
                    <TextInput
                        value={info?.tk}
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Ngày sinh:
                    </Text>
                    <TextInput
                        value={
                            info?.birth_date
                                ? new Date(info.birth_date).toLocaleDateString()
                                : ""
                        }
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Ngành:
                    </Text>
                    <TextInput
                        value={info?.major_name}
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            color: "blue",
                        }}
                    >
                        Mật khẩu:
                    </Text>
                    <TextInput
                        value="********"
                        style={{
                            fontSize: 18,
                            alignItems: "center",
                            paddingVertical: 5,
                        }}
                    ></TextInput>
                    <TouchableOpacity
                        style={styles.edit}
                        onPress={() =>
                            navigation.navigate("EditInfoScreen", {
                                Account: info?.tk,
                            })
                        }
                    >
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={{
                    width: "60%",
                    height: 40,
                    backgroundColor: "red",
                    marginHorizontal: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    marginBottom: 20,
                }}
                onPress={() => {
                    dispatch( logout() )
                    navigation.replace("HomeTab")
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 18,
                    }}
                >
                    LOG OUT
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        height: 150,
        marginHorizontal: "auto",
        marginBottom: 90,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 75,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: "black",
    },
    Icon: {
        position: "absolute",
        right: 25,
        bottom: -45,
    },
    Info: {
        marginHorizontal: 30,
        padding: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
    },
    infoContainer: {
        width: "100%",
        backgroundColor: "white",
        marginHorizontal: "auto",
        padding: 20,
        borderTopWidth: 1,
    },
    edit: {
        position: "absolute",
        right: 15,
        top: 30,
    },
})

export default AccountScreeen

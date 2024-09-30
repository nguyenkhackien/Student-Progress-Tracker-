import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import AntDesign from "@expo/vector-icons/AntDesign"
const AccountScreeen = () =>
{
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require("../../assets/user.png")}
                ></Image>
                <TouchableOpacity style={styles.Icon}>
                    <MaterialCommunityIcons
                        name="image-edit"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <Text
                    style={{  fontSize: 20, marginLeft: 20,alignItems:'center' }}
                >
                    Nguyễn Khắc Kiên
                </Text>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        height: 150,
        marginHorizontal: "auto",
        marginBottom:90,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginVertical: 35,
        borderWidth: 1,
        borderColor:'black',
    },
    Icon: {
        position: "absolute",
        right: 25,
        bottom: -45,
    },
    Info: {
        marginHorizontal: 30,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth:1
    }
})

export default AccountScreeen

import CheckBox from "@react-native-community/checkbox"
import { useState } from "react"
import { StyleSheet, Text, View ,TouchableOpacity} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign" 

const RenderData = (prop) => {
    const { item } = prop
    const [isCheck, setIsCheck] = useState(false)
    return (
        <View
            style={{
                flexDirection: "row",
                height: 50,
                alignItems: "center",
                borderBottomWidth: 1,
            }}
        >
            <View style={styles.containerSTT}>
                <Text style={{ textAlign: "center" }}>{item.STT}</Text>
            </View>
            <View style={styles.containerMs}>
                <Text style={{ textAlign: "center" }}>{item.Maso}</Text>
            </View>
            <View style={styles.containerHp}>
                <Text style={{ textAlign: "center" }}>{item.HocPhan}</Text>
            </View>
            <View style={styles.containerTc}>
                <Text style={{ textAlign: "center" }}>{item.TC}</Text>
            </View>
            <View style={styles.containerDk}>
                {/* <CheckBox
                    value={isCheck}
                    onChange={() => {
                        setIsCheck(!isCheck)
                    }}
                /> */}
                <TouchableOpacity
                    onPress={() => setIsCheck(!isCheck)} // Toggle trạng thái khi nhấn
                    style={styles.checkbox}
                >
                    {/* Hiển thị icon nếu isCheck là true */}
                    {isCheck ? (
                        <AntDesign name="checksquare" size={24} color="green" />
                    ) : (
                        <AntDesign name="checksquareo" size={24} color="gray" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSTT: {
        borderRightWidth: 1,
        height: "100%",
        justifyContent: "center",
        borderColor: "#888",
        width: "10%",
    },
    containerMs: {
        borderRightWidth: 1,
        height: "100%",
        justifyContent: "center",
        borderColor: "#888",
        width: "15%",
    },
    containerHp: {
        borderRightWidth: 1,
        height: "100%",
        justifyContent: "center",
        borderColor: "#888",
        width: "50%",
    },
    containerTc: {
        borderRightWidth: 1,
        height: "100%",
        justifyContent: "center",
        borderColor: "#888",
        width: "15%",
    },
    containerDk: {
        height: "100%",
        justifyContent: "center",
        width: "10%",
    },
    textHeader: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 15,
    },
    container: {
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
        textAlign: "center", // Căn giữa chữ
    },
})

export default RenderData

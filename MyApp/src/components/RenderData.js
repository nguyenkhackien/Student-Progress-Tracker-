import CheckBox from "@react-native-community/checkbox"
import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
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
                <Text style={{ textAlign: "center" }}></Text>
            </View>
            <View style={styles.containerMs}>
                <Text style={{ textAlign: "center" }}>{item.subject_id}</Text>
            </View>
            <View style={styles.containerHp}>
                <Text style={{ textAlign: "center" }}>{item.subject_name}</Text>
            </View>
            <View style={styles.containerTc}>
                <Text style={{ textAlign: "center" }}>{item.TC}</Text>
            </View>
            <View style={styles.containerMs}>
                <Text style={{ textAlign: "center" }}>{item.prerequisite}</Text>
            </View>
            <View style={styles.containerDk}>
                <View
                    onPress={() => setIsCheck(!isCheck)} // Toggle trạng thái khi nhấn
                    style={styles.checkbox}
                >
                    {item.passed ? (
                        <AntDesign style={{textAlign:'center'}} name="check" size={24} color="black" />
                    ) : (
                        <Text></Text>
                    )}
                </View>
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
        width: "30%",
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
        textAlign: "center", 
    },
})

export default RenderData

import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native"
import RenderData from "./RenderData"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const StudyProgressScreen = ({ navigation }) => {
    const data = [
        {
            STT: 1,
            Maso: "PHI1006",
            HocPhan: "Triết học mác Lênin",
            TC: 3,
            DK: true,
        },
        {
            STT: 2,
            Maso: "PHI1006",
            HocPhan: "Triết học mác Lênin",
            TC: 2,
            DK: false,
        },
        {
            STT: 3,
            Maso: "PHI1006",
            HocPhan: "Triết học mác Lênin",
            TC: 3,
            DK: false,
        },
        {
            STT: 4,
            Maso: "PHI1006",
            HocPhan: "Triết học mác Lênin",
            TC: 3,
            DK: true,
        },
        {
            STT: 5,
            Maso: "PHI1006",
            HocPhan: "Triết học mác Lênin",
            TC: 3,
            DK: false,
        },
    ]
    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        margin: "auto",
                        fontWeight: "bold",
                        fontSize: 23,
                        color: "#004580",
                    }}
                >
                    Tra cứu UET
                </Text>


                <TouchableOpacity>
                    <MaterialIcons
                        name="notifications-on"
                        size={28}
                        color="black"
                        style={{ position: "absolute", right: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image source={require("../../assets/logo.png")} />
                </TouchableOpacity> */}
                <Text style={[styles.text, { paddingRight: 24 }]}>
                    Học Phần
                </Text>
            </View>
            {/* header */}
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    backgroundColor: "#6fc2e3",
                    height: 50,
                    alignItems: "center",
                }}
            >
                <View style={styles.containerSTT}>
                    <Text style={styles.textHeader}>STT</Text>
                </View>
                <View style={styles.containerMs}>
                    <Text style={styles.textHeader}>Mã số</Text>
                </View>
                <View style={styles.containerHp}>
                    <Text style={styles.textHeader}>Học phần</Text>
                </View>
                <View style={styles.containerTc}>
                    <Text style={styles.textHeader}>Số tín chỉ</Text>
                </View>
                <View style={styles.containerDk}>
                    <Text style={styles.textHeader}>Điều kiện</Text>
                </View>
            </View>
            {/* khoi kien thuc chung */}
            <View style={{ width: "100%" }}>
                {/* header khoi kien thuc chung */}
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        height: 50,
                        borderBottomWidth: 1,
                    }}
                >
                    <View style={styles.containerSTT}>
                        <Text style={{ textAlign: "center" }}>I</Text>
                    </View>
                    <View style={[styles.containerSTT, { width: "65%" }]}>
                        <Text style={{ marginLeft: 6, textAlign: "center" }}>
                            Khối kiến thức chung(Chưa tính học phần GDTC,
                            GDQP-AN)
                        </Text>
                    </View>
                    <View style={styles.containerTc}>
                        <Text style={{ textAlign: "center" }}>16</Text>
                    </View>
                </View>
                {/* renderData */}
                {data.map((item, index) => (
                    <RenderData key={index} item={item} />
                ))}
            </View>

            <View style={{ width: "100%" }}>
                {/* header khoi kien thuc chung */}
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        height: 50,
                        borderBottomWidth: 1,
                    }}
                >
                    <View style={styles.containerSTT}>
                        <Text style={{ textAlign: "center" }}>II</Text>
                    </View>
                    <View style={[styles.containerSTT, { width: "65%" }]}>
                        <Text style={{ marginLeft: 6, textAlign: "center" }}>
                            Khối kiến thức không chung
                        </Text>
                    </View>
                    <View style={styles.containerTc}>
                        <Text style={{ textAlign: "center" }}>16</Text>
                    </View>
                </View>
                {/* renderData */}
                {data.map((item, index) => (
                    <RenderData key={index} item={item} />
                ))}
            </View>
        </ScrollView>
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
export default StudyProgressScreen

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
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const StudyProgressScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [require, setRequire] = useState([])
    const Account = useSelector((data) => data.auth.Account)
    const [page, setPage] = useState(true)
    useEffect(() => {
        const fetchMajor = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.103:3000/getMajor_id?account=${Account}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                const jsonData1 = await response.json()
                const major_id = jsonData1.Data[0].major_id

                await fetchCurriculum(major_id)
                await fetchRequire(major_id)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        fetchMajor()
        const fetchCurriculum = async (major_id) => {
            try {
                const response = await fetch(
                    `http://192.168.0.103:3000/getCurriculum?major_id=${major_id}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                const jsonData1 = await response.json()
                setData(jsonData1.Data)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        const fetchRequire = async (major_id) => {
            try {
                const response = await fetch(
                    `http://192.168.0.103:3000/getRequired?major_id=${major_id}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                const jsonData1 = await response.json()
                setRequire(jsonData1.Data)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
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
            <View
                style={{
                    height: "20%",
                    width: "100%",
                    backgroundColor: "red",
                    marginBottom: 10,
                }}
            ></View>

            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 10,
                        flex: 1,
                        borderBottomWidth: 2,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: "40%",
                            height: 30,
                            borderWidth: 1,
                            borderColor: "black",
                            marginRight: 5,
                        }}
                        onPress={() => {
                            setPage(true)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                flex: 1,
                                lineHeight: 30,
                                color: page ? "blue" : "black",
                            }}
                        >
                            Khung chương trình
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: "40%",
                            height: 30,
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                        onPress={() => {
                            setPage(false)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                flex: 1,
                                lineHeight: 30,
                                color: page ? "black" : "blue",
                            }}
                        >
                            Kết quả học tập
                        </Text>
                    </TouchableOpacity>
                </View>
                {page ? (
                    <>
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
                                <Text style={styles.textHeader}>
                                    Số tín chỉ
                                </Text>
                            </View>
                            <View style={styles.containerMs}>
                                <Text style={styles.textHeader}>
                                    Môn tiên quyết
                                </Text>
                            </View>
                            <View style={styles.containerDk}>
                                <Text style={styles.textHeader}>Trạng thái</Text>
                            </View>
                        </View>
                        {/* nhóm 1 */}
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
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        I
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Khối kiến thức chung(Chưa tính học phần
                                        GDTC, GDQP-AN)
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) => item.group_id === "1"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "1")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 2 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        II
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Khối kiến thức không chung
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) => item.group_id === "2"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "2")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 3 */}
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
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        III
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Khối kiến thức theo khối ngành
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) => item.group_id === "3"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "3")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 4.1 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        IV
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Khối kiến theo nhóm ngành
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {require.filter(
                                            (item) => item.group_id === "4.1"
                                        )[0]?.required +
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "4.2"
                                            )[0]?.required}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        IV.1
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Các học phần bắt buộc
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "4.1"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "4.1")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 4.2 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        IV.2
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Các học phần tự chọn
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "4.2"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "4.2")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 5.1 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        V
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Khối kiến thức ngành
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {require.filter(
                                            (item) => item.group_id === "5.1"
                                        )[0]?.required +
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.2"
                                            )[0]?.required +
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.3"
                                            )[0]?.required +
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.4"
                                            )[0]?.required}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        V.1
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Các học phần bắt buộc
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.1"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "5.1")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 5.2 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        V.2
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Các học phần tự chọn
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.2"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "5.2")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 5.3 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        V.3
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Các học phần bổ trợ
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.3"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "5.3")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                        {/* nhóm 5.4 */}
                        <View style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    height: 50,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={styles.containerSTT}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        V.4
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.containerSTT,
                                        { width: "60%" },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 6,
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        Thực tập và tốt nghiệp
                                    </Text>
                                </View>
                                <View style={styles.containerTc}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "blue",
                                        }}
                                    >
                                        {
                                            require.filter(
                                                (item) =>
                                                    item.group_id === "5.4"
                                            )[0]?.required
                                        }
                                    </Text>
                                </View>
                            </View>
                            {/* renderData */}
                            {data
                                .filter((item) => item.group_id === "5.4")
                                .map((item, index) => (
                                    <RenderData key={index} item={item} />
                                ))}
                        </View>
                    </>
                ) : (
                    <View>
                        <Text>Page 2</Text>
                    </View>
                )}
            </ScrollView>
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
        textAlign: "center", // Căn giữa chữ
    },
})
export default StudyProgressScreen

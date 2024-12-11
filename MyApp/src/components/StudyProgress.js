import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native"
import RenderData from "./RenderData"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import RenderItem from "./RenderItem"
import CircularProgress from "./CircularProgress"
const StudyProgressScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [require, setRequire] = useState([])
    const Account = useSelector((data) => data.auth.Account)
    const [page, setPage] = useState(true)
    const [studyProgress, setStudyProgress] = useState([])
    const [creditsPassedByGroup, setCreditsPassedByGroup] = useState({})
    const [info, setInfo] = useState([])
    const [semesters, setSemesters] = useState([])

    const maxSemesterId = Math.max(
        ...studyProgress.map((item) => parseInt(item.semester_id))
    )
    const groupedData = studyProgress.reduce((acc, item) => {
        const semesterId = item.semester_id
        if (!acc[semesterId]) {
            acc[semesterId] = []
        }
        acc[semesterId].push(item)
        return acc
    }, {})
    useEffect(() => {
        const fetchMajor = async () => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getMajor_id?account=${Account}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                if (response.status === 200) {
                    const jsonData1 = await response.json()
                    const major_id = jsonData1.Data[0].major_id

                    const curriculumData = await fetchCurriculum(major_id)
                    await fetchRequire(major_id)
                    await fetchStudyProgress(curriculumData)
                    await fetchInfo()
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }

        const fetchCurriculum = async (major_id) => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getCurriculum?major_id=${major_id}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                if (response.status === 200) {
                    const jsonData1 = await response.json()
                    return jsonData1.Data
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        const fetchRequire = async (major_id) => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getRequired?major_id=${major_id}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                if (response.status === 200) {
                    const jsonData1 = await response.json()
                    setRequire(jsonData1.Data)
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        const fetchInfo = async () => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getStudentInfo?account=${Account}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                if (response.status === 200) {
                    const jsonData1 = await response.json()
                    setInfo(jsonData1.info)
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        const fetchStudyProgress = async (curriculumData) => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getStudyProgress?account=${Account}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                if (response.status === 200) {
                    const jsonData1 = await response.json()

                    const creditsPassedByGroupT = {}
                    const updateData = curriculumData.map((subject) => {
                        // Kiểm tra môn học trong studyprogress
                        const progress = jsonData1.Data.find(
                            (sp) => sp.subject_id === subject.subject_id
                        )
                        // Nếu môn đã được học và đạt điểm qua
                        if (progress && progress.points >= 4.0) {
                            // Cập nhật tín chỉ đã qua của nhóm môn
                            if (creditsPassedByGroupT[subject.group_id]) {
                                creditsPassedByGroupT[subject.group_id] +=
                                    subject.TC
                            } else {
                                creditsPassedByGroupT[subject.group_id] =
                                    subject.TC
                            }
                            // Đánh dấu môn đã qua
                            return { ...subject, passed: true }
                        } else {
                            // Đánh dấu môn chưa qua
                            return { ...subject, passed: false }
                        }
                    })
                    setData(updateData)
                    setStudyProgress(jsonData1.Data)

                    setCreditsPassedByGroup(creditsPassedByGroupT)
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        const fetchSemester = async () => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/semesterList`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }
                const jsonData1 = await response.json()
                setSemesters(jsonData1.List)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        fetchSemester()
        fetchMajor()
    }, [])
    const getSum = (studyProgress) => {
        let sum = 0
        studyProgress.forEach((item) => (sum += item.TC))
        return sum
    }
    function calculateTotalCredits(creditsByGroup) {
        const creditsArray = Object.values(creditsByGroup)
        const totalCredits = creditsArray.reduce((acc, curr) => acc + curr, 0)
        return totalCredits
    }
    function sumRequired(require) {
        const totalCredits = require.reduce(
            (acc, item) => acc + item.required,
            0
        )
        return totalCredits
    }
    const getAvg = (studyProgress) => {
        let sum = 0
        let tc = 0
        studyProgress.forEach((item) => {
            if (item.grade !== "F") {
                sum += parseFloat(item.points_4) * item.TC
                tc += item.TC
            }
        })
        return Math.round((sum / tc) * 10) / 10
    }
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

            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        height: 200,
                        backgroundColor: "white",
                        borderRadius: 20,
                        margin: 10,
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Tên: {info.student_name}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            MSSV: {info.MSSV}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Tổng tín chỉ: {getSum(studyProgress)}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Tổng tín chỉ tích lũy:{" "}
                            {calculateTotalCredits(creditsPassedByGroup)}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Điểm trung: {getAvg(studyProgress)}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            Tình trạng:{" "}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color:
                                        calculateTotalCredits(
                                            creditsPassedByGroup
                                        ) <
                                        17 * maxSemesterId - 10
                                            ? "red"
                                            : "green",
                                }}
                            >
                                {calculateTotalCredits(creditsPassedByGroup) <
                                17 * maxSemesterId
                                    ? "Chậm tiến độ"
                                    : "Tiến độ tốt"}
                            </Text>
                        </Text>
                    </View>
                    <View
                        style={{
                            width: "45%",
                        }}
                    >
                        <View style={styles.container}>
                            {/* <AnimatedCircularProgress
                                size={130}
                                width={20}
                                fill={Math.min(
                                    Math.max(
                                        Math.round(
                                            (calculateTotalCredits(
                                                creditsPassedByGroup
                                            ) /
                                                sumRequired(require)) *
                                                100
                                        ),
                                        0
                                    ),
                                    100
                                )}
                                tintColor="#3498db"
                                backgroundColor="#e6e6e6" // Màu nền
                                duration={1000} // Thời gian chạy animation (ms)
                            >
                                {() => (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: "#3498db",
                                            fontWeight: "bold",
                                            position: "absolute",
                                        }}
                                    >
                                        {Math.round(
                                            (calculateTotalCredits(
                                                creditsPassedByGroup
                                            ) /
                                                sumRequired(require)) *
                                                100
                                        )}
                                        {"%"}
                                    </Text>
                                )}
                            </AnimatedCircularProgress> */}
                            <CircularProgress
                                size={120}
                                progress={Math.min(
                                    Math.max(
                                        Math.round(
                                            (calculateTotalCredits(
                                                creditsPassedByGroup
                                            ) /
                                                sumRequired(require)) *
                                                100
                                        ),
                                        0
                                    ),
                                    100
                                )}
                                color="#4caf50"
                            />
                        </View>
                    </View>
                </View>
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
                                <Text style={styles.textHeader}>
                                    Trạng thái
                                </Text>
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
                                        {creditsPassedByGroup["1"] || 0} {"/"}
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
                                        {creditsPassedByGroup["2"] || 0} {"/"}
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
                                        {creditsPassedByGroup["3"] || 0} {"/"}
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
                                        {creditsPassedByGroup["4.1"] || 0} {"/"}
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
                                        {creditsPassedByGroup["4.2"] || 0} {"/"}
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
                                        {creditsPassedByGroup["5.1"] || 0} {"/"}
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
                                        {creditsPassedByGroup["5.2"] || 0} {"/"}
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
                                        {creditsPassedByGroup["5.3"] || 0} {"/"}
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
                                        {creditsPassedByGroup["5.4"] || 0} {"/"}
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
                                <Text style={styles.textHeader}>Mã MH</Text>
                            </View>
                            <View style={styles.containerHp}>
                                <Text style={styles.textHeader}>Môn học</Text>
                            </View>
                            <View style={styles.containerTc}>
                                <Text style={styles.textHeader}>
                                    Điểm hệ 10
                                </Text>
                            </View>
                            <View style={styles.containerMs}>
                                <Text style={styles.textHeader}>Điểm hệ 4</Text>
                            </View>
                            <View style={styles.containerDk}>
                                <Text style={styles.textHeader}>Điểm chữ</Text>
                            </View>
                        </View>
                        {Object.keys(groupedData).map((semesterId, index) => {
                            return (
                                <View key={index}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 17,
                                        }}
                                    >
                                        {
                                            semesters.find(
                                                (item) => item.id == semesterId
                                            )?.semester_name
                                        }
                                    </Text>
                                    {groupedData[semesterId].map(
                                        (subject, index) => {
                                            return (
                                                <View key={index}>
                                                    <RenderItem
                                                        key={index}
                                                        stt={index}
                                                        item={subject}
                                                    ></RenderItem>
                                                </View>
                                            )
                                        }
                                    )}
                                </View>
                            )
                        })}
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
        width: "15%",
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

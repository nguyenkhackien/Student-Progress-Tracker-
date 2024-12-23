import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Button,
    Alert,
    FlatList,
} from "react-native"
import { Agenda } from "react-native-calendars"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

export default function MyScheduleScreen() {
    const [modalVisible, setModalVisible] = useState(false) // State để quản lý modal
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)

    const Account = useSelector((data) => data.auth.Account)
    const [data, setData] = useState([])
    const [semesters, setSemesters] = useState([])
    const [lichThi, setLichThi] = useState([])
    const [start, setStart] = useState("")
    useEffect(() => {
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
                const currentSemesterId = getCurrentSemester(jsonData1.List)
                setStart(
                    jsonData1.List.find(
                        (item) => item.semester_id === currentSemesterId
                    ).start_time
                )
                await getData(currentSemesterId)
                await getLichthi(currentSemesterId)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        fetchSemester()

        const getData = async (currentSemesterId) => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getUserSchedule?account=${Account}&semester_id=${currentSemesterId}`
                )

                if (response.status !== 200) {
                    Alert.alert("Error", response.message)
                }

                const jsonData2 = await response.json()
                setData(jsonData2.Data) // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu data:", error)
            }
        }

        const getLichthi = async (currentSemesterId) => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:3000/getLichthiByMSSV?account=${Account}&semester_id=${currentSemesterId}`
                )
                if (response.status !== 200) {
                    Alert.alert("Error", data.message)
                }
                const jsonData3 = await response.json()
                const sortedData = jsonData3.Data.sort((a, b) => {
                    // Nếu một trong các môn học là BTL thì đưa lên đầu
                    if (a.HTT === "BTL" && b.HTT !== "BTL") return -1
                    if (a.HTT !== "BTL" && b.HTT === "BTL") return 1

                    // Nếu cả hai đều có ngày thi, sắp xếp theo ngày thi
                    if (a.ngaythi && b.ngaythi) {
                        const [dayA, monthA, yearA] = a.ngaythi.split("/")
                        const [dayB, monthB, yearB] = b.ngaythi.split("/")

                        const dateA = new Date(`${yearA}-${monthA}-${dayA}`)
                        const dateB = new Date(`${yearB}-${monthB}-${dayB}`)

                        return dateA - dateB
                    }

                    // Nếu một trong các môn học không có ngày thi, để nó xuống dưới
                    return a.ngaythi ? -1 : 1
                })
                setLichThi(sortedData)
            } catch (error) {
                console.error("lỗi khi lấy dữ liệu lich thi", error)
            }
        }
    }, [])

    function getCurrentSemester(semesters) {
        const currentDate = new Date()

        for (const semester of semesters) {
            const startDate = new Date(
                semester.start_time.split("/").reverse().join("-")
            )
            const endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() + 15 * 7)
            if (currentDate >= startDate && currentDate <= endDate) {
                return semester.semester_id
            }
        }

        return null
    }

    const closeModal = () => {
        setModalVisible(false) // Đóng modal
    }

    const generateScheduleItems = (data) => {
        const items = {}
        const today = new Date()
        // Duyệt qua từng dữ liệu và tạo mục cho từng ngày trong tuần
        data.forEach((schedule) => {
            const {
                thu,
                maLMH,
                tenMH,
                semester_id,
                nhom,
                tiet,
                giangduong,
                Giangvien,
            } = schedule
            let currentDate = new Date(today)
            const start_date = start.split("/").reverse().join("-")
            const endDate = new Date(start_date)
            endDate.setDate(endDate.getDate() + 15 * 7)
            while (currentDate <= endDate) {
                const formattedDate = currentDate.toISOString().split("T")[0]
                if (currentDate.getDay() === thu) {
                    // Nếu ngày là thứ đúng, thêm vào items
                    if (!items[formattedDate]) {
                        items[formattedDate] = []
                    }
                    items[formattedDate].push({
                        thu: thu,
                        name: maLMH,
                        ten: tenMH,
                        semester_id: semester_id,
                        nhom: nhom,
                        tiet: tiet,
                        giangduong: giangduong,
                        Giangvien: Giangvien,
                    })
                }
                currentDate.setDate(currentDate.getDate() + 1) // Tăng ngày lên 1
            }
        })

        return items
    }

    function sortSchedule(data) {
        const sortedSchedule = {}

        for (const date in data) {
            // Sắp xếp danh sách môn học theo tiết
            sortedSchedule[date] = data[date].sort((a, b) => {
                const aTiet = a.tiet.split("-")[0] // Lấy tiết bắt đầu
                const bTiet = b.tiet.split("-")[0] // Lấy tiết bắt đầu
                return aTiet - bTiet // Sắp xếp theo tiết
            })
        }

        return sortedSchedule
    }
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    const scheduleItems = generateScheduleItems(data)
    const schedule = sortSchedule(scheduleItems)
    const [selectedDate, setSelectedDate] = useState(formattedDate)
    const [dataSelected, setDataSelected] = useState(null)
    const [lichThiSlected, setLichThiSelected] = useState(null)

    const markedDates = {}
    Object.keys(scheduleItems).forEach((date) => {
        markedDates[date] = {
            dots: [{ key: "event", color: "red" }],
            marked: true,
        }
    })
    const filteredItems = selectedDate
        ? { [selectedDate]: schedule[selectedDate] || [] }
        : schedule
    const time = (tiet) => {
        const startHour = 7
        const range = tiet.split("-")
        let startTiet = parseInt(range[0]) // Tiết bắt đầu
        let endTiet = parseInt(range[1])
        const results = []

        const startTime = startHour + (startTiet - 1)
        const endTime = startHour + (endTiet - 2)
        return `${startTime}h-${endTime}h50`
    }
    // Thiết lập đánh dấu cho tất cả các ngày trong scheduleData
    const renderItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setDataSelected(item)
                    setModalVisible(true)
                }}
            >
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    {item.name}
                </Text>
                <Text>{item.ten}</Text>
                <Text>Thời gian: {time(item.tiet)} </Text>
                <Text>Phòng học:{item.giangduong}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(false)
                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible3}
                    onRequestClose={() => {
                        setModalVisible3(false)
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View
                            style={{
                                width: "90%",
                                padding: 20,
                                backgroundColor: "white",
                                borderRadius: 10,
                                elevation: 5,
                            }}
                        >
                            <Text style={styles.modalText}>
                                Mã lớp môn học: {lichThiSlected?.maLMH}
                            </Text>
                            <Text style={styles.modalText}>
                                Tên môn học: {lichThiSlected?.tenMh}
                            </Text>
                            <Text style={styles.modalText}>
                                TC: {lichThiSlected?.TC}
                            </Text>
                            <Text style={styles.modalText}>
                                HTT: {lichThiSlected?.HTT}
                            </Text>
                            <Text style={styles.modalText}>
                                Ngày thi:{" "}
                                {lichThiSlected?.ngaythi ?? "nộp bài tập lớn"}
                            </Text>
                            <Text style={styles.modalText}>
                                Giờ thi: {lichThiSlected?.Giothi ?? "BTL"}
                            </Text>
                            <Text style={styles.modalText}>
                                Phòng thi: {lichThiSlected?.phongthi ?? ""}
                            </Text>
                            {/* Nút đóng modal */}
                            <Button
                                title="Đóng"
                                onPress={() => setModalVisible3(false)}
                            />
                        </View>
                    </View>
                </Modal>
                <View
                    style={{
                        backgroundColor: "white",
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                        }}
                    >
                        Lịch Thi
                    </Text>
                    <View>
                        {lichThi.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        backgroundColor: "#E8E8E8",
                                        height: 70,
                                        width: "100%",
                                        borderWidth: 1,
                                        borderColor: "#E8E8E8",
                                        borderRadius: 10,
                                        margin: 5,
                                    }}
                                    onPress={() => {
                                        setLichThiSelected(item)
                                        setModalVisible3(true)
                                    }}
                                    key={index}
                                >
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.tenMh}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        <AntDesign
                                            name="calendar"
                                            size={20}
                                            color="black"
                                        />
                                        {"| "}
                                        {item.ngaythi ?? "Nộp bài tập lớn"}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible2(false)
                        }}
                        style={{
                            marginTop: 15,
                            padding: 10,
                            backgroundColor: "#3498db",
                            borderRadius: 5,
                            position: "absolute",
                            width: "100%",
                            bottom: 10,
                            marginHorizontal: "auto",
                        }}
                    >
                        <Text style={styles.closeButtonText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal} // Đóng modal khi nhấn nút back trên Android
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Mã lớp môn học: {dataSelected?.name}
                        </Text>
                        <Text style={styles.modalText}>
                            Tên môn học: {dataSelected?.ten}
                        </Text>
                        <Text style={styles.modalText}>Lịch học:</Text>
                        <View>
                            <Text style={styles.modalText}>
                                -Thứ {dataSelected?.thu}({dataSelected?.tiet}):
                                {dataSelected?.giangduong}
                                {"\n"}
                                Nhóm:{dataSelected?.nhom}
                            </Text>
                            <Text style={styles.modalText}>
                                Giảng Viên: {dataSelected?.Giangvien}
                            </Text>
                        </View>

                        {/* Nút đóng modal */}
                        <Button title="Đóng" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
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

                <TouchableOpacity
                    onPress={() => {
                        setModalVisible2(true)
                    }}
                >
                    <AntDesign
                        style={{ position: "absolute", right: 50 }}
                        name="infocirlce"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialIcons
                        name="notifications-on"
                        size={28}
                        color="black"
                        style={{ position: "absolute", right: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <Agenda
                items={filteredItems}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString)
                }}
                renderItem={renderItem}
                markedDates={markedDates}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        backgroundColor: "lightblue",
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Nền trong suốt phía sau modal
    },
    modalContent: {
        width: "90%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        marginHorizontal: "auto",
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    itemText: {
        fontSize: 16,
        marginVertical: 2,
    },
})

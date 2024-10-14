import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Button,
} from "react-native"
import { Agenda } from "react-native-calendars"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export default function MyScheduleScreen() {
    const [modalVisible, setModalVisible] = useState(false) // State để quản lý modal
    const [detailData, setDetailData] = useState([])

    const closeModal = () => {
        setModalVisible(false) // Đóng modal
    }

    const Account = useSelector((data) => data.auth.Account)
    const [data, setData] = useState([])
    useEffect(async () => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.102:3000/getUserSchedule?account=${Account}&semester_id=K1_2023-2024`
                )

                if (response.status !== 200) {
                    throw new Error("Không thể lấy dữ liệu")
                }

                const jsonData = await response.json()
                setData(jsonData.Data) // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        getData()
    }, [])
    const generateScheduleItems = (data) => {
        const items = {}
        const today = new Date()

        // Duyệt qua từng dữ liệu và tạo mục cho từng ngày trong tuần
        data.forEach((schedule) => {
            const { thu, maLMH, tenMH ,semester_id,nhom} = schedule

            for (let i = 0; i < 31; i++) {
                const currentDate = new Date(today)
                currentDate.setDate(today.getDate() + i) // Ngày hiện tại cộng thêm i
                const formattedDate = currentDate.toISOString().split("T")[0]

                if (currentDate.getDay() === thu) {
                    // Nếu ngày là thứ đúng, thêm vào items
                    if (!items[formattedDate]) {
                        items[formattedDate] = []
                    }
                    items[formattedDate].push({ name: maLMH, ten: tenMH,semester_id:semester_id,nhom:nhom })
                }
            }
        })

        return items
    }
    const scheduleItems = generateScheduleItems(data)
    const [selectedDate, setSelectedDate] = useState(null)
    console.log("================")
    const markedDates = {}
    Object.keys(scheduleItems).forEach((date) => {
        markedDates[date] = {
            dots: [{ key: "event", color: "red" }],
            marked: true,
        }
    })
    const filteredItems = selectedDate
        ? { [selectedDate]: scheduleItems[selectedDate] || [] }
        : scheduleItems
    // Thiết lập đánh dấu cho tất cả các ngày trong scheduleData
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} onPress={async () =>
            {
                try {
                    const response = await fetch(
                        `http://192.168.0.102:3000/getDetailData?maLMH=${item.name}&semester_id=${item.semester_id}&nhom=${item.nhom}`
                    )

                    if (response.status !== 200) {
                        throw new Error("Không thể lấy dữ liệu")
                    }

                    const jsonData = await response.json()
                    setDetailData(jsonData.Data) // Lưu dữ liệu vào state
                    setModalVisible(true) // Hiển thị modal khi nhấn vào item
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu:", error)
                }
            }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    {item.name}
                </Text>
                <Text>{item.ten}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal} // Đóng modal khi nhấn nút back trên Android
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Mã lớp môn học: {detailData[0]?.maLMH}
                        </Text>
                        <Text style={styles.modalText}>
                            Tên môn học: {detailData[0]?.tenMH}
                        </Text>
                        <Text style={styles.modalText}>Lịch học:</Text>
                        {detailData.map((item) => (
                            <View>
                                <Text style={styles.modalText}>
                                    -Thứ {item?.thu}({item?.tiet}):
                                    {item?.giangduong}
                                    {"\n"}
                                    Nhóm:{item?.nhom}
                                </Text>
                                <Text style={styles.modalText}>
                                    Giảng Viên: {item?.Giangvien}
                                </Text>
                            </View>
                        ))}

                        {/* Nút đóng modal */}
                        <Button title="Đóng" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
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
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
    },
})

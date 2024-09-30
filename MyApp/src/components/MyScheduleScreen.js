import { StyleSheet, Text, TouchableOpacity, View ,Modal,Button} from "react-native"
import { Agenda } from "react-native-calendars"
import { useState,useEffect } from "react"
export default function MyScheduleScreen() {
    const [modalVisible, setModalVisible] = useState(false); // State để quản lý modal

  const handlePress = () => {
    setModalVisible(true); // Hiển thị modal khi nhấn vào item
  };

  const closeModal = () => {
    setModalVisible(false); // Đóng modal
  };
    const data = [
        {
            MSSV: "20020679",
            id: 1,
            maHP: "ELT3241",
            tenMH: "Các vấn đề hiện đại của Kỹ thuật Máy tính",
            TC: 2,
            maLMH: "ELT3241 1",
            soSV: 56,
            Giangvien:
                "TS. Hoàng Gia Hưng PGS.TS. Bùi Thanh Tùng\r\nTS. Phạm Mạnh Hùng",
            thu: 7,
            tiet: "2-3",
            giangduong: "302-GĐ2",
            nhom: "CL",
            semester_id: "K1_2023-2024",
        },
        {
            MSSV: "20020679",
            id: 3,
            maHP: "ELT3231",
            tenMH: "Kỹ thuật xử lý và truyền thông đa phương tiện\r\n(môn tự chọn)",
            TC: 3,
            maLMH: "ELT3231 1",
            soSV: 80,
            Giangvien: "TS. Đinh Triều Dương",
            thu: 3,
            tiet: "4-6",
            giangduong: "107-G2",
            nhom: "CL",
            semester_id: "K1_2023-2024",
        },
        {
            MSSV: "20020679",
            id: 8,
            maHP: "ELT3206 ",
            tenMH: "Quản tri mạng máy tính",
            TC: 3,
            maLMH: "ELT3206 1",
            soSV: 48,
            Giangvien: "TS. Bùi Trung Ninh",
            thu: 2,
            tiet: "11-12",
            giangduong: "309-GĐ2",
            nhom: "2",
            semester_id: "K1_2023-2024",
        },
        {
            MSSV: "20020679",
            id: 9,
            maHP: "ELT3206 ",
            tenMH: "Quản tri mạng máy tính",
            TC: 3,
            maLMH: "ELT3206 1",
            soSV: 48,
            Giangvien: "TS. Bùi Trung Ninh",
            thu: 2,
            tiet: "9-10",
            giangduong: "309-GĐ2",
            nhom: "1",
            semester_id: "K1_2023-2024",
        },
        {
            MSSV: "20020679",
            id: 10,
            maHP: "ELT3203",
            tenMH: "Thiết kế mạch tích hợp tương tự (môn tự chọn)",
            TC: 3,
            maLMH: "ELT3203 1",
            soSV: 80,
            Giangvien: "GS.TS. Chử Đức Trình\r\nTS. Đỗ Xuân Lộc",
            thu: 3,
            tiet: "1-3",
            giangduong: "101-G2",
            nhom: "CL",
            semester_id: "K1_2023-2024",
        },
        {
            MSSV: "20020679",
            id: 19,
            maHP: "HIS1001",
            tenMH: "Lịch sử Đảng Cộng sản Việt Nam",
            TC: 2,
            maLMH: "HIS1001 2",
            soSV: 80,
            Giangvien: "Trường KHXHNV",
            thu: 6,
            tiet: "7-8",
            giangduong: "3-G3",
            nhom: "CL",
            semester_id: "K1_2023-2024",
        },
    ]
    
    const generateScheduleItems = (data) => {
        const items = {}
        const today = new Date()

        // Duyệt qua từng dữ liệu và tạo mục cho từng ngày trong tuần
        data.forEach((schedule) => {
            const { thu, maHP, tenMH } = schedule

            for (let i = 0; i < 31; i++) {
                const currentDate = new Date(today)
                currentDate.setDate(today.getDate() + i) // Ngày hiện tại cộng thêm i
                const formattedDate = currentDate.toISOString().split("T")[0]

                if (currentDate.getDay() === thu) {
                    // Nếu ngày là thứ đúng, thêm vào items
                    if (!items[formattedDate]) {
                        items[formattedDate] = []
                    }
                    items[formattedDate].push({ name: maHP, ten: tenMH })
                }
            }
        })

        return items
    }
    const scheduleItems = generateScheduleItems( data )
    const [ selectedDate, setSelectedDate ] = useState( null )
    console.log( "================" );
    const markedDates = {}
    Object.keys(scheduleItems).forEach((date) => {
        markedDates[date] = {
            dots: [{ key: "event", color: "red" }],
            marked: true,
        } // In ra từng lịch trình
    })
    const filteredItems = selectedDate
        ? { [selectedDate]: scheduleItems[selectedDate] || [] }
        : scheduleItems
    // Thiết lập đánh dấu cho tất cả các ngày trong scheduleData
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} onPress={handlePress}>
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
                            Mã môn học: ELT3241
                        </Text>
                        <Text style={styles.modalText}>
                            Mã lớp môn học: ELT3241 1
                        </Text>
                        <Text style={styles.modalText}>
                            Tên môn học: Các vấn đề hiện đại của Kỹ thuật máy
                            tính
                        </Text>
                        <Text style={styles.modalText}>
                            Lịch học: Thứ 7(tiết 2-3){" "}
                        </Text>
                        <Text style={styles.modalText}>
                            Lớp: QH-2020-I/CQ-K
                        </Text>
                        <Text style={styles.modalText}>
                            Giảng đường: 302-GĐ2
                        </Text>
                        <Text style={styles.modalText}>
                            Giảng Viên: TS. Đinh Triều Dương
                        </Text>
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

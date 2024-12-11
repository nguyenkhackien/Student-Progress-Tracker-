import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Button,
} from "react-native"
import { useState, useEffect } from "react"

const DataItem = (props) => {
    const { data, searchType } = props
    const [modalVisible, setModalVisible] = useState(false) // State để quản lý modal
    const [detailData, setDetailData] = useState([])
    const handlePress = async () => {
        try {
            const response = await fetch(
                `http://10.0.2.2:3000/getDetailData?maLMH=${data.maLMH}&semester_id=${data.semester_id}&nhom=${data.nhom}&searchType=${searchType}`
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
    }

    const closeModal = () => {
        setModalVisible(false) // Đóng modal
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal} // Đóng modal khi nhấn nút back trên Android
            >
                {searchType === "Lịch học" ? (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Mã lớp môn học: {detailData[0]?.maLMH}
                            </Text>
                            <Text style={styles.modalText}>
                                Tên môn học: {detailData[0]?.tenMH}
                            </Text>
                            <Text style={styles.modalText}>Lịch học:</Text>
                            {detailData.map((item, index) => (
                                <View key={index}>
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
                ) : (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Mã lớp môn học: {detailData[0]?.maLMH}
                            </Text>
                            <Text style={styles.modalText}>
                                Tên môn học: {detailData[0]?.tenMH}
                            </Text>
                            <Text style={styles.modalText}>
                                Ngày thi:{detailData[0]?.ngaythi ?? "BTL"}
                            </Text>
                            <Text style={styles.modalText}>
                                Giờ thi:{detailData[0]?.Giothi ?? "BTL"}
                            </Text>
                            <Text style={styles.modalText}>
                                Phòng thi:{detailData[0]?.phongthi ?? "BTL"}
                            </Text>
                            <Text style={styles.modalText}>
                                Hình thức thi:{detailData[0]?.HTT ?? "BTL"}
                            </Text>
                            {/* Nút đóng modal */}
                            <Button title="Đóng" onPress={closeModal} />
                        </View>
                    </View>
                )}
            </Modal>
            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <View
                    style={[
                        styles.column,
                        { width: "20%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>{data.MSSV}</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "25%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>{data.hoTen}</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "20%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>{data.maLMH}</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "25%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>{data.tenMh}</Text>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10%",
                    }}
                >
                    <Text>{data.nhom}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}
export default DataItem
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    column: {
        // justifyContent: 'center', alignItems: 'center',
        paddingLeft: 4,
        height: 56,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Nền trong suốt phía sau modal
    },
    modalContent: {
        width: 350,
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
